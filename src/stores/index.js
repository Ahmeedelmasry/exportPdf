import { defineStore } from "pinia";

// Axios
import axios from "axios";

// Import Xlsx
import * as XLSX from "xlsx";

export const mainStore = defineStore("mainStore", {
  state: () => ({
    data: [],
  }),
  actions: {
    async getData() {
      this.data = [];
      await axios
        .post(
          `http://alfa.lds-stg.com/api/V1/reports/operations/lab-unit/worksheet`,
          {
            date_from: "2023-07-01",
            date_to: "2023-08-13",
            lab_unit_id: 41,
            branch_id: null,
            area_id: null,
          }
        )
        .then((res) => {
          for (let val of Object.entries(res.data.data)) {
            val[1].forEach((el) => {
              this.data.push(el);
            });
          }
        })
        .catch((err) => console.log(err));
      console.log(this.data);
    },
    exportExcel(arr, fileName, wscols) {
      const worksheet = XLSX.utils.json_to_sheet(arr);

      worksheet["!cols"] = wscols;
      const workbook = {
        Sheets: {
          data: worksheet,
        },
        SheetNames: ["data"],
      };
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveExcel(excelBuffer, fileName);
    },
  },
});
