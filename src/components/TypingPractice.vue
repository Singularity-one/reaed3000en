<template>
  <div class="typing-practice">
    <!-- 關閉按鈕 -->
    <div class="controls" style="justify-content: flex-end;">
      <button @click="$emit('close')" class="btn btn-danger">close</button>
    </div>

    <!-- 練習文字顯示 -->
    <div class="text-display" @click="focusInput">
      <span 
        v-for="(char, index) in practiceText" 
        :key="index"
        :class="getCharClass(index)">
        {{ char === ' ' ? '␣' : char }}
      </span>
    </div>

    <!-- 隱藏輸入區 -->
    <input 
      ref="hiddenInput"
      v-model="userInput"
      @input="handleInput"
      @keydown="handleKeydown"
      class="hidden-input"
      :disabled="finished"
      autocomplete="off"
      spellcheck="false"
    />

    <!-- 控制按鈕 -->
    <!-- <div class="controls">
      <button @click="restart" class="btn btn-primary">重新開始</button>
    </div> -->

    <!-- 鍵盤圖示 (可選) -->
    <div v-if="showKeyboard" class="keyboard-layout">
      <div class="keyboard-row" v-for="(row, rowIndex) in keyboardRows" :key="rowIndex">
        <div 
          v-for="key in row" 
          :key="key"
          :class="['key', getKeyClass(key)]">
          {{ key === ' ' ? 'rest' : key }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypingPractice",
  props: {
    text: {
      type: String,
      default: "The quick brown fox jumps over the lazy dog"
    },
    showKeyboard: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      practiceText: "",
      userInput: "",
      currentIndex: 0,
      finished: false,
      keyboardRows: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        [' ']
      ]
    };
  },
  watch: {
    text(newVal) {
      if (newVal && newVal.trim() !== '') {
        this.practiceText = newVal;
        this.reset();
      }
    },
  },
  computed: {
    currentChar() {
      return this.practiceText[this.currentIndex]?.toLowerCase() || '';
    }
  },
  mounted() {
    this.practiceText = this.text;
    this.focusInput();

    // 監聽空白鍵重新開始
    window.addEventListener('keydown', this.handleGlobalKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleGlobalKey);
  },
  methods: {
    handleInput(event) {
      const inputChar = (event.data || '').toLowerCase(); // 忽略大小寫
      if (inputChar === this.currentChar) {
        this.currentIndex++;
        if (this.currentIndex >= this.practiceText.length) {
          this.finished = true;
        }
      }
      this.$nextTick(() => {
        this.userInput = '';
      });
    },
    handleKeydown(event) {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
      }
    },
    handleGlobalKey(event) {
      // 空白鍵重新開始
      if (event.code === 'Space' && this.finished) {
        event.preventDefault();
        this.restart();
      }
    },
    restart() {
      this.userInput = '';
      this.currentIndex = 0;
      this.finished = false;
      this.$nextTick(() => {
        this.focusInput();
      });
    },
    focusInput() {
      this.$refs.hiddenInput?.focus();
    },
    getCharClass(index) {
      if (index < this.currentIndex) return 'char typed correct';
      if (index === this.currentIndex) return 'char current';
      return 'char pending';
    },
    getKeyClass(key) {
      return key.toLowerCase() === this.currentChar ? 'highlight' : '';
    },
    reset() {
      this.restart();
    }
  }
};
</script>

<style scoped>
.typing-practice {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: white; /* 移除紫色漸層 */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

/* 文字顯示區 */
.text-display {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  font-size: 28px;
  line-height: 1.8;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin-bottom: 20px;
  min-height: 120px;
  border: 1px solid #ddd;
}

.char {
  transition: all 0.2s ease;
}

.char.typed.correct {
  color: #27ae60;
  font-weight: bold;
}

.char.current {
  color: #3498db;
  background: #e3f2fd;
  padding: 2px 5px;
  border-radius: 4px;
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.char.pending {
  color: #95a5a6;
}

/* 隱藏輸入框 */
.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* 控制按鈕 */
.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary { background: #3498db; color: white; }
.btn-danger { background: #e74c3c; color: white; }

.btn:hover {
  opacity: 0.9;
}

/* 鍵盤佈局 */
.keyboard-layout {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255,255,255,0.95);
  border-radius: 10px;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 5px;
}

.key {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ecf0f1;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 18px;
  color: #34495e;
  transition: all 0.2s ease;
}

.key.highlight {
  background: #f39c12;
  color: white;
  border-color: #e67e22;
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(243, 156, 18, 0.5);
}

.keyboard-row:last-child .key {
  width: 300px;
}
</style>