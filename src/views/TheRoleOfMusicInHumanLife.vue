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
      name: 'TheRoleOfMusicInHumanLife',
      data() {
        return {
          audioSource: require('../mp3/29.The role of music in human life.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Music plays an important role in human life by bringing people together and expressing emotions. It can create happiness, reduce stress, and provide comfort during difficult times. Many people listen to music to relax or feel motivated. Music is also a way to share culture and history, helping people understand different traditions. Learning to play an instrument or sing can improve creativity and discipline. In social events, music helps build connections between individuals. Whether for entertainment, celebration, or personal growth, music is a powerful part of life that influences emotions, thoughts, and relationships in many ways.',
          wordExplanations: {
  music: "The art of arranging sounds in time to produce a composition through melody, harmony, rhythm, and timbre.",
  plays: "Performs or participates in an activity.",
  important: "Having great significance or value.",
  role: "The function or part played by a person or thing.",
  human: "Relating to people.",
  life: "The existence of living beings.",
  bringing: "Causing to come together or arrive.",
  people: "Human beings in general.",
  together: "In or into one place, group, or mass.",
  expressing: "Conveying thoughts or feelings.",
  emotions: "Strong feelings such as happiness, sadness, anger, etc.",
  create: "To bring into existence.",
  happiness: "The state of being happy.",
  reduce: "To make smaller or less.",
  stress: "Mental or emotional strain.",
  provide: "To supply or make available.",
  comfort: "A state of physical ease or relief.",
  during: "Throughout the duration of.",
  difficult: "Not easy; requiring effort.",
  times: "Periods or moments.",
  many: "A large number of.",
  listen: "To give attention to sound.",
  relax: "To become less tense or anxious.",
  feel: "To experience an emotion or sensation.",
  motivated: "Provided with a reason or incentive to act.",
  also: "In addition.",
  way: "A method or manner of doing something.",
  share: "To have or use something with others.",
  culture: "The ideas, customs, and social behavior of a particular group.",
  history: "The study of past events.",
  helping: "Making it easier for someone to do something.",
  understand: "To grasp the meaning or importance.",
  different: "Not the same as another or each other.",
  traditions: "Customs or beliefs passed down through generations.",
  learning: "The acquisition of knowledge or skills.",
  instrument: "A tool or device used to produce music.",
  sing: "To produce musical tones with the voice.",
  improve: "To make better.",
  creativity: "The ability to produce new and original ideas.",
  discipline: "The practice of training oneself to obey rules or a code of behavior.",
  social: "Relating to society or community.",
  events: "Occasions or activities.",
  helps: "Makes easier or assists.",
  build: "To develop or form.",
  connections: "Relationships or links between people.",
  between: "In the space separating two or more things.",
  individuals: "Single persons distinct from a group.",
  whether: "Expressing a choice or doubt between alternatives.",
  entertainment: "Activities that provide amusement or enjoyment.",
  celebration: "The action of marking a special event with festivities.",
  personal: "Relating to an individual.",
  growth: "The process of developing or improving.",
  powerful: "Having great power or influence.",
  part: "A portion or segment of something.",
  that: "Referring to something previously mentioned.",
  influences: "Affects or changes.",
  thoughts: "Ideas or opinions produced by thinking.",
  relationships: "Connections or associations between people.",
  ways: "Methods or manners."
    },
    wordTranslations: {
music: "音樂",
  plays: "演奏",
  important: "重要的",
  role: "角色",
  human: "人類的",
  life: "生命",
  bringing: "帶來",
  people: "人們",
  together: "一起",
  expressing: "表達",
  emotions: "情感",
  create: "創造",
  happiness: "快樂",
  reduce: "減少",
  stress: "壓力",
  provide: "提供",
  comfort: "安慰",
  during: "在…期間",
  difficult: "困難的",
  times: "時期",
  many: "許多",
  listen: "聆聽",
  relax: "放鬆",
  feel: "感覺",
  motivated: "有動力的",
  also: "也",
  way: "方式",
  share: "分享",
  culture: "文化",
  history: "歷史",
  helping: "幫助",
  understand: "理解",
  different: "不同的",
  traditions: "傳統",
  learning: "學習",
  instrument: "樂器",
  sing: "唱歌",
  improve: "提升",
  creativity: "創造力",
  discipline: "紀律",
  social: "社交的",
  events: "活動",
  helps: "幫助",
  build: "建立",
  connections: "連結",
  between: "在…之間",
  individuals: "個人",
  whether: "是否",
  entertainment: "娛樂",
  celebration: "慶祝",
  personal: "個人的",
  growth: "成長",
  powerful: "強大的",
  part: "部分",
  that: "那",
  influences: "影響",
  thoughts: "思想",
  relationships: "關係",
  ways: "方式"
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