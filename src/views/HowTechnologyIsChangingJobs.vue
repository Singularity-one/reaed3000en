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
      name: 'HowTechnologyIsChangingJobs',
      data() {
        return {
          audioSource: require('../mp3/25.How technology is changing jobs.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Technology is rapidly changing the job market, creating new opportunities and challenges. Automation and artificial intelligence (AI) are replacing certain manual and repetitive tasks, leading to job losses in some sectors. However, technology also creates new roles, such as data analysts, software developers, and digital marketers. The rise of remote work is another result of technological advancements, allowing employees to work from anywhere. Furthermore, technology is transforming industries by improving efficiency, communication, and innovation. As a result, workers must adapt by developing new skills to remain competitive in a constantly evolving job market.',
          wordExplanations: {
technology: "The use of scientific knowledge for practical purposes, especially in industry.",
  rapidly: "Very quickly; at a fast rate.",
  changing: "Becoming different or undergoing transformation.",
  job: "A paid position of regular employment.",
  market: "The area or sphere in which commercial dealings are conducted.",
  creating: "Bringing something into existence.",
  new: "Not existing before; recently made or discovered.",
  opportunities: "Chances for progress or advancement.",
  challenges: "Difficult tasks or problems that require effort to overcome.",
  automation: "The use of technology to perform tasks without human intervention.",
  artificial: "Made by humans rather than occurring naturally.",
  intelligence: "The ability to acquire and apply knowledge and skills.",
  replacing: "Substituting one thing for another.",
  certain: "Specific but not explicitly named.",
  manual: "Done by hand or with physical effort.",
  repetitive: "Doing the same thing over and over again.",
  tasks: "Pieces of work to be done.",
  leading: "Causing a result or outcome.",
  losses: "The fact of losing something, especially jobs or money.",
  sectors: "Parts or divisions of a society or economy.",
  roles: "The functions or positions held by people in an organization.",
  data: "Facts and statistics collected for analysis.",
  analysts: "People who examine information in detail.",
  software: "Programs used by a computer.",
  developers: "People who create computer software or applications.",
  digital: "Involving computer technology or electronic media.",
  marketers: "People who promote or sell products or services.",
  rise: "An increase or upward movement.",
  remote: "Done from a distance without being physically present.",
  work: "Activity involving mental or physical effort for a purpose.",
  result: "A consequence or outcome of an action.",
  technological: "Relating to technology.",
  advancements: "Progress or development in something.",
  allowing: "Permitting or letting something happen.",
  employees: "People who work for a company or organization.",
  anywhere: "In or at any place.",
  furthermore: "In addition; moreover.",
  transforming: "Changing in form, appearance, or character.",
  industries: "Sectors of the economy related to production and services.",
  improving: "Making something better.",
  efficiency: "The ability to do something well without wasting time or resources.",
  communication: "The exchange of information or ideas.",
  innovation: "The introduction of new ideas, methods, or products.",
  workers: "People who do work, especially manual or industrial labor.",
  adapt: "To adjust to new conditions or situations.",
  developing: "Growing or expanding by acquiring new skills or qualities.",
  skills: "The abilities needed to do something well.",
  remain: "To continue to be something.",
  competitive: "Able to compete successfully with others.",
  constantly: "Continuously over time; always.",
  evolving: "Changing or developing gradually over time."
    },
    wordTranslations: {
     technology: "科技",
  rapidly: "迅速地",
  changing: "改變中",
  job: "工作",
  market: "市場",
  creating: "創造",
  new: "新的",
  opportunities: "機會",
  challenges: "挑戰",
  automation: "自動化",
  artificial: "人工的",
  intelligence: "智慧",
  replacing: "取代",
  certain: "特定的",
  manual: "手動的",
  repetitive: "重複的",
  tasks: "任務",
  leading: "導致",
  losses: "損失",
  sectors: "部門",
  roles: "角色",
  data: "數據",
  analysts: "分析師",
  software: "軟體",
  developers: "開發人員",
  digital: "數位的",
  marketers: "行銷人員",
  rise: "興起",
  remote: "遠端的",
  work: "工作",
  result: "結果",
  technological: "技術的",
  advancements: "進步",
  allowing: "允許",
  employees: "員工",
  anywhere: "任何地方",
  furthermore: "此外",
  transforming: "轉變",
  industries: "產業",
  improving: "改善",
  efficiency: "效率",
  communication: "溝通",
  innovation: "創新",
  workers: "勞工",
  adapt: "適應",
  developing: "發展",
  skills: "技能",
  remain: "保持",
  competitive: "有競爭力的",
  constantly: "不斷地",
  evolving: "演變中"
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