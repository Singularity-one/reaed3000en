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
      name: 'TheBenefitsOfSpaceTechnology',
      data() {
        return {
          audioSource: require('../mp3/44.The benefits of space technology.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Space technology has brought numerous benefits to life on Earth, far beyond the exploration of outer space. Satellites, which were first developed for space exploration, are now used for communication, weather forecasting, and navigation. They enable global communication, support GPS systems, and help predict natural disasters, saving lives and property. Space technology has also led to advancements in medicine, such as improved imaging techniques and the development of materials used in medical devices. Additionally, innovations from space missions have led to new technologies in areas like energy, materials science, and agriculture. By pushing the boundaries of what is possible, space technology continues to improve quality of life on Earth while advancing our understanding of the universe.',
          wordExplanations: {
     space: 'the area beyond Earth’s atmosphere',
  technology: 'the use of science to create tools and systems',
  benefits: 'good effects or advantages',
  Earth: 'the planet we live on',
  exploration: 'the act of discovering new places or ideas',
  satellites: 'objects sent into space to orbit the Earth',
  developed: 'made or created over time',
  communication: 'sending or receiving information',
  weather: 'the state of the atmosphere (e.g., rain, sun)',
  forecasting: 'predicting future conditions',
  navigation: 'finding the way to a place',
  global: 'worldwide',
  GPS: 'Global Positioning System, used for location tracking',
  natural: 'from nature, not man-made',
  disasters: 'events causing great damage (e.g., floods, earthquakes)',
  saving: 'preventing harm or loss',
  lives: 'the existence of people',
  property: 'things people own',
  medicine: 'the science of treating illness',
  imaging: 'creating pictures of the inside of the body',
  techniques: 'ways of doing something',
  development: 'the process of creating something new',
  materials: 'substances used to make things',
  devices: 'machines or tools with a function',
  innovations: 'new ideas or inventions',
  missions: 'important tasks or journeys',
  energy: 'power used to do work',
  science: 'the study of the natural world',
  agriculture: 'farming and growing food',
  pushing: 'forcing or advancing forward',
  boundaries: 'limits or edges',
  possible: 'able to be done',
  improve: 'to make better',
  quality: 'how good something is',
  understanding: 'knowing how something works',
  universe: 'everything that exists in space'
    },
    wordTranslations: {
      space: '太空',
  technology: '科技',
  benefits: '好處',
  Earth: '地球',
  exploration: '探索',
  satellites: '衛星',
  developed: '發展的',
  communication: '通信',
  weather: '天氣',
  forecasting: '預測',
  navigation: '導航',
  global: '全球的',
  GPS: '全球定位系統',
  natural: '自然的',
  disasters: '災難',
  saving: '拯救',
  lives: '生命',
  property: '財產',
  medicine: '醫學',
  imaging: '成像',
  techniques: '技術',
  development: '發展',
  materials: '材料',
  devices: '裝置',
  innovations: '創新',
  missions: '任務',
  energy: '能源',
  science: '科學',
  agriculture: '農業',
  pushing: '推動',
  boundaries: '界限',
  possible: '可能的',
  improve: '改善',
  quality: '品質',
  understanding: '理解',
  universe: '宇宙'
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