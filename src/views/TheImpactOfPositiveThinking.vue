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
      name: 'TheImpactOfPositiveThinking',
      data() {
        return {
          audioSource: require('../mp3/49.The impact of positive thinking.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Positive thinking has a profound impact on both mental and physical well-being. When people focus on the positive aspects of life, they are better able to handle stress and face challenges with resilience. Positive thinking can improve mood, boost motivation, and increase self-confidence. It encourages individuals to see setbacks as temporary and manageable, rather than insurmountable obstacles. Studies have shown that maintaining a positive outlook can lead to better health outcomes, such as lower levels of anxiety, reduced risk of heart disease, and improved immune function. Overall, cultivating positive thinking not only enhances mental health but also contributes to a happier, healthier life.',
          wordExplanations: {
positive: 'focusing on the good side of things',
  thinking: 'the act of using your mind to consider or reason',
  profound: 'very strong or deep',
  impact: 'an effect or influence',
  mental: 'related to the mind',
  physical: 'related to the body',
  aspects: 'different parts of something',
  handle: 'to deal with or manage',
  stress: 'a feeling of worry or pressure',
  challenges: 'difficult situations',
  resilience: 'the ability to recover from problems',
  improve: 'to make better',
  mood: 'a person’s emotional state',
  boost: 'to increase or raise',
  motivation: 'the reason to do something',
  encourages: 'helps or supports an action',
  setbacks: 'small problems or delays',
  temporary: 'not lasting forever',
  manageable: 'able to be dealt with',
  insurmountable: 'too hard to overcome',
  obstacles: 'things that block progress',
  maintaining: 'keeping something going',
  outlook: 'a way of thinking or feeling about something',
  anxiety: 'strong worry or nervousness',
  cultivating: 'growing or developing something',
  enhances: 'makes something better',
  contributes: 'helps to cause or bring about'
    },
    wordTranslations: {
positive: '正面的',
  thinking: '思考',
  profound: '深刻的',
  impact: '影響',
  mental: '心理的',
  physical: '身體的',
  aspects: '方面',
  handle: '處理',
  stress: '壓力',
  challenges: '挑戰',
  resilience: '韌性',
  improve: '改善',
  mood: '情緒',
  boost: '提升',
  motivation: '動力',
  encourages: '鼓勵',
  setbacks: '挫折',
  temporary: '暫時的',
  manageable: '可控制的',
  insurmountable: '難以克服的',
  obstacles: '障礙',
  maintaining: '維持',
  outlook: '看法',
  anxiety: '焦慮',
  cultivating: '培養',
  enhances: '增強',
  contributes: '促進'
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