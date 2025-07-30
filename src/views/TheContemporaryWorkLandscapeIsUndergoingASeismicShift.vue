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
      name: 'TheContemporaryWorkLandscapeIsUndergoingASeismicShift',
      data() {
        return {
          audioSource: require('../mp3/24.The contemporary work landscape is undergoing a seismic shift.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'The contemporary work landscape is undergoing a seismic shift.  Traditional hierarchical structures are giving way to more agile, collaborative workspaces. 1   Globalization necessitates cross-cultural communication and adaptability. 2   Furthermore, the proliferation of automation and artificial intelligence is reshaping job roles, demanding upskilling and reskilling initiatives. 3   Individuals must cultivate a growth mindset, embracing lifelong learning to remain competitive in this dynamic environment. 4   Entrepreneurship is also flourishing, with innovative startups disrupting established industries and creating novel opportunities. 5   Success in the modern business world hinges on ingenuity, resilience, and a commitment to ethical practices.',
          wordExplanations: {
  contemporary: "Belonging to the present time; modern.",
  work: "Activity involving effort to achieve a purpose or result, typically as a job.",
  landscape: "The overall situation or environment of a particular area or field.",
  undergoing: "Experiencing or going through something, usually a process or change.",
  seismic: "Relating to or having a strong or dramatic effect, like an earthquake.",
  shift: "A change or move from one position or idea to another.",
  traditional: "Existing in or as part of a tradition; long-established.",
  hierarchical: "Arranged in order of rank or authority.",
  structures: "The arrangement or organization of parts to form a whole.",
  giving: "Offering or yielding something.",
  way: "A method, style, or manner of doing something.",
  agile: "Able to move quickly and easily; adaptable.",
  collaborative: "Involving two or more people working together to achieve something.",
  workspaces: "Physical or virtual environments where work is done.",
  globalization: "The process of interaction and integration among people, companies, and governments worldwide.",
  necessitates: "Makes something necessary or unavoidable.",
  cross: "Involving or extending across two or more things.",
  cultural: "Relating to the ideas, customs, and social behavior of a society.",
  communication: "The exchange of information between people.",
  adaptability: "The ability to adjust to new conditions.",
  proliferation: "A rapid increase in number or spread.",
  automation: "The use of technology to perform tasks without human intervention.",
  artificial: "Made by humans, not occurring naturally.",
  intelligence: "The ability to acquire and apply knowledge and skills.",
  reshaping: "Forming something again or differently.",
  job: "A paid position of regular employment.",
  roles: "The functions or parts played by people or things in a particular situation.",
  demanding: "Requiring a lot of effort, skill, or attention.",
  upskilling: "Learning new skills to improve your abilities.",
  reskilling: "Learning new skills to do a different job.",
  initiatives: "New plans or actions intended to solve a problem or improve a situation.",
  individuals: "Single persons, distinct from a group.",
  cultivate: "To develop or improve something with care.",
  growth: "An increase or development.",
  mindset: "A set of attitudes or fixed ideas held by someone.",
  embracing: "Accepting or supporting willingly.",
  lifelong: "Continuing through a person’s life.",
  learning: "The process of gaining knowledge or skills.",
  remain: "To continue to be in a particular state or condition.",
  competitive: "Being able to compete successfully with others.",
  dynamic: "Constantly changing or progressing.",
  environment: "The surrounding conditions where a person or thing exists.",
  entrepreneurship: "The activity of setting up a business, taking on financial risks.",
  flourishing: "Developing rapidly and successfully.",
  innovative: "Introducing new ideas or methods.",
  startups: "Newly established businesses.",
  disrupting: "Causing disorder or change in a system.",
  established: "Having been in existence for a long time and recognized.",
  industries: "Branches of economic activity, especially manufacturing.",
  creating: "Bringing something into existence.",
  novel: "New or unusual.",
  opportunities: "Chances for advancement or progress.",
  success: "The accomplishment of a goal or purpose.",
  modern: "Relating to the present or recent times.",
  business: "Commercial activity of providing goods or services.",
  world: "The realm of human existence or activity.",
  hinges: "Depends entirely on.",
  ingenuity: "The ability to invent or think creatively.",
  resilience: "The capacity to recover quickly from difficulties.",
  commitment: "A strong dedication or obligation to something.",
  ethical: "Morally right or acceptable.",
  practices: "The actual application of an idea or method."
    },
    wordTranslations: {
    contemporary: "當代的",
  work: "工作",
  landscape: "局勢",
  undergoing: "經歷",
  seismic: "劇烈的",
  shift: "轉變",
  traditional: "傳統的",
  hierarchical: "階層式的",
  structures: "結構",
  giving: "給予",
  way: "方式",
  agile: "靈活的",
  collaborative: "合作的",
  workspaces: "工作空間",
  globalization: "全球化",
  necessitates: "使…成為必要",
  cross: "跨越",
  cultural: "文化的",
  communication: "溝通",
  adaptability: "適應力",
  proliferation: "激增",
  automation: "自動化",
  artificial: "人工的",
  intelligence: "智慧",
  reshaping: "重新塑造",
  job: "工作",
  roles: "角色",
  demanding: "要求高的",
  upskilling: "提升技能",
  reskilling: "重新訓練",
  initiatives: "倡議",
  individuals: "個人",
  cultivate: "培養",
  growth: "成長",
  mindset: "心態",
  embracing: "擁抱",
  lifelong: "終身的",
  learning: "學習",
  remain: "保持",
  competitive: "有競爭力的",
  dynamic: "動態的",
  environment: "環境",
  entrepreneurship: "創業精神",
  flourishing: "蓬勃發展的",
  innovative: "創新的",
  startups: "新創公司",
  disrupting: "顛覆",
  established: "既有的",
  industries: "產業",
  creating: "創造",
  novel: "新穎的",
  opportunities: "機會",
  success: "成功",
  modern: "現代的",
  business: "商業",
  world: "世界",
  hinges: "取決於",
  ingenuity: "創造力",
  resilience: "韌性",
  commitment: "承諾",
  ethical: "道德的",
  practices: "實踐"
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