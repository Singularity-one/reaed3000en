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
      name: 'HowRobotsAreChangingIndustries',
      data() {
        return {
          audioSource: require('../mp3/42.How robots are changing industries.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Robots are transforming industries by increasing efficiency, reducing costs, and improving safety. In manufacturing, robots are used to automate repetitive tasks such as assembly, welding, and packaging, allowing companies to produce goods more quickly and with fewer errors. In the healthcare industry, robots assist in surgery, offering precision and minimizing the risk of human error. They also help in caring for the elderly and disabled by performing tasks like lifting and providing companionship. In agriculture, robots are used for planting, harvesting, and monitoring crops, improving productivity and reducing labor costs. Additionally, robots are being employed in logistics, retail, and even in service sectors like cleaning and customer support. As robots continue to evolve, they will likely take on even more complex tasks, further revolutionizing industries and creating new opportunities for innovation and job creation in areas such as robotics programming and maintenance.',
          wordExplanations: {
     robots: 'machines that can carry out tasks automatically',
  transforming: 'changing completely in form or appearance',
  industries: 'branches of economic activity such as manufacturing or services',
  increasing: 'making greater in number, amount, or degree',
  efficiency: 'doing tasks with minimum waste of time and effort',
  reducing: 'making something less in size, amount, or degree',
  costs: 'amounts of money needed to buy or do something',
  improving: 'making something better',
  safety: 'condition of being protected from danger or harm',
  manufacturing: 'the process of making goods in large quantities',
  automate: 'to use machines or computers to do work',
  repetitive: 'happening again and again',
  tasks: 'pieces of work to be done',
  assembly: 'putting parts together to make a product',
  welding: 'joining metal parts using heat',
  packaging: 'putting products into containers for sale or transport',
  allowing: 'giving permission or opportunity',
  goods: 'items that are made or grown to be sold',
  quickly: 'with speed',
  accurately: 'without mistakes or errors',
  healthcare: 'the organized provision of medical care',
  assist: 'to help',
  surgery: 'medical operation to fix or remove something in the body',
  precision: 'exactness or accuracy',
  reduce: 'to make less',
  human: 'relating to people',
  error: 'a mistake',
  care: 'to look after someone',
  elderly: 'old people',
  disabled: 'people with physical or mental limitations',
  performing: 'doing an action or task',
  lifting: 'raising something up',
  companionship: 'friendship or being with someone',
  agriculture: 'farming',
  planting: 'putting seeds or plants in the ground',
  harvesting: 'gathering crops when they are ready',
  monitoring: 'checking or watching over something',
  crops: 'plants grown for food',
  productivity: 'rate of producing goods or services',
  labor: 'work done by people',
  logistics: 'the management of how things are moved and stored',
  retail: 'selling goods directly to customers',
  services: 'actions or work done to help others',
  cleaning: 'removing dirt',
  customer: 'a person who buys goods or services',
  support: 'help or assistance',
  evolve: 'to gradually develop or change',
  roles: 'functions or jobs',
  driving: 'causing or pushing forward',
  innovation: 'new ideas, methods, or inventions',
  creating: 'bringing something into existence',
  jobs: 'work people do to earn money',
  programming: 'writing instructions for computers or robots',
  maintenance: 'keeping something in good condition'
    },
    wordTranslations: {
     robots: '機器人',
  transforming: '改變',
  industries: '產業',
  increasing: '增加',
  efficiency: '效率',
  reducing: '減少',
  costs: '成本',
  improving: '改善',
  safety: '安全',
  manufacturing: '製造業',
  automate: '自動化',
  repetitive: '重複的',
  tasks: '任務',
  assembly: '組裝',
  welding: '焊接',
  packaging: '包裝',
  allowing: '允許',
  goods: '商品',
  quickly: '快速地',
  accurately: '準確地',
  healthcare: '醫療保健',
  assist: '協助',
  surgery: '外科手術',
  precision: '精確',
  reduce: '減少',
  human: '人類的',
  error: '錯誤',
  care: '照顧',
  elderly: '年長的',
  disabled: '身心障礙的',
  performing: '執行',
  lifting: '舉起',
  companionship: '陪伴',
  agriculture: '農業',
  planting: '種植',
  harvesting: '收割',
  monitoring: '監控',
  crops: '農作物',
  productivity: '生產力',
  labor: '勞力',
  logistics: '物流',
  retail: '零售',
  services: '服務',
  cleaning: '清潔',
  customer: '顧客',
  support: '支援',
  evolve: '演化',
  roles: '角色',
  driving: '推動',
  innovation: '創新',
  creating: '創造',
  jobs: '工作',
  programming: '程式設計',
  maintenance: '維護'
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