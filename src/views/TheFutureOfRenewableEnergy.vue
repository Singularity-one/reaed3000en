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
      name: 'TheFutureOfRenewableEnergy',
      data() {
        return {
          audioSource: require('../mp3/41.The future of renewable energy.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'The future of renewable energy looks promising as the world increasingly turns to cleaner sources of power to combat climate change and reduce dependence on fossil fuels. Advances in technology are making renewable energy, such as solar, wind, and hydroelectric power, more efficient and affordable. Governments, businesses, and individuals are investing in renewable energy infrastructure, which is helping to reduce carbon emissions and transition to sustainable energy systems. As the demand for clean energy grows, innovations in energy storage, smart grids, and green technologies will play a key role in ensuring that renewable energy can meet global needs. The future also holds the potential for new energy sources, such as tidal and geothermal power, further expanding the range of clean energy options. With continued progress and commitment, renewable energy will likely become the primary source of power for future generations.',
          wordExplanations: {
       future: 'the time yet to come',
  renewable: 'able to be replenished naturally',
  energy: 'power used to do work or produce heat',
  looks: 'appears or seems',
  promising: 'showing signs of success or good results',
  world: 'the earth and all people on it',
  increasingly: 'more and more over time',
  turns: 'changes direction or focus',
  cleaner: 'less polluting or harmful',
  sources: 'origins or providers of something',
  power: 'energy used to operate machines or devices',
  combat: 'to fight against',
  climate: 'the usual weather conditions in an area',
  change: 'a shift or difference from one state to another',
  reduce: 'to make smaller or less',
  dependence: 'reliance on something or someone',
  fossil: 'related to remains of ancient life',
  fuels: 'substances burned for energy',
  advances: 'progress or improvements',
  technology: 'tools, machines, or systems developed through science',
  making: 'producing or causing',
  solar: 'related to the sun',
  wind: 'moving air',
  hydroelectric: 'related to electricity from water power',
  efficient: 'producing good results without waste',
  affordable: 'not too expensive',
  governments: 'official ruling organizations',
  businesses: 'companies that sell goods or services',
  individuals: 'single persons',
  investing: 'putting money or resources into something for benefit',
  infrastructure: 'basic systems and services like roads or power',
  helping: 'assisting or aiding',
  carbon: 'a chemical element found in fuels',
  emissions: 'release of substances like gas into the air',
  transition: 'a change from one state to another',
  sustainable: 'able to be maintained over time',
  systems: 'organized sets of parts working together',
  demand: 'need or desire for something',
  clean: 'not dirty or polluted',
  grows: 'increases or becomes larger',
  innovations: 'new ideas or inventions',
  storage: 'keeping something for later use',
  smart: 'intelligent or advanced',
  grids: 'networks for distributing electricity',
  green: 'environmentally friendly',
  technologies: 'advanced machines or methods',
  play: 'to take part in something',
  key: 'very important',
  role: 'a function or position',
  meeting: 'fulfilling or satisfying',
  global: 'worldwide',
  needs: 'things required or desired',
  holds: 'contains or has',
  potential: 'possibility or ability for success',
  new: 'not existing before',
  tidal: 'related to the tides of the ocean',
  geothermal: 'related to heat from the earth',
  expanding: 'making larger or more inclusive',
  range: 'variety or scope',
  options: 'choices',
  continued: 'ongoing or not stopping',
  progress: 'forward movement or development',
  commitment: 'dedication to a cause or activity',
  likely: 'probably going to happen',
  become: 'to turn into',
  primary: 'main or most important',
  source: 'origin or supplier',
  generations: 'groups of people born in the same period'
    },
    wordTranslations: {
      future: '未來',
  renewable: '可再生的',
  energy: '能源',
  looks: '看起來',
  promising: '有前途的',
  world: '世界',
  increasingly: '越來越多地',
  turns: '轉向',
  cleaner: '更清潔的',
  sources: '來源',
  power: '力量；電力',
  combat: '對抗',
  climate: '氣候',
  change: '變化',
  reduce: '減少',
  dependence: '依賴',
  fossil: '化石的',
  fuels: '燃料',
  advances: '進步',
  technology: '科技',
  making: '製作',
  solar: '太陽能的',
  wind: '風',
  hydroelectric: '水力發電的',
  efficient: '高效率的',
  affordable: '可負擔的',
  governments: '政府',
  businesses: '企業',
  individuals: '個人',
  investing: '投資',
  infrastructure: '基礎建設',
  helping: '幫助',
  carbon: '碳',
  emissions: '排放',
  transition: '轉變',
  sustainable: '可持續的',
  systems: '系統',
  demand: '需求',
  clean: '乾淨的',
  grows: '增長',
  innovations: '創新',
  storage: '儲存',
  smart: '智慧的',
  grids: '電網',
  green: '環保的',
  technologies: '科技',
  play: '扮演',
  key: '關鍵的',
  role: '角色',
  meeting: '滿足',
  global: '全球的',
  needs: '需求',
  holds: '擁有',
  potential: '潛力',
  new: '新的',
  tidal: '潮汐的',
  geothermal: '地熱的',
  expanding: '擴展',
  range: '範圍',
  options: '選項',
  continued: '持續的',
  progress: '進展',
  commitment: '承諾',
  likely: '可能的',
  become: '成為',
  primary: '主要的',
  source: '來源',
  generations: '世代'
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