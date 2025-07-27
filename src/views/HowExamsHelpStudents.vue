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
      name: 'HowExamsHelpStudents',
      data() {
        return {
          audioSource: require('../mp3/20.How exams help students.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Exams play an important role in education by helping students demonstrate their knowledge and skills. They provide an opportunity to assess what students have learned and highlight areas that may need improvement. Exams also encourage students to review and consolidate their understanding of the material, which can enhance long-term retention. Furthermore, they help develop critical thinking, time management, and problem-solving abilities, as students must apply their knowledge under pressure. While exams can be stressful, they also prepare students for future challenges by testing their ability to perform in high-stakes situations, which is a valuable skill in life.',
          wordExplanations: {
      exams: 'tests taken by students to show what they have learned.',
  important: 'having great meaning or value.',
  education: 'the process of learning in schools or other settings.',
  helping: 'making it easier or better for someone to do something.',
  students: 'people who go to school to learn.',
  demonstrate: 'to show something clearly.',
  knowledge: 'information and understanding gained through learning.',
  skills: 'the ability to do something well.',
  provide: 'to give or offer something.',
  opportunity: 'a chance to do something.',
  assess: 'to judge or evaluate something.',
  learned: 'what students have studied and understood.',
  highlight: 'to point out or show clearly.',
  areas: 'specific parts or topics.',
  improvement: 'a change that makes something better.',
  encourage: 'to give support or confidence.',
  review: 'to look again at what has been learned.',
  consolidate: 'to make something stronger or more solid.',
  understanding: 'what someone knows and comprehends.',
  material: 'the content or information studied.',
  enhance: 'to improve or increase.',
  retention: 'the ability to remember things.',
  develop: 'to grow or improve.',
  abilities: 'skills or talents.',
  apply: 'to use something in a real situation.',
  stressful: 'causing worry or tension.',
  prepare: 'to get ready for something.',
  future: 'a time that has not yet come.',
  challenges: 'difficult tasks or problems.',
  testing: 'checking the quality or ability of something.',
  perform: 'to do a task or action.',
  situations: 'events or conditions in life.',
  valuable: 'very useful or important.',
  skill: 'an ability to do something well.',
  life: 'our experience and time in the world.',
    },
    wordTranslations: {
      exams: '考試',
  important: '重要的',
  education: '教育',
  helping: '幫助',
  students: '學生',
  demonstrate: '展示',
  knowledge: '知識',
  skills: '技能',
  provide: '提供',
  opportunity: '機會',
  assess: '評估',
  learned: '學到的',
  highlight: '強調',
  areas: '領域',
  improvement: '改進',
  encourage: '鼓勵',
  review: '複習',
  consolidate: '鞏固',
  understanding: '理解',
  material: '教材',
  enhance: '提升',
  retention: '記憶保留',
  develop: '發展',
  abilities: '能力',
  apply: '應用',
  stressful: '有壓力的',
  prepare: '準備',
  future: '未來',
  challenges: '挑戰',
  testing: '測試',
  perform: '表現',
  situations: '情境',
  valuable: '有價值的',
  skill: '技能',
  life: '生活',
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