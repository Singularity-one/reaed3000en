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
      name: 'WhyPeopleShouldVolunteer',
      data() {
        return {
          audioSource: require('../mp3/30.Why people should volunteer.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Volunteering is important because it helps both individuals and communities. When people volunteer, they support those in need and make society a better place. It also allows volunteers to gain new skills, meet different people, and feel a sense of purpose. Helping others can bring happiness and reduce stress. Many organizations, such as schools and hospitals, depend on volunteers to run their programs. Volunteering also teaches responsibility and kindness, making the world more caring. Whether through small or big actions, giving time to help others creates positive change. Everyone can contribute and make a difference by volunteering.',
          wordExplanations: {
volunteering: "The act of freely offering to do something without being paid.",
  is: "Third person singular present of 'be'.",
  important: "Having great significance or value.",
  because: "For the reason that.",
  it: "Referring to something previously mentioned.",
  helps: "Makes easier or assists.",
  both: "Including two things or people.",
  individuals: "Single persons distinct from a group.",
  and: "Used to connect words or phrases.",
  communities: "Groups of people living together or sharing common interests.",
  when: "At the time that.",
  people: "Human beings in general.",
  volunteer: "To offer to do something willingly without pay.",
  they: "Refers to people previously mentioned.",
  support: "To help or back up.",
  those: "Referring to people or things previously mentioned.",
  in: "Inside or within.",
  need: "A condition requiring something necessary or desirable.",
  make: "To cause to happen or create.",
  society: "A community of people living together.",
  better: "Of superior quality or more desirable.",
  place: "A particular position or location.",
  also: "In addition.",
  allows: "Permits or gives the opportunity.",
  volunteers: "People who volunteer.",
  gain: "To obtain or acquire.",
  new: "Not existing before; recently made or discovered.",
  skills: "Abilities to do something well.",
  meet: "To come into the presence of someone.",
  different: "Not the same as another or each other.",
  feel: "To experience an emotion or sensation.",
  sense: "A feeling or perception.",
  purpose: "The reason for which something is done.",
  helping: "Providing assistance.",
  others: "Other people.",
  bring: "To cause to come or go to a place.",
  happiness: "The state of being happy.",
  reduce: "To make smaller or less.",
  stress: "Mental or emotional strain.",
  many: "A large number of.",
  organizations: "Groups of people organized for a purpose.",
  such: "Of the type previously mentioned.",
  as: "Used to give examples.",
  schools: "Places for education.",
  hospitals: "Institutions providing medical care.",
  depend: "To rely on.",
  on: "Indicating reliance or support.",
  run: "To manage or operate.",
  their: "Belonging to them.",
  programs: "Planned activities or services.",
  teaches: "Instructs or imparts knowledge.",
  responsibility: "The state or fact of being accountable.",
  kindness: "The quality of being friendly and generous.",
  making: "Causing to happen.",
  the: "Referring to something specific.",
  world: "The earth and its inhabitants.",
  more: "To a greater extent.",
  caring: "Showing concern or empathy.",
  whether: "Indicating a choice or doubt between alternatives.",
  through: "By means of.",
  small: "Little in size or amount.",
  or: "Used to indicate alternatives.",
  big: "Large in size or extent.",
  actions: "Things done by a person.",
  giving: "Providing or granting.",
  time: "Measured or measurable period.",
  help: "To assist.",
  creates: "Causes to come into existence.",
  positive: "Good or beneficial.",
  change: "The act or process of becoming different.",
  everyone: "Every person.",
  contribute: "To give or add to a cause.",
  difference: "A change that makes something better or different.",
  by: "Indicating the means."
    },
    wordTranslations: {
volunteering: "志願服務",
  is: "是",
  important: "重要的",
  because: "因為",
  it: "它",
  helps: "幫助",
  both: "兩者",
  individuals: "個人",
  and: "和",
  communities: "社區",
  when: "當",
  people: "人們",
  volunteer: "志願",
  they: "他們",
  support: "支持",
  those: "那些",
  in: "在",
  need: "需要",
  make: "使",
  society: "社會",
  better: "更好",
  place: "地方",
  also: "也",
  allows: "允許",
  volunteers: "志願者",
  gain: "獲得",
  new: "新的",
  skills: "技能",
  meet: "遇見",
  different: "不同的",
  feel: "感覺",
  sense: "感覺",
  purpose: "目的",
  helping: "幫助",
  others: "他人",
  bring: "帶來",
  happiness: "快樂",
  reduce: "減少",
  stress: "壓力",
  many: "許多",
  organizations: "組織",
  such: "例如",
  as: "像是",
  schools: "學校",
  hospitals: "醫院",
  depend: "依賴",
  on: "在…上",
  run: "運作",
  their: "他們的",
  programs: "計劃",
  teaches: "教導",
  responsibility: "責任",
  kindness: "善良",
  making: "使得",
  the: "這",
  world: "世界",
  more: "更",
  caring: "關懷的",
  whether: "不論",
  through: "透過",
  small: "小的",
  or: "或",
  big: "大的",
  actions: "行動",
  giving: "給予",
  time: "時間",
  help: "幫助",
  creates: "創造",
  positive: "正面的",
  change: "改變",
  everyone: "每個人",
  contribute: "貢獻",
  difference: "不同",
  by: "透過"
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