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
      name: 'ShouldStudentsWearUniforms',
      data() {
        return {
          audioSource: require('../mp3/19.Should students wear uniforms.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'The question of whether students should wear uniforms has been debated for years. Supporters argue that uniforms promote equality, as they prevent students from being judged based on their clothing. Uniforms can also reduce distractions in the classroom and create a sense of school pride. On the other hand, critics believe that uniforms restrict students freedom of expression and individuality. They argue that allowing students to choose their clothing helps them develop their own identity. Ultimately, whether uniforms are necessary depends on the values and priorities of the school community and the educational system.',
          wordExplanations: {
       question: 'a topic that people discuss or consider.',
  students: 'people who go to school to learn.',
  wear: 'to have clothes on your body.',
  uniforms: 'special clothing worn by members of the same school or group.',
  debated: 'discussed by people who have different opinions.',
  years: 'a long time or periods of 12 months.',
  supporters: 'people who agree with an idea or opinion.',
  argue: 'to give reasons for or against something.',
  promote: 'to help something grow or be accepted.',
  equality: 'the state of being equal, especially in status or rights.',
  prevent: 'to stop something from happening.',
  judged: 'to be evaluated or criticized.',
  clothing: 'clothes in general.',
  reduce: 'to make less or smaller.',
  distractions: 'things that take attention away from what you are doing.',
  classroom: 'a room where students learn.',
  create: 'to make something new.',
  sense: 'a feeling or understanding.',
  critics: 'people who disagree or express negative opinions.',
  believe: 'to think something is true.',
  restrict: 'to limit or control.',
  individuality: 'the quality that makes a person different from others.',
  allowing: 'giving permission to do something.',
  choose: 'to pick something you want.',
  helps: 'makes something easier or better.',
  develop: 'to grow or improve.',
  identity: 'who someone is; their personality or character.',
  ultimately: 'in the end or finally.',
  necessary: 'needed or important.',
  values: 'ideas about what is important or right.',
  priorities: 'things that are more important than others.',
  educational: 'the way a country provides learning and teaching.',
    },
    wordTranslations: {
        question: '問題',
  students: '學生',
  wear: '穿著',
  uniforms: '制服',
  debated: '被討論',
  years: '多年',
  supporters: '支持者',
  argue: '主張',
  promote: '促進',
  equality: '平等',
  prevent: '防止',
  judged: '被評斷',
  clothing: '服裝',
  reduce: '減少',
  distractions: '分心的事物',
  classroom: '教室',
  create: '創造',
  sense: '感覺',
  critics: '批評者',
  believe: '相信',
  restrict: '限制',
  individuality: '個人特質',
  allowing: '允許',
  choose: '選擇',
  helps: '有助於',
  develop: '發展',
  identity: '身份',
  ultimately: '最終',
  necessary: '必要的',
  values: '價值觀',
  priorities: '優先事項',
  educational: '教育',
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