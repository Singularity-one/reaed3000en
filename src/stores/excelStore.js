import { defineStore } from 'pinia';

export const useExcelStore = defineStore('excel', {
  state: () => ({
    headers: [],
    tableData: [],
  }),
  actions: {
    setExcelData(headers, tableData) {
      this.headers = headers;
      this.tableData = tableData;
    },
  },
});