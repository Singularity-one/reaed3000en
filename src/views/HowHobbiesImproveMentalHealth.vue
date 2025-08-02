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
      name: 'HowHobbiesImproveMentalHealth',
      data() {
        return {
          audioSource: require('../mp3/47.How hobbies improve mental health.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Hobbies play a significant role in improving mental health by providing an outlet for stress and helping individuals relax. Engaging in activities that one enjoys, whether it’s painting, gardening, or playing a sport, can serve as a form of therapy, allowing the mind to focus on something positive and creative. Hobbies can reduce anxiety and depression by promoting a sense of accomplishment and boosting self-esteem. They also offer a break from daily routines, providing an opportunity to unwind and recharge. Additionally, hobbies can foster social connections when shared with others, further enhancing emotional well-being and reducing feelings of loneliness. Overall, dedicating time to hobbies nurtures mental health by promoting balance and relaxation.',
          wordExplanations: {
    hobbies: 'activities done for fun or relaxation in free time',
  significant: 'important or meaningful',
  mental: 'relating to the mind',
  health: 'the state of being physically or mentally well',
  improving: 'making better',
  outlet: 'a way to express feelings or energy',
  stress: 'mental or emotional pressure',
  individuals: 'people; single persons',
  relax: 'to rest and feel calm',
  engaging: 'taking part in something',
  activities: 'things people do for enjoyment or purpose',
  enjoys: 'likes doing',
  painting: 'making pictures with paint',
  gardening: 'growing and caring for plants',
  sport: 'a game or physical activity',
  therapy: 'treatment to improve mental or physical health',
  focus: 'to concentrate attention on something',
  positive: 'good or helpful',
  creative: 'using imagination to make new things',
  reduce: 'to make smaller or less',
  anxiety: 'a feeling of worry or nervousness',
  depression: 'a medical condition with deep sadness and low energy',
  promoting: 'helping something grow or happen',
  sense: 'a feeling or awareness',
  accomplishment: 'something you achieve or finish successfully',
  boosting: 'increasing or improving',
  routines: 'regular daily activities',
  opportunity: 'a good chance to do something',
  unwind: 'to relax after being busy or stressed',
  recharge: 'to gain back energy or strength',
  foster: 'to help something grow or develop',
  social: 'relating to being with other people',
  connections: 'relationships with other people',
  emotional: 'relating to feelings',
  loneliness: 'feeling alone or without friends',
  dedicating: 'giving time or effort to something',
  nurture: 'to take care of and help grow',
  balance: 'a state where different things exist in correct amounts',
  relaxation: 'the state of being free from stress'
    },
    wordTranslations: {
     hobbies: '興趣、嗜好',
  significant: '重要的',
  mental: '心理的',
  health: '健康',
  improving: '改善',
  outlet: '出口、抒發方式',
  stress: '壓力',
  individuals: '個人',
  relax: '放鬆',
  engaging: '參與',
  activities: '活動',
  enjoys: '喜歡',
  painting: '繪畫',
  gardening: '園藝',
  sport: '運動',
  therapy: '治療',
  focus: '專注',
  positive: '正面的',
  creative: '有創意的',
  reduce: '減少',
  anxiety: '焦慮',
  depression: '憂鬱',
  promoting: '促進',
  sense: '感覺',
  accomplishment: '成就',
  boosting: '提升',
  routines: '日常作息',
  opportunity: '機會',
  unwind: '放鬆',
  recharge: '充電、恢復精力',
  foster: '培養、促進',
  social: '社交的',
  connections: '連結',
  emotional: '情緒的',
  loneliness: '孤單',
  dedicating: '投入',
  nurture: '滋養、培養',
  balance: '平衡',
  relaxation: '放鬆'
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