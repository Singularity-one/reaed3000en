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
  name: 'ClimateChangeAndItsImpact',
  data() {
    return {
      audioSource: require('../mp3/1.Climate change and its impact.mp3'), // 替換為你的 MP3 檔案路徑
      dataText: 'Climate change is a serious problem affecting the world. Rising temperatures cause extreme weather, such as storms, droughts, and floods. Ice in the polar regions is melting, leading to higher sea levels that threaten coastal areas. Many animals lose their homes as forests disappear. People also face health risks due to heat and poor air quality. To reduce climate change, countries must cut pollution and use clean energy. Individuals can help by saving electricity and planting trees. If action is not taken soon, future generations will suffer. What do you think is the most effective way to fight climate change?',
      wordExplanations: {
        climate: 'the typical weather conditions in an area in general or over a long period.',
        change: 'to become different.',
        serious: 'grave; important and worrying.',
        problem: 'a matter or situation regarded as unwelcome or harmful and needing to be dealt with and overcome.',
        affecting: 'acting on; having an effect on.',
        world: 'the earth together with all of its countries and peoples.',
        rising: 'moving upward.',
        temperatures: 'the degree or intensity of heat expressed according to a comparative scale and shown by a thermometer or perceived by touch.',
        // ... 其他英文解釋
      },
      wordTranslations: { // 新增：儲存中文翻譯
        climate: '氣候',
        change: '改變',
        serious: '嚴重的',
        problem: '問題',
        affecting: '影響',
        world: '世界',
        rising: '上升的',
        temperatures: '溫度',
        // ... 其他中文翻譯
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