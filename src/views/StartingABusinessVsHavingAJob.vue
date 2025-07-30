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
      name: 'StartingABusinessVsHavingAJob',
      data() {
        return {
          audioSource: require('../mp3/22.Starting a business vs having a job.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Starting a business and having a job each offer distinct advantages and challenges. Owning a business provides the freedom to be your own boss and make decisions, but it comes with the risk of failure and financial uncertainty. Entrepreneurs often work long hours and face many responsibilities. In contrast, having a job offers financial stability, job security, and a clearer work-life balance. Employees can focus on their tasks without the pressure of managing a company. Ultimately, the choice between starting a business and having a job depends on personal goals, risk tolerance, and the desire for independence.',
          wordExplanations: {
     starting: 'The act of beginning or initiating something.',
  business: 'An organization or activity involved in commercial, industrial, or professional activities.',
  having: 'The act of possessing, experiencing, or holding something.',
  job: 'A paid position of regular employment.',
  offer: 'To provide or present something for acceptance or rejection.',
  distinct: 'Clearly different or separate in nature.',
  advantages: 'Favorable or beneficial qualities or circumstances.',
  challenges: 'Difficult situations that require effort to overcome.',
  owning: 'Having something as one’s own property.',
  provides: 'Gives or makes available something needed or wanted.',
  freedom: 'The ability to act, speak, or think without restraint.',
  boss: 'A person who is in charge of others at work.',
  decisions: 'Choices made after considering options.',
  risk: 'The possibility of loss, harm, or danger.',
  failure: 'Lack of success in doing or achieving something.',
  financial: 'Relating to money or how money is managed.',
  uncertainty: 'The state of being unsure or not knowing.',
  entrepreneurs: 'People who start and run their own businesses.',
  hours: 'Units of time equal to 60 minutes.',
  responsibilities: 'Duties or obligations to complete tasks.',
  contrast: 'A difference between things being compared.',
  stability: 'The state of being steady and not changing.',
  security: 'Freedom from danger or threat.',
  balance: 'A state where different things occur in equal or proper amounts.',
  employees: 'People who work for another person or company.',
  focus: 'To give attention or concentration to something.',
  tasks: 'Jobs or duties that need to be done.',
  pressure: 'Mental or emotional strain.',
  managing: 'The act of controlling or directing something.',
  company: 'A business or organization.',
  ultimately: 'In the end or finally.',
  choice: 'A decision between two or more options.',
  depends: 'Is determined or influenced by something else.',
  personal: 'Relating to an individual.',
  goals: 'Aims or desired outcomes.',
  tolerance: 'Willingness to accept or endure something.',
  desire: 'A strong feeling of wanting something.',
  independence: 'Freedom from control or influence by others.'
    },
    wordTranslations: {
     starting: '開始',
  business: '事業',
  having: '擁有',
  job: '工作',
  offer: '提供',
  distinct: '明顯不同的',
  advantages: '優勢',
  challenges: '挑戰',
  owning: '擁有',
  provides: '提供',
  freedom: '自由',
  boss: '老闆',
  decisions: '決定',
  risk: '風險',
  failure: '失敗',
  financial: '財務的',
  uncertainty: '不確定性',
  entrepreneurs: '創業者',
  hours: '小時',
  responsibilities: '責任',
  contrast: '對比',
  stability: '穩定',
  security: '安全',
  balance: '平衡',
  employees: '員工',
  focus: '專注',
  tasks: '任務',
  pressure: '壓力',
  managing: '管理',
  company: '公司',
  ultimately: '最終',
  choice: '選擇',
  depends: '取決於',
  personal: '個人的',
  goals: '目標',
  tolerance: '容忍度',
  desire: '渴望',
  independence: '獨立'
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