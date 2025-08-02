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
      name: 'TimeManagementAndSuccess',
      data() {
        return {
          audioSource: require('../mp3/50.Time management and success.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Time management is closely linked to success, as it allows individuals to prioritize tasks, set goals, and allocate resources efficiently. By managing time well, people can avoid procrastination, reduce stress, and ensure they stay on track with their responsibilities. Effective time management helps in balancing work, personal life, and leisure, creating a more organized and productive lifestyle. When tasks are completed on time, individuals feel a sense of accomplishment and confidence, which motivates them to tackle new challenges. Successful people often attribute their achievements to the ability to manage their time effectively, enabling them to focus on what matters most and achieve their goals.',
          wordExplanations: {
    time: 'measured period during which an action or condition exists',
  management: 'the act of organizing or controlling something',
  closely: 'in a way that is very near or connected',
  linked: 'connected or related',
  success: 'achieving a goal or desired result',
  allows: 'makes it possible for someone to do something',
  individuals: 'single people; persons',
  prioritize: 'to decide what is most important and do it first',
  tasks: 'pieces of work that need to be done',
  set: 'to decide or establish something',
  goals: 'desired results or achievements',
  allocate: 'to give or assign something to a purpose or person',
  resources: 'time, money, or materials that can be used',
  efficiently: 'in a way that uses time and resources well',
  managing: 'handling or controlling',
  avoid: 'to stay away from or prevent something',
  procrastination: 'delaying something that should be done',
  reduce: 'to make something smaller or less',
  stress: 'mental pressure or worry',
  ensure: 'to make sure something happens',
  responsibilities: 'things one is supposed to do or take care of',
  effective: 'working well and getting good results',
  balancing: 'keeping different parts equal or in harmony',
  personal: 'related to a person’s private life',
  leisure: 'free time for relaxing activities',
  organized: 'arranged in a clear, logical way',
  productive: 'producing good results',
  lifestyle: 'the way a person lives',
  accomplishment: 'something successfully done or achieved',
  confidence: 'belief in your ability to do something',
  motivates: 'gives a reason to act or try',
  tackle: 'to deal with a problem or task',
  challenges: 'difficult situations or problems',
  successful: 'having done well or achieved goals',
  attribute: 'to say that something is the cause of a result',
  achievements: 'things accomplished with effort or skill',
  ability: 'skill or power to do something',
  focus: 'to give attention to something',
  matters: 'things that are important',
  achieve: 'to reach or accomplish something'
    },
    wordTranslations: {
     time: '時間',
  management: '管理',
  closely: '密切地',
  linked: '連結的',
  success: '成功',
  allows: '允許',
  individuals: '個人',
  prioritize: '優先處理',
  tasks: '任務',
  set: '設定',
  goals: '目標',
  allocate: '分配',
  resources: '資源',
  efficiently: '有效率地',
  managing: '管理',
  avoid: '避免',
  procrastination: '拖延',
  reduce: '減少',
  stress: '壓力',
  ensure: '確保',
  responsibilities: '責任',
  effective: '有效的',
  balancing: '平衡',
  personal: '個人的',
  leisure: '休閒',
  organized: '有條理的',
  productive: '有生產力的',
  lifestyle: '生活方式',
  accomplishment: '成就',
  confidence: '自信',
  motivates: '激勵',
  tackle: '處理',
  challenges: '挑戰',
  successful: '成功的',
  attribute: '歸因於',
  achievements: '成就',
  ability: '能力',
  focus: '專注',
  matters: '重要的事',
  achieve: '達成'
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