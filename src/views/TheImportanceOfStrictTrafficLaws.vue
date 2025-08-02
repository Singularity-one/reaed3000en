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
      name: 'TheImportanceOfStrictTrafficLaws',
      data() {
        return {
          audioSource: require('../mp3/37.The importance of strict traffic laws.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Strict traffic laws are important for ensuring road safety and reducing accidents. They help prevent reckless driving, speeding, and other dangerous behaviors that can lead to crashes and injuries. By setting clear rules, traffic laws create a safer environment for all road users, including pedestrians, cyclists, and drivers. They also help in managing traffic flow, reducing congestion, and minimizing air pollution caused by idling vehicles. Strict enforcement of these laws can act as a deterrent to lawbreakers, encouraging responsible driving. In the long run, strong traffic laws contribute to saving lives and improving the quality of urban life.',
          wordExplanations: {
strict: 'demanding that rules be obeyed carefully and exactly.',
  traffic: 'the movement of vehicles and people on roads.',
  laws: 'rules made by a government to regulate behavior.',
  are: 'exist; to be present.',
  important: 'having great value or significance.',
  for: 'with the purpose or benefit of.',
  ensuring: 'making certain or guaranteeing.',
  road: 'a paved path for vehicles and pedestrians.',
  safety: 'the condition of being protected from harm or danger.',
  and: 'used to connect words or phrases of the same type.',
  reducing: 'making something smaller or less.',
  accidents: 'unexpected events causing damage or injury.',
  they: 'used to refer to people or things previously mentioned.',
  help: 'to make it easier or possible for something to happen.',
  prevent: 'to stop something from happening.',
  reckless: 'acting without care or caution.',
  driving: 'the act of operating a vehicle.',
  speeding: 'driving faster than the legal limit.',
  other: 'different from the one mentioned.',
  dangerous: 'likely to cause harm or injury.',
  behaviors: 'actions or ways of acting.',
  that: 'used to introduce a clause or specify something.',
  can: 'able to; have the ability to.',
  lead: 'to cause or result in something.',
  crashes: 'collisions or accidents involving vehicles.',
  injuries: 'physical harm or damage to a person.',
  by: 'indicating the means or agent.',
  setting: 'establishing or putting in place.',
  clear: 'easy to understand; not confusing.',
  rules: 'instructions or guidelines for behavior.',
  create: 'to make or bring into existence.',
  safer: 'more safe; less likely to cause harm.',
  environment: 'the surroundings or conditions in which something exists.',
  users: 'people who use something.',
  including: 'containing as part of a whole.',
  pedestrians: 'people walking on the road or pavement.',
  cyclists: 'people who ride bicycles.',
  drivers: 'people who operate vehicles.',
  also: 'in addition; too.',
  in: 'inside or within.',
  managing: 'handling or controlling.',
  flow: 'movement of vehicles or people in a steady stream.',
  congestion: 'overcrowding or blockage.',
  minimizing: 'making as small as possible.',
  air: 'the invisible mixture of gases surrounding the Earth.',
  pollution: 'the presence or introduction of harmful substances.',
  caused: 'made to happen.',
  idling: 'running an engine while the vehicle is not moving.',
  vehicles: 'machines used for transporting people or goods.',
  enforcement: 'the act of making sure laws or rules are followed.',
  of: 'expressing the relationship between a part and a whole.',
  these: 'referring to things just mentioned.',
  act: 'to function or serve a particular purpose.',
  as: 'used to indicate the role of something.',
  deterrent: 'something that discourages an action.',
  to: 'expressing direction or purpose.',
  lawbreakers: 'people who break the law.',
  encouraging: 'giving support or confidence.',
  responsible: 'having an obligation to do something correctly.',
  the: 'used to refer to something already mentioned.',
  long: 'lasting a considerable amount of time.',
  run: 'a continuous period.',
  strong: 'having great power or strength.',
  contribute: 'to help bring about.',
  saving: 'keeping safe from harm or loss.',
  lives: 'the existence of living beings.',
  improving: 'making better.',
  quality: 'the standard of something as measured against others.',
  urban: 'related to cities or towns.',
  life: 'the condition that distinguishes living beings from non-living things.',
    },
    wordTranslations: {
strict: '嚴格的',
  traffic: '交通',
  laws: '法律',
  are: '是',
  important: '重要的',
  for: '為了',
  ensuring: '確保',
  road: '道路',
  safety: '安全',
  and: '和',
  reducing: '減少',
  accidents: '意外事故',
  they: '他們',
  help: '幫助',
  prevent: '防止',
  reckless: '魯莽的',
  driving: '駕駛',
  speeding: '超速',
  other: '其他的',
  dangerous: '危險的',
  behaviors: '行為',
  that: '那',
  can: '能夠',
  lead: '導致',
  crashes: '碰撞事故',
  injuries: '傷害',
  by: '藉由',
  setting: '設定',
  clear: '清楚的',
  rules: '規則',
  create: '創造',
  safer: '更安全的',
  environment: '環境',
  all: '所有的',
  users: '使用者',
  including: '包括',
  pedestrians: '行人',
  cyclists: '自行車騎士',
  drivers: '駕駛人',
  also: '也',
  in: '在',
  managing: '管理',
  flow: '流量',
  congestion: '擁擠',
  minimizing: '最小化',
  air: '空氣',
  pollution: '污染',
  caused: '造成',
  idling: '怠速',
  vehicles: '車輛',
  enforcement: '執法',
  of: '的',
  these: '這些',
  act: '起作用',
  as: '作為',
  deterrent: '威懾',
  lawbreakers: '違法者',
  encouraging: '鼓勵',
  responsible: '負責任的',
  long: '長期',
  run: '期間',
  strong: '強烈的',
  contribute: '促成',
  saving: '拯救',
  lives: '生命',
  improving: '改善',
  quality: '品質',
  urban: '城市的',
  life: '生活',
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