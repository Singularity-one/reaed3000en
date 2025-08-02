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
      name: 'TheImportanceOfSelfDiscipline',
      data() {
        return {
          audioSource: require('../mp3/46.The importance of self-discipline.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Self-discipline is essential for achieving personal and professional goals. It allows individuals to stay focused, resist distractions, and maintain consistent effort even when faced with challenges. With self-discipline, people are better able to manage their time, make healthier choices, and stay motivated. It helps in developing good habits, such as exercising regularly, studying, and prioritizing tasks, which contribute to long-term success. Self-discipline also plays a key role in managing emotions and staying calm under pressure. By practicing self-discipline, individuals build resilience and the ability to overcome obstacles, which ultimately leads to personal growth and accomplishment.',
          wordExplanations: {
  essential: 'very important or necessary',
  achieving: 'reaching a goal or success',
  personal: 'relating to yourself or an individual',
  professional: 'related to work or career',
  goals: 'things you want to achieve',
  allows: 'makes it possible',
  individuals: 'single people; not a group',
  focused: 'concentrating on one thing',
  resist: 'to fight against or avoid',
  distractions: 'things that take your attention away',
  maintain: 'to keep something going',
  consistent: 'doing the same thing regularly',
  effort: 'the energy you use to do something',
  challenges: 'difficult situations',
  manage: 'to control or handle',
  time: 'measured hours or minutes',
  healthier: 'better for your body or mind',
  choices: 'decisions you make',
  motivated: 'having the desire to do something',
  developing: 'growing or improving',
  habits: 'regular actions or behaviors',
  exercising: 'doing physical activity to stay healthy',
  regularly: 'happening often or in a routine',
  studying: 'learning or reviewing information',
  prioritizing: 'deciding what is most important',
  tasks: 'things that need to be done',
  contribute: 'to help cause something',
  success: 'reaching a goal or getting what you want',
  emotions: 'feelings like happiness, sadness, anger, etc.',
  pressure: 'stress or a feeling of urgency',
  practicing: 'doing something repeatedly to improve',
  build: 'to create or grow',
  resilience: 'the ability to recover from difficulty',
  overcome: 'to succeed against a problem',
  obstacles: 'things that block your way or make things harder',
  ultimately: 'in the end; eventually',
  growth: 'development or improvement',
  accomplishment: 'something you succeed in doing'
    },
    wordTranslations: {
  essential: '必要的',
  achieving: '達成',
  personal: '個人的',
  professional: '職業的',
  goals: '目標',
  allows: '允許',
  individuals: '個人',
  focused: '專注的',
  resist: '抵抗',
  distractions: '分心的事物',
  maintain: '維持',
  consistent: '一致的；持續的',
  effort: '努力',
  challenges: '挑戰',
  manage: '管理',
  time: '時間',
  healthier: '更健康的',
  choices: '選擇',
  motivated: '有動力的',
  developing: '培養',
  habits: '習慣',
  exercising: '運動',
  regularly: '定期地',
  studying: '學習',
  prioritizing: '優先處理',
  tasks: '任務',
  contribute: '貢獻',
  success: '成功',
  emotions: '情緒',
  pressure: '壓力',
  practicing: '實踐',
  build: '建立',
  resilience: '復原力',
  overcome: '克服',
  obstacles: '障礙',
  ultimately: '最終',
  growth: '成長',
  accomplishment: '成就'
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