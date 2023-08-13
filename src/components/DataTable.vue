<template>
  <div class="data_table">
    <v-skeleton-loader
      type="table"
      v-if="!props.data.length"
    ></v-skeleton-loader>
    <table class="w-100" type="table" v-if="props.data.length">
      <thead>
        <tr>
          <th class="text-center" v-for="(item, i) in props.headers" :key="i">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in props.data" :key="i">
          <td>{{ item.id }}</td>
          <td>{{ item.test_name }}</td>
          <td>{{ item.job_order_by }}</td>
          <td>{{ item.sample_taken_by }}</td>
          <td>{{ item.pre_analytic_by }}</td>
          <td>
            {{ item.expected_result_date.split("").slice(0, -3).join("") }}
          </td>
          <td>
            {{ item.patient.full_name }}, {{ item.patient.gender }},
            {{ item.patient.phone }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="actions text-center mt-7" v-if="props.data.length">
      <v-btn color="blue" @click="$emit('exportData')">Export PDF</v-btn>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

// Props
const props = defineProps(["headers", "data"]);
</script>

<style lang="scss" scoped>
.data_table {
  table {
    border-top: 1px solid #d6d5d5;
    border-right: 1px solid #d6d5d5;
    text-align: center;
    overflow-y: scroll !important;
    background-color: white !important;
    thead {
      border-top: 1px solid #d6d5d5;
      border-right: 1px solid #d6d5d5;
      color: rgb(115, 115, 115);
      tr {
        background-color: #eeeded;
        th {
          padding: 7px 0;
          border-left: 1px solid #d6d5d5;
          border-bottom: 1px solid #d6d5d5;
          font-size: 14px;
        }
      }
    }
    tbody {
      border-top: 1px solid #d6d5d5;
      border-right: 1px solid #d6d5d5;
      color: rgb(115, 115, 115);
      td {
        border-left: 1px solid #d6d5d5;
        border-bottom: 1px solid #d6d5d5;
        font-size: 12px;
        padding: 7px;
      }
    }
  }
}
</style>
