<template>
  <div v-if="visible" class="chunk-list-overlay" @click.self="$emit('close')">
    <div class="chunk-list-panel">
      <!-- 標題列 -->
      <div class="chunk-header">
        <h3>Chunks ({{ chunkStore.chunks.length }})</h3>
        <button @click="$emit('close')" class="close-btn">&times;</button>
      </div>

      <!-- 篩選器 -->
      <div class="chunk-filter">
        <label>Filter type:</label>
        <select v-model="filterType">
          <option value="all">all ({{ chunkStore.chunks.length }})</option>
          <option value="collocation">collocation ({{ stats.byType.collocation }})</option>
          <option value="phrasal_verb">phrasal verb ({{ stats.byType.phrasal_verb }})</option>
          <option value="idiom">idiom ({{ stats.byType.idiom }})</option>
          <option value="fixed_phrase">fixed phrase ({{ stats.byType.fixed_phrase }})</option>
        </select>
      </div>

      <!-- 統計資訊 -->
      <div class="chunk-stats">
        <div class="stat-item">
          <span class="stat-label">collocation:</span>
          <span class="stat-value">{{ stats.byType.collocation }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">phrasal verb:</span>
          <span class="stat-value">{{ stats.byType.phrasal_verb }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">idiom:</span>
          <span class="stat-value">{{ stats.byType.idiom }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">fixed phrase:</span>
          <span class="stat-value">{{ stats.byType.fixed_phrase }}</span>
        </div>
      </div>

      <!-- Chunks 列表 -->
      <div class="chunk-list-content">
        <div 
          v-for="chunk in filteredChunks" 
          :key="chunk" 
          class="chunk-item"
        >
          <div class="chunk-title">
            <strong>{{ chunk }}</strong>
            <span 
              v-if="chunkStore.chunkTypes[chunk]"
              class="chunk-type-badge" 
              :class="`badge-${chunkStore.chunkTypes[chunk]}`"
            >
              {{ getTypeLabel(chunkStore.chunkTypes[chunk]) }}
            </span>
          </div>
          
          <p v-if="chunkStore.chunkExplanations[chunk]" class="chunk-explanation">
            {{ chunkStore.chunkExplanations[chunk] }}
          </p>
          
          <p v-if="chunkStore.chunkExamples[chunk]" class="chunk-example">
            <em>{{ chunkStore.chunkExamples[chunk] }}</em>
          </p>
        </div>

        <div v-if="filteredChunks.length === 0" class="no-chunks">
          沒有符合條件的 Chunks
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useChunkStore } from '@/stores/chunkStore';

export default {
  name: 'ChunkListPanel',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterType: 'all',
      chunkStore: useChunkStore()
    };
  },
  computed: {
    stats() {
      return this.chunkStore.chunkStats;
    },
    filteredChunks() {
      return this.chunkStore.getChunksByType(this.filterType);
    }
  },
  methods: {
    getTypeLabel(type) {
      const labels = {
        collocation: 'collocation',
        phrasal_verb: 'phrasal verbs',
        idiom: 'idiom',
        fixed_phrase: 'fixed phrase'
      };
      return labels[type] || type;
    }
  }
};
</script>

<style scoped>
.chunk-list-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.chunk-list-panel {
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.chunk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #e9ecef;
}

.chunk-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.chunk-filter {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chunk-filter label {
  font-weight: 600;
  color: #495057;
}

.chunk-filter select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
}

.chunk-stats {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
}

.stat-value {
  font-weight: bold;
  color: #007bff;
  background: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.chunk-list-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.chunk-item {
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #007bff;
  background: #f8f9fa;
  border-radius: 4px;
  transition: all 0.2s;
}

.chunk-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.chunk-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.chunk-title strong {
  font-size: 1.1rem;
  color: #333;
}

.chunk-type-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-collocation {
  background: #d1ecf1;
  color: #0c5460;
}

.badge-phrasal_verb {
  background: #d4edda;
  color: #155724;
}

.badge-idiom {
  background: #fff3cd;
  color: #856404;
}

.badge-fixed_phrase {
  background: #f8d7da;
  color: #721c24;
}

.chunk-explanation {
  color: #495057;
  margin: 0.5rem 0;
  line-height: 1.5;
}

.chunk-example {
  color: #6c757d;
  font-style: italic;
  margin: 0.5rem 0;
  padding-left: 1rem;
  border-left: 2px solid #dee2e6;
}

.no-chunks {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}
</style>