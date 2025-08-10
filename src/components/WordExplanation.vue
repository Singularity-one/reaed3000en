<template>
  <div v-if="visible" class="explanation-text">
    <div style="display: flex; gap: 5px; align-items: center;">
      <p>
        <strong>{{ word }}</strong>
        <em>({{ partOfSpeech }})</em>
      </p>
      <button @click="speakWord" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-volume-medium"></i>
      </button>
      <button @click="toggleTranslation" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-eye"></i>
      </button>
      <button @click="closeExplanation" style="padding: 5px;">
        <i class="box-project-meta-icon linearicons-power-switch"></i>
      </button>
    </div>
    <p class="small-paragraph">{{ displayedExplanation }}</p>
    <p v-if="example" class="small-paragraph">
      <strong>example：</strong>{{ example }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'WordExplanation',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    partOfSpeech: {
      type: String,
      default: '',
    },
    explanation: {
      type: String,
      default: '',
    },
    translation: {
      type: String,
      default: '',
    },
    example: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showTranslation: false,
    };
  },
  computed: {
    displayedExplanation() {
      return this.showTranslation && this.translation ? this.translation : this.explanation;
    },
  },
  methods: {
    closeExplanation() {
      this.showTranslation = false;
      this.$emit('close');
    },
    toggleTranslation() {
      this.showTranslation = !this.showTranslation;
    },
    speakWord() {
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        if (synth.speaking) synth.cancel();
        const utterance = new SpeechSynthesisUtterance(this.word);
        synth.speak(utterance);
      } else {
        alert('您的瀏覽器不支持語音合成功能。');
      }
    },
  },
};
</script>

<style scoped>
.explanation-text p {
  margin-bottom: 1rem;
}
</style>
