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
      name: 'RenewableEnergyVsFossilFuels',
      data() {
        return {
          audioSource: require('../mp3/3.Renewable energy vs fossil fuels.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Energy is important for daily life, but how it is produced affects the planet. Fossil fuels, such as coal and oil, provide power but create pollution and contribute to climate change. In contrast, renewable energy sources like wind, solar, and water are cleaner and do not run out. Although renewable energy is better for the environment, it can be expensive to set up. Governments should invest in clean energy to reduce harm to nature. People can also help by using less electricity. In the future, will the world fully switch to renewable energy?',
          wordExplanations: {
    energy: 'power that is used to provide heat, operate machines etc',
    produced: 'made or manufactured',
    affects: 'has an influence on someone or something',
    planet: 'the earth',
    fossil: 'fuels such as coal, oil, and natural gas that were formed over millions of years from the remains of plants and animals',
    coal: 'a hard black mineral that is dug from the earth and burnt to produce heat',
    oil: 'a thick black liquid that is found under the ground and from which many different substances including fuel are produced',
    provide: 'to give something to someone or make it available for them to use',
    power: 'energy that is produced by electrical, mechanical, or other means and that is used to operate a device',
    create: 'to make something new exist or happen',
    pollution: 'making air, water, or land dirty and unsafe',
    contribute: 'to help to cause something',
    wind: 'the natural movement of air',
    solar: 'relating to the sun',
    water: 'a clear liquid that has no colour, taste, or smell and that is essential for most plant and animal life',
    cleaner: 'not dirty',
    although: 'despite the fact that',
    expensive: 'costing a lot of money',
    governments: 'the group of people who control a country or state',
    invest: 'to put money into something in the hope of a profit or benefit',
    reduce: 'to make something smaller in size, amount, degree, etc.',
    nature: 'damage caused to the natural world',
    people: 'men, women, and children in general',
    help: 'to make it easier for someone to do something by offering your skills or time',
    electricity: 'consuming a smaller amount of electrical power',
    switch: 'to change from one thing to another'
  },
  wordTranslations: {
    energy: '能量',
    produced: '生產',
    affects: '影響',
    planet: '地球',
    coal: '煤',
    oil: '石油',
    provide: '提供',
    power: '電力/能源',
    create: '產生',
    pollution: '污染',
    contribute: '導致/促成',
    climate: '氣候',
    contrast: '相反地',
    renewable: '再生',
    wind: '風力',
    solar: '太陽能',
    water: '水力',
    cleaner: '更清潔的',
    although: '雖然',
    environment: '環境',
    expensive: '昂貴的',
    governments: '政府',
    invest: '投資',
    reduce: '減少',
    nature: '自然的',
    people: '人們',
    help: '幫助',
    switch: '轉換'
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