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
      name: 'SpaceExplorationIsItWorthIt',
      data() {
        return {
          audioSource: require('../mp3/13.Space expioration is it worth it.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Space exploration has long been a subject of debate. Some argue that investing in space programs is essential for advancing scientific knowledge and technology. Discoveries made in space often lead to innovations that benefit life on Earth, such as improvements in communication and medicine. However, others question whether the enormous costs of space missions are justified, especially when there are pressing issues on Earth, like poverty and climate change. While space exploration may not provide immediate solutions, it could help humanity better understand our planet and inspire future generations to innovate and solve global challenges.',
          wordExplanations: {
     space: 'the physical universe beyond the earth\'s atmosphere.',
  exploration: 'the action of traveling in or through an unfamiliar area in order to learn about it.',
  long: 'having lasted or existed for a considerable time.',
  subject: 'a topic or area of interest for discussion or study.',
  debate: 'a formal discussion on a particular topic where opposing arguments are presented.',
  some: 'an unspecified or unknown number or quantity of.',
  argue: 'to give reasons for or against something; to debate.',
  investing: 'allocating resources, usually money, in order to gain a benefit.',
  programs: 'planned series of activities or projects.',
  essential: 'absolutely necessary; extremely important.',
  advancing: 'moving forward or making progress.',
  scientific: 'based on or characterized by the methods and principles of science.',
  knowledge: 'facts, information, and skills acquired by a person through experience or education.',
  technology: 'the application of scientific knowledge for practical purposes.',
  discoveries: 'the act of finding or learning something for the first time.',
  often: 'frequently; many times.',
  lead: 'to cause or result in a particular outcome.',
  innovations: 'new methods, ideas, or products.',
  benefit: 'an advantage or profit gained from something.',
  life: 'the existence of living beings.',
  earth: 'the planet on which we live.',
  improvements: 'the process of making something better.',
  communication: 'the exchange of information between people or devices.',
  medicine: 'the science or practice of diagnosing, treating, and preventing illness.',
  however: 'used to introduce a statement that contrasts with what has been said before.',
  others: 'different people.',
  question: 'to express doubt or inquiry about something.',
  whether: 'introducing alternatives or possibilities.',
  enormous: 'very large in size, quantity, or extent.',
  costs: 'the amount of money required to buy, do, or make something.',
  missions: 'planned journeys or tasks with a specific purpose.',
  justified: 'shown to be right or reasonable.',
  especially: 'particularly; more than usual.',
  pressing: 'requiring immediate attention; urgent.',
  issues: 'important topics or problems for discussion or resolution.',
  poverty: 'the state of being extremely poor.',
  climate: 'the usual weather conditions in a particular place.',
  change: 'a process of becoming different.',
  while: 'during the time that; although.',
  may: 'expressing possibility.',
  not: 'used to express negation.',
  provide: 'to give or supply something.',
  immediate: 'happening or done without delay.',
  solutions: 'answers to problems or difficulties.',
  could: 'indicating possibility.',
  help: 'to make it easier or possible for someone to do something.',
  humanity: 'the human race; human beings collectively.',
  better: 'to a greater degree; more effectively.',
  understand: 'to grasp the meaning, significance, or nature of something.',
  our: 'belonging to or associated with us.',
  planet: 'a celestial body orbiting a star, like Earth.',
  inspire: 'to fill someone with the urge or ability to do something.',
  future: 'the time yet to come.',
  generations: 'groups of people born and living around the same time.',
  innovate: 'to make changes by introducing new ideas or methods.',
  solve: 'to find an answer to a problem.',
  global: 'relating to the whole world.',
  challenges: 'difficult tasks or problems that require effort to overcome.',
    },
    wordTranslations: {
     space: '太空',
  exploration: '探索',
  long: '長久的',
  subject: '主題',
  debate: '辯論',
  some: '一些',
  argue: '爭論',
  investing: '投資',
  programs: '計畫',
  essential: '必要的',
  advancing: '推進',
  scientific: '科學的',
  knowledge: '知識',
  technology: '科技',
  discoveries: '發現',
  often: '經常',
  lead: '導致',
  innovations: '創新',
  benefit: '好處',
  life: '生命',
  earth: '地球',
  improvements: '改進',
  communication: '溝通',
  medicine: '醫學',
  however: '然而',
  others: '其他人',
  question: '質疑',
  whether: '是否',
  enormous: '巨大的',
  costs: '成本',
  missions: '任務',
  justified: '合理的',
  especially: '特別是',
  pressing: '緊迫的',
  issues: '議題',
  poverty: '貧窮',
  climate: '氣候',
  change: '變化',
  while: '當…時',
  may: '可能',
  not: '不',
  provide: '提供',
  immediate: '立即的',
  solutions: '解決方案',
  could: '能夠',
  help: '幫助',
  humanity: '人類',
  better: '更好地',
  understand: '理解',
  our: '我們的',
  planet: '行星',
  inspire: '激勵',
  future: '未來',
  generations: '世代',
  innovate: '創新',
  solve: '解決',
  global: '全球的',
  challenges: '挑戰',
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