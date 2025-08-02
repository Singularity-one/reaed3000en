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
      name: 'ThePowerOfObservation',
      data() {
        return {
          audioSource: require('../mp3/52.The Power of Observation.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Good observation skills help us understand the world. Scientists observe the sky to study the moon and space. Writers observe people to create stories. Even in daily life, careful observation helps us make better decisions. A child may suppose a toy is missing, but looking carefully often reveals it nearby. Whether studying nature, solving problems, or learning, keen observation is a valuable skill.',
          wordExplanations: {
good: 'of high quality or ability',
  observation: 'the act of watching or noticing carefully',
  skills: 'abilities to do something well',
  help: 'to make it easier or possible to do something',
  understand: 'to know the meaning or importance of something',
  world: 'the Earth and everything on it',
  scientists: 'people who study nature and facts using experiments',
  observe: 'to watch carefully',
  sky: 'the space above the Earth',
  study: 'to learn about something',
  moon: 'the natural satellite that orbits the Earth',
  space: 'the area beyond the Earth’s atmosphere',
  writers: 'people who write stories or books',
  people: 'humans',
  create: 'to make something new',
  stories: 'tales or accounts of events',
  daily: 'happening every day',
  life: 'the experience of being alive',
  careful: 'showing attention to detail',
  decisions: 'choices made after thinking',
  child: 'a young person',
  suppose: 'to think something is true without proof',
  toy: 'an object children play with',
  missing: 'not found where it should be',
  looking: 'using your eyes to see',
  closely: 'with great attention',
  reveals: 'shows something that was hidden',
  nearby: 'close to where you are',
  studying: 'learning about something',
  nature: 'plants, animals, and the natural world',
  solving: 'finding answers to problems',
  problems: 'difficult situations',
  learning: 'gaining knowledge or skills',
  keen: 'very good or sharp',
  valuable: 'important and useful'
    },
    wordTranslations: {
good: '好的',
  observation: '觀察',
  skills: '技能',
  help: '幫助',
  understand: '理解',
  world: '世界',
  scientists: '科學家',
  observe: '觀察',
  sky: '天空',
  study: '學習',
  moon: '月亮',
  space: '太空',
  writers: '作家',
  people: '人們',
  create: '創造',
  stories: '故事',
  daily: '每日的',
  life: '生活',
  careful: '小心的',
  decisions: '決定',
  child: '小孩',
  suppose: '假設',
  toy: '玩具',
  missing: '不見的',
  looking: '看',
  closely: '仔細地',
  reveals: '顯示',
  nearby: '附近',
  studying: '學習',
  nature: '自然',
  solving: '解決',
  problems: '問題',
  learning: '學習',
  keen: '敏銳的',
  valuable: '有價值的'
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