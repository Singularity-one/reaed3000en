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
      name: 'ShouldTheDeathPenaltyExist',
      data() {
        return {
          audioSource: require('../mp3/36.Should the death penalty exist.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'The death penalty is a highly debated issue with strong arguments on both sides. Supporters argue that it serves as a deterrent to serious crimes like murder, ensuring justice for victims and their families. They also believe it can provide closure for those affected by violent crimes. On the other hand, opponents believe that the death penalty is inhumane and irreversible. There is also the risk of wrongful convictions, where an innocent person could be sentenced to death. Furthermore, some argue that life imprisonment without parole is a more effective and humane alternative. The decision depends on moral, legal, and societal considerations.',
          wordExplanations: {
the: 'used to refer to something already mentioned or known.',
  death: 'the end of life; the cessation of all biological functions.',
  penalty: 'a punishment imposed for breaking a law or rule.',
  is: 'to exist; to be present.',
  a: 'used when mentioning something for the first time.',
  highly: 'to a great degree or extent.',
  debated: 'discussed or argued about.',
  issue: 'an important topic or problem for discussion or debate.',
  with: 'accompanied by; having.',
  strong: 'having great power or strength.',
  arguments: 'reasons given to persuade others that an idea is right or wrong.',
  on: 'indicating a topic or subject.',
  both: 'the two together.',
  sides: 'positions or opinions in a discussion or argument.',
  supporters: 'people who agree with or advocate for something.',
  argue: 'to give reasons for or against something.',
  that: 'used to introduce a clause or specify something.',
  it: 'used to refer to something previously mentioned.',
  serves: 'performs a function or role.',
  as: 'used to indicate the role of something.',
  deterrent: 'something that discourages or prevents an action.',
  to: 'expressing purpose or direction.',
  serious: 'important or significant.',
  crimes: 'illegal acts punishable by law.',
  like: 'similar to; such as.',
  murder: 'the unlawful killing of another person.',
  ensuring: 'making certain or guaranteeing.',
  justice: 'fair treatment according to the law.',
  for: 'with the object or purpose of.',
  victims: 'people harmed or affected by a crime.',
  and: 'used to connect words or phrases.',
  their: 'belonging to them.',
  families: 'groups of related people living together.',
  they: 'used to refer to people previously mentioned.',
  also: 'in addition; too.',
  believe: 'accept something as true.',
  can: 'be able to.',
  provide: 'to give or make available.',
  closure: 'a feeling of resolution or conclusion.',
  those: 'used to refer to people or things previously mentioned.',
  affected: 'influenced or touched by an event.',
  by: 'indicating the means or agent.',
  violent: 'using physical force to cause harm.',
  other: 'different from the one mentioned.',
  hand: 'used to indicate the contrasting side.',
  opponents: 'people who disagree with something.',
  inhumane: 'lacking compassion or kindness.',
  irreversible: 'impossible to change or undo.',
  there: 'used to indicate the existence of something.',
  risk: 'the possibility of something harmful happening.',
  wrongful: 'not justified or fair; mistaken.',
  convictions: 'formal declarations that someone is guilty of a crime.',
  where: 'in or at which place.',
  an: 'used before a vowel sound.',
  innocent: 'not guilty of a crime or offense.',
  person: 'a human being.',
  could: 'used to indicate possibility.',
  sentenced: 'officially declared to receive a punishment.',
  furthermore: 'in addition; moreover.',
  some: 'an unspecified number or amount.',
  life: 'the condition that distinguishes living beings from non-living matter.',
  imprisonment: 'the state of being confined in prison.',
  without: 'in the absence of.',
  parole: 'conditional release of a prisoner before the full sentence is served.',
  more: 'greater in amount or degree.',
  effective: 'successful in producing a desired result.',
  humane: 'showing kindness and compassion.',
  alternative: 'another option or choice.',
  decision: 'a conclusion or resolution reached after consideration.',
  depends: 'is influenced or determined by.',
  moral: 'concerned with principles of right and wrong behavior.',
  legal: 'related to the law.',
  societal: 'relating to society or social relations.',
  considerations: 'thoughts or factors taken into account when making a decision.',
    },
    wordTranslations: {
    the: '這個',
  death: '死亡',
  penalty: '刑罰',
  is: '是',
  a: '一個',
  highly: '非常',
  debated: '爭論的',
  issue: '議題',
  with: '有',
  strong: '強烈的',
  arguments: '論點',
  on: '關於',
  both: '兩個',
  sides: '方面',
  supporters: '支持者',
  argue: '主張',
  that: '那',
  it: '它',
  serves: '作為',
  as: '作為',
  deterrent: '威懾',
  to: '對於',
  serious: '嚴重的',
  crimes: '犯罪',
  like: '像',
  murder: '謀殺',
  ensuring: '確保',
  justice: '正義',
  for: '為了',
  victims: '受害者',
  and: '和',
  their: '他們的',
  families: '家庭',
  they: '他們',
  also: '也',
  believe: '相信',
  can: '能夠',
  provide: '提供',
  closure: '結束感',
  those: '那些',
  affected: '受到影響的',
  by: '由',
  violent: '暴力的',
  other: '另一方',
  hand: '另一方面',
  opponents: '反對者',
  inhumane: '不人道的',
  irreversible: '不可逆的',
  there: '那裡',
  risk: '風險',
  wrongful: '錯誤的',
  convictions: '定罪',
  where: '哪裡',
  an: '一個',
  innocent: '無辜的',
  person: '人',
  could: '可能',
  sentenced: '判決',
  furthermore: '此外',
  some: '一些',
  life: '生命',
  imprisonment: '監禁',
  without: '沒有',
  parole: '假釋',
  more: '更',
  effective: '有效的',
  humane: '人道的',
  alternative: '替代方案',
  decision: '決定',
  depends: '取決於',
  moral: '道德的',
  legal: '法律的',
  societal: '社會的',
  considerations: '考量',
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