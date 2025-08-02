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
      name: 'TheImpactOfCarsOnTheEnvironment',
      data() {
        return {
          audioSource: require('../mp3/33.The impact of cars on the environment.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Cars have a significant impact on the environment, mainly through air pollution and climate change. Most cars burn fuel, releasing harmful gases like carbon dioxide, which contributes to global warming. In cities, car emissions cause poor air quality, leading to health problems such as breathing issues. In addition, building roads and parking areas reduces green spaces, affecting wildlife and natural habitats. Traffic congestion also increases fuel use and pollution. To reduce these problems, people can use public transport, walk, or choose eco-friendly cars. Governments should also invest in clean energy and better transport systems to protect the environment.',
          wordExplanations: {
 cars: 'Vehicles used for personal transportation.',
  have: 'To possess or experience.',
  significant: 'Important or large enough to be noticed.',
  impact: 'Effect or influence.',
  on: 'Used to show the effect or connection.',
  environment: 'The natural world around us.',
  mainly: 'Mostly or primarily.',
  through: 'By means of; via.',
  air: 'The invisible gas we breathe.',
  pollution: 'The presence of harmful substances in the environment.',
  climate: 'The general weather conditions of a region.',
  change: 'To make or become different.',
  most: 'The majority of.',
  burn: 'To use fuel for energy and produce heat.',
  fuel: 'Material like gas or oil used for power.',
  releasing: 'Letting something go or come out.',
  harmful: 'Causing damage or injury.',
  gases: 'Substances like air with no fixed shape.',
  like: 'Similar to.',
  carbon: 'A chemical element found in all living things.',
  dioxide: 'A compound made of two oxygen atoms and one carbon atom.',
  which: 'Refers to something previously mentioned.',
  contributes: 'Adds to or helps cause something.',
  global: 'Worldwide.',
  warming: 'An increase in the earth’s temperature.',
  emissions: 'Substances released into the air.',
  cause: 'To make something happen.',
  poor: 'Not good in quality.',
  quality: 'How good or bad something is.',
  leading: 'Causing a particular result.',
  health: 'The condition of a person’s body or mind.',
  problems: 'Difficult or unwanted situations.',
  such: 'Of the kind mentioned.',
  as: 'Used to introduce an example.',
  breathing: 'The act of taking air in and out of the lungs.',
  issues: 'Matters or problems for discussion or concern.',
  building: 'Constructing something.',
  roads: 'Paths or streets for vehicles.',
  parking: 'Space for vehicles to stop and stay.',
  areas: 'Spaces or regions.',
  reduces: 'Makes smaller or less.',
  green: 'Covered with plants or nature.',
  spaces: 'Open areas.',
  affecting: 'Changing or influencing something.',
  wildlife: 'Animals living in nature.',
  natural: 'Not made by humans.',
  habitats: 'Places where animals or plants live.',
  traffic: 'Vehicles moving on roads.',
  congestion: 'Too many vehicles in one area.',
  also: 'In addition.',
  increases: 'Becomes larger or more.',
  use: 'To employ or make use of.',
  to: 'In order to.',
  reduce: 'Make something smaller or less.',
  these: 'Refers to things mentioned before.',
  people: 'Humans in general.',
  can: 'Able to.',
  public: 'Available to everyone.',
  transport: 'Systems that move people or goods.',
  walk: 'To move by putting one foot in front of the other.',
  choose: 'To select.',
  should: 'Ought to.',
  invest: 'To spend money or effort for a future benefit.',
  clean: 'Free from dirt or harmful substances.',
  energy: 'Power used to do work.',
  better: 'Improved or more suitable.',
  systems: 'Organized ways of doing things.',
  protect: 'To keep safe.',
    },
    wordTranslations: {
  cars: '汽車',
  have: '有',
  significant: '重大的',
  impact: '影響',
  on: '在…上',
  environment: '環境',
  mainly: '主要地',
  through: '透過',
  air: '空氣',
  pollution: '污染',
  climate: '氣候',
  change: '變化',
  most: '大多數',
  burn: '燃燒',
  fuel: '燃料',
  releasing: '釋放',
  harmful: '有害的',
  gases: '氣體',
  like: '像',
  carbon: '碳',
  dioxide: '二氧化物',
  which: '這',
  contributes: '促成',
  global: '全球的',
  warming: '暖化',
  emissions: '排放物',
  cause: '造成',
  poor: '差的',
  quality: '品質',
  leading: '導致',
  health: '健康',
  problems: '問題',
  such: '例如',
  as: '當作',
  breathing: '呼吸',
  issues: '問題',
  building: '建造',
  roads: '道路',
  parking: '停車',
  areas: '區域',
  reduces: '減少',
  green: '綠色',
  spaces: '空間',
  affecting: '影響',
  wildlife: '野生動物',
  natural: '自然的',
  habitats: '棲息地',
  traffic: '交通',
  congestion: '擁擠',
  also: '也',
  increases: '增加',
  use: '使用',
  to: '去；為了',
  reduce: '減少',
  these: '這些',
  people: '人們',
  can: '可以',
  public: '公共的',
  transport: '運輸',
  walk: '走路',
  choose: '選擇',
  should: '應該',
  invest: '投資',
  clean: '清潔的',
  energy: '能源',
  better: '更好的',
  systems: '系統',
  protect: '保護'
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