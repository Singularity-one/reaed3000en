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
      name: 'TheImportanceOfLearningForeignLanguages',
      data() {
        return {
          audioSource: require('../mp3/18.The importance of learning foreign languages.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Learning foreign languages is important for both personal and professional growth. It allows individuals to communicate with people from different cultures, fostering greater understanding and empathy. In the workplace, being bilingual or multilingual can open up job opportunities and improve career prospects. Furthermore, learning a new language enhances cognitive skills, such as memory and problem-solving. It can also boost self-confidence and encourage a lifelong love of learning. As the world becomes more interconnected, the ability to speak multiple languages is an essential skill that can enrich one’s life and help bridge cultural divides.',
          wordExplanations: {
  learning: 'the process of gaining knowledge or skills.',
  foreign: 'from another country.',
  languages: 'systems of communication used by people.',
  important: 'having great value or significance.',
  personal: 'relating to an individual.',
  professional: 'related to a job or career.',
  growth: 'development or improvement.',
  allows: 'makes it possible for someone to do something.',
  individuals: 'single persons or human beings.',
  communicate: 'to share information with others.',
  cultures: 'the customs and beliefs of different groups of people.',
  fostering: 'helping something develop or grow.',
  understanding: 'the ability to comprehend something.',
  empathy: 'the ability to understand and share others’ feelings.',
  workplace: 'a place where people do their jobs.',
  bilingual: 'able to speak two languages.',
  multilingual: 'able to speak more than two languages.',
  improve: 'to make better.',
  furthermore: 'in addition; also.',
  enhances: 'improves or increases.',
  cognitive: 'related to thinking and understanding.',
  skills: 'abilities or talents.',
  memory: 'the ability to remember things.',
  boost: 'to increase or improve.',
  encourage: 'to give support or motivation.',
  lifelong: 'lasting for your whole life.',
  world: 'the Earth and all its people.',
  interconnected: 'connected to each other.',
  ability: 'the power or skill to do something.',
  speak: 'to talk using a language.',
  multiple: 'more than one.',
  essential: 'very important or necessary.',
  skill: 'an ability to do something well.',
  enrich: 'to make better or more meaningful.',
  bridge: 'to connect or reduce the gap between things.',
  cultural: 'related to culture.',
  divides: 'differences or separations.',
    },
    wordTranslations: {
       learning: '學習',
  foreign: '外國的',
  languages: '語言',
  important: '重要的',
  personal: '個人的',
  professional: '職業的',
  growth: '成長',
  allows: '允許',
  individuals: '個人',
  communicate: '溝通',
  cultures: '文化',
  fostering: '促進',
  understanding: '理解',
  empathy: '同理心',
  workplace: '職場',
  bilingual: '雙語的',
  multilingual: '多語的',
  improve: '改善',
  furthermore: '此外',
  enhances: '提升',
  cognitive: '認知的',
  skills: '技能',
  memory: '記憶力',
  boost: '提升',
  encourage: '鼓勵',
  lifelong: '終身的',
  world: '世界',
  interconnected: '相互連結的',
  ability: '能力',
  speak: '說',
  multiple: '多個的',
  essential: '必要的',
  skill: '技能',
  enrich: '充實',
  bridge: '彌合',
  cultural: '文化的',
  divides: '隔閡',
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