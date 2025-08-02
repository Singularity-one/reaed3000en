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
      name: 'WillHumansLiveOnMars',
      data() {
        return {
          audioSource: require('../mp3/45.Will humans live on Mars.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'The idea of humans living on Mars has become increasingly plausible as space exploration advances. While it remains a complex challenge, ongoing efforts by organizations like NASA, SpaceX, and other space agencies are bringing us closer to making life on Mars a reality. Challenges such as ensuring a sustainable supply of food, water, and oxygen, protecting against harmful radiation, and creating habitable environments must be overcome. Scientists are working on technologies like advanced life-support systems, space habitats, and even the possibility of growing food on Mars. While the timeline for permanent human settlement is uncertain, developments in space technology and research continue to pave the way for future missions to Mars, and it is possible that humans may live there in the coming decades.',
          wordExplanations: {
   idea: 'a thought or suggestion about a possible plan or action',
  humans: 'people; human beings',
  living: 'having life or existing in a place',
  Mars: 'the fourth planet from the sun',
  increasingly: 'more and more over time',
  plausible: 'seeming likely to be true or possible',
  space: 'the vast area beyond Earth’s atmosphere',
  exploration: 'the act of discovering and learning about new places',
  advances: 'improvements or progress',
  complex: 'not simple; difficult to understand or do',
  challenge: 'a difficult task or problem',
  ongoing: 'continuing to happen or exist',
  efforts: 'attempts to do something',
  organizations: 'groups of people working together for a purpose',
  NASA: 'National Aeronautics and Space Administration (US space agency)',
  SpaceX: 'a private company that builds spacecraft and rockets',
  agencies: 'government groups with a specific job or purpose',
  reality: 'something that actually exists or happens',
  sustainable: 'able to continue for a long time without running out',
  supply: 'the amount of something available',
  food: 'something people eat',
  water: 'a liquid necessary for life',
  oxygen: 'a gas needed for breathing',
  protecting: 'keeping safe from harm',
  harmful: 'able to cause damage or hurt',
  radiation: 'energy that comes in waves and can be dangerous',
  creating: 'making or building something',
  habitable: 'suitable for living',
  environments: 'surroundings or conditions',
  overcome: 'to succeed in dealing with a problem',
  scientists: 'people who study or work in science',
  technologies: 'tools and systems made using science',
  advanced: 'highly developed or complex',
  systems: 'organized sets of parts that work together',
  habitats: 'places where living things can survive',
  growing: 'making plants develop and increase in size',
  possibility: 'something that may happen',
  permanent: 'lasting forever or for a very long time',
  human: 'relating to people',
  settlement: 'a place where people live permanently',
  uncertain: 'not known or decided',
  developments: 'new changes or progress',
  research: 'careful study to learn new things',
  missions: 'planned trips or goals, often by spacecraft',
  coming: 'happening soon or in the near future',
  decades: 'periods of ten years'
    },
    wordTranslations: {
      idea: '想法',
  humans: '人類',
  living: '生活',
  Mars: '火星',
  increasingly: '越來越',
  plausible: '可行的',
  space: '太空',
  exploration: '探索',
  advances: '進展',
  complex: '複雜的',
  challenge: '挑戰',
  ongoing: '持續的',
  efforts: '努力',
  organizations: '組織',
  NASA: '美國太空總署',
  SpaceX: '太空探索技術公司',
  agencies: '機構',
  reality: '現實',
  sustainable: '可持續的',
  supply: '供應',
  food: '食物',
  water: '水',
  oxygen: '氧氣',
  protecting: '保護',
  harmful: '有害的',
  radiation: '輻射',
  creating: '創造',
  habitable: '可居住的',
  environments: '環境',
  overcome: '克服',
  scientists: '科學家',
  technologies: '技術',
  advanced: '先進的',
  systems: '系統',
  habitats: '棲息地 / 居住地',
  growing: '種植',
  possibility: '可能性',
  permanent: '永久的',
  human: '人類的',
  settlement: '定居',
  uncertain: '不確定的',
  developments: '發展',
  research: '研究',
  missions: '任務',
  coming: '即將到來的',
  decades: '十年'
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