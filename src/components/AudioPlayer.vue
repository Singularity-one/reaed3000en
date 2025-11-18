<template>
  <div
    class="box-range-content"
    style="display: flex; gap: 10px; align-items: center"
  >
    <!-- 播放 -->
    <button @click="playAudio">
      <i class="box-project-meta-icon linearicons-play-circle"></i>
    </button>

    <!-- 循環播放 -->
    <button @click="toggleLoop">
      <i
        :class="[
          'box-project-meta-icon',
          'linearicons-repeat',
          { active: isLoop },
        ]"
      ></i>
    </button>

    <!-- 停止 -->
    <button @click="stopAudio">
      <i class="box-project-meta-icon linearicons-stop-circle"></i>
    </button>

    <!-- 倍速播放按鈕 -->
    <button
      @click="cycleSpeed"
      style="display: flex; align-items: center; gap: 5px"
    >
  <i :class="['box-project-meta-icon', 'linearicons-forward-circle', { active: speed > 1 }]"></i>
      <span>{{ speed }}x</span>
    </button>

    <!-- 音訊 -->
    <audio ref="audioPlayer" :src="resolvedAudioSource"></audio>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    audioSource: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoop: false,
      isFast: false,
      resolvedAudioSource: "",
      speed: 1, // 當前播放速度
    };
  },
  mounted() {
    try {
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
    },
    cycleSpeed() {
      const player = this.$refs.audioPlayer;
      // 循環速度 1 → 2 → 3 → 1
      this.speed = this.speed === 3 ? 1 : this.speed + 1;
      player.playbackRate = this.speed;
      player.play(); // 切換速度後自動播放
    },
  },
};
</script>

<style scoped>
.active {
  color: red;
}
</style>
