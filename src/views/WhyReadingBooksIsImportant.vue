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
      name: 'WaterConservation',
      data() {
        return {
          audioSource: require('../mp3/28.Why reading books is important.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Reading books is important because it helps people learn new ideas and improve their thinking skills. Books provide knowledge on many subjects, allowing readers to understand the world better. Reading also improves language skills, making communication easier. In addition, books help develop creativity and imagination by introducing different stories and perspectives. People who read often can think more critically and solve problems effectively. Reading also reduces stress and gives people a way to relax. In today’s fast-moving world, books remain a valuable source of information and personal growth. Developing a reading habit can lead to lifelong learning and success.',
          wordExplanations: {
reading: "The action or skill of understanding written or printed matter.",
  books: "Printed works consisting of pages bound together.",
  is: "Third person singular present of 'be'.",
  important: "Having great significance or value.",
  because: "For the reason that.",
  it: "Used to refer to a thing previously mentioned.",
  helps: "Makes it easier or possible for someone to do something.",
  people: "Human beings in general.",
  learn: "To gain knowledge or skill by study or experience.",
  new: "Not existing before; recently made or discovered.",
  ideas: "Thoughts or suggestions about what to do.",
  and: "Used to connect words or phrases together.",
  improve: "To make or become better.",
  their: "Belonging to them.",
  thinking: "The process of using the mind to consider or reason about something.",
  skills: "The abilities needed to do something well.",
  provide: "To make available or supply.",
  knowledge: "Information, understanding, or skills gained through experience or education.",
  on: "Indicating the subject of something.",
  many: "A large number of.",
  subjects: "Areas of knowledge studied or taught.",
  allowing: "Permitting or giving opportunity to do something.",
  readers: "People who read.",
  understand: "To grasp the meaning or importance of something.",
  the: "Used to specify something previously mentioned or known.",
  world: "The earth and all its inhabitants.",
  better: "Of superior quality or more desirable.",
  also: "In addition; too.",
  improves: "Makes better or enhances.",
  language: "The method of human communication, spoken or written.",
  making: "Causing to happen or exist.",
  communication: "The exchange of information or ideas.",
  easier: "Less difficult or requiring less effort.",
  addition: "Something added to what already exists.",
  develop: "To grow or cause to grow and become more mature or advanced.",
  creativity: "The use of imagination to create something new.",
  imagination: "The ability to form mental images or concepts.",
  by: "Indicating the means or agent performing an action.",
  introducing: "Presenting something for the first time.",
  different: "Not the same as another or each other.",
  stories: "Narratives or accounts of events.",
  perspectives: "Points of view or ways of regarding something.",
  who: "Used to introduce a clause about a person.",
  read: "To look at and comprehend written language.",
  often: "Frequently; many times.",
  can: "Be able to.",
  think: "To use one’s mind to consider or reason.",
  more: "A greater amount or degree.",
  critically: "In a way that involves careful judgment or evaluation.",
  solve: "To find an answer to a problem or question.",
  problems: "Difficulties needing solutions.",
  effectively: "In a way that produces the desired result.",
  reduces: "Makes smaller or less.",
  stress: "Mental or emotional strain.",
  gives: "Provides or grants.",
  way: "A method or manner of doing something.",
  relax: "To become less tense or anxious.",
  today: "Of the present day.",
  remain: "To continue to be.",
  valuable: "Having worth or importance.",
  source: "A place, person, or thing from which something comes.",
  information: "Facts or knowledge provided or learned about something.",
  personal: "Relating to an individual person.",
  growth: "The process of developing or improving.",
  developing: "Growing or improving.",
  habit: "A regular practice or routine.",
  lead: "To cause or result in a particular outcome.",
  lifelong: "Lasting for the whole of a person’s life.",
  learning: "The acquisition of knowledge or skills.",
  success: "The accomplishment of an aim or purpose."
    },
    wordTranslations: {
reading: "閱讀",
  books: "書籍",
  is: "是",
  important: "重要的",
  because: "因為",
  it: "它",
  helps: "幫助",
  people: "人們",
  learn: "學習",
  new: "新的",
  ideas: "想法",
  and: "和",
  improve: "改善",
  their: "他們的",
  thinking: "思考",
  skills: "技能",
  provide: "提供",
  knowledge: "知識",
  on: "在…上",
  many: "許多",
  subjects: "科目",
  allowing: "允許",
  readers: "讀者",
  understand: "理解",
  the: "這",
  world: "世界",
  better: "更好",
  also: "也",
  improves: "改善",
  language: "語言",
  making: "使得",
  communication: "溝通",
  easier: "更容易",
  addition: "另外",
  develop: "發展",
  creativity: "創造力",
  imagination: "想像力",
  by: "藉由",
  introducing: "介紹",
  different: "不同的",
  stories: "故事",
  perspectives: "觀點",
  who: "誰",
  read: "閱讀",
  often: "經常",
  can: "能夠",
  think: "思考",
  more: "更多",
  critically: "批判性地",
  solve: "解決",
  problems: "問題",
  effectively: "有效地",
  reduces: "減少",
  stress: "壓力",
  gives: "給予",
  way: "方式",
  relax: "放鬆",
  today: "今天的",
  remain: "保持",
  valuable: "珍貴的",
  source: "來源",
  information: "資訊",
  personal: "個人的",
  growth: "成長",
  developing: "發展中",
  habit: "習慣",
  lead: "導致",
  lifelong: "終身的",
  learning: "學習",
  success: "成功"
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