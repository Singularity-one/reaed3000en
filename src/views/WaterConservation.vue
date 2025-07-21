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
          audioSource: require('../mp3/5.Water conservation.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Water is one of the most valuable resources on Earth, but many people waste it. In some places, clean water is limited, and droughts make the problem worse. Saving water is important for the environment and future generations . People can help by turning off taps, fixing leaks, and using less water for daily tasks. Governments should also improve water systems and promote recycling. Farmers can use better methods to reduce waste in agriculture. If everyone makes small changes, water shortages can be reduced. What are the best ways to encourage people to use water wisely?',
          wordExplanations: {
      water: 'a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.',
      valuable: 'worth a great deal; expensive.',
      resources: 'a stock or supply of materials or assets that can be drawn on by a person or organization in order to function effectively.',
      earth: 'the planet on which we live; the world.',
      but: 'used to introduce a phrase or clause contrasting with what has already been mentioned.',
      many: 'a large number of.',
      people: 'human beings in general or considered collectively.',
      waste: 'use or expend carelessly, extravagantly, or to no purpose.',
      it: 'used to refer to something previously mentioned or easily identified.',
      in: 'expressing the situation of something that is or appears to be enclosed or surrounded by something else.',
      some: 'an unspecified or unknown number or quantity of.',
      places: 'a particular position or point in space.',
      clean: 'free from dirt, marks, or stains.',
      is: 'be; be present.',
      limited: 'restricted in size, amount, or extent; few, small, or short.',
      and: 'used to connect words of the same part of speech, clauses, or sentences, that are to be taken together.',
      droughts: 'a prolonged period of abnormally low rainfall; a shortage of water resulting from this.',
      make: 'form by putting parts together or combining substances; create.',
      the: 'referring to one or more people or things already mentioned or easily identified.',
      problem: 'a matter or situation regarded as unwelcome or harmful and needing to be dealt with and overcome.',
      worse: 'more serious, unpleasant, or bad than what has been mentioned.',
      saving: 'an economy of or reduction in money, time, or another resource.',
      important: 'having great significance or value.',
      for: 'with the object or purpose of.',
      environment: 'the surroundings or conditions in which a person, animal, or plant lives or operates.',
      future: 'the time or a period of time following the moment of speaking or writing; what is going to happen.',
      generations: 'all of the people born and living at about the same time, regarded collectively.',
      can: 'be able to.',
      help: 'make it easier for (someone) to do something by offering one\'s services or resources.',
      by: 'indicating the means of achieving something.',
      turning: 'move so as to face in a different direction.',
      off: 'away from the place in question; to a distance.',
      taps: 'a device by which a flow of liquid or gas can be controlled, especially one fitted to a pipe.',
      fixing: 'fasten (something) securely and firmly in place.',
      leaks: '(of a container or covering) accidentally lose or admit contents, especially liquid or gas, through a hole or crack.',
      using: 'employing something as a means of accomplishing something.',
      less: 'a smaller amount of; not as much.',
      daily: 'done, occurring, or active each day.',
      tasks: 'a piece of work to be done or undertaken.',
      governments: 'the body or group of persons governing a state.',
      should: 'used to indicate obligation, duty, or correctness, typically when criticizing someone\'s actions.',
      also: 'in addition; too.',
      improve: 'make or become better.',
      systems: 'a set of connected things or parts forming a complex whole, in particular.',
      promote: 'support or actively encourage (a cause, venture, etc.); further the progress of.',
      recycling: 'convert (waste) into reusable material.',
      farmers: 'a person who owns or manages a farm.',
      better: 'more excellent or effective than.',
      methods: 'a particular form of procedure for accomplishing or approaching something, especially a systematic or established one.',
      to: 'expressing motion in the direction of (a particular location or thing).',
      reduce: 'make or become smaller or less.',
      agriculture: 'the science or practice of farming, including cultivation of the soil for the growing of crops and the rearing of animals to provide food, wool, and other products.',
      if: 'on the condition or supposition that.',
      everyone: 'every person.',
      makes: 'form by putting parts together or combining substances; create.',
      small: 'limited or below average in number, quantity, or extent.',
      changes: 'make or become different.',
      shortages: 'a state or situation in which something needed cannot be obtained in sufficient amounts.',
      what: 'asking for information specifying something.',
      are: 'second person singular present and first, second, and third person plural present of be.',
      best: 'of the most excellent or desirable type or quality.',
      ways: 'a method, course, or manner of proceeding.',
      encourage: 'give support, confidence, or hope to (someone).',
      wisely: 'in a sensible and careful manner.',
    },
    wordTranslations: {
      water: '水',
      valuable: '珍貴的',
      resources: '資源',
      earth: '地球',
      but: '但是',
      many: '許多',
      people: '人們',
      waste: '浪費',
      it: '它',
      in: '在...裡',
      some: '一些',
      places: '地方',
      clean: '乾淨的',
      is: '是',
      limited: '有限的',
      and: '和',
      droughts: '乾旱',
      make: '使',
      problem: '問題',
      worse: '更糟',
      saving: '節約',
      important: '重要的',
      for: '為了',
      environment: '環境',
      future: '未來',
      generations: '世代',
      can: '能夠',
      help: '幫助',
      by: '藉由',
      turning: '關閉',
      off: '關掉',
      taps: '水龍頭',
      fixing: '修理',
      leaks: '漏水',
      using: '使用',
      less: '更少的',
      daily: '每日的',
      tasks: '任務',
      governments: '政府',
      should: '應該',
      also: '也',
      improve: '改善',
      systems: '系統',
      promote: '促進',
      recycling: '回收',
      farmers: '農民',
      better: '更好的',
      methods: '方法',
      to: '為了',
      reduce: '減少',
      agriculture: '農業',
      if: '如果',
      everyone: '每個人',
      makes: '做出',
      small: '小的',
      changes: '改變',
      shortages: '短缺',
      be: '被',
      reduced: '減少',
      what: '什麼',
      are: '是',
      best: '最好的',
      ways: '方法',
      encourage: '鼓勵',
      wisely: '明智地',
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