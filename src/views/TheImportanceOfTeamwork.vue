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
      name: 'TheImportanceOfTeamwork',
      data() {
        return {
          audioSource: require('../mp3/23.The importance of teamwork.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Teamwork is essential in achieving success in many areas of life. Working with others allows individuals to combine their skills, knowledge, and strengths to reach common goals. In a team, members can support each other, share ideas, and solve problems more effectively than working alone. Teamwork also helps develop communication, collaboration, and leadership skills, which are valuable in both personal and professional settings. Additionally, working in a team can increase motivation and morale, as individuals feel more connected and engaged. Overall, teamwork fosters creativity, enhances productivity, and leads to better outcomes in many situations.',
          wordExplanations: {
   teamwork: "The combined effort of a group of people working together to achieve a common goal.",
  essential: "Absolutely necessary or extremely important.",
  achieving: "Successfully reaching or attaining something by effort or skill.",
  success: "The accomplishment of an aim or purpose.",
  areas: "Fields or aspects of activity, study, or life.",
  life: "The existence of an individual human being or animal.",
  working: "Engaging in physical or mental activity to achieve a result.",
  others: "People other than yourself.",
  allows: "Permits or enables something to happen.",
  individuals: "Single human beings, distinct from a group.",
  combine: "To join or mix together different things.",
  skills: "The ability to do something well, usually gained through training or experience.",
  knowledge: "Information, understanding, or awareness gained through learning or experience.",
  strengths: "Qualities or abilities that make someone effective or strong.",
  reach: "To arrive at or attain something.",
  common: "Shared by two or more people or groups.",
  goals: "The objectives or targets someone aims to achieve.",
  team: "A group of people who work together to achieve something.",
  members: "People who belong to a group or organization.",
  support: "To help or give assistance to someone or something.",
  share: "To give part of something to others.",
  ideas: "Thoughts or suggestions about what to do.",
  solve: "To find an answer to a problem or question.",
  problems: "Situations that are difficult to deal with or understand.",
  effectively: "In a way that produces the desired result.",
  alone: "Without other people; by oneself.",
  develop: "To grow or improve something over time.",
  communication: "The exchange of information or ideas between people.",
  collaboration: "Working together with others to achieve a goal.",
  leadership: "The ability to guide or direct others.",
  valuable: "Very useful or important.",
  personal: "Relating to an individual.",
  professional: "Relating to a job or career.",
  settings: "Environments or situations in which something occurs.",
  additionally: "Also; in addition.",
  increase: "To make something greater in amount or number.",
  motivation: "The reason or desire to do something.",
  morale: "The level of confidence and enthusiasm among a group of people.",
  connected: "Linked or associated with others.",
  engaged: "Involved or interested in something.",
  fosters: "Encourages or promotes the development of something.",
  creativity: "The ability to produce new and original ideas.",
  enhances: "Improves or makes something better.",
  productivity: "The rate at which work is completed or goods are produced.",
  leads: "Results in or causes something to happen.",
  outcomes: "Results or consequences of an action or event.",
  situations: "Particular sets of circumstances."
    },
    wordTranslations: {
 teamwork: "團隊合作",
  essential: "必要的",
  achieving: "達成",
  success: "成功",
  areas: "領域",
  life: "生活",
  working: "工作",
  others: "他人",
  allows: "允許",
  individuals: "個人",
  combine: "結合",
  skills: "技能",
  knowledge: "知識",
  strengths: "長處",
  reach: "達到",
  common: "共同的",
  goals: "目標",
  team: "團隊",
  members: "成員",
  support: "支持",
  share: "分享",
  ideas: "想法",
  solve: "解決",
  problems: "問題",
  effectively: "有效地",
  alone: "獨自地",
  develop: "發展",
  communication: "溝通",
  collaboration: "協作",
  leadership: "領導能力",
  valuable: "有價值的",
  personal: "個人的",
  professional: "職業的",
  settings: "情境",
  additionally: "此外",
  increase: "增加",
  motivation: "動力",
  morale: "士氣",
  connected: "有連結的",
  engaged: "投入的",
  fosters: "促進",
  creativity: "創造力",
  enhances: "提升",
  productivity: "生產力",
  leads: "導致",
  outcomes: "結果",
  situations: "情況"
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