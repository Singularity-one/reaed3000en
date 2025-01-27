<template>
    <div id="app">
    <h1>Excel Viewer</h1>
    <input type="file" id="fileInput" @change="handleFile" />
    <table v-if="tableData.length">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
export default {
  name: "ExcelTest",
  data() {
    return {
        headers: [],
      tableData: [],
    }
  },
  methods: {
    handleFile(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // 讀取第一個工作表
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // 轉換為 JSON
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        this.headers = json[0];
        this.tableData = json.slice(1);
      };
      reader.readAsArrayBuffer(file);
    },
  },
}

</script>
<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>