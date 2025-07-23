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
      name: 'HealthyeatingHabits',
      data() {
        return {
          audioSource: require('../mp3/8.Healthy_eating_habits.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Healthy eating habits are important for maintaining overall well-being. A balanced diet, which includes a variety of fruits, vegetables, whole grains, and lean proteins, provides essential nutrients that the body needs. Eating regular meals and avoiding excessive consumption of sugary or processed foods helps control weight and reduces the risk of chronic diseases such as heart disease and diabetes. Drinking plenty of water, reducing salt intake, and choosing healthier cooking methods like grilling or steaming can also contribute to a healthier lifestyle. By adopting good eating habits, individuals can improve their energy levels and quality of life.',
          wordExplanations: {
  healthy: 'in good physical or mental condition.',
  eating: 'the act of consuming food.',
  habits: 'regular practices or routines.',
  important: 'having great significance or value.',
  maintaining: 'keeping something in good condition or continuing it.',
  overall: 'considering everything as a whole.',
  balanced: 'including different elements in the correct proportions.',
  diet: 'the kinds of food that a person usually eats.',
  includes: 'contains as part of the whole.',
  variety: 'a number of different types of things.',
  fruits: 'sweet and fleshy products of a tree or plant that can be eaten.',
  vegetables: 'plants or parts of plants used as food.',
  whole: 'complete, with nothing missing.',
  grains: 'small, hard seeds of food plants such as rice, wheat, etc.',
  lean: 'containing little or no fat.',
  proteins: 'essential nutrients that help build and repair body tissues.',
  provides: 'makes available for use; supplies.',
  essential: 'absolutely necessary or extremely important.',
  nutrients: 'substances needed by the body for growth and health.',
  body: 'the physical structure of a person.',
  needs: 'things that are necessary.',
  regular: 'happening at the same time intervals.',
  meals: 'times when food is eaten, such as breakfast, lunch, or dinner.',
  avoiding: 'keeping away from or not doing something.',
  excessive: 'more than is necessary or normal.',
  consumption: 'the act of using, eating, or drinking something.',
  sugary: 'containing a lot of sugar.',
  processed: 'prepared or changed by a special method, especially for preservation.',
  foods: 'any substance that people eat or drink.',
  helps: 'makes something easier or possible.',
  control: 'to manage or regulate.',
  weight: 'the amount something or someone weighs.',
  reduces: 'makes something smaller or less.',
  risk: 'the chance of something bad happening.',
  chronic: 'long-lasting or recurring frequently.',
  diseases: 'illnesses or medical conditions.',
  heart: 'the organ that pumps blood through the body.',
  diabetes: 'a disease where the body cannot control sugar levels properly.',
  drinking: 'the act of consuming liquid.',
  plenty: 'a large amount or number of something.',
  water: 'a clear liquid essential for life.',
  reducing: 'making smaller in amount or size.',
  salt: 'a white substance used to flavor food.',
  intake: 'the amount of something taken in.',
  choosing: 'selecting from different options.',
  healthier: 'better for health.',
  cooking: 'the act of preparing food with heat.',
  methods: 'ways of doing something.',
  grilling: 'cooking food on a grill over direct heat.',
  steaming: 'cooking food with the steam from boiling water.',
  contribute: 'to help make something happen.',
  lifestyle: 'a way of living.',
  adopting: 'starting to use or follow something new.',
  good: 'of high quality or standard.',
  improve: 'to make something better.',
  energy: 'strength and vitality needed for activity.',
  levels: 'the amount or degree of something.',
  quality: 'how good something is.',
  life: 'the existence of a person or animal.',  
    },
    wordTranslations: {
healthy: '健康的',
  eating: '飲食',
  habits: '習慣',
  important: '重要的',
  maintaining: '維持',
  overall: '整體的',
  balanced: '均衡的',
  diet: '飲食',
  includes: '包含',
  variety: '多樣性',
  fruits: '水果',
  vegetables: '蔬菜',
  whole: '完整的',
  grains: '穀物',
  lean: '低脂的',
  proteins: '蛋白質',
  provides: '提供',
  essential: '必要的',
  nutrients: '營養素',
  body: '身體',
  needs: '需要',
  regular: '規律的',
  meals: '餐',
  avoiding: '避免',
  excessive: '過多的',
  consumption: '消耗',
  sugary: '含糖的',
  processed: '加工的',
  foods: '食物',
  helps: '幫助',
  control: '控制',
  weight: '體重',
  reduces: '減少',
  risk: '風險',
  chronic: '慢性的',
  diseases: '疾病',
  heart: '心臟',
  diabetes: '糖尿病',
  drinking: '飲用',
  plenty: '充足的',
  water: '水',
  reducing: '減少',
  salt: '鹽',
  intake: '攝取',
  choosing: '選擇',
  healthier: '更健康的',
  cooking: '烹飪',
  methods: '方法',
  grilling: '燒烤',
  steaming: '蒸煮',
  contribute: '有助於',
  lifestyle: '生活方式',
  adopting: '採用',
  good: '良好的',
  improve: '改善',
  energy: '能量',
  levels: '程度',
  quality: '品質',
  life: '生活'
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