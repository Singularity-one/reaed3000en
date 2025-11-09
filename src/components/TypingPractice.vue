<template>
  <div class="typing-practice">
    <!-- 統計資訊 -->
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">速度:</span>
        <span class="stat-value">{{ wpm }} WPM</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">準確度:</span>
        <span class="stat-value">{{ accuracy }}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">錯誤:</span>
        <span class="stat-value error">{{ errors }}</span>
      </div>
    </div>

    <!-- 手指提示 -->
    <div class="finger-hint">
      <div class="hand left-hand">
        <div v-for="finger in leftFingers" 
             :key="finger.id"
             :class="['finger', finger.id, { active: currentFinger === finger.id }]">
          {{ finger.name }}
        </div>
      </div>
      <div class="hand right-hand">
        <div v-for="finger in rightFingers" 
             :key="finger.id"
             :class="['finger', finger.id, { active: currentFinger === finger.id }]">
          {{ finger.name }}
        </div>
      </div>
    </div>

    <!-- 練習文字顯示 -->
    <div class="text-display">
      <span 
        v-for="(char, index) in practiceText" 
        :key="index"
        :class="getCharClass(index)">
        {{ char === ' ' ? '␣' : char }}
      </span>
    </div>

    <!-- 輸入區 (隱藏但保持焦點) -->
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
    <div class="controls">
      <button @click="restart" class="btn btn-primary">
        <i class="icon-restart">↻</i> 重新開始
      </button>
      <button @click="toggleAudio" class="btn btn-secondary">
        <i :class="['icon-audio', isAudioEnabled ? 'icon-volume' : 'icon-mute']">
          {{ isAudioEnabled ? '🔊' : '🔇' }}
        </i>
      </button>
      <button @click="focusInput" class="btn btn-info">
        <i class="icon-focus">⌨</i> 點擊開始
      </button>
    </div>

    <!-- 完成畫面 -->
    <div v-if="finished" class="finish-screen">
      <h2>🎉 完成!</h2>
      <p>速度: <strong>{{ wpm }} WPM</strong></p>
      <p>準確度: <strong>{{ accuracy }}%</strong></p>
      <p>總錯誤: <strong>{{ errors }}</strong></p>
      <p>花費時間: <strong>{{ timeSpent }}秒</strong></p>
      <button @click="restart" class="btn btn-large">再練習一次</button>
    </div>

    <!-- 鍵盤圖示 (可選) -->
    <div v-if="showKeyboard" class="keyboard-layout">
      <div class="keyboard-row" v-for="(row, rowIndex) in keyboardRows" :key="rowIndex">
        <div 
          v-for="key in row" 
          :key="key"
          :class="['key', getKeyClass(key)]">
          {{ key === ' ' ? 'Space' : key }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypingPractice",
  props: {
    // 練習文字 (可從外部傳入)
    text: {
      type: String,
      default: "The quick brown fox jumps over the lazy dog"
    },
    // 是否顯示鍵盤
    showKeyboard: {
      type: Boolean,
      default: false
    },
    // 音效檔案路徑
    correctSound: {
      type: String,
      default: null
    },
    errorSound: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      practiceText: "",
      userInput: "",
      currentIndex: 0,
      errors: 0,
      startTime: null,
      endTime: null,
      wpm: 0,
      finished: false,
      isAudioEnabled: true,
      
      // 手指定義
      leftFingers: [
        { id: 'left-pinky', name: '小指' },
        { id: 'left-ring', name: '無名指' },
        { id: 'left-middle', name: '中指' },
        { id: 'left-index', name: '食指' }
      ],
      rightFingers: [
        { id: 'right-index', name: '食指' },
        { id: 'right-middle', name: '中指' },
        { id: 'right-ring', name: '無名指' },
        { id: 'right-pinky', name: '小指' }
      ],
      
      // 鍵位到手指的映射
      fingerMap: {
        'q': 'left-pinky', 'a': 'left-pinky', 'z': 'left-pinky', '1': 'left-pinky',
        'w': 'left-ring', 's': 'left-ring', 'x': 'left-ring', '2': 'left-ring',
        'e': 'left-middle', 'd': 'left-middle', 'c': 'left-middle', '3': 'left-middle',
        'r': 'left-index', 'f': 'left-index', 'v': 'left-index', 't': 'left-index', 
        'g': 'left-index', 'b': 'left-index', '4': 'left-index', '5': 'left-index',
        'y': 'right-index', 'h': 'right-index', 'n': 'right-index', 'u': 'right-index', 
        'j': 'right-index', 'm': 'right-index', '6': 'right-index', '7': 'right-index',
        'i': 'right-middle', 'k': 'right-middle', ',': 'right-middle', '8': 'right-middle',
        'o': 'right-ring', 'l': 'right-ring', '.': 'right-ring', '9': 'right-ring',
        'p': 'right-pinky', ';': 'right-pinky', '/': 'right-pinky', '0': 'right-pinky',
        '[': 'right-pinky', ']': 'right-pinky', '\\': 'right-pinky', "'": 'right-pinky',
        ' ': 'thumb'
      },
      
      // 鍵盤佈局 (用於顯示)
      keyboardRows: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        [' ']
      ]
    };
  },
  computed: {
    currentChar() {
      return this.practiceText[this.currentIndex]?.toLowerCase() || '';
    },
    currentFinger() {
      return this.fingerMap[this.currentChar] || '';
    },
    accuracy() {
      if (this.currentIndex === 0) return 100;
      return Math.round(((this.currentIndex - this.errors) / this.currentIndex) * 100);
    },
    timeSpent() {
      if (!this.startTime) return 0;
      const end = this.endTime || Date.now();
      return Math.round((end - this.startTime) / 1000);
    }
  },
  mounted() {
    this.practiceText = this.text;
    this.focusInput();
  },
  methods: {
    handleInput(event) {
      // 開始計時
      if (!this.startTime) {
        this.startTime = Date.now();
      }

      const inputChar = event.data?.toLowerCase() || '';
      const expectedChar = this.currentChar;

      if (inputChar === expectedChar) {
        // 正確
        this.playSound('correct');
        this.currentIndex++;
        
        // 更新 WPM
        this.updateWPM();
        
        // 檢查是否完成
        if (this.currentIndex >= this.practiceText.length) {
          this.finishPractice();
        }
      } else {
        // 錯誤
        this.errors++;
        this.playSound('error');
      }

      // 清空輸入 (讓使用者重新輸入)
      this.$nextTick(() => {
        this.userInput = '';
      });
    },
    
    handleKeydown(event) {
      // 防止某些特殊鍵
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
      }
    },
    
    updateWPM() {
      if (!this.startTime) return;
      const minutes = (Date.now() - this.startTime) / 60000;
      const words = this.currentIndex / 5; // 標準:5個字元=1個字
      this.wpm = Math.round(words / minutes) || 0;
    },
    
    finishPractice() {
      this.finished = true;
      this.endTime = Date.now();
      this.updateWPM();
    },
    
    restart() {
      this.userInput = '';
      this.currentIndex = 0;
      this.errors = 0;
      this.startTime = null;
      this.endTime = null;
      this.wpm = 0;
      this.finished = false;
      this.$nextTick(() => {
        this.focusInput();
      });
    },
    
    focusInput() {
      this.$refs.hiddenInput?.focus();
    },
    
    toggleAudio() {
      this.isAudioEnabled = !this.isAudioEnabled;
    },
    
    playSound(type) {
      if (!this.isAudioEnabled) return;
      
      // 可以載入音效檔案
      if (type === 'correct' && this.correctSound) {
        // 播放正確音效
        const audio = new Audio(this.correctSound);
        audio.play().catch(() => {});
      } else if (type === 'error' && this.errorSound) {
        // 播放錯誤音效
        const audio = new Audio(this.errorSound);
        audio.play().catch(() => {});
      }
    },
    
    getCharClass(index) {
      if (index < this.currentIndex) {
        return 'char typed correct';
      } else if (index === this.currentIndex) {
        return 'char current';
      } else {
        return 'char pending';
      }
    },
    
    getKeyClass(key) {
      const lowerKey = key.toLowerCase();
      if (lowerKey === this.currentChar) {
        return 'highlight';
      }
      return '';
    }
  }
};
</script>

<style scoped>
.typing-practice {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

/* 統計資訊 */
.stats {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.stat-value.error {
  color: #e74c3c;
}

/* 手指提示 */
.finger-hint {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255,255,255,0.95);
  border-radius: 10px;
}

.hand {
  display: flex;
  gap: 10px;
}

.finger {
  padding: 15px 20px;
  background: #ecf0f1;
  border-radius: 8px;
  font-size: 14px;
  color: #7f8c8d;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.finger.active {
  background: #3498db;
  color: white;
  transform: scale(1.15);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.5);
  border: 2px solid #2980b9;
  animation: pulse 0.6s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.15); }
  50% { transform: scale(1.25); }
}

/* 文字顯示區 */
.text-display {
  background: white;
  padding: 30px;
  border-radius: 10px;
  font-size: 28px;
  line-height: 1.8;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin-bottom: 20px;
  min-height: 120px;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
}

.char {
  position: relative;
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
  margin-top: 20px;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.btn-info {
  background: #1abc9c;
  color: white;
}

.btn-info:hover {
  background: #16a085;
}

/* 完成畫面 */
.finish-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px 60px;
  border-radius: 20px;
  box-shadow: 0 10px 50px rgba(0,0,0,0.3);
  text-align: center;
  z-index: 1000;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.finish-screen h2 {
  color: #27ae60;
  font-size: 36px;
  margin-bottom: 20px;
}

.finish-screen p {
  font-size: 18px;
  margin: 10px 0;
  color: #555;
}

.finish-screen strong {
  color: #3498db;
  font-size: 22px;
}

.btn-large {
  margin-top: 30px;
  padding: 15px 40px;
  font-size: 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-large:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

/* 鍵盤佈局 */
.keyboard-layout {
  margin-top: 30px;
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

/* 響應式設計 */
@media (max-width: 768px) {
  .typing-practice {
    padding: 20px;
  }
  
  .stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .finger-hint {
    flex-direction: column;
    gap: 20px;
  }
  
  .text-display {
    font-size: 20px;
    padding: 20px;
  }
  
  .controls {
    flex-direction: column;
  }
}
</style>