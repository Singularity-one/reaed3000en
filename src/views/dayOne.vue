<template>
  <div id="app" class="app-container">
    <h1>One</h1>
    <!-- 按鈕，點擊後移除已翻過的卡片 -->
    <button @click="transPage('/')">回上一頁</button>
    <button @click="removeFlippedCards">Remove Flipped Cards</button>
    <div class="flashcard-container">
      <div
        v-for="(card, index) in flashcards"
        :key="index"
        class="flashcard"
        :class="{ flipped: card.isFlipped }"
        @click="flipCard(index)"
      >
        <div class="front" v-if="!card.isFlipped">
          {{ card.word }}
        </div>
        <div class="back" v-else>
          {{ card.definition }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardTest",
  data() {
    return {
      flashcards: [
        { word: "apple", definition: "A fruit that is red or green.", isFlipped: false },
        { word: "book", definition: "A set of written or printed pages.", isFlipped: false },
        { word: "car", definition: "A vehicle with four wheels.", isFlipped: false },
        { word: "dog", definition: "A domesticated carnivorous mammal.", isFlipped: false },
        { word: "elephant", definition: "A large herbivorous mammal.", isFlipped: false },
        { word: "fish", definition: "A cold-blooded vertebrate animal.", isFlipped: false },
        { word: "grape", definition: "A small, round fruit.", isFlipped: false },
        { word: "hat", definition: "A head covering.", isFlipped: false },
        { word: "ice", definition: "Frozen water.", isFlipped: false },
        { word: "jacket", definition: "A piece of clothing for the upper body.", isFlipped: false },
        { word: "kiwi", definition: "A small, fuzzy fruit.", isFlipped: false },
        { word: "lemon", definition: "A sour yellow fruit.", isFlipped: false },
        { word: "monkey", definition: "A small primate.", isFlipped: false },
        { word: "noodle", definition: "A type of food made from dough.", isFlipped: false },
        { word: "orange", definition: "A citrus fruit.", isFlipped: false },
        { word: "pen", definition: "A writing instrument.", isFlipped: false },
        { word: "quilt", definition: "A warm bed covering.", isFlipped: false },
        { word: "rose", definition: "A type of flower.", isFlipped: false },
        { word: "sun", definition: "The star at the center of our solar system.", isFlipped: false },
        { word: "tree", definition: "A perennial plant with an elongated stem.", isFlipped: false },
      ],
    };
  },
  methods: {
    flipCard(index) {
      this.flashcards[index].isFlipped = !this.flashcards[index].isFlipped;
    },
    removeFlippedCards() {
      // 過濾掉已經翻過的卡片
      this.flashcards = this.flashcards.filter(card => !card.isFlipped);
    },
    transPage(item) {
      this.$router.push(`${item}`);
    },
  },
};
</script>

<style>
.app-container {
  text-align: center;
  font-family: Arial, sans-serif;
}

.flashcard {
  width: 200px;
  height: 120px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s;
  perspective: 1000px;
}

.flashcard.flipped {

}

.flashcard .front,
.flashcard .back {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
</style>