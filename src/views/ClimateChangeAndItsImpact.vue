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
        climate: 'the typical weather conditions in a particular area.',
        serious: 'important and needing a lot of thought or attention.',
        rising: 'becoming more important or famous.',
        temperatures: 'the degree or intensity of heat present in a substance or object.',
        extreme: 'very great in degree or strength.',
        weather: 'the condition of the air around us, for example if it is hot, cold, wet, or windy.',
        storms: 'very bad weather with strong winds, heavy rain, and often thunder and lightning.',
        droughts: 'long periods when there is little or no rain.',
        floods: 'large amounts of water covering an area that is usually dry.',
        ice: 'water that has frozen and become solid.',
        polar: 'connected with the North Pole or the South Pole.',
        regions: 'parts of a country or the world that are different from other parts in some way.',
        melting: 'changing from a solid to a liquid because of heat.',
        threaten: 'to be likely to cause harm or damage to something or someone.',
        coastal: 'near the coast.',
        forests: 'large areas of land covered with trees.',
        disappear: 'to become impossible to see.',
        risks: 'the possibility that something bad will happen.',
        heat: 'the quality of being hot.',
        poor: 'not good in quality.',
        quality: 'how good or bad something is.',
        reduce: 'to make something smaller in size, amount, degree, etc.',
        countries: 'areas of land that are politically controlled by one government.',
        pollution: 'making air, water, or land dirty and dangerous.',
        individuals: 'single people.',
        electricity: 'a form of energy that can be produced in several ways and that provides power to devices.',
        planting: 'putting plants or seeds in the ground so that they can grow.',
        taken: 'past participle of take - to get hold of something.',
        soon: 'in a short time.',
        future: 'the time that will come after the present.',
        generations: 'all the people of about the same age within a family or society.',
        suffer: 'to experience something bad or unpleasant.'
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
        extreme: '極端的',
        weather: '天氣',
        storms: '暴風雨',
        droughts: '乾旱',
        floods: '洪水',
        ice: '冰',
        polar: '極地的',
        regions: '地區',
        melting: '融化',
        threaten: '威脅',
        coastal: '沿海的',
        forests: '森林',
        disappear: '消失',
        risks: '風險',
        heat: '高溫；熱',
        poor: '差的；不良的',
        quality: '品質',
        reduce: '減少',
        countries: '國家',
        pollution: '污染',
        individuals: '個人',
        electricity: '電力',
        planting: '種植',
        taken: '被採取',
        soon: '很快地',
        future: '未來',
        generations: '世代',
        suffer: '遭受；受苦'
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