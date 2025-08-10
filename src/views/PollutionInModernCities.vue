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
          <AudioPlayer audioSource="2.Pollution in modern cities.mp3" />
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
  name: 'PollutionInModernCities',
  components: { ClozeTest,AudioPlayer,WordExplanation },
  data() {
    return {
      dataText: 'Many cities face serious pollution problems due to traffic, industry, and waste. Smoke from cars and factories makes the air unhealthy, causing breathing issues. Rubbish in streets and rivers leads to dirty water and harms wildlife. Noise from vehicles and construction also affects people’s well-being. To improve the situation, public transport should be better, and recycling must increase. Green spaces can help clean the air and make cities more pleasant. Governments and individuals need to work together to reduce pollution. If people act now, cities will become healthier and safer for future generations. What solutions do you suggest?',
      showExplanation: false,
      showTranslation: false,
      wordExplanations: {},
      wordTranslations: {},
      wordExamples: {},
      wordPartsOfSpeech: {},
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
            const response = await fetch('excel/default.xlsx');
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
        },
        toggleTranslation() {
          this.showTranslation = !this.showTranslation;
        },
        transPage(item) {
          this.$router.push(`${item}`);
        },
        showCloze(){
          this.showClozeTest = true;
        },
        closeCloze(){
          this.showClozeTest = false;
        },
      }
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