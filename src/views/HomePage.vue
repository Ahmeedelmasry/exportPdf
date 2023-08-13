<template>
  <div class="home_page">
    <v-container>
      <DataTable :headers="headers" :data="data" @exportData="exportPdf" />
      <img :src="logo" alt="" class="d-none" />
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { mainStore } from "@/stores";
import { storeToRefs } from "pinia";
import DataTable from "@/components/DataTable.vue";

// Import jsPDF
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Init Store
const mainSt = mainStore();

// Data
const { data } = storeToRefs(mainSt);
const headers = ref([
  "No.",
  "Test Name",
  "Job Order",
  "Sample Taken",
  "Pre Analytic",
  "Expected Result Date",
  "Patient Date",
]);

const logo = require("../assets/burger.jpg");

// Methods
const exportPdf = () => {
  let tableBody = [];
  data.value.forEach((el) => {
    let arr = [];
    arr.push(
      el.id,
      el.test_name,
      el.job_order_by,
      el.sample_taken_by,
      el.pre_analytic_by,
      el.expected_result_date.split("").slice(0, -3).join(""),
      `${el.patient.full_name}, ${el.patient.gender}, ${el.patient.phone}`
    );
    tableBody.push(arr);
  });
  var doc = new jsPDF();

  var img = new Image();
  img.src = document.querySelector("img").src;
  doc.addImage(img, "png", 176, 0, 20, 20);

  doc.text("Heading Title", 15, 14); // Set the position of the text

  autoTable(doc, {
    head: [headers.value],
    body: tableBody,
    foot: [
      [
        {
          content: "Email",
        },
        {
          content: "example@example.com",
          colSpan: 3,
        },
        {
          content: "Phone",
        },
        {
          content: "01011111110",
          colSpan: 2,
        },
      ],
    ],
    styles: {
      halign: "center",
      fontSize: 8,
      cellPadding: { top: 4, right: 2, bottom: 4, left: 2 },
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: "#eeeded",
      textColor: "rgb(115, 115, 115)",
    },
    footStyles: {
      fillColor: "#eeeded",
      textColor: "rgb(115, 115, 115)",
    },
    bodyStyles: {
      textColor: "rgb(115, 115, 115)",
    },
    showHead: "firstPage",
    showFoot: "lastPage",
    startY: 30,
  });

  doc.save(
    `test data_${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  );
};

const getData = mainSt.getData;

// Hooks
onMounted(async () => {
  await getData();
});
</script>
