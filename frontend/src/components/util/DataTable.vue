<template>
  <div>
    <v-row justify="start">
      <v-col class="table-title">
        <h3>
          {{ title }}
        </h3>
        <div class="ml-2">
          <TertiaryButton
            v-if="buttonTitle"
            id="actionButton"
            :text="buttonTitle"
            :click-action="buttonAction"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table density="compact" fixed-header class="gov-table elevation-1">
          <thead>
            <tr>
              <th
                v-for="headers in tableHeaders"
                :key="headers.value"
                class="text-left"
              >
                {{ formatSnakeCaseToString(headers.value) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item[0]">
              <td
                v-for="value in Object.values(item)"
                :key="value"
                class="table-column"
              >
                <!-- Table assumes the first value is an ID, uses ID to link to url/:id -->
                <router-link
                  v-if="url && value === Object.values(item)[0]"
                  :to="{ path: url + '/' + value, params: { data: item } }"
                  :target="'_self'"
                  class="router-link-exact-active"
                >
                  {{ value }}
                </router-link>
                <span v-else>{{ value }}</span>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { formatSnakeCaseToString } from "../../utils/format";
import TertiaryButton from "../util/TertiaryButton.vue";
export default {
  name: "DataTable",
  components: {
    TertiaryButton,
  },
  data() {
    return {
      tableHeaders: [],
    };
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    buttonAction: {
      type: Function,
      default: null,
    },
    buttonTitle: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  created() {
    this.getTableHeaders();
  },
  methods: {
    getTableHeaders() {
      const firstItem = this.data[0];
      console.log(this.data);
      if (firstItem) {
        this.tableHeaders = Object.keys(firstItem).map((key) => ({
          value: key,
        }));
      }
    },
    formatSnakeCaseToString,
  },
};
</script>

<style scoped>
.gov-table {
  border-radius: 5px;
  box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -webkit-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -moz-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
}

.table-title {
  align-self: center;
  display: inline-flex;
}

.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: #003366;
  color: white;
}

.router-link-exact-active {
  text-decoration: underline #003366;
}

.table-column {
  width: 25vw;
}
</style>
