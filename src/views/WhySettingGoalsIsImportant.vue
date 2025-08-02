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
      name: 'WhySettingGoalsIsImportant',
      data() {
        return {
          audioSource: require('../mp3/48.Why setting goals is important.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Setting goals is important because it gives direction and purpose to our efforts. Without clear goals, it’s easy to lose focus or feel overwhelmed by tasks. Goals help prioritize what matters most and break down large, intimidating projects into manageable steps. They also provide motivation, as accomplishing even small goals creates a sense of achievement and boosts confidence. Setting goals helps measure progress and stay on track, whether in personal development, career, or health. Furthermore, having goals encourages perseverance, as challenges are easier to overcome when there’s a clear vision of the desired outcome. Ultimately, goals give life structure and meaning.',
          wordExplanations: {
      setting: 'deciding or choosing something, like a goal or plan',
  goals: 'things you want to achieve or do',
  important: 'having great value or meaning',
  direction: 'a path or way toward something',
  purpose: 'the reason for doing something',
  efforts: 'attempts to do something using energy or work',
  clear: 'easy to understand or see',
  overwhelmed: 'feeling stressed or unable to handle something',
  tasks: 'jobs or things you need to do',
  prioritize: 'to decide what is most important and do it first',
  matters: 'things that are important',
  intimidating: 'scary or making you nervous',
  manageable: 'easy enough to handle or control',
  motivation: 'the reason why you want to do something',
  accomplishing: 'finishing or achieving something',
  sense: 'a feeling or understanding',
  achievement: 'something you succeed at',
  boosts: 'raises or increases',
  confidence: 'belief in your own ability',
  measure: 'to check or see the size or progress of something',
  progress: 'moving forward or getting better at something',
  career: 'your job or working life',
  health: 'your body and mind’s condition',
  encourages: 'makes someone want to do something',
  perseverance: 'not giving up, even when things are hard',
  challenges: 'difficult problems or tasks',
  overcome: 'to beat or get through something hard',
  vision: 'a clear idea of what you want',
  desired: 'wanted or hoped for',
  outcome: 'the result or what happens in the end',
  ultimately: 'in the end or finally',
  structure: 'organization or order',
  meaning: 'importance or purpose'
    },
    wordTranslations: {
     setting: '設定',
  goals: '目標',
  important: '重要的',
  direction: '方向',
  purpose: '目的',
  efforts: '努力',
  clear: '清楚的',
  overwhelmed: '不知所措的',
  tasks: '任務',
  prioritize: '優先處理',
  matters: '重要的事',
  intimidating: '令人畏懼的',
  manageable: '可處理的',
  motivation: '動力',
  accomplishing: '完成',
  sense: '感覺',
  achievement: '成就',
  boosts: '提升',
  confidence: '自信',
  measure: '衡量',
  progress: '進步',
  career: '職業',
  health: '健康',
  encourages: '鼓勵',
  perseverance: '毅力',
  challenges: '挑戰',
  overcome: '克服',
  vision: '願景',
  desired: '期望的',
  outcome: '結果',
  ultimately: '最終',
  structure: '結構',
  meaning: '意義'
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