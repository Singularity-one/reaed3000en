<template>
    <section class="section section-lg text-center text-md-start bg-default">
      <div class="container">
        <div class="box-range-content">
          <router-link @click="transPage('/ListTry50')" to="/about-us">back</router-link>
        </div>
        <p class="text-spacing-sm" @click="handleWordClick">
          <span v-for="(word, index) in words"
          :key="index"
          :class="{ 'clickable-word': word.explanation }"
          :data-word="word.text"
          >{{ word.text }} </span>
        </p>
        <div v-if="showExplanation" class="explanation-popup" :style="{ left: popupX + 'px', top: popupY + 'px' }">
          <p><strong>{{ selectedWord }}</strong>: {{ currentExplanation }}</p>
          <button class="button button-primary button-nina" @click="speakWord">發音</button>
          <br>
          <button class="button button-primary button-nina" @click="toggleTranslation">{{ showTranslation ? '顯示英文' : '顯示中文' }}</button>
          <br>
          <button class="button button-primary button-nina" @click="closeExplanation">關閉</button>
        </div>
    
        <div class="box-range-content">
          <div class="box-range-content">
                <button @click="playAudio">
                  <i class="box-project-meta-icon linearicons-play-circle"></i>
                </button>
                <audio ref="audioPlayer" :src="audioSource"></audio>
          </div>
        </div>
      </div>
    </section>
    </template>
    
      
      <script>
      export default {
      name: 'LifeInAVillage',
      data() {
        return {
          audioSource: require('../mp3/51.Life in a Village.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Life in a village is peaceful and close to nature. Unlike cities, where people rush through corridors of tall buildings, villages have open fields and fresh air. Many villagers rely on farming, growing crops like mushrooms and vegetables. In the past, ago, there were fewer modern facilities, but now technology is changing villages. People use computers for business and education. Although life here is simpler, it brings joy and connection. Certainly, a village offers a unique way of living, balancing tradition with existing advancements.',
          wordExplanations: {
life: 'the experience of being alive',
  village: 'a small community in the countryside',
  peaceful: 'calm and quiet',
  close: 'near to something',
  nature: 'the natural world like plants, animals, and land',
  unlike: 'different from',
  cities: 'large towns with many buildings and people',
  rush: 'to move quickly',
  corridors: 'long passages or paths',
  tall: 'high in height',
  buildings: 'structures like houses or offices',
  open: 'not closed or crowded',
  fields: 'large areas of land',
  fresh: 'clean and new',
  air: 'the invisible gas we breathe',
  villagers: 'people living in a village',
  rely: 'to depend on',
  farming: 'growing crops and raising animals',
  crops: 'plants grown for food',
  mushrooms: 'a type of fungus eaten as food',
  vegetables: 'plants eaten as food',
  past: 'time before now',
  fewer: 'not as many',
  modern: 'relating to recent times',
  facilities: 'buildings or equipment for a purpose',
  technology: 'tools and machines made using science',
  changing: 'making different',
  computers: 'machines used for work or study',
  business: 'work to buy and sell things',
  education: 'learning or teaching',
  simpler: 'easier or less complicated',
  joy: 'great happiness',
  connection: 'a relationship or bond',
  certainly: 'definitely',
  offers: 'gives or provides',
  unique: 'one of a kind',
  way: 'method or style',
  living: 'the manner of life',
  balancing: 'keeping things equal or fair',
  tradition: 'customs and beliefs from the past',
  existing: 'currently present',
  advancements: 'improvements or progress'
    },
    wordTranslations: {
 life: '生活',
  village: '村莊',
  peaceful: '和平的',
  close: '靠近',
  nature: '自然',
  unlike: '不像',
  cities: '城市',
  rush: '匆忙',
  corridors: '走廊',
  tall: '高的',
  buildings: '建築物',
  open: '開放的',
  fields: '田野',
  fresh: '新鮮的',
  air: '空氣',
  villagers: '村民',
  rely: '依賴',
  farming: '農耕',
  crops: '作物',
  mushrooms: '蘑菇',
  vegetables: '蔬菜',
  past: '過去',
  fewer: '較少的',
  modern: '現代的',
  facilities: '設施',
  technology: '科技',
  changing: '改變',
  computers: '電腦',
  business: '商業',
  education: '教育',
  simpler: '更簡單的',
  joy: '快樂',
  connection: '連結',
  certainly: '當然',
  offers: '提供',
  unique: '獨特的',
  way: '方式',
  living: '生活',
  balancing: '平衡',
  tradition: '傳統',
  existing: '現有的',
  advancements: '進步'
    },
          showExplanation: false,
          showTranslation: false, // 新增：控制是否顯示中文翻譯
          selectedWord: '',
          explanationText: '',
          popupX: 0,
          popupY: 0,
        };
      },
      computed: {
        words() {
          return this.dataText.split(/(\s+)/).map(word => {
            const cleanedWord = word.replace(/[.,!?();:"“”]/g, '').toLowerCase();
            return {
                text: word,
                explanation: this.wordExplanations[cleanedWord],
                translation: this.wordTranslations[cleanedWord],
            };
        });
        },
        currentExplanation() {
          if (this.showTranslation && this.wordTranslations[this.selectedWord.toLowerCase()]) {
            return this.wordTranslations[this.selectedWord.toLowerCase()];
          }
          return this.explanationText;
        },
      },
      methods: {
        handleWordClick(event) {
          const clickedWordElement = event.target;
          if (clickedWordElement.classList.contains('clickable-word')) {
            const word = clickedWordElement.dataset.word;
            const explanation = this.wordExplanations[word.toLowerCase()];
            const translation = this.wordTranslations[word.toLowerCase()];
            if (explanation || translation) {
              this.selectedWord = word;
              this.explanationText = explanation || '';
              this.showExplanation = true;
              this.showTranslation = false;
              this.popupX = event.clientX;
              this.popupY = event.clientY + 20;
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
        speakWord() { // 新增：發音單字的方法
          if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(this.selectedWord);
            const setGoogleVoice = () => {
            const voices = synth.getVoices();
            const googleVoice = voices.find(voice => voice.name.includes('Google') && voice.lang.startsWith('en'));
            if (googleVoice) {
              utterance.voice = googleVoice;
            } else {
              const defaultEnglishVoice = voices.find(voice => voice.lang.startsWith('en'));
              if (defaultEnglishVoice) {
                utterance.voice = defaultEnglishVoice;
              }
            }
            speechSynthesis.speak(utterance);
          };
            if (synth.getVoices().length > 0) {
              setGoogleVoice();
              synth.onvoiceschanged = () => {
                setGoogleVoice();
                synth.onvoiceschanged = null; // 移除事件監聽器
              };
            }
          } else {
            alert('您的瀏覽器不支持語音合成功能。');
          }
        },
        playAudio() {
          if (this.$refs.audioPlayer) {
            this.$refs.audioPlayer.play();
          }
        },
        transPage(item) {
          this.$router.push(`${item}`);
        },
      }
    };
      </script>
      
      <style scoped>
    .clickable-word {
      cursor: pointer;
      border-bottom: 1px dotted #007bff; /* 添加虛線下劃線以示可點擊 */
      color: #007bff;
    }
    
    .clickable-word:hover {
      background-color: #f0f8ff;
    }
    
    .explanation-popup {
      position: fixed;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 10;
    }
    
    .explanation-popup button {
      margin-top: 5px;
      padding: 5px 10px;
      cursor: pointer;
    }
      </style>