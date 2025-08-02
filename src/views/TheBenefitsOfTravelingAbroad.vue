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
      name: 'TheBenefitsOfTravelingAbroad',
      data() {
        return {
          audioSource: require('../mp3/31.The benefits of traveling abroad.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Traveling abroad has many benefits, as it allows people to experience new cultures, meet different people, and learn about the world. Visiting other countries helps improve understanding and respect for different traditions. It also gives people a chance to try new foods, see famous places, and hear different languages. Traveling can improve problem-solving skills because people must adapt to new environments. It also helps build confidence and independence. In addition, traveling is a great way to relax and reduce stress. Overall, exploring other countries provides valuable experiences, making life more interesting and helping people grow in many ways.',
          wordExplanations: {
             traveling: 'The act of going to different places, often far from home.',
  abroad: 'In or to a foreign country.',
  has: 'Third person singular of "have"; to possess.',
  many: 'A large number of.',
  benefits: 'Advantages or positive effects.',
  as: 'Because; since.',
  it: 'Refers to something previously mentioned.',
  allows: 'Permits or gives the opportunity.',
  people: 'Human beings.',
  to: 'Used to express direction, purpose, or intent.',
  experience: 'To encounter or undergo something.',
  new: 'Not seen or known before.',
  cultures: 'The ideas, customs, and social behavior of a society.',
  meet: 'To come into contact or connect with someone.',
  different: 'Not the same.',
  and: 'Used to connect words or phrases.',
  learn: 'To gain knowledge or skill.',
  about: 'Concerning; related to.',
  the: 'Used to refer to something specific.',
  world: 'The earth and all its inhabitants.',
  visiting: 'Going to see or stay in a place temporarily.',
  other: 'Not the same one; different.',
  countries: 'Nations or areas with their own governments.',
  helps: 'Makes something easier or better.',
  improve: 'To make better.',
  understanding: 'Comprehension or grasp of something.',
  respect: 'Consideration or admiration for someone or something.',
  for: 'Indicating purpose or benefit.',
  traditions: 'Beliefs or customs passed down through generations.',
  also: 'In addition.',
  gives: 'Provides or offers.',
  chance: 'An opportunity.',
  try: 'To attempt or test something.',
  foods: 'Things people eat.',
  see: 'To view with the eyes.',
  famous: 'Widely known.',
  places: 'Locations or areas.',
  hear: 'To perceive sound with the ears.',
  languages: 'Systems of communication used by people.',
  can: 'Able to.',
  skills: 'Abilities or talents.',
  because: 'For the reason that.',
  must: 'Have to; be required to.',
  adapt: 'To adjust or change to fit new conditions.',
  environments: 'The surroundings or conditions of a place.',
  build: 'To develop or create.',
  confidence: 'Belief in one’s own ability.',
  independence: 'Being self-reliant and not depending on others.',
  in: 'Inside or within.',
  addition: 'Something added; also.',
  great: 'Very good or large in amount.',
  way: 'A method or approach.',
  relax: 'To rest or become less tense.',
  reduce: 'To make smaller or less.',
  stress: 'Mental or emotional strain.',
  overall: 'Generally; considering everything.',
  exploring: 'Traveling through an unfamiliar area to learn about it.',
  provides: 'Gives or supplies.',
  valuable: 'Worth a lot or very useful.',
  experiences: 'Things that happen to a person.',
  making: 'Causing to happen.',
  life: 'The existence of a person or being.',
  more: 'To a greater degree.',
  interesting: 'Attracting attention or curiosity.',
  helping: 'Giving aid or support.',
  grow: 'To develop or increase.',
  ways: 'Methods or styles of doing things.'
    },
    wordTranslations: {
      traveling: '旅行',
  abroad: '到國外',
  has: '有',
  many: '許多',
  benefits: '好處',
  as: '因為',
  it: '它',
  allows: '允許',
  people: '人們',
  to: '去',
  experience: '體驗',
  new: '新的',
  cultures: '文化',
  meet: '遇見',
  different: '不同的',
  and: '和',
  learn: '學習',
  about: '關於',
  the: '這',
  world: '世界',
  visiting: '造訪',
  other: '其他的',
  countries: '國家',
  helps: '幫助',
  improve: '改善',
  understanding: '理解',
  respect: '尊重',
  for: '對於',
  traditions: '傳統',
  also: '也',
  gives: '給予',
  chance: '機會',
  try: '嘗試',
  foods: '食物',
  see: '看見',
  famous: '著名的',
  places: '地方',
  hear: '聽到',
  languages: '語言',
  can: '能夠',
  skills: '技能',
  because: '因為',
  must: '必須',
  adapt: '適應',
  environments: '環境',
  build: '建立',
  confidence: '自信',
  independence: '獨立',
  in: '在',
  addition: '此外',
  great: '很棒的',
  way: '方式',
  relax: '放鬆',
  reduce: '減少',
  stress: '壓力',
  overall: '整體而言',
  exploring: '探索',
  provides: '提供',
  valuable: '有價值的',
  experiences: '經驗',
  making: '使得',
  life: '生活',
  more: '更',
  interesting: '有趣的',
  helping: '幫助',
  grow: '成長',
  ways: '方式'
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