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
      name: 'TheRoleOfDoctorsInSociety',
      data() {
        return {
          audioSource: require('../mp3/7.The role of doctors in society.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Doctors play a crucial role in society by providing medical care to individuals and communities. They diagnose and treat illnesses, helping people recover and live healthier lives. Beyond treating diseases, doctors also promote health awareness, offering advice on prevention and healthy living. They are essential in managing public health, especially during epidemics or health crises. Doctors contribute to scientific research, improving treatments and advancing medical knowledge. Their work not only saves lives but also supports the overall well-being of society. In many ways, doctors are at the heart of a functioning and thriving community.',
          wordExplanations: {
doctors: 'trained professionals who are qualified to treat people who are ill.',
  play: 'to have a particular role or effect in a situation.',
  crucial: 'extremely important or necessary.',
  role: 'the function or position that someone has in a situation or activity.',
  society: 'a community of people living together and sharing laws, traditions, and values.',
  providing: 'giving or supplying something.',
  medical: 'relating to the science of medicine.',
  care: 'the process of looking after someone or something.',
  individuals: 'single human beings, as distinct from a group.',
  communities: 'groups of people living in the same place or having something in common.',
  diagnose: 'to identify a disease or problem by examining the symptoms.',
  treat: 'to give medical care to someone for an illness or injury.',
  illnesses: 'sicknesses or diseases.',
  helping: 'assisting or making it easier for someone to do something.',
  recover: 'to become healthy again after an illness or injury.',
  live: 'to remain alive or exist.',
  healthier: 'in better health.',
  lives: 'the existence of individuals.',
  beyond: 'further than; more than.',
  treating: 'giving medical attention to.',
  diseases: 'illnesses that affect people, animals, or plants.',
  promote: 'to support or encourage something.',
  health: 'the state of being free from illness or injury.',
  awareness: 'knowledge or understanding of a situation or fact.',
  offering: 'presenting or giving something for someone to accept.',
  advice: 'recommendations about what someone should do.',
  prevention: 'actions taken to stop something from happening.',
  healthy: 'in good physical or mental condition.',
  living: 'the way someone lives their life.',
  essential: 'absolutely necessary or extremely important.',
  managing: 'organizing or controlling something.',
  public: 'relating to the people as a whole.',
  especially: 'used to emphasize something as more important or relevant.',
  during: 'throughout the course of a period of time.',
  epidemics: 'widespread occurrences of infectious diseases in a community.',
  crises: 'times of intense difficulty or danger.',
  contribute: 'to give or add something to a cause or situation.',
  scientific: 'relating to science.',
  research: 'careful study to discover new information.',
  improving: 'making something better.',
  treatments: 'methods used to cure or care for illness or injury.',
  advancing: 'moving forward or making progress.',
  knowledge: 'information and understanding about a subject.',
  work: 'effort or activity done to achieve a purpose.',
  saves: 'rescues or keeps someone or something safe.',
  supports: 'gives assistance or help.',
  overall: 'considering everything.',
  many: 'a large number of.',
  ways: 'methods or manners of doing something.',
  heart: 'the central or most important part of something.',
  functioning: 'working or operating properly.',
  thriving: 'growing, developing, or being successful.',
  community: 'a group of people living in the same area or having shared interests.',
    },
    wordTranslations: {
        doctors: '醫生',
  play: '扮演',
  crucial: '關鍵的',
  role: '角色',
  society: '社會',
  providing: '提供',
  medical: '醫療的',
  care: '照護',
  individuals: '個人',
  communities: '社群',
  diagnose: '診斷',
  treat: '治療',
  illnesses: '疾病',
  helping: '幫助',
  recover: '康復',
  live: '生活',
  healthier: '更健康的',
  lives: '生命',
  beyond: '超出',
  treating: '治療中',
  diseases: '疾病',
  promote: '促進',
  health: '健康',
  awareness: '意識',
  offering: '提供',
  advice: '建議',
  prevention: '預防',
  healthy: '健康的',
  living: '生活方式',
  essential: '必要的',
  managing: '管理',
  public: '公共的',
  especially: '特別是',
  during: '在...期間',
  epidemics: '流行病',
  crises: '危機',
  contribute: '貢獻',
  scientific: '科學的',
  research: '研究',
  improving: '改善',
  treatments: '治療方式',
  advancing: '推進',
  knowledge: '知識',
  work: '工作',
  saves: '拯救',
  supports: '支持',
  overall: '整體的',
  many: '許多',
  ways: '方式',
  heart: '核心',
  functioning: '運作',
  thriving: '繁榮的',
  community: '社區',
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
          return this.dataText.split(/(\s+)/).map(word => ({
            text: word,
            explanation: this.wordExplanations[word.toLowerCase()],
            translation: this.wordTranslations[word.toLowerCase()],
          }));
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