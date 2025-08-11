<template>
  <div class="cloze-test-section" style="margin-top: 2rem;">
    <div 
      v-for="(sentence, sIndex) in sentencesTokens" 
      :key="'sentence-' + sIndex"
      style="margin-bottom: 1.5rem;"
    >
      <!-- 這裡用 hiddenParts 控制 -->
      <p v-if="!hiddenParts[sIndex]">
        <span v-for="(token, tIndex) in sentence" :key="'token-' + sIndex + '-' + tIndex">
          <template v-if="token.isBlank">
            <input
              type="text"
              v-model="token.userAnswer"
              :class="{'correct': token.isCorrect === true, 'wrong': token.isCorrect === false}"
              style="width: 100px; margin-right: 4px;"
              @keyup.enter="checkAnswers(sIndex)"
              placeholder="Type here"
            />
          </template>
          <template v-else>
            {{ token.text }}
          </template>
          <span> </span>
        </span>
      </p>

      <button @click="checkAnswers(sIndex)" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-file-check"></i>
      </button>
      <button @click="resetCloze(sIndex)" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-reply"></i>
      </button>
      <button @click="speakSentence(sIndex)" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-volume-medium"></i>
      </button>

      <button v-if="!hiddenParts[sIndex]" @click="hiddenParts[sIndex] = true" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-eye-crossed"></i>
      </button>
      <button v-else @click="hiddenParts[sIndex] = false" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-eye"></i>
      </button>

      <div v-if="showAnswers[sIndex]" style="margin-top: 1rem;">
        <p><strong>Correct answers:</strong></p>
        <ul>
          <li v-for="(token, index) in sentencesTokens[sIndex].filter(t => t.isBlank)" :key="'answer-'+sIndex+'-'+index">
            {{ token.correctAnswer }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClozeTest',
  props: {
    dataText: {
      type: String,
      required: true
    },
    wordExplanations: {
      type: Object,
      required: true
    },
    blanksCount: {
      type: Number,
      default: 3  // 每句最大空格數量，自行調整
    }
  },
  data() {
    return {
      sentencesTokens: [],  // 二維陣列，每句話一組 tokens
      showAnswers: [],      // 每句是否顯示答案（boolean 陣列）
      hiddenParts: [],
    };
  },
  computed:{
    visibleSentences() {
      return this.sentencesTokens
        .map((sentence, idx) => ({ sentence, index: idx }))
        .filter(({ index }) => !this.hiddenSentences[index]);
    },
  },
  methods: {
    splitIntoSentences(text) {
      // 簡單用句號/問號/驚嘆號分句（可擴充）
      return text.match(/[^.!?]+[.!?]?/g) || [];
    },
    generateClozeTokensForSentence(sentence) {
      const words = sentence.split(/(\s+)/);
      const candidateWords = Object.keys(this.wordExplanations);
      let blanksSet = new Set();

      // 挑出句中可空白詞
      words.forEach(word => {
        const cleaned = word.replace(/[.,!?();:"“”]/g, '').toLowerCase();
        if (candidateWords.includes(cleaned)) blanksSet.add(cleaned);
      });

      // 限制空格數量
      const blanksArray = Array.from(blanksSet).slice(0, this.blanksCount);

      // 產生 tokens
      return words.map(word => {
        const cleaned = word.replace(/[.,!?();:"“”]/g, '').toLowerCase();
        if (blanksArray.includes(cleaned)) {
          return {
            text: '_____',
            isBlank: true,
            correctAnswer: cleaned,
            userAnswer: '',
            isCorrect: null
          };
        }
        return { text: word, isBlank: false };
      });
    },
    generateClozeTokens() {
      const sentences = this.splitIntoSentences(this.dataText);
      this.sentencesTokens = sentences.map(sentence => this.generateClozeTokensForSentence(sentence));
      this.showAnswers = sentences.map(() => false);
      this.hiddenParts = sentences.map(() => false);
    },
    checkAnswers(sentenceIndex) {
        this.sentencesTokens[sentenceIndex].forEach(token => {
            if (token.isBlank) {
                token.isCorrect = token.userAnswer.trim().toLowerCase() === token.correctAnswer;
            }
        });
        this.showAnswers[sentenceIndex] = true;  // 直接賦值
    },
    resetCloze(sentenceIndex) {
        this.sentencesTokens[sentenceIndex].forEach(token => {
            if (token.isBlank) {
                token.userAnswer = '';
                token.isCorrect = null;
            }
        });
        this.showAnswers[sentenceIndex] = false;  // 直接賦值
    },
    speakSentence(sentenceIndex) {
      const sentenceTokens = this.sentencesTokens[sentenceIndex];
      // 將 tokens 合併成句子（空格要加上）
      const textToSpeak = sentenceTokens.map(t => t.isBlank ? t.correctAnswer : t.text).join('');
      
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // 嘗試用 Google 英文語音
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
          synth.speak(utterance);
        };
        if (synth.getVoices().length > 0) {
          setGoogleVoice();
        } else {
          synth.onvoiceschanged = () => {
            setGoogleVoice();
            synth.onvoiceschanged = null;
          };
        }
      } else {
        alert('您的瀏覽器不支持語音合成功能。');
      }
    },
    toggleSentence(index) {
      this.hiddenSentences[index] = !this.hiddenSentences[index];
    },
  },
  watch: {
    dataText: 'generateClozeTokens',
    wordExplanations: {
      handler: 'generateClozeTokens',
      deep: true
    }
  },
  created() {
    this.generateClozeTokens();
  }
};
</script>

<style scoped>
input.correct {
  border: 2px solid green;
  background-color: #d4edda;
}
input.wrong {
  border: 2px solid red;
  background-color: #f8d7da;
}
</style>