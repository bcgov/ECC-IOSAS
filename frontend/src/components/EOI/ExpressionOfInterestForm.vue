<template>
  <div>
    <v-row v-if="isLoading">
      <v-col class="d-flex justify-center">
        <v-progress-circular
          class="mt-16"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
          :active="isLoading"
        />
      </v-col>
    </v-row>
    <template v-if="!isLoading">
      <v-form ref="expressionOfInterestForm" v-model="formValid">
        <v-container class="content-container">
          <h1>Expression of Interest</h1>
          <v-divider></v-divider>
          <h4>General</h4>
          <br />
          <br />
          <v-row>
            <v-col cols="8">
              <v-text-field
                id="eoi_number"
                v-model="getData()[0].eoi_number"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="EOI Number"
                class="mt-n5 mb-3"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                id="status"
                v-model="getData()[0].status"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Status"
                class="mt-n5 mb-3"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                id="name"
                v-model="getData()[0].name"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Name"
                class="mt-n5 mb-3"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                id="school_year"
                v-model="getData()[0].school_year"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="School Year"
                class="mt-n5 mb-3"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                id="group_classification"
                v-model="getData()[0].group_classification"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Group Classification"
                class="mt-n5 mb-3"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row align="end">
            <v-spacer />
            <PrimaryButton
              type="submit"
              primary
              text="Submit"
              class="mr-2"
              click-action="buttonAction"
            />
            <PrimaryButton
              id=""
              secondary
              text="Clear"
              class="mr-2"
              @click="handleReset"
            />
          </v-row>
        </v-container>
        <!-- <ConfirmationDialog ref="">
          <template #message>
            <p>
              All changes made to district details will be
              <strong>available to the public on save</strong>.
            </p>
            <p>
              Please be sure to review your changes carefully before you publish
              them.
            </p>
          </template>
        </ConfirmationDialog> -->
      </v-form>
    </template>
  </div>
</template>

<script>
import { authStore } from "./../../store/modules/auth";
import { mapState } from "pinia";
import alertMixin from "./../../mixins/alertMixin";
import * as Rules from "./../../utils/institute/formRules";
import ConfirmationDialog from "../../components/util/ConfirmationDialog.vue";

import PrimaryButton from "./../util/PrimaryButton.vue";

export default {
  name: "ExpressionOfInterestForm",
  components: {
    PrimaryButton,
    ConfirmationDialog,
  },
  mixins: [alertMixin],
  props: {},
  data() {
    return {
      eoi_number: null,
      status: null,
      name: null,
      school_year: null,
      group_classification: null,
      formValid: true,
      rules: Rules,
    };
  },
  computed: {
    ...mapState(authStore, ["isAuthenticated", "userInfo"]),
    isLoading() {
      return false;
    },
  },
  created() {},
  methods: {
    getData() {
      return [
        {
          // eoi_number: 47583,
          // status: "Recieved",
          // name: "New BC School",
          // school_year: 2024,
          // group_classification: "High School",
        },
      ];
    },
  },
};
</script>

<style scoped>
.content-container {
  border-radius: 5px;
  padding-top: 50px;
  box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -webkit-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
  -moz-box-shadow: 3px 1px 6px rgba(186, 181, 181, 0.75);
}
</style>
