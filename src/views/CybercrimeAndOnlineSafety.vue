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
      name: 'CybercrimeAndOnlineSafety',
      data() {
        return {
          audioSource: require('../mp3/39.Cybercrime and online safety.mp3'), // 替換為你的 MP3 檔案路徑
          dataText: 'Cybercrime is a growing threat in today digital world, as more people rely on the internet for various activities such as work, communication, and entertainment. Cybercriminals engage in illegal activities like hacking, identity theft, phishing scams, and distributing malware. To protect ourselves from these dangers, it’s important to adopt strong online safety measures. Using complex, unique passwords for different accounts is essential, as is enabling two-factor authentication for an extra layer of security. Avoiding suspicious emails and websites, and being cautious when sharing personal information online, can also help prevent falling victim to cybercrime. Additionally, installing antivirus software and keeping it updated protects devices from malware and other threats. By staying informed and practicing good online habits, we can reduce the risk of cybercrime and ensure a safer internet experience.',
          wordExplanations: {
       cybercrime: 'criminal activity carried out using computers or the internet',
  growing: 'increasing in size, amount, or importance',
  threat: 'a potential danger or risk',
  today: 'the present time or age',
  digital: 'involving or relating to computers and technology',
  world: 'the earth and all people and things in it',
  people: 'human beings in general',
  rely: 'to depend on or trust someone or something',
  internet: 'a global network that connects computers and allows communication and information sharing',
  work: 'activities done to earn money',
  communication: 'the exchange of information between people',
  entertainment: 'activities for fun or enjoyment',
  cybercriminals: 'people who commit crimes using computers or the internet',
  engage: 'to take part in or be involved in',
  illegal: 'against the law',
  activities: 'things that people do',
  hacking: 'breaking into computer systems without permission',
  identity: 'the personal details that define who someone is',
  theft: 'the act of stealing',
  phishing: 'tricking people into revealing personal information online',
  scams: 'dishonest plans meant to trick and cheat people',
  distributing: 'spreading or sharing something out',
  malware: 'software that is harmful to computers',
  protect: 'to keep safe from harm or danger',
  ourselves: 'we as individuals',
  adopt: 'to start to use or follow something',
  strong: 'powerful or effective',
  online: 'connected to or using the internet',
  safety: 'being protected from danger',
  measures: 'actions taken to achieve a result or goal',
  using: 'employing something for a purpose',
  complex: 'complicated or hard to understand',
  unique: 'one of a kind; different from others',
  passwords: 'secret codes used to access accounts',
  different: 'not the same',
  accounts: 'user profiles on websites or systems',
  essential: 'absolutely necessary or important',
  enabling: 'making something possible',
  authentication: 'verifying identity before giving access',
  added: 'extra; additional',
  security: 'protection against danger or attack',
  avoiding: 'staying away from something',
  suspicious: 'likely to be dangerous or dishonest',
  emails: 'messages sent electronically over the internet',
  websites: 'pages on the internet with content and information',
  cautious: 'careful to avoid risks',
  sharing: 'giving or showing to others',
  personal: 'private; belonging to one person',
  information: 'facts or details about something',
  prevent: 'to stop something from happening',
  victim: 'a person harmed by a crime or action',
  installing: 'setting up software or hardware on a device',
  antivirus: 'software that defends against harmful programs',
  software: 'programs used by computers',
  updated: 'brought to the newest version',
  devices: 'electronic tools like phones or computers',
  informed: 'having or showing knowledge',
  practicing: 'doing regularly to become skilled',
  good: 'right, helpful, or proper',
  habits: 'regular behaviors or routines',
  reduce: 'to make less or lower',
  risk: 'the chance of something bad happening',
  ensure: 'to make certain',
  safer: 'more protected from harm',
  experience: 'the way something happens to you'
    },
    wordTranslations: {
      cybercrime: '網路犯罪',
  growing: '日益增加的',
  threat: '威脅',
  today: '當今',
  digital: '數位的',
  world: '世界',
  people: '人們',
  rely: '依賴',
  internet: '網際網路',
  work: '工作',
  communication: '溝通',
  entertainment: '娛樂',
  cybercriminals: '網路罪犯',
  engage: '參與',
  illegal: '非法的',
  activities: '活動',
  hacking: '駭客行為',
  identity: '身份',
  theft: '竊盜',
  phishing: '網路釣魚',
  scams: '詐騙',
  distributing: '散播',
  malware: '惡意軟體',
  protect: '保護',
  ourselves: '我們自己',
  adopt: '採取',
  strong: '強而有力的',
  online: '線上的',
  safety: '安全',
  measures: '措施',
  using: '使用',
  complex: '複雜的',
  unique: '獨特的',
  passwords: '密碼',
  different: '不同的',
  accounts: '帳號',
  essential: '必要的',
  enabling: '啟用',
  authentication: '身份驗證',
  added: '額外的',
  security: '安全性',
  avoiding: '避免',
  suspicious: '可疑的',
  emails: '電子郵件',
  websites: '網站',
  cautious: '小心的',
  sharing: '分享',
  personal: '個人的',
  information: '資訊',
  prevent: '防止',
  victim: '受害者',
  installing: '安裝',
  antivirus: '防毒軟體',
  software: '軟體',
  updated: '更新的',
  devices: '裝置',
  informed: '了解的',
  practicing: '練習',
  good: '良好的',
  habits: '習慣',
  reduce: '減少',
  risk: '風險',
  ensure: '確保',
  safer: '更安全的',
  experience: '經驗'
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