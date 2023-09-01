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
        <div v-if="!data?.length">{{ getNullMessage() }}</div>
        <v-table
          v-else
          density="compact"
          fixed-header
          class="gov-table elevation-1"
        >
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
                  v-if="routeName && value === Object.values(item)[0]"
                  :to="{
                    name: routeName,
                    params: { id: value.split(' ')[1] },
                  }"
                  :target="'_self'"
                  class="router-link-exact-active"
                >
                  {{ value.split(' ')[0] || NULL_STRING }}
                </router-link>
                <span v-else>{{ value || NULL_STRING }}</span>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { NULL_STRING } from '../../utils/constants';
import { formatSnakeCaseToString } from '../../utils/format';
import TertiaryButton from '../util/TertiaryButton.vue';
export default {
  name: 'DataTable',
  components: {
    TertiaryButton,
  },
  data() {
    return {
      NULL_STRING,
      tableHeaders: [],
    };
  },
  props: {
    data: {
      type: Array,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    buttonAction: {
      type: Function,
      default: null,
    },
    buttonTitle: {
      type: String,
      default: null,
    },
    routeName: {
      type: String,
      required: true,
    },
  },
  created() {
    this.getTableHeaders();
  },
  methods: {
    getNullMessage() {
      if (this.title === 'New School Applications') {
        return "You don't currently have any active school applications. Your new school application will show up here after your Expression of Interest is approved.";
      }
      return "You don't currently have any active Expression of Interests. Click `Create new EOI` button to get started.";
    },
    getTableHeaders() {
      const firstItem = this.data?.[0];
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

<style lang="scss" scoped>
.gov-table {
  border-radius: 5px;
  box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -webkit-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -moz-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
}

.table-title {
  h3 {
    margin-top: 5px;
    margin-right: 10px;
  }
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
  width: 15vw;

  &:nth-child(3) {
    width: 27.5vw;
  }
  &:nth-child(5) {
    width: 27.5vw;
  }
}

.null-content {
  text-align: center;
}
</style>
