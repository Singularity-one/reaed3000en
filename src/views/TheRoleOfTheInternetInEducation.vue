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
      name: 'TheRoleOfTheInternetInEducation',
      data() {
        return {
          audioSource: require('../mp3/12.The role of the internet in education.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'The internet has transformed education by providing access to a wealth of information and learning resources. Students can now access online courses, educational videos, and digital libraries from anywhere, at any time. This has made learning more flexible and accessible, especially for those in remote areas. The internet also allows for interactive learning through online forums, virtual classrooms, and collaborative tools. Teachers can use digital platforms to share materials and communicate with students more effectively. Overall, the internet has revolutionized education, offering new opportunities for learners and educators to connect and expand their knowledge.',
          wordExplanations: {
       internet: 'a global computer network providing a variety of information and communication facilities.',
  transformed: 'make a thorough or dramatic change in form, appearance, or character.',
  education: 'the process of receiving or giving systematic instruction, especially at a school or university.',
  providing: 'make available for use; supply.',
  access: 'the ability or right to approach, enter, or use something.',
  wealth: 'a large amount of something, especially valuable things such as resources or knowledge.',
  information: 'facts provided or learned about something or someone.',
  learning: 'the acquisition of knowledge or skills through study or experience.',
  resources: 'materials or assets used to help achieve a goal or solve a problem.',
  students: 'people who are studying at a school or other educational institution.',
  online: 'controlled by or connected to a computer or the internet.',
  courses: 'a series of lessons or lectures on a particular subject.',
  educational: 'related to the process of teaching and learning.',
  videos: 'recordings of moving visual images.',
  digital: 'involving or relating to the use of computer technology.',
  libraries: 'collections of books, articles, and other resources available for reading or reference.',
  anywhere: 'in or at any place.',
  anytime: 'at any time or moment.',
  flexible: 'able to change or be adapted to new conditions.',
  accessible: 'able to be reached or entered; easy to use or understand.',
  especially: 'used to single out one person, thing, or situation over all others.',
  remote: 'far away from cities or other populated areas.',
  areas: 'regions or parts of a place.',
  allows: 'permits or enables something to happen.',
  interactive: 'involving communication between people or between a person and a computer.',
  forums: 'online discussion sites where people can post messages and discuss topics.',
  virtual: 'existing or occurring on computers or on the internet.',
  classrooms: 'places where classes are held.',
  collaborative: 'produced or conducted by two or more parties working together.',
  tools: 'devices or implements used to carry out a particular function.',
  teachers: 'people who help others acquire knowledge, skills, or values.',
  platforms: 'digital services or technologies used to perform functions or deliver content.',
  share: 'to give a portion of something to others.',
  materials: 'substances or information used in teaching or learning.',
  communicate: 'share or exchange information, news, or ideas.',
  effectively: 'in a way that produces the intended result.',
  overall: 'taken as a whole; in general.',
  revolutionized: 'completely changed something, especially by making it more effective or modern.',
  offering: 'presenting or providing something for consideration.',
  opportunities: 'chances for advancement or progress.',
  learners: 'people who are gaining knowledge or skills.',
  educators: 'people who provide instruction or education; teachers.',
  connect: 'bring together or establish a relationship between things.',
  expand: 'become or make larger or more extensive.',
  knowledge: 'facts, information, and skills acquired through experience or education.',
    },
    wordTranslations: {
     internet: '網際網路',
  transformed: '改變了',
  education: '教育',
  providing: '提供',
  access: '取得、接觸',
  wealth: '大量、豐富',
  information: '資訊',
  learning: '學習',
  resources: '資源',
  students: '學生',
  online: '線上',
  courses: '課程',
  educational: '教育的',
  videos: '影片',
  digital: '數位的',
  libraries: '圖書館',
  anywhere: '任何地方',
  anytime: '任何時間',
  flexible: '有彈性的',
  accessible: '可接近的、易取得的',
  especially: '尤其',
  remote: '偏遠的',
  areas: '地區',
  allows: '允許',
  interactive: '互動的',
  forums: '論壇',
  virtual: '虛擬的',
  classrooms: '教室',
  collaborative: '合作的',
  tools: '工具',
  teachers: '老師',
  platforms: '平台',
  share: '分享',
  materials: '教材',
  communicate: '溝通',
  effectively: '有效地',
  overall: '整體而言',
  revolutionized: '徹底改變了',
  offering: '提供',
  opportunities: '機會',
  learners: '學習者',
  educators: '教育者',
  connect: '連接',
  expand: '擴展',
  knowledge: '知識',
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