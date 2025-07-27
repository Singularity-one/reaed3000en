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
      name: 'TheImportanceOfForests',
      data() {
        return {
          audioSource: require('../mp3/4.The importance of forests.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Forests are essential for life on Earth. They produce oxygen, clean the air, and provide homes for many animals. Trees help control the climate by absorbing carbon dioxide, reducing global warming. People also depend on forests for wood, medicine, and food. However, deforestation is a major problem, leading to loss of wildlife and changing weather patterns. To protect forests, governments should create strict laws, and individuals can help by planting trees and using less paper. If forests disappear, the world will face serious environmental problems. How can people balance economic growth with forest protection?',
  wordExplanations: {
      forests: 'a large area of land covered with trees and plants',
      essential: 'absolutely necessary or important',
      life: 'the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.',
      earth: 'the planet on which we live; the world.',
      they: 'used to refer to two or more people or things previously mentioned or easily identified.',
      produce: 'to make or manufacture from components or raw materials.',
      oxygen: 'a colorless, odorless reactive gas, the chemical element of atomic number 8 and the life-supporting component of the air. Oxygen forms about 20% of the earth\'s atmosphere, and is found combined in many compounds.',
      clean: 'free from dirt, marks, or stains.',
      the: 'referring to one or more people or things already mentioned or easily identified.',
      air: 'the invisible gaseous substance surrounding the earth, a mixture mainly of oxygen and nitrogen.',
      and: 'used to connect words of the same part of speech, clauses, or sentences, that are to be taken together.',
      provide: 'make available for use; supply.',
      homes: 'a place where one lives permanently, especially as a member of a family or household.',
      many: 'a large number of.',
      animals: 'a living organism that feeds on organic matter, typically having specialized sense organs and nervous system and able to respond rapidly to stimuli.',
      trees: 'a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground.',
      help: 'make it easier for (someone) to do something by offering one\'s services or resources.',
      control: 'determine the behavior or supervise the running of.',
      climate: 'the weather conditions prevailing in an area in general or over a long period.',
      by: 'indicating the means of achieving something.',
      absorbing: 'take in (a liquid, gas, or other substance) by chemical or physical action.',
      carbon: 'the chemical element of atomic number 6, a nonmetal that is abundant and occurs in many inorganic and organic forms, the most common of which are graphite and diamond.',
      dioxide: 'an oxide containing two atoms of oxygen in the molecule.',
      reducing: 'make or become smaller or less.',
      global: 'relating to the whole world; worldwide.',
      warming: 'an increase in temperature.',
      people: 'human beings in general or considered collectively.',
      also: 'in addition; too.',
      depend: 'rely on or be controlled by (someone or something).',
      wood: 'the hard fibrous material forming the main substance of a tree or shrub.',
      medicine: 'the science or practice of the diagnosis, treatment, and prevention of disease.',
      food: 'any nutritious substance that people and animals eat or drink, or that plants absorb, in order to maintain life and growth.',
      however: 'used to introduce a statement contrasting with or qualifying a previous one; nevertheless.',
      deforestation: 'the clearing of forests.',
      major: 'serious, important, or large.',
      problem: 'a matter or situation regarded as unwelcome or harmful and needing to be dealt with and overcome.',
      leading: 'causing (something) to happen.',
      loss: 'the feeling of deprivation when deprived of someone or something loved or valued.',
      wildlife: 'wild animals collectively; the native fauna (and sometimes flora) of a region.',
      changing: 'undergoing alteration or modification.',
      weather: 'the state of the atmosphere at a place and time as regards heat, dryness, sunshine, wind, rain, etc.',
      patterns: 'a repeated decorative design.',
      protect: 'keep safe from harm or injury.',
      governments: 'the body or group of persons governing a state.',
      should: 'used to indicate obligation, duty, or correctness, typically when criticizing someone\'s actions.',
      create: 'bring (something) into existence.',
      strict: 'demanding that rules concerning behavior are obeyed.',
      laws: 'a system of rules that a particular country or community recognizes as regulating the actions of its members and may enforce by the imposition of penalties.',
      individuals: 'a single human being as distinct from a group, class, or family.',
      can: 'be able to.',
      planting: 'put (a seed, bulb, or plant) in the ground so that it can grow.',
      using: 'employing something as a means of accomplishing something.',
      less: 'a smaller amount of; not as much.',
      paper: 'thin material manufactured in sheets from the pulp of wood or other fibrous substances, used for writing, drawing, or printing on, or as wrapping.',
      if: 'on the condition or supposition that.',
      disappear: 'cease to be visible.',
      world: 'the earth, together with all of its countries, peoples, and natural features.',
      will: 'expressing a future intention or likelihood.',
      face: 'be positioned with the front toward (someone or something).',
      serious: 'acting or speaking sincerely and in earnest.',
      environmental: 'relating to the natural world and the impact of human activity on its condition.',
      how: 'in what way or manner; by what means.',
      balance: 'an even distribution of weight enabling someone or something to remain upright and steady.',
      economic: 'relating to economics or the economy.',
      growth: 'the process of increasing in physical size.',
      with: 'accompanied by (another person or thing).',
      forest: 'a large area of land covered with trees and plants',
      protection: 'the action of protecting something or someone.',
    },
    wordTranslations: {
      forests: '森林',
      essential: '必要的',
      life: '生命',
      earth: '地球',
      they: '它們',
      produce: '生產',
      oxygen: '氧氣',
      clean: '清潔',
      the: '這個/那個',
      air: '空氣',
      and: '和',
      provide: '提供',
      homes: '家',
      many: '許多',
      animals: '動物',
      trees: '樹木',
      help: '幫助',
      control: '控制',
      climate: '氣候',
      by: '藉由',
      absorbing: '吸收',
      carbon: '碳',
      dioxide: '二氧化物',
      reducing: '減少',
      global: '全球的',
      warming: '暖化',
      people: '人們',
      also: '也',
      depend: '依賴',
      wood: '木材',
      medicine: '藥物',
      food: '食物',
      however: '然而',
      deforestation: '森林砍伐',
      major: '主要的',
      problem: '問題',
      leading: '導致',
      loss: '損失',
      wildlife: '野生動物',
      changing: '改變中的',
      weather: '天氣',
      patterns: '模式',
      protect: '保護',
      governments: '政府',
      should: '應該',
      create: '創造',
      strict: '嚴格的',
      laws: '法律',
      individuals: '個人',
      can: '能夠',
      planting: '種植',
      using: '使用',
      less: '更少的',
      paper: '紙',
      if: '如果',
      disappear: '消失',
      world: '世界',
      will: '將會',
      face: '面對',
      serious: '嚴重的',
      environmental: '環境的',
      how: '如何',
      balance: '平衡',
      economic: '經濟的',
      growth: '成長',
      with: '與',
      forest: '森林',
      protection: '保護',
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