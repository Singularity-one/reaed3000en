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
      name: 'TheImpactOfTourismOnLocalCulture',
      data() {
        return {
          audioSource: require('../mp3/26.The impact of tourism on local culture.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Tourism can have both positive and negative effects on local culture. When visitors come to a place, they bring new ideas, customs, and ways of life. This can help people learn about different traditions and create understanding between cultures. However, tourism can also cause problems. Some local traditions may change or disappear because businesses focus on what visitors want instead of local needs. Popular places may become too crowded, making life difficult for residents. To protect local culture, communities should find a balance between welcoming tourists and keeping their traditions alive. Sustainable tourism can help preserve cultural heritage.',
          wordExplanations: {
    tourism: "The business or activity of providing services to travelers and visitors.",
  can: "Be able to; having the possibility to.",
  have: "Possess or experience something.",
  both: "Two things together; including two parts.",
  positive: "Good or beneficial.",
  negative: "Bad or harmful.",
  effects: "Results or impacts caused by something.",
  on: "Indicating a relation or position with respect to something.",
  local: "Relating to a particular area or community.",
  culture: "The ideas, customs, and social behavior of a particular group.",
  when: "At the time that; whenever.",
  visitors: "People who go to a place for pleasure or interest.",
  come: "To move toward or arrive at a place.",
  place: "A particular location or area.",
  they: "Used to refer to people or things previously mentioned.",
  bring: "To carry or take something to a place.",
  new: "Not existing before; recently made or discovered.",
  ideas: "Thoughts or suggestions about what to do.",
  customs: "Traditional ways of behaving or doing things.",
  ways: "Methods or styles of doing something.",
  life: "The existence of living beings.",
  this: "Referring to something just mentioned.",
  help: "To make it easier for someone to do something.",
  people: "Human beings in general.",
  learn: "To gain knowledge or skill.",
  about: "Concerning or relating to.",
  different: "Not the same as another or each other.",
  traditions: "Customs or beliefs passed down through generations.",
  create: "To bring something into existence.",
  understanding: "The ability to comprehend or grasp meaning.",
  between: "In the space separating two things.",
  cultures: "Different groups with their own customs and social behaviors.",
  however: "In spite of that; nevertheless.",
  cause: "To make something happen.",
  problems: "Difficulties or issues that need solutions.",
  some: "An unspecified amount or number.",
  may: "Expressing possibility.",
  change: "To make or become different.",
  or: "Used to link alternatives.",
  disappear: "To cease to be visible or exist.",
  because: "For the reason that.",
  businesses: "Organizations involved in commercial activities.",
  focus: "To concentrate attention or effort on something.",
  what: "That which; the thing or things that.",
  want: "To desire or wish for something.",
  instead: "As a substitute or alternative.",
  needs: "Requirements or necessities.",
  popular: "Liked or enjoyed by many people.",
  places: "Locations or areas.",
  become: "To begin to be.",
  too: "More than is necessary or desirable.",
  crowded: "Filled with too many people.",
  making: "Causing to happen or exist.",
  difficult: "Not easy; requiring effort.",
  for: "Indicating the intended purpose or recipient.",
  residents: "People who live in a particular place.",
  to: "Expressing direction or purpose.",
  protect: "To keep safe from harm or damage.",
  communities: "Groups of people living in the same area or sharing common interests.",
  should: "Used to indicate obligation or correctness.",
  find: "To discover or come upon something.",
  balance: "A state where different things are in equal proportion.",
  welcoming: "Showing friendliness to guests or visitors.",
  tourists: "People who travel for pleasure.",
  keeping: "Continuing to have or hold.",
  their: "Belonging to them.",
  alive: "Living or continuing to exist.",
  sustainable: "Able to be maintained at a certain rate without depletion.",
  preserve: "To keep something in its original state or protect it.",
  cultural: "Relating to culture.",
  heritage: "Valued objects or qualities passed down from previous generations."
    },
    wordTranslations: {
    tourism: "旅遊",
  can: "能夠",
  have: "擁有",
  both: "兩者",
  positive: "正面的",
  negative: "負面的",
  effects: "影響",
  on: "在…上",
  local: "當地的",
  culture: "文化",
  when: "當…時",
  visitors: "遊客",
  come: "來",
  place: "地方",
  they: "他們",
  bring: "帶來",
  new: "新的",
  ideas: "想法",
  customs: "習俗",
  ways: "方式",
  life: "生活",
  this: "這",
  help: "幫助",
  people: "人們",
  learn: "學習",
  about: "關於",
  different: "不同的",
  traditions: "傳統",
  create: "創造",
  understanding: "理解",
  between: "在…之間",
  cultures: "文化群體",
  however: "然而",
  cause: "造成",
  problems: "問題",
  some: "一些",
  may: "可能",
  change: "改變",
  or: "或是",
  disappear: "消失",
  because: "因為",
  businesses: "企業",
  focus: "專注",
  what: "什麼",
  want: "想要",
  instead: "取代",
  needs: "需求",
  popular: "受歡迎的",
  places: "地方",
  become: "變成",
  too: "太",
  crowded: "擁擠的",
  making: "使得",
  difficult: "困難的",
  for: "為了",
  residents: "居民",
  to: "為了",
  protect: "保護",
  communities: "社區",
  should: "應該",
  find: "找到",
  balance: "平衡",
  welcoming: "歡迎的",
  tourists: "觀光客",
  keeping: "保持",
  their: "他們的",
  alive: "活著的",
  sustainable: "永續的",
  preserve: "保存",
  cultural: "文化的",
  heritage: "遺產"
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