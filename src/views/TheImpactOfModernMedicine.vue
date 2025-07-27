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
      name: 'WaterConservation',
      data() {
        return {
          audioSource: require('../mp3/10.The impact of modern medicine.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Modern medicine has had a profound impact on improving health and increasing life expectancy. Advances in medical technology, such as diagnostic tools and treatments, have revolutionized healthcare. Diseases that once claimed many lives, like cancer and heart disease, are now more treatable, leading to better outcomes for patients. Vaccines have significantly reduced the spread of infectious diseases, while antibiotics have saved millions of lives. Additionally, medical research continues to develop new therapies, offering hope for conditions that were previously untreatable. Overall, modern medicine has greatly enhanced quality of life and has become a cornerstone of public health.',
          wordExplanations: {
modern: 'relating to the present or recent times',
    medicine: 'the science or practice of diagnosing, treating, and preventing disease',
    profound: 'very great or intense',
    impact: 'a strong effect or influence',
    improving: 'making something better',
    health: 'the state of being free from illness or injury',
    increasing: 'growing or becoming greater in size or amount',
    life: 'the condition that distinguishes living things',
    expectancy: 'the expected length of time something will last',
    advances: 'progress or development in a field',
    medical: 'relating to the science of medicine',
    technology: 'the use of scientific knowledge for practical purposes',
    diagnostic: 'used to identify a disease or condition',
    tools: 'devices or instruments used to carry out a function',
    treatments: 'methods used to cure or manage illness',
    revolutionized: 'completely changed for the better',
    healthcare: 'the organized provision of medical care',
    diseases: 'illnesses or conditions that affect the body',
    claimed: 'caused the death of someone',
    cancer: 'a serious disease caused by uncontrolled cell growth',
    heart: 'the organ that pumps blood through the body',
    treatable: 'able to be cured or managed',
    outcomes: 'results or consequences',
    patients: 'people receiving medical treatment',
    vaccines: 'substances used to stimulate immunity to diseases',
    spread: 'to expand or move to a larger area',
    infectious: 'able to be transmitted from person to person',
    antibiotics: 'drugs used to treat bacterial infections',
    research: 'systematic investigation to discover facts',
    develop: 'to create or improve something over time',
    therapies: 'treatments intended to relieve or heal disorders',
    hope: 'a feeling of expectation for something positive',
    conditions: 'states of health, especially diseases or disorders',
    untreatable: 'not able to be cured or improved',
    enhanced: 'improved or increased',
    quality: 'the standard of something as measured',
    cornerstone: 'a basic element or foundation',
    public: 'relating to all people in a community',
    },
    wordTranslations: {
modern: '現代的',
    medicine: '醫學',
    profound: '深遠的',
    impact: '影響',
    improving: '改善',
    health: '健康',
    increasing: '增加',
    life: '生命',
    expectancy: '預期壽命',
    advances: '進步',
    medical: '醫療的',
    technology: '科技',
    diagnostic: '診斷的',
    tools: '工具',
    treatments: '治療',
    revolutionized: '徹底改革',
    healthcare: '醫療保健',
    diseases: '疾病',
    claimed: '奪走（生命）',
    cancer: '癌症',
    heart: '心臟',
    treatable: '可治療的',
    outcomes: '結果',
    patients: '病人',
    vaccines: '疫苗',
    spread: '傳播',
    infectious: '傳染的',
    antibiotics: '抗生素',
    research: '研究',
    develop: '發展',
    therapies: '療法',
    hope: '希望',
    conditions: '病情',
    untreatable: '無法治療的',
    enhanced: '提升的',
    quality: '品質',
    cornerstone: '基礎',
    public: '公共的',
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