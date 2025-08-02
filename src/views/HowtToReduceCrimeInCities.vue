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
      name: 'HowtToReduceCrimeInCities',
      data() {
        return {
          audioSource: require('../mp3/38.How to reduce crime in cities.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Reducing crime in cities requires a multifaceted approach that combines law enforcement, community involvement, and addressing underlying social issues. A strong police presence in high-crime areas can help deter potential criminals, but building trust between law enforcement and the community is equally important. When people feel supported by their local police, they are more likely to report crimes and work together to solve problems. Additionally, providing youth with educational opportunities, job training, and mentorship can prevent them from turning to crime due to lack of opportunities. Tackling poverty through economic development and offering rehabilitation programs for offenders are also essential for long-term crime reduction. When people feel safe, supported, and have access to resources, crime rates tend to drop, making cities safer for everyone.',
          wordExplanations: {
     reducing: 'making something smaller or less.',
  crime: 'illegal activities or actions.',
  in: 'inside or within.',
  cities: 'large towns or urban areas.',
  requires: 'needs something as necessary.',
  a: 'used before nouns to refer to one thing.',
  multifaceted: 'having many aspects or features.',
  approach: 'a way of dealing with something.',
  that: 'used to introduce a clause or specify something.',
  combines: 'brings things together.',
  law: 'rules made by a government.',
  enforcement: 'the act of making sure laws are followed.',
  community: 'a group of people living in the same area.',
  involvement: 'taking part in something.',
  and: 'used to connect words or phrases.',
  addressing: 'dealing with or tackling.',
  underlying: 'basic but not obvious.',
  social: 'related to society or human relationships.',
  issues: 'important topics or problems.',
  strong: 'having strength or intensity.',
  police: 'an organization that enforces the law.',
  presence: 'the state of being somewhere.',
  high: 'greater than normal level.',
  areas: 'specific places or regions.',
  can: 'able to.',
  help: 'make easier or possible.',
  deter: 'discourage from doing something.',
  potential: 'possible in the future.',
  criminals: 'people who commit crimes.',
  but: 'used to show contrast.',
  building: 'constructing or creating.',
  trust: 'belief in someone’s reliability or honesty.',
  between: 'in the space or relationship connecting two things.',
  is: 'the third person singular form of "be".',
  equally: 'to the same degree or level.',
  important: 'having great value or significance.',
  when: 'at the time that.',
  people: 'humans; individuals.',
  feel: 'experience an emotion or state.',
  supported: 'given help or encouragement.',
  by: 'indicating the agent performing the action.',
  their: 'belonging to them.',
  local: 'nearby or relating to a particular area.',
  are: 'plural form of "be".',
  more: 'greater amount or degree.',
  likely: 'probable or expected.',
  to: 'indicating direction or purpose.',
  report: 'tell authorities about something.',
  crimes: 'illegal acts.',
  work: 'engage in activity to achieve something.',
  together: 'with each other.',
  solve: 'find an answer to.',
  problems: 'difficult situations or questions.',
  additionally: 'in addition.',
  providing: 'giving or supplying.',
  youth: 'young people.',
  with: 'having or including.',
  educational: 'related to learning or teaching.',
  opportunities: 'chances or openings for success.',
  job: 'work done to earn money.',
  training: 'instruction or practice to gain skills.',
  mentorship: 'guidance from a more experienced person.',
  prevent: 'stop something from happening.',
  them: 'refers to other people.',
  from: 'indicating the source or cause.',
  turning: 'changing direction or status.',
  due: 'because of.',
  lack: 'absence or shortage.',
  tackling: 'dealing with a problem.',
  poverty: 'the state of being poor.',
  through: 'by means of.',
  economic: 'relating to the economy or money.',
  development: 'growth or progress.',
  offering: 'presenting or giving something.',
  rehabilitation: 'restoring to normal life or condition.',
  programs: 'organized activities or plans.',
  offenders: 'people who break the law.',
  also: 'in addition.',
  essential: 'very important or necessary.',
  reduction: 'the act of making something less.',
  safe: 'protected from danger.',
  access: 'the ability to get or use something.',
  resources: 'useful materials or support.',
  rates: 'measured quantities or levels.',
  tend: 'usually happen or behave in a way.',
  drop: 'fall or decrease.',
  making: 'causing to become.',
  safer: 'more safe.',
  everyone: 'every person.'
    },
    wordTranslations: {
     reducing: '減少',
  crime: '犯罪',
  in: '在…之中',
  cities: '城市',
  requires: '需要',
  a: '一個',
  multifaceted: '多方面的',
  approach: '方法',
  that: '那、這',
  combines: '結合',
  law: '法律',
  enforcement: '執法',
  community: '社區',
  involvement: '參與',
  and: '和',
  addressing: '處理',
  underlying: '根本的',
  social: '社會的',
  issues: '問題',
  strong: '強大的',
  police: '警察',
  presence: '存在',
  high: '高的',
  areas: '地區',
  can: '可以',
  help: '幫助',
  deter: '嚇阻',
  potential: '潛在的',
  criminals: '罪犯',
  but: '但是',
  building: '建立',
  trust: '信任',
  between: '在…之間',
  is: '是',
  equally: '同樣地',
  important: '重要的',
  when: '當…時',
  people: '人們',
  feel: '感覺',
  supported: '受到支持的',
  by: '由',
  their: '他們的',
  local: '當地的',
  are: '是（複數）',
  more: '更多',
  likely: '可能的',
  to: '去',
  report: '報告、通報',
  crimes: '犯罪行為',
  work: '合作、工作',
  together: '一起',
  solve: '解決',
  problems: '問題',
  additionally: '此外',
  providing: '提供',
  youth: '青少年',
  with: '有，具有',
  educational: '教育的',
  opportunities: '機會',
  job: '工作',
  training: '訓練',
  mentorship: '指導',
  prevent: '防止',
  them: '他們',
  from: '從、由於',
  turning: '轉向',
  due: '由於',
  lack: '缺乏',
  tackling: '解決',
  poverty: '貧窮',
  through: '透過',
  economic: '經濟的',
  development: '發展',
  offering: '提供',
  rehabilitation: '復健、矯正',
  programs: '方案',
  offenders: '犯罪者',
  also: '也',
  essential: '必要的',
  reduction: '減少',
  safe: '安全的',
  access: '取得',
  resources: '資源',
  rates: '比率',
  tend: '往往會',
  drop: '下降',
  making: '使得',
  safer: '更安全的',
  everyone: '每個人'
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