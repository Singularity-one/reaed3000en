<template>
  <section class="section section-lg text-center text-md-start bg-default">
    <div class="container">
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
        <AudioPlayer audioSource="1.Climate change and its impact" />
      </div>

      <div v-if="showExplanation" class="explanation-text">
        <div style="display: flex; gap: 5px; align-items: center;">
          <p>
            <strong>{{ selectedWord }}</strong>
            <em>({{ wordPartsOfSpeech[selectedWord] }})</em>
          </p>
          <button @click="speakWord" style="padding: 5px;">
            <i class="box-project-meta-icon linearicons-volume-medium"></i>
          </button>
          <button @click="toggleTranslation" style="padding: 5px;">
            <i class="box-project-meta-icon linearicons-eye"></i>
          </button>
          <button @click="closeExplanation" style="padding: 5px;">
            <i class="box-project-meta-icon linearicons-power-switch"></i>
          </button>
        </div>
        <p class="small-paragraph">{{ currentExplanation }}</p>
        <p v-if="currentExample" class="small-paragraph">
          <strong>example：</strong>{{ currentExample }}
        </p>
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

export default {
  name: 'ClimateChangeAndItsImpact',
  components: { ClozeTest,AudioPlayer },
  data() {
    return {
      dataText:
        'Climate change is a serious problem affecting the world. Rising temperatures cause extreme weather, such as storms, droughts, and floods. Ice in the polar regions is melting, leading to higher sea levels that threaten coastal areas. Many animals lose their homes as forests disappear. People also face health risks due to heat and poor air quality. To reduce climate change, countries must cut pollution and use clean energy. Individuals can help by saving electricity and planting trees. If action is not taken soon, future generations will suffer. What do you think is the most effective way to fight climate change?',
      showExplanation: false,
      showTranslation: false,
      selectedWord: '',
      explanationText: '',
      currentExample: '',
      wordExplanations: {},
      wordTranslations: {},
      wordExamples: {},
      wordPartsOfSpeech: {},
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
        const response = await fetch('/default.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        excelStore.setExcelData(Object.keys(jsonData[0]), jsonData);
      } catch (error) {
        console.error('載入預設 Excel 失敗:', error);
      }
    }

    this.wordExplanations = excelStore.wordExplanations;
    this.wordTranslations = excelStore.wordTranslations;
    this.wordExamples = excelStore.wordExamples;
    this.wordPartsOfSpeech = excelStore.wordPartsOfSpeech;
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
    toggleTranslation() {
      this.showTranslation = !this.showTranslation;
    },
    speakWord() {
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(this.selectedWord);
        synth.speak(utterance);
      } else {
        alert('您的瀏覽器不支持語音合成功能。');
      }
    },
    showCloze(){
      this.showClozeTest = true;
    },
    closeCloze(){
      this.showClozeTest = false;
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
