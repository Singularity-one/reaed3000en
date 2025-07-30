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
      name: 'TheBenefitsOfRemoteWork',
      data() {
        return {
          audioSource: require('../mp3/21.The benefits of remote work.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Remote work offers numerous benefits for both employees and employers. It provides greater flexibility, allowing individuals to balance work with personal commitments more easily. Without the need to commute, employees can save time and reduce stress, leading to improved work-life balance. Remote work also allows companies to access a global talent pool, as geographical location is no longer a barrier. Additionally, it can help reduce operational costs for businesses, such as office space and utilities. Overall, remote work has the potential to increase productivity, employee satisfaction, and efficiency, making it an attractive option for modern workplaces.',
          wordExplanations: {
 offers: "gives or provides something.",
  numerous: "many or a large number of something.",
  benefits: "good or helpful results or effects.",
  employees: "people who work for a company or organization.",
  employers: "people or companies that hire and pay workers.",
  provides: "gives or makes available.",
  flexibility: "the ability to change or adapt easily.",
  individuals: "single persons or people.",
  balance: "to give equal importance to two or more things.",
  commute: "to travel to and from work.",
  save: "to keep something, like time or money, from being wasted.",
  reduce: "to make less or smaller.",
  stress: "a feeling of worry or pressure.",
  companies: "business organizations.",
  access: "to be able to use or reach something.",
  barrier: "something that blocks or makes it difficult to do something.",
  utilities: "services like electricity, water, or internet.",
  potential: "the ability to develop into something better in the future.",
  increase: "to make more or grow.",
  productivity: "how much work is done in a certain time.",
  efficiency: "doing something well without wasting time or effort.",
  attractive: "something that is appealing or looks good.",
  option: "a choice or possibility."
    },
    wordTranslations: {
 offers: "提供",
  numerous: "眾多的",
  benefits: "好處",
  employees: "員工",
  employers: "雇主",
  provides: "提供",
  flexibility: "彈性",
  individuals: "個人",
  balance: "平衡",
  commute: "通勤",
  save: "節省",
  reduce: "減少",
  stress: "壓力",
  companies: "公司",
  access: "取得",
  barrier: "障礙",
  utilities: "公共設施（如水電等）",
  potential: "潛力",
  increase: "增加",
  productivity: "生產力",
  efficiency: "效率",
  attractive: "有吸引力的",
  option: "選項"
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