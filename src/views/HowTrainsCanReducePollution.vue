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
      name: 'HowTrainsCanReducePollution',
      data() {
        return {
          audioSource: require('../mp3/35.How trains can reduce pollution.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Trains can help reduce pollution by offering a more eco-friendly alternative to cars and airplanes. Unlike cars, which often rely on fossil fuels, trains can be powered by electricity or even renewable energy sources, producing fewer emissions. Trains can carry many passengers at once, reducing the number of vehicles on the road and lowering traffic-related pollution. Additionally, train travel is generally more energy-efficient than air travel, making it a better option for reducing carbon footprints. By investing in electric and high-speed rail systems, countries can further cut down on pollution while offering a sustainable mode of transport.',
          wordExplanations: {
trains: 'large vehicles that run on tracks and are used for transporting passengers or goods.',
  can: 'able to; have the ability to.',
  help: 'to make it easier or possible for something to happen.',
  reduce: 'to make something smaller or less in amount, degree, or size.',
  pollution: 'the presence or introduction of harmful substances into the environment.',
  by: 'indicating the means of achieving something.',
  offering: 'providing or presenting something for use or consideration.',
  a: 'used when mentioning something for the first time.',
  more: 'greater in amount, degree, or number.',
  eco: 'related to ecology or the environment.',
  friendly: 'kind or helpful.',
  alternative: 'one of two or more available possibilities.',
  to: 'expressing motion or direction toward something.',
  cars: 'vehicles with four wheels usually powered by an engine, used for transporting people on roads.',
  and: 'used to connect words or phrases of the same type.',
  airplanes: 'aircraft that fly and transport people or goods through the air.',
  unlike: 'different from; not like.',
  which: 'used to introduce a clause giving further information about something.',
  often: 'frequently; many times.',
  rely: 'to depend on or trust someone or something.',
  on: 'indicating the surface or position of something.',
  fossil: 'relating to the remains of ancient plants or animals.',
  fuels: 'materials such as coal, gas, or oil that are burned to produce energy.',
  powered: 'supplied with energy to operate.',
  electricity: 'a form of energy resulting from the existence of charged particles.',
  or: 'used to link alternatives.',
  even: 'used to emphasize something surprising or extreme.',
  renewable: 'able to be replaced naturally over a short period of time.',
  energy: 'the strength and vitality required for sustained physical or mental activity.',
  sources: 'places, origins, or causes of something.',
  producing: 'making or creating something.',
  fewer: 'a smaller number of.',
  emissions: 'gases or pollutants released into the air.',
  they: 'used to refer to people, animals, or things previously mentioned.',
  carry: 'to transport from one place to another.',
  many: 'a large number of.',
  passengers: 'people who travel in a vehicle but do not drive it.',
  at: 'indicating a particular place or position.',
  once: 'one time; simultaneously.',
  reducing: 'making something smaller or less.',
  the: 'used to refer to something already mentioned.',
  number: 'a quantity or amount.',
  of: 'expressing the relationship between a part and a whole.',
  vehicles: 'machines, typically with wheels, used for transporting people or goods.',
  road: 'a paved path for vehicles and pedestrians.',
  lowering: 'making something less in amount or degree.',
  additionally: 'in addition; also.',
  train: 'a series of connected vehicles running on tracks.',
  travel: 'to go from one place to another.',
  is: 'to exist; to be present.',
  generally: 'usually; mostly.',
  than: 'introducing the second element in a comparison.',
  air: 'the invisible mixture of gases surrounding the Earth.',
  making: 'forming or creating something.',
  it: 'used to refer to something previously mentioned.',
  better: 'more suitable, effective, or desirable.',
  option: 'a choice or alternative.',
  for: 'with the object or purpose of.',
  cutting: 'reducing or decreasing.',
  carbon: 'a chemical element found in all living things.',
  footprints: 'marks or impressions left by feet; used metaphorically for environmental impact.',
  investing: 'putting money or resources into something to gain a benefit.',
  in: 'expressing the situation of something within something else.',
  electric: 'powered by electricity.',
  rail: 'a track or set of tracks made of steel for trains to run on.',
  systems: 'sets of connected parts forming a complex whole.',
  countries: 'nations with their own governments and territories.',
  further: 'to a greater degree or extent.',
  cut: 'to make something smaller by removing part of it.',
  down: 'toward a lower place or position.',
  while: 'during the time that; although.',
  providing: 'making available or supplying.',
  sustainable: 'able to be maintained without causing harm to the environment.',
  mode: 'a way or method of doing something.',
  transport: 'to carry people or goods from one place to another.',
    },
    wordTranslations: {
trains: '火車',
  can: '能夠',
  help: '幫助',
  reduce: '減少',
  pollution: '污染',
  by: '藉由',
  offering: '提供',
  a: '一個',
  more: '更多',
  eco: '生態',
  friendly: '友善的',
  alternative: '替代的',
  to: '到',
  cars: '汽車',
  and: '和',
  airplanes: '飛機',
  unlike: '不像',
  which: '哪一個',
  often: '經常',
  rely: '依賴',
  on: '在…上',
  fossil: '化石的',
  fuels: '燃料',
  powered: '以…為動力',
  electricity: '電力',
  or: '或',
  even: '甚至',
  renewable: '可再生的',
  energy: '能源',
  sources: '來源',
  producing: '產生',
  fewer: '較少的',
  emissions: '排放物',
  they: '他們',
  carry: '載運',
  many: '許多',
  passengers: '乘客',
  at: '在',
  once: '一次',
  reducing: '減少',
  the: '這個',
  number: '數量',
  of: '的',
  vehicles: '車輛',
  road: '道路',
  lowering: '降低',
  additionally: '另外',
  train: '火車',
  travel: '旅行',
  is: '是',
  generally: '通常',
  than: '比',
  air: '空氣',
  making: '使得',
  it: '它',
  better: '更好的',
  option: '選擇',
  for: '為了',
  cutting: '減少',
  carbon: '碳',
  footprints: '足跡',
  investing: '投資',
  in: '在',
  electric: '電動的',
  rail: '鐵路',
  systems: '系統',
  countries: '國家',
  further: '進一步',
  cut: '削減',
  down: '降低',
  while: '當…時',
  providing: '提供',
  sustainable: '永續的',
  mode: '方式',
  transport: '運輸',
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