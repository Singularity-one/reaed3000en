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

    <div class="box-range-content" style="display: flex; gap: 10px; align-items: center;">
      <button @click="playAudio">
        <i class="box-project-meta-icon linearicons-play-circle"></i>
      </button>

      <button @click="toggleLoop">
        <i :class="['box-project-meta-icon', 'linearicons-sync2', { 'active': isLoop }]"></i>
      </button>

      <button @click="stopAudio">
        <i class="box-project-meta-icon linearicons-stop-circle"></i>
      </button>

      <audio ref="audioPlayer" :src="audioSource"></audio>
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
      isLoop: false,
      dataText: 'Climate change is a serious problem affecting the world. Rising temperatures cause extreme weather, such as storms, droughts, and floods. Ice in the polar regions is melting, leading to higher sea levels that threaten coastal areas. Many animals lose their homes as forests disappear. People also face health risks due to heat and poor air quality. To reduce climate change, countries must cut pollution and use clean energy. Individuals can help by saving electricity and planting trees. If action is not taken soon, future generations will suffer. What do you think is the most effective way to fight climate change?',
      wordExplanations: {
       climate: 'the usual weather conditions in a particular area',
  change: 'to become different',
  serious: 'important and worrying',
  problem: 'a difficult situation',
  affecting: 'having an influence on',
  world: 'the Earth and its people',
  rising: 'going up',
  temperatures: 'measures of how hot or cold something is',
  cause: 'to make something happen',
  extreme: 'very severe or intense',
  weather: 'the state of the atmosphere, like rain or sunshine',
  storms: 'strong winds with rain or snow',
  droughts: 'long periods with little or no rain',
  floods: 'when water covers land that is usually dry',
  ice: 'frozen water',
  polar: 'related to the North or South Pole',
  regions: 'areas',
  melting: 'changing from solid to liquid',
  leading: 'causing or resulting in',
  higher: 'more elevated',
  threaten: 'to put in danger',
  coastal: 'near the sea',
  areas: 'places',
  animals: 'living creatures',
  lose: 'to no longer have something',
  homes: 'places where animals or people live',
  forests: 'large areas covered with trees',
  disappear: 'to vanish or go away',
  people: 'humans',
  face: 'to deal with',
  heat: 'high temperature',
  poor: 'not good',
  reduce: 'to make less',
  countries: 'nations or states',
  must: 'have to',
  cut: 'to decrease or remove',
  pollution: 'harmful substances in the environment',
  individuals: 'single persons',
  help: 'to make easier',
  saving: 'using less of something',
  electricity: 'power used to run machines',
  planting: 'putting plants or trees in the ground',
  trees: 'large plants with trunks and branches',
  action: 'something done to achieve a result',
  soon: 'in the near future',
  future: 'time yet to come',
  generations: 'groups of people born around the same time',
  suffer: 'to experience pain or problems',
  effective: 'producing a good result',
  fight: 'to try to stop or prevent'
      },
      wordTranslations: { // 新增：儲存中文翻譯
        climate: '氣候',
  change: '變化',
  serious: '嚴重的',
  problem: '問題',
  affecting: '影響',
  world: '世界',
  rising: '上升的',
  temperatures: '溫度',
  cause: '造成',
  extreme: '極端的',
  weather: '天氣',
  storms: '風暴',
  droughts: '乾旱',
  floods: '洪水',
  ice: '冰',
  polar: '極地的',
  regions: '區域',
  melting: '融化',
  leading: '導致',
  higher: '更高的',
  threaten: '威脅',
  coastal: '沿海的',
  areas: '地區',
  animals: '動物',
  lose: '失去',
  homes: '家園',
  forests: '森林',
  disappear: '消失',
  people: '人們',
  face: '面對',
  heat: '熱',
  poor: '差的',
  reduce: '減少',
  countries: '國家',
  must: '必須',
  cut: '減少',
  pollution: '污染',
  individuals: '個人',
  help: '幫助',
  saving: '節約',
  electricity: '電力',
  planting: '種植',
  trees: '樹木',
  action: '行動',
  soon: '很快',
  future: '未來',
  generations: '世代',
  suffer: '遭受',
  effective: '有效的',
  fight: '對抗'
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
    toggleLoop() {
      this.isLoop = !this.isLoop;
      this.$refs.audioPlayer.loop = this.isLoop; //循環播放
      this.$refs.audioPlayer.play();
    },
    stopAudio() {
      const audio = this.$refs.audioPlayer;
      audio.pause();
      audio.currentTime = 0; // 重置到開頭
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

.linearicons-sync2.active {
  color: green;
}
  </style>