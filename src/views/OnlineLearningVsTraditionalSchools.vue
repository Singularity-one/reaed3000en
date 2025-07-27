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
      name: 'OnlineLearningVsTraditionalSchools',
      data() {
        return {
          audioSource: require('../mp3/17.Online learning vs traditional schools.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Online learning and traditional schools each have their advantages. Online education offers flexibility, allowing students to study at their own pace and from anywhere in the world. It is particularly useful for those with busy schedules or those living in remote areas. However, traditional schools provide a structured environment with face-to-face interaction, which can enhance social skills and offer more immediate support from teachers. While online learning can be more cost-effective, traditional schools often provide more opportunities for extracurricular activities. Ultimately, both methods have their strengths, and the best choice depends on individual needs and preferences.',
          wordExplanations: {
    online: 'connected to or available through the internet.',
  learning: 'the process of acquiring knowledge or skills.',
  traditional: 'based on customs or beliefs passed down over time.',
  schools: 'places where education is provided.',
  advantages: 'benefits or positive aspects.',
  education: 'the process of teaching or learning.',
  offers: 'provides or makes available.',
  flexibility: 'the ability to adapt or change easily.',
  allowing: 'enabling or permitting.',
  students: 'people who are studying.',
  study: 'to learn about a subject.',
  pace: 'the speed at which something happens.',
  anywhere: 'in any place.',
  world: 'the earth or all countries and people.',
  particularly: 'especially or mainly.',
  useful: 'helpful or beneficial.',
  busy: 'having many things to do.',
  schedules: 'plans showing when tasks will happen.',
  living: 'residing or staying.',
  remote: 'far away or distant.',
  areas: 'regions or places.',
  however: 'but; used to contrast.',
  provide: 'to give or supply.',
  structured: 'organized or planned.',
  environment: 'surroundings or conditions.',
  interaction: 'communication or involvement with others.',
  enhance: 'to improve or increase.',
  immediate: 'happening right away.',
  support: 'help or assistance.',
  teachers: 'people who educate others.',
  opportunities: 'chances or possibilities.',
  extracurricular: 'outside regular academic work.',
  activities: 'things people do for enjoyment or purpose.',
  ultimately: 'in the end or finally.',
  methods: 'ways of doing something.',
  strengths: 'positive qualities or strong points.',
  choice: 'a decision between options.',
  depends: 'is determined by.',
  individual: 'relating to one person.',
  needs: 'requirements or necessities.',
  preferences: 'things someone likes more than others.',
    },
    wordTranslations: {
        online: '線上的',
  learning: '學習',
  traditional: '傳統的',
  schools: '學校',
  advantages: '優勢',
  education: '教育',
  offers: '提供',
  flexibility: '彈性',
  allowing: '允許',
  students: '學生',
  study: '學習',
  pace: '速度',
  anywhere: '任何地方',
  world: '世界',
  particularly: '特別是',
  useful: '有用的',
  busy: '忙碌的',
  schedules: '時間表',
  living: '居住',
  remote: '偏遠的',
  areas: '地區',
  however: '然而',
  provide: '提供',
  structured: '有組織的',
  environment: '環境',
  interaction: '互動',
  enhance: '增強',
  immediate: '即時的',
  support: '支持',
  teachers: '老師',
  opportunities: '機會',
  extracurricular: '課外的',
  activities: '活動',
  ultimately: '最終',
  methods: '方法',
  strengths: '優點',
  choice: '選擇',
  depends: '取決於',
  individual: '個人的',
  needs: '需求',
  preferences: '偏好',
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