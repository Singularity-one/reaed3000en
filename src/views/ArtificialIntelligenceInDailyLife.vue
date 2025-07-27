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
      name: 'ArtificialIntelligenceInDailyLife',
      data() {
        return {
          audioSource: require('../mp3/11.Artificial intelligence in daily life.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Artificial intelligence (AI) has become an integral part of daily life, influencing many aspects of society. AI powers virtual assistants like Siri and Alexa, helping people manage tasks more efficiently. In transportation, self-driving cars use AI to navigate roads safely. AI is also used in healthcare, aiding doctors in diagnosing diseases and recommending treatments. Online shopping platforms use AI to suggest products based on user preferences. Additionally, AI algorithms help improve social media feeds and enhance user experience. As AI continues to evolve, its presence in daily life will only grow, making tasks easier and more convenient.',
          wordExplanations: {
    artificial: 'made by humans rather than occurring naturally',
    intelligence: 'the ability to learn and understand things',
    integral: 'essential or necessary for completeness',
    daily: 'happening every day',
    life: 'the existence of an individual human or animal',
    influencing: 'having an effect on someone or something',
    aspects: 'different parts or features of something',
    society: 'a community of people living together',
    powers: 'provides energy or ability to operate',
    virtual: 'existing or simulated on a computer',
    assistants: 'helpers or people/software that assist',
    manage: 'to organize or control something',
    tasks: 'pieces of work to be done',
    efficiently: 'in a way that produces results without waste',
    transportation: 'the movement of people or goods',
    navigate: 'to find the way to a place',
    roads: 'paths or streets for vehicles',
    safely: 'without harm or danger',
    healthcare: 'the organized provision of medical care',
    aiding: 'helping or supporting',
    doctors: 'people licensed to practice medicine',
    diagnosing: 'identifying an illness or problem',
    diseases: 'illnesses or medical conditions',
    recommending: 'suggesting something as good or suitable',
    treatments: 'medical care given to a patient',
    online: 'connected to or available through the internet',
    shopping: 'the activity of buying goods',
    platforms: 'systems or services on which things operate',
    suggest: 'to put forward an idea or plan',
    products: 'items made for sale',
    user: 'a person who uses a service or device',
    preferences: 'choices or likes of a person',
    algorithms: 'sets of rules for solving problems',
    improve: 'to make something better',
    social: 'relating to society or relationships',
    media: 'communication channels like websites or apps',
    feeds: 'streams of updated content',
    enhance: 'to improve or increase in quality',
    experience: 'the knowledge gained from doing things',
    continues: 'goes on without stopping',
    evolve: 'to gradually develop or change',
    presence: 'the state of being present or existing',
    grow: 'to increase in size, amount, or degree',
    convenient: 'easy to use or do with little effort',
    },
    wordTranslations: {
      artificial: '人工的',
    intelligence: '智慧',
    integral: '不可或缺的',
    daily: '每天的',
    life: '生活',
    influencing: '影響',
    aspects: '方面',
    society: '社會',
    powers: '驅動',
    virtual: '虛擬的',
    assistants: '助手',
    manage: '管理',
    tasks: '任務',
    efficiently: '有效率地',
    transportation: '交通',
    navigate: '導航',
    roads: '道路',
    safely: '安全地',
    healthcare: '醫療保健',
    aiding: '協助',
    doctors: '醫生',
    diagnosing: '診斷',
    diseases: '疾病',
    recommending: '建議',
    treatments: '治療',
    online: '線上',
    shopping: '購物',
    platforms: '平台',
    suggest: '建議',
    products: '產品',
    user: '使用者',
    preferences: '偏好',
    algorithms: '演算法',
    improve: '改善',
    social: '社交的',
    media: '媒體',
    feeds: '動態消息',
    enhance: '提升',
    experience: '體驗',
    continues: '持續',
    evolve: '演變',
    presence: '存在',
    grow: '增長',
    convenient: '便利的',
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