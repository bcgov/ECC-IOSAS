<template>
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
            <th v-for="headers in tableHeaders" :key="index" class="text-left">
              {{ formatSnakeCaseToString(headers.value) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- FIX THIS LOGIC -->
          <tr v-for="item in data" :key="item.name">
            <td
              v-for="value in Object.entries(item)"
              :key="value"
              class="table-column"
            >
              <router-link
                v-if="url && value[1] === Object.values(item)[0]"
                :to="{ path: url }"
                :target="'_self'"
                class="router-link-exact-active"
              >
                {{ value[1] }}
              </router-link>
              <span v-else>{{ value[1] }}</span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
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
      if (firstItem) {
        this.tableHeaders = Object.keys(firstItem).map((key) => ({
          value: key,
        }));
      }
    },
    redirectToRoute(id) {
      console.log(this.url + "/" + id);
      return this.url + "/" + id;
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
