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
      name: 'WaterConservation',
      data() {
        return {
          audioSource: require('../mp3/9.Mental health awareness.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Mental health awareness is essential in reducing stigma and promoting well-being. Many people face mental health challenges, yet they often feel reluctant to seek help due to fear of judgment. By raising awareness, society can encourage open discussions about mental health and provide support for those in need. Education about mental health helps individuals recognize signs of stress, anxiety, or depression, leading to earlier intervention. It also fosters empathy and understanding, ensuring that people struggling with mental health issues receive the care and treatment they deserve. Awareness is key to building a healthier, more supportive community.',
          wordExplanations: {
  mental: 'relating to the mind.',
  health: 'the condition of a person’s body or mind.',
  awareness: 'knowledge or understanding of a situation or fact.',
  essential: 'absolutely necessary or extremely important.',
  reducing: 'making something smaller or less.',
  stigma: 'a mark of disgrace associated with a particular circumstance or quality.',
  promoting: 'supporting or actively encouraging something.',
  many: 'a large number of.',
  people: 'human beings in general.',
  face: 'to deal with something difficult.',
  challenges: 'difficult situations or problems.',
  yet: 'in spite of that; nevertheless.',
  often: 'frequently; many times.',
  feel: 'to experience an emotion or sensation.',
  reluctant: 'unwilling or hesitant.',
  seek: 'to try to find or get something.',
  help: 'assistance or support.',
  due: 'because of something.',
  fear: 'an unpleasant emotion caused by danger or threat.',
  judgment: 'an opinion or decision based on thoughts or feelings.',
  raising: 'bringing attention to or increasing something.',
  society: 'a group of people living together in a community.',
  encourage: 'to give support or confidence to someone.',
  open: 'not closed; available or honest.',
  discussions: 'talks or conversations about a topic.',
  provide: 'to give or make available.',
  support: 'help or assistance.',
  those: 'people or things previously mentioned.',
  need: 'require something because it is essential.',
  education: 'the process of learning or teaching.',
  helps: 'makes it easier for something to happen.',
  individuals: 'single human beings, as opposed to a group.',
  recognize: 'to identify something or someone.',
  signs: 'indications or evidence of something.',
  stress: 'a state of mental or emotional pressure.',
  anxiety: 'a feeling of worry or nervousness.',
  depression: 'a mental state of deep sadness.',
  leading: 'causing or resulting in something.',
  earlier: 'happening before the usual or expected time.',
  intervention: 'the action of becoming involved in something to change the result.',
  fosters: 'encourages the development of something.',
  empathy: 'the ability to understand and share another’s feelings.',
  understanding: 'the ability to comprehend something.',
  ensuring: 'making certain something will happen.',
  struggling: 'having difficulty or making a great effort.',
  issues: 'important topics or problems.',
  receive: 'to get or be given something.',
  care: 'attention or treatment given to someone.',
  treatment: 'medical care given to a patient.',
  deserve: 'to be worthy of something.',
  key: 'important or essential.',
  building: 'constructing or developing something.',
  healthier: 'more healthy.',
  more: 'a greater amount or degree.',
  supportive: 'providing encouragement or help.',
  community: 'a group of people living in the same place or with shared interests.'
    },
    wordTranslations: {
  mental: '心理的',
  health: '健康',
  awareness: '意識',
  essential: '必要的',
  reducing: '減少',
  stigma: '污名',
  promoting: '促進',
  many: '許多',
  people: '人們',
  face: '面對',
  challenges: '挑戰',
  yet: '然而',
  often: '經常',
  feel: '感到',
  reluctant: '不情願的',
  seek: '尋求',
  help: '幫助',
  due: '因為',
  fear: '害怕',
  judgment: '評價',
  raising: '提高',
  society: '社會',
  encourage: '鼓勵',
  open: '開放的',
  discussions: '討論',
  provide: '提供',
  support: '支持',
  those: '那些人',
  need: '需要',
  education: '教育',
  helps: '幫助',
  individuals: '個人',
  recognize: '識別',
  signs: '徵兆',
  stress: '壓力',
  anxiety: '焦慮',
  depression: '憂鬱',
  leading: '導致',
  earlier: '較早的',
  intervention: '介入',
  fosters: '培養',
  empathy: '同理心',
  understanding: '理解',
  ensuring: '確保',
  struggling: '掙扎的',
  issues: '問題',
  receive: '接受',
  care: '照護',
  treatment: '治療',
  deserve: '值得',
  key: '關鍵的',
  building: '建立',
  healthier: '更健康的',
  more: '更多的',
  supportive: '支持性的',
  community: '社群'
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
          return this.dataText.split(/(\s+)/).map(word => ({
            text: word,
            explanation: this.wordExplanations[word.toLowerCase()],
            translation: this.wordTranslations[word.toLowerCase()],
          }));
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