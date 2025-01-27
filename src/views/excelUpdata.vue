<template>
  <div>
    <h2>上傳 Excel 文件</h2>
    <input type="file" @change="handleFile" />
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { useExcelStore } from '@/stores/excelStore';

export default {
  name: "UploadExcel",
  setup() {
    const excelStore = useExcelStore();

    const handleFile = (event) => {
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
        excelStore.setExcelData(json[0], json.slice(1));
      };
      reader.readAsArrayBuffer(file);
    };

    return { handleFile };
  },
};
</script>