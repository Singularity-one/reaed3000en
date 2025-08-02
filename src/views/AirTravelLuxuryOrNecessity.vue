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
      name: 'AirTravelLuxuryOrNecessity',
      data() {
        return {
          audioSource: require('../mp3/34.Air travel luxury or necessity.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Air travel can be both a luxury and a necessity, depending on the situation. For business professionals, emergency medical needs, or people visiting distant family members, flying is essential. It saves time and allows quick travel between countries. However, for tourism and leisure, air travel is often a luxury, as people choose it for comfort and experience. Despite its benefits, flying has environmental costs, such as carbon emissions that contribute to climate change. To balance convenience and sustainability, travelers can consider alternatives like trains for shorter trips. Whether air travel is a necessity or a luxury depends on individual needs.',
          wordExplanations: {
  air: 'The invisible gas we breathe.',
  travel: 'The act of going from one place to another.',
  can: 'Able to.',
  be: 'To exist or happen.',
  both: 'Used to refer to two things at once.',
  luxury: 'Something expensive or not necessary but enjoyable.',
  and: 'Used to connect words or phrases.',
  necessity: 'Something that is needed.',
  depending: 'Changing based on conditions.',
  on: 'Used to show what something depends on.',
  the: 'Used before a noun to refer to a specific thing.',
  situation: 'A set of conditions at a certain time.',
  for: 'Used to show purpose.',
  business: 'Work or trade.',
  professionals: 'People who do a job that needs special training.',
  emergency: 'A sudden and serious situation needing quick action.',
  medical: 'Related to health or treatment.',
  needs: 'Things that are necessary.',
  or: 'Used to show a choice.',
  people: 'Humans in general.',
  visiting: 'Going to see someone or somewhere.',
  distant: 'Far away.',
  family: 'A group of related people.',
  members: 'People who belong to a group.',
  flying: 'Traveling by airplane.',
  is: 'Present tense of “be.”',
  essential: 'Very important or necessary.',
  it: 'Refers to a previously mentioned idea or thing.',
  saves: 'Keeps from losing something (like time or money).',
  time: 'A measurable period.',
  allows: 'Lets someone do something.',
  quick: 'Fast.',
  between: 'In the space separating two things.',
  countries: 'Nations with their own governments.',
  however: 'But; used to contrast.',
  tourism: 'Traveling for fun or interest.',
  leisure: 'Free time used for relaxation.',
  often: 'Frequently.',
  as: 'Used to show reason or purpose.',
  choose: 'To pick from options.',
  comfort: 'A state of ease and no pain.',
  experience: 'Something that happens to someone.',
  despite: 'Even though something happened.',
  benefits: 'Good effects or advantages.',
  has: 'Possesses or contains.',
  environmental: 'Related to nature or the earth.',
  costs: 'The price or negative effects of something.',
  such: 'Like; for example.',
  carbon: 'A chemical element found in all living things.',
  emissions: 'Substances sent out into the air.',
  that: 'Which; used to introduce more detail.',
  contribute: 'To help cause something.',
  climate: 'Weather over a long time.',
  change: 'To become different.',
  to: 'In order to.',
  balance: 'To make things even or fair.',
  convenience: 'Ease of doing something.',
  sustainability: 'Avoiding harm to the environment over time.',
  travelers: 'People who travel.',
  consider: 'To think about carefully.',
  alternatives: 'Different options or choices.',
  like: 'Similar to.',
  trains: 'Vehicles that move on tracks.',
  shorter: 'Having less length or time.',
  trips: 'Journeys or travels.',
  whether: 'If or not.',
  depends: 'Is affected by something.',
  individual: 'One person or thing.',
    },
    wordTranslations: {
      air: '空氣',
  travel: '旅行',
  can: '可以',
  be: '是',
  both: '兩者',
  luxury: '奢侈品',
  and: '和',
  necessity: '必需品',
  depending: '取決於',
  on: '在…上',
  the: '這個',
  situation: '情況',
  for: '為了',
  business: '商業',
  professionals: '專業人士',
  emergency: '緊急情況',
  medical: '醫療的',
  needs: '需求',
  or: '或者',
  people: '人們',
  visiting: '拜訪',
  distant: '遙遠的',
  family: '家庭',
  members: '成員',
  flying: '飛行',
  is: '是',
  essential: '必要的',
  it: '它',
  saves: '節省',
  time: '時間',
  allows: '允許',
  quick: '快速的',
  between: '在…之間',
  countries: '國家',
  however: '然而',
  tourism: '旅遊',
  leisure: '休閒',
  often: '經常',
  as: '因為',
  choose: '選擇',
  comfort: '舒適',
  experience: '經驗',
  despite: '儘管',
  benefits: '好處',
  has: '有',
  environmental: '環境的',
  costs: '代價',
  such: '像是',
  carbon: '碳',
  emissions: '排放',
  that: '那個',
  contribute: '導致',
  climate: '氣候',
  change: '變化',
  to: '去',
  balance: '平衡',
  convenience: '便利',
  sustainability: '永續性',
  travelers: '旅客',
  consider: '考慮',
  alternatives: '替代方案',
  like: '像',
  trains: '火車',
  shorter: '較短的',
  trips: '旅程',
  whether: '是否',
  depends: '取決於',
  individual: '個人的',
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