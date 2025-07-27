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
      name: 'BenefitsOfExercise',
      data() {
        return {
          audioSource: require('../mp3/6.Benefits of exercise.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Exercise is essential for maintaining a healthy body and mind. Regular physical activity helps improve cardiovascular health, strengthens muscles, and boosts the immune system. It also plays a key role in reducing the risk of chronic diseases such as diabetes, obesity, and high blood pressure. Moreover, exercise has positive effects on mental health, reducing stress, anxiety, and depression by releasing endorphins. It improves sleep patterns, enhances mood, and increases energy levels, leading to a more active and productive lifestyle. Engaging in exercise regularly contributes to overall well-being and can significantly improve quality of life.',
          wordExplanations: {
            exercise: 'physical activity that is done to become stronger and healthier.',
            essential: 'absolutely necessary; extremely important.',
            maintaining: 'keeping something in good condition or continuing it without change.',
            healthy: 'in good physical or mental condition.',
            body: 'the physical structure of a person or animal.',
            mind: 'the part of a person that thinks, feels, and remembers.',
            regular: 'done or happening often.',
            physical: 'relating to the body.',
            activity: 'something that you do for enjoyment or for a particular purpose.',
            helps: 'makes it easier or possible for something to happen.',
            improve: 'to make something better.',
            cardiovascular: 'relating to the heart and blood vessels.',
            health: 'the condition of a person s body or mind.',
            strengthens: 'makes something stronger.',
            muscles: 'tissues in the body that can contract to produce movement.',
            boosts: 'increases or improves something.',
            immune: 'resistant to a particular infection or toxin.',
            system: 'a group of related parts that work together.',
            plays: 'acts as or performs a role in something.',
            key: 'very important or essential.',
            role: 'the function or position of someone or something.',
            reducing: 'making something less or smaller.',
            risk: 'the possibility of something bad happening.',
            chronic: 'lasting for a long time or constantly recurring.',
            diseases: 'illnesses or medical conditions.',
            such: 'of the type previously mentioned.',
            as: 'used in comparisons to refer to something.',
            diabetes: 'a disease that causes high blood sugar levels.',
            obesity: 'a condition of being very overweight.',
            high: 'greater than normal.',
            blood: 'the red liquid that flows through the bodies of humans and animals.',
            pressure: 'the force of blood pushing against blood vessel walls.',
            moreover: 'in addition to what was said before.',
            positive: 'good or useful.',
            effects: 'results or changes caused by something.',
            mental: 'related to the mind.',
            stress: 'a state of mental or emotional tension.',
            anxiety: 'a feeling of worry or nervousness.',
            depression: 'a mental condition of feeling very sad and hopeless.',
            releasing: 'letting something go or be free.',
            endorphins: 'chemicals in the brain that make you feel good.',
            sleep: 'the natural resting state of the body and mind.',
            patterns: 'regular and repeated ways in which something happens.',
            enhances: 'improves the quality or value of something.',
            mood: 'a temporary state of mind or feeling.',
            increases: 'becomes larger or greater.',
            energy: 'the strength and vitality for activity.',
            levels: 'the amount or degree of something.',
            leading: 'causing a particular result.',
            active: 'doing things; not passive or inactive.',
            productive: 'producing a lot or achieving a lot.',
            lifestyle: 'the way in which a person lives.',
            engaging: 'taking part in something.',
            regularly: 'happening often or at equal time intervals.',
            contributes: 'gives or adds to something.',
            overall: 'considering everything; total or general.',
            significantly: 'in a way that is large or important.',
            quality: 'how good or bad something is.',
            life: 'the existence of an individual human or animal.'
    },
    wordTranslations: {
        exercise: '運動',
        essential: '必要的',
        maintaining: '維持',
        healthy: '健康的',
        body: '身體',
        mind: '心靈',
        regular: '定期的',
        physical: '身體的',
        activity: '活動',
        helps: '幫助',
        improve: '改善',
        cardiovascular: '心血管的',
        health: '健康',
        strengthens: '增強',
        muscles: '肌肉',
        boosts: '提升',
        immune: '免疫的',
        system: '系統',
        plays: '扮演',
        key: '關鍵的',
        role: '角色',
        reducing: '減少',
        risk: '風險',
        chronic: '慢性的',
        diseases: '疾病',
        such: '像是',
        as: '如同',
        diabetes: '糖尿病',
        obesity: '肥胖',
  high: '高的',
  blood: '血液',
  pressure: '壓力',
  moreover: '此外',
  positive: '正面的',
  effects: '影響',
  mental: '心理的',
  stress: '壓力',
  anxiety: '焦慮',
  depression: '憂鬱',
  releasing: '釋放',
  endorphins: '腦內啡',
  sleep: '睡眠',
  patterns: '模式',
  enhances: '增強',
  mood: '情緒',
  increases: '增加',
  energy: '能量',
  levels: '程度',
  leading: '導致',
  active: '積極的',
  productive: '有生產力的',
  lifestyle: '生活方式',
  engaging: '參與',
  regularly: '有規律地',
  contributes: '貢獻',
  overall: '整體的',
  significantly: '顯著地',
  quality: '品質',
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