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
      name: 'WhyHonestyIsImportantInSociety',
      data() {
        return {
          audioSource: require('../mp3/40.Why honesty is important in society.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Honesty is crucial in society because it builds trust and fosters strong relationships. When people are honest, they create an environment where others feel safe and respected. Trust is the foundation of communication, and without it, relationships—whether personal, professional, or societal—can break down. Honest behavior also promotes accountability and responsibility, as individuals take ownership of their actions. In a society where honesty is valued, people are more likely to cooperate and work together toward common goals. Dishonesty, on the other hand, can lead to conflict, misunderstandings, and a loss of credibility. Therefore, honesty helps maintain stability and harmony within communities.',
          wordExplanations: {
 honesty: 'the quality of being truthful and fair',
  crucial: 'very important or essential',
  society: 'a group of people living together in a community',
  builds: 'creates or develops something over time',
  trust: 'belief in the reliability or truth of someone or something',
  fosters: 'encourages or supports the growth of something',
  relationships: 'connections between people or groups',
  people: 'human beings in general',
  honest: 'truthful and not lying or cheating',
  create: 'to make or bring into existence',
  environment: 'the surroundings or conditions where something exists or happens',
  others: 'other people',
  feel: 'to experience an emotion or condition',
  safe: 'protected from danger or harm',
  respected: 'treated with honor and consideration',
  foundation: 'the base or starting point of something important',
  communication: 'the exchange of information between people',
  without: 'not having or lacking',
  whether: 'used to express a choice or possibility',
  personal: 'related to an individual’s private life',
  professional: 'related to a job or career',
  societal: 'related to society as a whole',
  break: 'to separate or stop working',
  down: 'in a lower position or condition',
  behavior: 'the way someone acts or responds',
  promotes: 'encourages or supports something',
  accountability: 'being responsible and answerable for actions',
  responsibility: 'having a duty to deal with something',
  individuals: 'single persons considered separately',
  take: 'to assume or get control of something',
  ownership: 'accepting responsibility for something',
  actions: 'things done or performed',
  valued: 'considered important or useful',
  cooperate: 'to work together toward a goal',
  work: 'to perform a task or job',
  toward: 'in the direction of',
  common: 'shared by multiple people',
  goals: 'things one wants to achieve',
  dishonesty: 'the act of being untruthful or deceptive',
  lead: 'to cause something to happen',
  conflict: 'a serious disagreement or argument',
  misunderstandings: 'failures to understand correctly',
  loss: 'the state of no longer having something',
  credibility: 'the quality of being trusted or believed',
  maintain: 'to keep something in good condition',
  stability: 'a state of being steady and not changing',
  harmony: 'a peaceful and cooperative state',
  within: 'inside or part of',
  communities: 'groups of people living in the same area or sharing interests'
    },
    wordTranslations: {
honesty: '誠實',
  crucial: '關鍵的',
  society: '社會',
  builds: '建立',
  trust: '信任',
  fosters: '促進',
  relationships: '關係',
  people: '人們',
  honest: '誠實的',
  create: '創造',
  environment: '環境',
  others: '其他人',
  feel: '感覺',
  safe: '安全的',
  respected: '受尊重的',
  foundation: '基礎',
  communication: '溝通',
  without: '沒有',
  whether: '無論',
  personal: '個人的',
  professional: '職業的',
  societal: '社會的',
  break: '破裂',
  down: '崩潰、下降',
  behavior: '行為',
  promotes: '促進',
  accountability: '負責任',
  responsibility: '責任',
  individuals: '個人',
  take: '承擔',
  ownership: '擁有、負責',
  actions: '行為',
  valued: '被重視的',
  cooperate: '合作',
  work: '工作',
  toward: '朝向',
  common: '共同的',
  goals: '目標',
  dishonesty: '不誠實',
  lead: '導致',
  conflict: '衝突',
  misunderstandings: '誤解',
  loss: '喪失',
  credibility: '可信度',
  maintain: '維持',
  stability: '穩定',
  harmony: '和諧',
  within: '在…之內',
  communities: '社群，社區'
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