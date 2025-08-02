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
      name: 'MedicalResearchAndNewDiseases',
      data() {
        return {
          audioSource: require('../mp3/43.Medical research and new diseases.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Medical research plays a crucial role in understanding and combating new diseases. As the world faces emerging health threats, such as new viruses and antibiotic-resistant bacteria, research helps scientists identify the causes and develop effective treatments. Through innovations in biotechnology, researchers are finding new ways to diagnose, treat, and prevent diseases, often using advanced technologies like gene editing and personalized medicine. Medical research also leads to the development of vaccines, which are essential for controlling outbreaks and preventing the spread of infectious diseases. As global health challenges continue to evolve, ongoing research is necessary to stay ahead of new diseases, improve public health, and ensure that healthcare systems can respond effectively to future threats.',
          wordExplanations: {
       medical: 'related to medicine or the treatment of illness',
  research: 'careful study to discover new information or solve problems',
  vital: 'very important or necessary',
  understanding: 'knowing how something works',
  fighting: 'trying to stop or defeat',
  diseases: 'illnesses that affect people or animals',
  health: 'the condition of being well or not sick',
  threats: 'dangers or possible harms',
  viruses: 'tiny organisms that cause infections',
  bacteria: 'tiny living things that can cause illness',
  identify: 'to recognize or name something',
  causes: 'things that make something happen',
  develop: 'to create or improve something',
  treatments: 'methods to cure or ease illness',
  innovations: 'new ideas or methods',
  biotechnology: 'technology based on biology',
  diagnose: 'to find out what illness someone has',
  prevent: 'to stop something from happening',
  illnesses: 'sicknesses or diseases',
  tools: 'things used to do a task',
  gene: 'a part of DNA that controls traits',
  editing: 'changing or improving something',
  personalized: 'designed for one specific person',
  medicine: 'the science or practice of treating illness',
  vaccines: 'substances used to protect against diseases',
  outbreaks: 'sudden starts of disease spreading',
  spread: 'how something moves from one place to another',
  global: 'related to the whole world',
  challenges: 'difficult problems',
  ongoing: 'continuing to happen',
  protect: 'to keep safe',
  public: 'for everyone or the community',
  healthcare: 'the system for treating illness',
  systems: 'organized ways of doing things',
  respond: 'to react or act',
  future: 'what is yet to happen',
  problems: 'things that cause difficulty'
    },
    wordTranslations: {
   medical: '醫學的',
  research: '研究',
  vital: '重要的',
  understanding: '理解',
  fighting: '對抗',
  diseases: '疾病',
  health: '健康',
  threats: '威脅',
  viruses: '病毒',
  bacteria: '細菌',
  identify: '識別',
  causes: '原因',
  develop: '發展',
  treatments: '治療方法',
  innovations: '創新',
  biotechnology: '生物技術',
  diagnose: '診斷',
  prevent: '預防',
  illnesses: '病症',
  tools: '工具',
  gene: '基因',
  editing: '編輯',
  personalized: '個人化的',
  medicine: '藥物；醫學',
  vaccines: '疫苗',
  outbreaks: '爆發',
  spread: '擴散',
  global: '全球的',
  challenges: '挑戰',
  ongoing: '持續的',
  protect: '保護',
  public: '公共的',
  healthcare: '醫療保健',
  systems: '系統',
  respond: '回應',
  future: '未來',
  problems: '問題'
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