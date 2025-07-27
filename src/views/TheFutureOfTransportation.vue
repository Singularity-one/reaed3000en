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
      name: 'TheFutureOfTransportation',
      data() {
        return {
          audioSource: require('../mp3/15.The future of transportation.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'The future of transportation promises exciting advancements that could reshape how we travel. Electric vehicles (EVs) are expected to dominate the roads, reducing pollution and dependency on fossil fuels. Autonomous vehicles, or self-driving cars, may become commonplace, offering greater convenience and safety. Public transportation could also evolve, with high-speed trains and hyperloop systems making travel faster and more efficient. Furthermore, the development of flying cars and drones may revolutionize urban mobility. As technology continues to improve, transportation will become more sustainable, efficient, and accessible, transforming how people move around the world.',
          wordExplanations: {
      future: 'the time yet to come.',
  transportation: 'the movement of people or goods from one place to another.',
  promises: 'gives a sign or assurance that something will happen.',
  exciting: 'causing great enthusiasm and eagerness.',
  advancements: 'progress or developments.',
  reshape: 'to change the form or structure of something.',
  travel: 'to make a journey from one place to another.',
  EVs: 'abbreviation for electric vehicles.',
  expected: 'thought likely to happen.',
  dominate: 'to have control or power over something.',
  roads: 'paths or streets for vehicles to travel on.',
  reducing: 'making something smaller or less.',
  pollution: 'the presence of harmful substances in the environment.',
  dependency: 'reliance on something.',
  commonplace: 'frequently encountered or ordinary.',
  offering: 'providing or presenting.',
  convenience: 'the state of being easy or suitable to use.',
  safety: 'the condition of being protected from harm.',
  evolve: 'to develop gradually.',
  making: 'causing to happen.',
  faster: 'with greater speed.',
  efficient: 'working in a way that uses less time or resources.',
  furthermore: 'in addition; moreover.',
  development: 'the process of growth or progress.',
  drones: 'unmanned aerial vehicles controlled remotely or autonomously.',
  revolutionize: 'to completely change something in a dramatic way.',
  technology: 'the application of scientific knowledge for practical purposes.',
  continues: 'keeps going without stopping.',
  improve: 'to make or become better.',
  sustainable: 'able to be maintained without harming the environment.',
  accessible: 'easy to approach or use.',
  transforming: 'changing in a major way.',
  people: 'human beings.',
  world: 'the earth and all its inhabitants.',
    },
    wordTranslations: {
      future: '未來',
  transportation: '交通運輸',
  promises: '承諾',
  exciting: '令人興奮的',
  advancements: '進步',
  reshape: '重塑',
  travel: '旅行',
  EVs: '電動車的縮寫',
  expected: '預期的',
  dominate: '主導',
  roads: '道路',
  reducing: '減少',
  pollution: '污染',
  dependency: '依賴',
  commonplace: '普遍的',
  offering: '提供',
  convenience: '便利',
  safety: '安全',
  evolve: '演變',
  making: '使得',
  faster: '更快',
  efficient: '更有效率',
  furthermore: '此外',
  development: '發展',
  drones: '無人機',
  revolutionize: '徹底改變',
  technology: '科技',
  continues: '持續',
  improve: '改善',
  sustainable: '永續的',
  accessible: '可使用的',
  transforming: '轉變',
  people: '人們',
  world: '世界',
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