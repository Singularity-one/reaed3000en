<template>
  <div class="box-range-content" style="display: flex; gap: 10px; align-items: center;">
    <!-- 播放 -->
    <button @click="playAudio">
      <i class="box-project-meta-icon linearicons-play-circle"></i>
    </button>

    <!-- 循環播放 -->
    <button @click="toggleLoop">
      <i :class="['box-project-meta-icon', 'linearicons-repeat', { active: isLoop }]"></i>
    </button>

    <!-- 停止 -->
    <button @click="stopAudio">
      <i class="box-project-meta-icon linearicons-stop-circle"></i>
    </button>

    <!-- 音訊 -->
    <audio ref="audioPlayer" :src="resolvedAudioSource"></audio>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    // 只需要傳檔案名稱
    audioSource: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoop: false,
      resolvedAudioSource: ""
    };
  },
  mounted() {
    try {
      // 直接從 src/mp3 資料夾讀取
      this.resolvedAudioSource = require(`@/mp3/${this.audioSource}`);
    } catch (error) {
      console.error(`❌ 找不到音訊檔案: src/mp3/${this.audioSource}`, error);
    }
  },
  methods: {
    playAudio() {
      this.$refs.audioPlayer?.play();
    },
    toggleLoop() {
      this.isLoop = !this.isLoop;
      const player = this.$refs.audioPlayer;
      player.loop = this.isLoop;
      player.play();
    },
    stopAudio() {
      const audio = this.$refs.audioPlayer;
      audio.pause();
      audio.currentTime = 0;
    }
  }
};
</script>

<style scoped>
.active {
  color: red;
}
</style>