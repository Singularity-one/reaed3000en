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
      name: 'ShouldPublicTransportBeFree',
      data() {
        return {
          audioSource: require('../mp3/32.Should public transprot be free.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Making public transport free has both advantages and disadvantages. Free transport can reduce traffic, lower pollution, and help people save money. More people may choose buses or trains instead of cars, which can make cities cleaner and less crowded. It also helps low-income individuals who struggle with transportation costs. However, free transport requires funding, and governments may increase taxes to pay for it. Some argue that without fares, public transport quality may decrease due to less investment. A better solution could be lower fares or discounts for those in need. Cities must consider both benefits and costs before making a decision.',
          wordExplanations: {
   making: 'The act of creating or causing something.',
  public: 'Related to all people or the community.',
  transport: 'The system of moving people or goods from one place to another.',
  free: 'Without cost or payment.',
  has: 'Owns or possesses; present tense of "have".',
  both: 'The two of them together.',
  advantages: 'Positive or beneficial aspects.',
  and: 'Used to connect words or phrases.',
  disadvantages: 'Negative or harmful aspects.',
  can: 'Able to.',
  reduce: 'To make smaller or less.',
  traffic: 'The movement of vehicles on roads.',
  lower: 'To make something less.',
  pollution: 'Harmful substances in the environment.',
  help: 'To assist or support.',
  people: 'Human beings.',
  save: 'To keep or protect from being wasted or lost.',
  money: 'Currency used to buy things.',
  more: 'A greater amount.',
  may: 'Might; expresses possibility.',
  choose: 'To pick or select.',
  buses: 'Large vehicles for public transport.',
  or: 'Used to show options or choices.',
  trains: 'Vehicles that run on tracks and carry people or goods.',
  instead: 'In place of something else.',
  of: 'Belonging to or related to.',
  cars: 'Private motor vehicles.',
  which: 'Refers to something previously mentioned.',
  make: 'To create or cause.',
  cities: 'Large towns or urban areas.',
  cleaner: 'More clean.',
  less: 'Smaller in amount.',
  crowded: 'Full of people; packed.',
  also: 'In addition.',
  helps: 'Assists or supports.',
  individuals: 'Single persons.',
  who: 'Refers to people.',
  struggle: 'To have difficulty with something.',
  with: 'Used to indicate connection or association.',
  transportation: 'The act of moving people or goods.',
  costs: 'Expenses or amounts of money needed.',
  however: 'But; introduces a contrast.',
  requires: 'Needs or demands.',
  funding: 'Money provided for a purpose.',
  governments: 'Organizations that lead or manage a country or city.',
  increase: 'To become larger or greater.',
  taxes: 'Money citizens pay to the government.',
  to: 'Indicates direction or purpose.',
  pay: 'To give money for something.',
  for: 'Indicating purpose or benefit.',
  it: 'Refers to something mentioned before.',
  some: 'A few; not all.',
  argue: 'To say reasons for or against something.',
  that: 'Used to introduce a clause.',
  without: 'Not having or using.',
  fares: 'The money paid to travel on public transport.',
  quality: 'How good or bad something is.',
  decrease: 'To go down or become less.',
  due: 'Because of.',
  investment: 'The act of putting money or effort into something for profit or improvement.',
  better: 'Improved or more good.',
  solution: 'An answer to a problem.',
  could: 'Might have the ability or possibility.',
  discounts: 'Reduced prices.',
  those: 'People or things already mentioned.',
  in: 'Inside or within.',
  need: 'Requirement or necessity.',
  must: 'Necessary or required.',
  consider: 'To think about carefully.',
  benefits: 'Positive results or advantages.',
  before: 'Earlier than a certain time or action.',
  decision: 'A choice or judgment made after thinking.'
    },
    wordTranslations: {
        making: '製作；使得',
  public: '公共的',
  transport: '交通運輸',
  free: '免費的',
  has: '有',
  both: '兩者',
  advantages: '優點',
  and: '和',
  disadvantages: '缺點',
  can: '能夠',
  reduce: '減少',
  traffic: '交通',
  lower: '降低',
  pollution: '污染',
  help: '幫助',
  people: '人們',
  save: '節省',
  money: '金錢',
  more: '更多',
  may: '可能',
  choose: '選擇',
  buses: '公車',
  or: '或',
  trains: '火車',
  instead: '取代',
  of: '的',
  cars: '汽車',
  which: '這',
  make: '使得',
  cities: '城市',
  cleaner: '更乾淨',
  less: '更少',
  crowded: '擁擠的',
  also: '也',
  helps: '幫助',
  individuals: '個人',
  who: '誰；那些',
  struggle: '掙扎；困難',
  with: '與',
  transportation: '交通運輸',
  costs: '費用',
  however: '然而',
  requires: '需要',
  funding: '資金',
  governments: '政府',
  increase: '增加',
  taxes: '稅金',
  to: '去；為了',
  pay: '支付',
  for: '為了',
  it: '它',
  some: '一些',
  argue: '主張；爭論',
  that: '那',
  without: '沒有',
  fares: '車資',
  quality: '品質',
  decrease: '下降',
  due: '因為',
  investment: '投資',
  better: '更好的',
  solution: '解決方法',
  could: '可以',
  discounts: '折扣',
  those: '那些',
  in: '在',
  need: '需要',
  must: '必須',
  consider: '考慮',
  benefits: '好處',
  before: '在…之前',
  decision: '決定'
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