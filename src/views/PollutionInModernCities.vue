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
      name: 'PollutionInModernCities',
      data() {
        return {
          audioSource: require('../mp3/2.Pollution in modern cities.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Many cities face serious pollution problems due to traffic, industry, and waste. Smoke from cars and factories makes the air unhealthy, causing breathing issues. Rubbish in streets and rivers leads to dirty water and harms wildlife. Noise from vehicles and construction also affects people’s well-being. To improve the situation, public transport should be better, and recycling must increase. Green spaces can help clean the air and make cities more pleasant. Governments and individuals need to work together to reduce pollution. If people act now, cities will become healthier and safer for future generations. What solutions do you suggest?',
          wordExplanations: {
            Many: 'a large number of.',
            cities: 'large towns.',
            face: 'to have to deal with something difficult or unpleasant.',
            serious: 'important and needing a lot of thought or attention.',
            pollution: 'making air, water, or land dirty and dangerous.',
            problems: 'things that cause difficulty or worry.',
            traffic: 'the movement of vehicles along roads or in the air or on water.',
            industry: 'the production of goods in factories.',
            waste: 'unwanted things that are left after something has been used.',
            Smoke: 'the grey or black gas that is produced when something burns.',
            cars: 'vehicles with four wheels that can carry a small number of people.',
            factories: 'large buildings where goods are made using machines.',
            makes: 'third person singular present of make to produce something.',
            air: 'the mixture of gases that we breathe.',
            unhealthy: 'likely to make you ill.',
            causing: 'present participle of cause to make something happen.',
            breathing: 'the process of taking air into and out of the lungs.',
            issues: 'problems or difficulties.',
            Rubbish: 'waste material; garbage.',
            streets: 'public roads in a city or town that have buildings along one or both sides.',
            rivers: 'natural streams of water that flow towards the sea.',
            dirty: 'not clean.',
            water: 'the clear liquid that falls from the sky as rain and that is in lakes, rivers, and seas.',
            harms: 'damages.',
            wildlife: 'animals that live in their natural environment.',
            Noise: 'loud or unpleasant sound.',
            vehicles: 'things such as cars, buses, and trucks that are used for carrying people or goods.',
            construction: 'the process of building something.',
            also: 'in addition.',
            affects: 'to have an influence on someone or something.',
            peoples: 'belonging to people.',
            situation: 'the set of things that are happening and the conditions that exist at a particular time and place.',
            transport: 'systems for carrying large numbers of people, for example buses and trains.',
            recycling: 'the process of collecting and changing old paper, metal, plastic, etc., so that it can be used again.',
            must: 'used to say that something is necessary or has to be done.',
            increase: 'to become larger in number or amount.',
            pleasant: 'more enjoyable or attractive.',
            Governments: 'the group of people who control a country or state.',
            and: 'used to connect words or groups of words.',
            individuals: 'single people.',
            reduce: 'to make something smaller in size, amount, degree, etc.',
            healthier: 'in better health.',
            safer: 'not likely to cause harm or danger.',
            for: 'intended to be used by someone or something.',
            future: 'the time that will come after the present.',
            generations: 'all the people of about the same age within a family or society.',
            What: 'used to ask for information about something.',
            solutions: 'ways of solving problems.',
           suggest: 'advise?'
          },
          wordTranslations: { // 新增：儲存中文翻譯
            Many: '許多',
            cities: '城市',
            face: '面臨',
            serious: '嚴重的',
            pollution: '污染',
            problems: '問題',
            traffic: '交通',
            industry: '工業',
            waste: '廢棄物',
            Smoke: '煙霧',
            cars: '汽車',
            factories: '工廠',
            makes: '使',
            air: '空氣',
            unhealthy: '不健康的',
            causing: '導致',
            breathing: '呼吸',
            issues: '問題',
            Rubbish: '垃圾',
            streets: '街道',
            rivers: '河流',
            dirty: '髒的',
            water: '水',
            harms: '危害',
            wildlife: '野生動物',
            Noise: '噪音',
            vehicles: '車輛',
            construction: '建築',
            also: '也',
            affects: '影響',
            transport: '公共運輸',
            better: '更好',
            recycling: '回收',
            must: '必須',
            increase: '增加',
            pleasant: '宜人',
            Governments: '政府',
            individuals: '個人',
            reduce: '減少',
            If: '如果',
            act: '採取行動',
            now: '現在',
            healthier: '更健康',
            safer: '更安全', 
            for: '為了',
            future: '未來',
            generations: '世代',
            solutions: '解決方案',
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