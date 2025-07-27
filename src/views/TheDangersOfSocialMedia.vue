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
      name: 'TheDangersOfSocialMedia',
      data() {
        return {
          audioSource: require('../mp3/14.The dangers of social media.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Social media has become a powerful tool for communication, but it also poses several dangers. One major issue is the spread of misinformation, as false news can quickly go viral. Social media can also lead to cyberbullying, where individuals are harassed or attacked online. Additionally, excessive use of social media can negatively affect mental health, contributing to feelings of anxiety, depression, and loneliness. It can also create unrealistic expectations, as people often compare their lives to others edited posts. While social media offers many benefits, it is important to use it responsibly and be aware of its risks.',
          wordExplanations: {
        social: 'relating to society or its organization.',
  media: 'channels of communication, such as social networks, used to distribute information.',
  powerful: 'having great power or influence.',
  tool: 'something used to help perform a task.',
  communication: 'the exchange of information or messages.',
  poses: 'presents or constitutes (a problem or danger).',
  several: 'more than two but not many.',
  dangers: 'possible causes of harm or adverse effects.',
  major: 'important, serious, or significant.',
  issue: 'an important topic or problem for debate or discussion.',
  spread: 'to extend over a large or increasing area.',
  misinformation: 'false or inaccurate information spread unintentionally or intentionally.',
  false: 'not true or correct.',
  news: 'new information about recent events.',
  quickly: 'at a fast speed.',
  lead: 'to cause or result in.',
  cyberbullying: 'bullying that takes place over digital devices like phones or computers.',
  individuals: 'single human beings as distinct from a group.',
  harassed: 'subjected to aggressive pressure or intimidation.',
  attacked: 'acted against violently.',
  online: 'connected to or available through the internet.',
  additionally: 'in addition; also.',
  excessive: 'more than necessary, normal, or desirable.',
  use: 'the action of employing something.',
  negatively: 'in a harmful or adverse way.',
  affect: 'to have an influence on.',
  contributing: 'helping to cause or bring about.',
  feelings: 'emotions or sensations.',
  anxiety: 'a feeling of worry, nervousness, or unease.',
  depression: 'a mental health disorder causing persistent sadness.',
  loneliness: 'a feeling of being alone and isolated.',
  create: 'to bring something into existence.',
  unrealistic: 'not practical or reasonable.',
  expectations: 'beliefs about what will happen in the future.',
  compare: 'to examine similarities or differences.',
  lives: 'the existence of people or animals.',
  edited: 'modified or changed.',
  posts: 'messages or content shared on social media.',
  offers: 'provides or presents.',
  benefits: 'advantages or positive effects.',
  important: 'of great significance or value.',
  responsibly: 'in a way that shows care and accountability.',
  aware: 'having knowledge or perception of a situation or fact.',
  risks: 'possibilities of harm or loss.',
    },
    wordTranslations: {
      social: '社會的',
  media: '媒體',
  powerful: '強大的',
  tool: '工具',
  communication: '溝通',
  poses: '造成',
  several: '幾個',
  dangers: '危險',
  major: '主要的',
  issue: '議題',
  spread: '散布',
  misinformation: '錯誤資訊',
  false: '錯誤的',
  news: '新聞',
  quickly: '快速地',
  lead: '導致',
  cyberbullying: '網路霸凌',
  individuals: '個人',
  harassed: '騷擾',
  attacked: '攻擊',
  online: '線上',
  additionally: '此外',
  excessive: '過度的',
  use: '使用',
  negatively: '負面地',
  affect: '影響',
  contributing: '促成',
  feelings: '情緒',
  anxiety: '焦慮',
  depression: '憂鬱',
  loneliness: '孤獨',
  create: '產生',
  unrealistic: '不切實際的',
  expectations: '期望',
  compare: '比較',
  lives: '生活',
  edited: '編輯過的',
  posts: '貼文',
  offers: '提供',
  benefits: '好處',
  important: '重要的',
  responsibly: '負責任地',
  aware: '知道',
  risks: '風險',
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