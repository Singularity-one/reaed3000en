import { defineStore } from 'pinia';

export const useExcelStore = defineStore('excel', {
  state: () => ({
    headers: [],
    tableData: [],
    wordExplanations: {},
    wordTranslations: {},
    wordExamples: {},
    wordPartsOfSpeech: {},
  }),
  actions: {
    setExcelData(headers, tableData) {
      this.headers = headers;
      this.tableData = tableData;

      this.parseTableDataToDicts(tableData);
    },
    parseTableDataToDicts(tableData) {
      const explanations = {};
      const translations = {};
      const examples = {};
      const partsOfSpeech = {};

      tableData.forEach(row => {
        // 為了處理大小寫不一致，先把欄位名轉小寫再找
        const rowLower = {};
        for (const key in row) {
          if (Object.hasOwnProperty.call(row, key)) {
            rowLower[key.toLowerCase()] = row[key];
          }
        }

        const word = (rowLower['word'] || '').toString().toLowerCase().trim();
        if (word) {
          explanations[word] = (rowLower['explanation'] || '').toString().trim();
          translations[word] = (rowLower['translation'] || '').toString().trim();
          examples[word] = (rowLower['example'] || '').toString().trim();
          partsOfSpeech[word] = (rowLower['partofspeech'] || '').toString().trim();
        }
      });

      this.wordExplanations = explanations;
      this.wordTranslations = translations;
      this.wordExamples = examples;
      this.wordPartsOfSpeech = partsOfSpeech;
    }
  }
});