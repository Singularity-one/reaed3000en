<template>
  <div>
    <h2>上傳 Excel</h2>
    <input type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
    <div v-if="headers.length">
      <h3>標題</h3>
      <ul>
        <li v-for="(header, i) in headers" :key="i">{{ header }}</li>
      </ul>
      <h3>資料列</h3>
      <table>
        <thead>
          <tr>
            <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { useExcelStore } from '@/stores/excelStore';

export default {
  name: 'ExcelUploader',
  data() {
    return {
      headers: [],
      tableData: [],
    };
  },
  setup() {
    const excelStore = useExcelStore();
    return { excelStore };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) return;

        // headers 從第一筆物件 keys 取得
        this.headers = Object.keys(jsonData[0]);
        this.tableData = jsonData;

        this.excelStore.setExcelData(this.headers, this.tableData);
      };
      reader.readAsArrayBuffer(file);
    },
  },
};
</script>