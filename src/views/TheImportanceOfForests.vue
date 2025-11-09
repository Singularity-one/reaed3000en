<template>
    <section class="section section-lg text-center text-md-start bg-default">
      <div class="container">
        <div class="box-range-content">
          <router-link @click="transPage('/ListTry50')" to="/about-us">back</router-link>
        </div>
      <p class="text-spacing-sm" @click="handleWordClick">
        <span
          v-for="(word, index) in words"
          :key="index"
          :class="{ 'clickable-word': word.explanation }"
          :data-word="word.cleanText"
        >
          {{ word.text }}
        </span>
      </p>

            <div>
        <AudioPlayer audioSource="4.The importance of forests.mp3" />
      </div>  

      <div>
        <WordExplanation
        :visible="showExplanation"
        :word="selectedWord"
        :partOfSpeech="wordPartsOfSpeech[selectedWord]"
        :explanation="wordExplanations[selectedWord]"
        :translation="wordTranslations[selectedWord]"
        :example="wordExamples[selectedWord]"
        @close="showExplanation = false"
        />
      </div>
      
      <div class="box-range-content" style="display: flex; gap: 10px; align-items: center; margin-top: 1rem;">
        <button @click="showCloze" style="padding: 5px;">
          <i class="box-project-meta-icon linearicons-book"></i>
        </button>
        <button @click="closeCloze" style="padding: 5px;">
          <i class="box-project-meta-icon linearicons-book2"></i>
        </button>
      </div> 

        <div v-if="showClozeTest" class="row row-40 row-lg-50 explanation-text">
          <ClozeTest
          :dataText="dataText"
          :wordExplanations="wordExplanations"
          :wordCloze="wordCloze"
          :blanksCount="100"
          />
        </div>

      </div>
    </section>
</template>

<script>
import * as XLSX from 'xlsx';
import { useExcelStore } from '@/stores/excelStore';
import ClozeTest from '@/components/ClozeTest.vue';
import AudioPlayer from "@/components/AudioPlayer.vue";
import WordExplanation from '@/components/WordExplanation.vue';

export default {
  name: 'TheImportanceOfForests',
  components: { ClozeTest,AudioPlayer,WordExplanation },
  data() {
    return {
      dataText: 'Forests are essential for life on Earth. They produce oxygen, clean the air, and provide homes for many animals. Trees help control the climate by absorbing carbon dioxide, reducing global warming. People also depend on forests for wood, medicine, and food. However, deforestation is a major problem, leading to loss of wildlife and changing weather patterns. To protect forests, governments should create strict laws, and individuals can help by planting trees and using less paper. If forests disappear, the world will face serious environmental problems. How can people balance economic growth with forest protection?',
      showExplanation: false,
      showTranslation: false,
      wordExplanations: {},
      wordTranslations: {},
      wordExamples: {},
      wordPartsOfSpeech: {},
      wordCloze: {},  
      selectedWord: '',
      explanationText: '',
      showClozeTest: false,
    };
  },
  async created() {
    const excelStore = useExcelStore();
    if (
      Object.keys(excelStore.wordExplanations).length === 0 ||
      Object.keys(excelStore.wordTranslations).length === 0
    ) {
      try {
        const url = process.env.BASE_URL + 'excel/default.xlsx';
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        let allData = [];
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          allData = allData.concat(jsonData);
        });
        if (allData.length > 0) {
          excelStore.setExcelData(Object.keys(allData[0]), allData);
        }
      } catch (error) {
        console.error('載入預設 Excel 失敗:', error);
      }
    }
    
    this.wordExplanations = excelStore.wordExplanations;
    this.wordTranslations = excelStore.wordTranslations;
    this.wordExamples = excelStore.wordExamples;
    this.wordPartsOfSpeech = excelStore.wordPartsOfSpeech;
    this.wordCloze = excelStore.wordCloze || {};
  },
  computed: {
    words() {
      const explanations = this.wordExplanations || {};
      const translations = this.wordTranslations || {};

      return this.dataText.split(/(\s+)/).map((word) => {
        const cleanedWord = word.replace(/[.,!?();:"“”]/g, '').toLowerCase();
        return {
          text: word,
          cleanText: cleanedWord,
          explanation: explanations[cleanedWord],
          translation: translations[cleanedWord],
        };
      });
    },
    currentExplanation() {
      if (
        this.showTranslation &&
        this.wordTranslations[this.selectedWord.toLowerCase()]
      ) {
        return this.wordTranslations[this.selectedWord.toLowerCase()];
      }
      return this.explanationText;
    },
  },
  methods: {
    handleWordClick(event) {
      const clickedWordElement = event.target.closest('.clickable-word');
      if (clickedWordElement) {
        const word = clickedWordElement.dataset.word.toLowerCase();
        const explanation = this.wordExplanations[word];
        const translation = this.wordTranslations[word];
        const example = this.wordExamples?.[word];

        if (explanation || translation || example) {
          this.selectedWord = word;
          this.explanationText = explanation || '';
          this.currentExample = example || '';
          this.showExplanation = true;
          this.showTranslation = false;
        }
      } else {
        this.closeExplanation();
      }
    },
    closeExplanation() {
      this.showExplanation = false;
      this.showTranslation = false;
      this.selectedWord = '';
      this.explanationText = '';
      this.currentExample = '';
    },
    showCloze(){
      this.showClozeTest = true;
    },
    closeCloze(){
      this.showClozeTest = false;
    },
    transPage(item) {
      this.$router.push(`${item}`);
    },
  },
};
</script>

<style scoped>
.clickable-word {
  cursor: pointer;
  border-bottom: 1px dotted #007bff;
  color: #007bff;
}

.clickable-word:hover {
  background-color: #f0f8ff;
}

.explanation-text p {
  margin-bottom: 1rem;
}
</style>