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
      name: 'TheImportanceOfFamilyValues',
      data() {
        return {
          audioSource: require('../mp3/27.The importance of family values.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Family values are important because they shape a person’s character and guide their actions. Respect, honesty, and kindness are often learned at home. These values help people build strong relationships and make good decisions in life. Families also provide emotional support, giving comfort during difficult times. When children grow up in a loving and supportive home, they are more likely to become responsible and caring adults. In modern society, where people are often busy, spending time with family helps maintain strong bonds. By teaching and following good values, families create a better future for both individuals and communities.',
          wordExplanations: {
family: "A group consisting of parents and their children living together.",
  values: "Principles or standards of behavior; what is important in life.",
  are: "Present tense of 'be'; used to describe a state or condition.",
  important: "Having great significance or value.",
  because: "For the reason that.",
  they: "Refers to people or things previously mentioned.",
  shape: "To influence or determine the nature of something.",
  person: "Belonging to a particular individual.",
  and: "Used to connect words or phrases together.",
  guide: "To show the way or direct actions.",
  their: "Belonging to them.",
  actions: "Things done by a person.",
  respect: "A feeling of admiration or consideration for someone.",
  honesty: "The quality of being truthful and fair.",
  kindness: "The quality of being friendly and generous.",
  often: "Frequently; many times.",
  learned: "Acquired knowledge or skill through experience or study.",
  at: "Indicates a specific place or time.",
  home: "The place where one lives.",
  these: "Referring to things previously mentioned.",
  help: "To assist or make something easier.",
  people: "Human beings in general.",
  build: "To construct or develop.",
  strong: "Having great strength or power.",
  relationships: "Connections or associations between people.",
  make: "To create or cause to happen.",
  good: "Having positive qualities.",
  decisions: "Choices made after consideration.",
  in: "Indicates location or situation.",
  life: "The existence of living beings.",
  families: "More than one family group.",
  also: "In addition; too.",
  provide: "To supply or make available.",
  emotional: "Relating to feelings.",
  support: "Help or assistance.",
  giving: "Providing or granting.",
  comfort: "A state of physical ease or relief.",
  during: "Throughout the duration of.",
  difficult: "Not easy; requiring effort.",
  times: "Periods or moments.",
  when: "At the time that.",
  children: "Young human beings; boys and girls.",
  grow: "To increase in size or develop.",
  up: "Indicating movement to a higher position.",
  loving: "Showing love or affection.",
  supportive: "Providing encouragement or help.",
  more: "A greater amount or degree.",
  likely: "Probable; expected to happen.",
  become: "To begin to be.",
  responsible: "Having an obligation to do something; trustworthy.",
  caring: "Showing concern and kindness.",
  adults: "Fully grown persons.",
  modern: "Relating to the present time.",
  society: "A community of people living together.",
  where: "In or at which place.",
  busy: "Actively engaged in work or activity.",
  spending: "Using time or resources.",
  time: "Measured or measurable period.",
  maintain: "To keep in good condition or continue.",
  bonds: "Connections or ties between people.",
  by: "Indicating the means of achieving something.",
  teaching: "Giving instruction or knowledge.",
  following: "Going or coming after; adhering to.",
  create: "To bring into existence.",
  better: "Of superior quality or more desirable.",
  future: "The time yet to come.",
  both: "Two together; including two parts.",
  individuals: "Separate persons distinct from a group.",
  communities: "Groups of people living together or having common interests."
    },
    wordTranslations: {
    family: "家庭",
  values: "價值觀",
  are: "是",
  important: "重要的",
  because: "因為",
  they: "他們",
  shape: "塑造",
  person: "某人的",
  and: "和",
  guide: "引導",
  their: "他們的",
  actions: "行為",
  respect: "尊重",
  honesty: "誠實",
  kindness: "善良",
  often: "經常",
  learned: "學習",
  at: "在",
  home: "家",
  these: "這些",
  help: "幫助",
  people: "人們",
  build: "建立",
  strong: "強大的",
  relationships: "關係",
  make: "做出",
  good: "好的",
  decisions: "決定",
  in: "在",
  life: "生活",
  families: "家庭們",
  also: "也",
  provide: "提供",
  emotional: "情感的",
  support: "支持",
  giving: "給予",
  comfort: "安慰",
  during: "在…期間",
  difficult: "困難的",
  times: "時刻",
  when: "當…時",
  children: "孩子們",
  grow: "成長",
  up: "向上",
  loving: "有愛的",
  supportive: "支持的",
  more: "更多",
  likely: "可能",
  become: "成為",
  responsible: "負責任的",
  caring: "關懷的",
  adults: "成年人",
  modern: "現代的",
  society: "社會",
  where: "在哪裡",
  busy: "忙碌的",
  spending: "花費",
  time: "時間",
  maintain: "維持",
  bonds: "聯繫",
  by: "透過",
  teaching: "教導",
  following: "遵循",
  create: "創造",
  better: "更好的",
  future: "未來",
  both: "兩者",
  individuals: "個人",
  communities: "社區"
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