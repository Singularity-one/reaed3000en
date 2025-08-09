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

    <div>
      <AudioPlayer audioSource="1.Climate change and its impact.mp3" />
    </div>

    <div v-if="showExplanation" class="row row-40 row-lg-50 explanation-text">
        <div style="display: flex; gap: 5px; align-items: center;">
          <p><strong>{{ selectedWord }}</strong> <em>({{ wordPartsOfSpeech[selectedWord] }})</em></p>
          <button @click="speakWord" style="padding: 5px;">
            <i class="box-project-meta-icon linearicons-volume-medium"></i>
          </button>
          <button @click="toggleTranslation" style="padding: 5px;">
            <i class="box-project-meta-icon linearicons-eye"></i>
          </button>
          <button @click="closeExplanation" style="padding: 5px;">
            <i class="box-project-meta-icon linearicons-power-switch"></i>
          </button>
        </div>
        <p class="small-paragraph">{{ currentExplanation }}</p>
        <p v-if="currentExample" class="small-paragraph">
          <strong>example：</strong>{{ currentExample }}
        </p>
    </div>

  </div>
</section>
</template>

  
  <script>
  import AudioPlayer from "@/components/AudioPlayer.vue";
  export default {
  name: 'ClimateChangeAndItsImpact',
  components: { AudioPlayer },
  data() {
    return {
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
  wordExamples: {
 climate: 'The climate in this country is hot and dry.',
  change: 'The weather can change quickly in the mountains.',
  serious: 'This is a serious problem for the world.',
  problem: 'We must solve the problem together.',
  affecting: 'The smoke is affecting the air we breathe.',
  world: 'People around the world need to act.',
  rising: 'The water is rising after the rain.',
  temperatures: 'Temperatures are going up every year.',
  cause: 'Cars cause air pollution.',
  extreme: 'We saw extreme heat this summer.',
  weather: 'The weather is nice today.',
  storms: 'Big storms hit the city last night.',
  droughts: 'Droughts make it hard to grow food.',
  floods: 'Floods can destroy homes and roads.',
  ice: 'The ice is melting on the lake.',
  polar: 'Polar bears live in very cold places.',
  regions: 'Some regions are dry, others are wet.',
  melting: 'The snow is melting because it is warm.',
  leading: 'The fire is leading to smoke in the city.',
  higher: 'The sea is getting higher every year.',
  threaten: 'Strong winds threaten the small houses.',
  coastal: 'Many people live in coastal towns.',
  areas: 'These areas are home to many animals.',
  animals: 'Animals need food, water, and a home.',
  lose: 'We may lose some animals forever.',
  homes: 'Many people lost their homes in the flood.',
  forests: 'Many forests are cut down every year.',
  disappear: 'Some animals may disappear soon.',
  people: 'People need clean water to live.',
  face: 'We face a big problem with the weather.',
  heat: 'The heat in summer can be too much.',
  poor: 'The air in this city is of poor quality.',
  reduce: 'We can reduce pollution by using less oil.',
  countries: 'Many countries are working together.',
  must: 'We must do something now.',
  cut: 'We need to cut air pollution.',
  pollution: 'Air pollution makes it hard to breathe.',
  individuals: 'Individuals can help by saving power.',
  help: 'Planting trees can help the planet.',
  saving: 'Saving water is good for the Earth.',
  electricity: 'We use electricity to light our homes.',
  planting: 'Planting trees is good for the air.',
  trees: 'Trees give us clean air.',
  action: 'We need action, not just words.',
  soon: 'We must act soon to stop the problem.',
  future: 'We want a better future for all.',
  generations: 'Future generations will need clean water.',
  suffer: 'Many people suffer during a heat wave.',
  effective: 'This is an effective way to save energy.',
  fight: 'We must fight climate change together.'

},
wordPartsOfSpeech: {
      climate: 'noun',
      change: 'verb / noun',
      serious: 'adjective',
      problem: 'noun',
      affecting: 'verb',
      world: 'noun',
      rising: 'verb / adjective',
      temperatures: 'noun',
      cause: 'verb / noun',
      extreme: 'adjective',
      weather: 'noun',
      storms: 'noun',
      droughts: 'noun',
      floods: 'noun',
      ice: 'noun',
      polar: 'adjective',
      regions: 'noun',
      melting: 'verb',
      leading: 'verb / adjective',
      higher: 'adjective / adverb',
      threaten: 'verb',
      coastal: 'adjective',
      areas: 'noun',
      animals: 'noun',
      lose: 'verb',
      homes: 'noun',
      forests: 'noun',
      disappear: 'verb',
      people: 'noun',
      face: 'verb / noun',
      heat: 'noun',
      poor: 'adjective',
      reduce: 'verb',
      countries: 'noun',
      must: 'modal verb',
      cut: 'verb / noun',
      pollution: 'noun',
      individuals: 'noun',
      help: 'verb / noun',
      saving: 'noun / verb',
      electricity: 'noun',
      planting: 'noun / verb',
      trees: 'noun',
      action: 'noun',
      soon: 'adverb',
      future: 'noun / adjective',
      generations: 'noun',
      suffer: 'verb',
      effective: 'adjective',
      fight: 'verb / noun'
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
        const word = clickedWordElement.dataset.word.toLowerCase();
        const explanation = this.wordExplanations[word];
        const translation = this.wordTranslations[word];
        const example = this.wordExamples?.[word]; // optional chaining

        if (explanation || translation || example) {
          this.selectedWord = word;
          this.explanationText = explanation || '';
          this.currentTranslation = translation || '';
          this.currentExample = example || '';
          this.showExplanation = true;
          this.showTranslation = false;
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

.explanation-text p {
  margin-top: 4px;
  margin-bottom: 4px;
}

.linearicons-sync2.active {
  color: green;
}
  </style>