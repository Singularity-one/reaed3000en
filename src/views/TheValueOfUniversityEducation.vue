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
      name: 'TheValueOfUniversityEducation',
      data() {
        return {
          audioSource: require('../mp3/16.The value of university education.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'University education offers many benefits, both personal and professional. It provides students with in-depth knowledge in their chosen fields and helps them develop critical thinking, problem-solving, and communication skills. A university degree can open doors to better job opportunities and higher salaries, as many employers value the advanced qualifications that come with it. Additionally, university life offers opportunities for personal growth, including making new connections, engaging in extracurricular activities, and gaining a broader perspective on the world. Overall, university education is an investment that can lead to long-term success and fulfillment in various areas of life.',
          wordExplanations: {
    university: 'an institution of higher education offering courses leading to degrees.',
  education: 'the process of receiving or giving systematic instruction.',
  offers: 'provides or makes available.',
  benefits: 'advantages or positive outcomes.',
  personal: 'relating to an individual.',
  professional: 'related to a job or career.',
  provides: 'gives or supplies.',
  students: 'people who are studying at an educational institution.',
  knowledge: 'information, understanding, and skills gained through learning or experience.',
  chosen: 'selected or picked out.',
  fields: 'areas of study or profession.',
  helps: 'assists or supports.',
  develop: 'to grow or improve over time.',
  communication: 'the ability to exchange information effectively.',
  skills: 'the ability to do something well.',
  degree: 'an academic qualification awarded by a university.',
  better: 'of higher quality.',
  opportunities: 'chances for employment.',
  higher: 'greater in level, amount, or position.',
  salaries: 'money paid regularly for work or services.',
  employers: 'people or organizations that hire others to work.',
  value: 'to consider something important or useful.',
  advanced: 'at a higher level or more developed.',
  qualifications: 'skills or certifications that make someone suitable for a task.',
  additionally: 'in addition.',
  life: 'the experience of being alive.',
  growth: 'the process of developing or increasing.',
  making: 'creating or forming.',
  connections: 'relationships with other people.',
  engaging: 'participating or taking part in.',
  extracurricular: 'outside the normal curriculum or course of study.',
  activities: 'tasks or actions done for enjoyment or purpose.',
  gaining: 'getting or acquiring.',
  broader: 'wider or more inclusive.',
  perspective: 'a particular way of seeing or thinking about something.',
  world: 'the earth and its inhabitants.',
  overall: 'in general or as a whole.',
  investment: 'something you put time, money, or effort into for future benefit.',
  success: 'achievement of goals.',
  fulfillment: 'a sense of satisfaction or achievement.',
  various: 'different or diverse.',
  areas: 'sections or parts.',
    },
    wordTranslations: {
      university: '大學',
  education: '教育',
  offers: '提供',
  benefits: '好處',
  personal: '個人的',
  professional: '職業的',
  provides: '提供',
  students: '學生',
  knowledge: '知識',
  chosen: '選擇的',
  fields: '領域',
  helps: '幫助',
  develop: '培養',
  communication: '溝通',
  skills: '技能',
  degree: '學位',
  better: '更好的',
  opportunities: '機會',
  higher: '更高的',
  salaries: '薪資',
  employers: '雇主',
  value: '重視',
  advanced: '高階的',
  qualifications: '資格',
  additionally: '此外',
  life: '生活',
  growth: '成長',
  making: '建立',
  connections: '人際關係',
  engaging: '參與',
  extracurricular: '課外的',
  activities: '活動',
  gaining: '獲得',
  broader: '更廣的',
  perspective: '觀點',
  world: '世界',
  overall: '整體而言',
  investment: '投資',
  success: '成功',
  fulfillment: '成就感／滿足',
  various: '各種的',
  areas: '領域',
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