<template>
  <v-container>
    <h4>Educational Program</h4>
    <div>
      <v-label
        >Describe familiarity with British Columbia’s curriculum and the school
        administration’s plans to support the implementation of B.C.s curriculum
        (pro-D, collaboration, etc.):</v-label
      >
      <v-row v-if="isEditing">
        <v-col cols="12">
          <v-textarea
            id="iosas_describefamiliaritywithbcscurriculum"
            v-model="formData.iosas_describefamiliaritywithbcscurriculum"
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label=""
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          {{
            formData.iosas_describefamiliaritywithbcscurriculum || NULL_STRING
          }}
        </v-col>
      </v-row>
      <br />
      <h4>Additional Programs</h4>
      <v-label class="no-mb"
        >At this time does the proposed school intend on enrolling any of the
        following students?
      </v-label>
      <v-label class="sm">Check all that apply</v-label>
      <v-row>
        <v-col cols="6" sm="6" md="6" xs="6">
          <div
            v-for="item in getApplicationMultiPickListOptions[
              'iosas_additionalprograms'
            ]"
            :key="item.value"
          >
            <v-checkbox
              v-model="formData.iosas_additionalprograms"
              :label="item.label"
              :value="item.value"
              :disabled="!isEditing"
            >
            </v-checkbox>
          </div>
        </v-col>
        <v-spacer />
      </v-row>
      <br />
      <v-label>Other</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-text-field
            v-if="isEditing"
            id="iosas_additionalprogramsother"
            v-model="formData.iosas_additionalprogramsother"
            :maxlength="255"
            variant="outlined"
            color="rgb(59, 153, 252)"
          />
          <div v-else>
            {{ formData.iosas_additionalprogramsother || NULL_STRING }}
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'pinia';
import { metaDataStore } from '../../../store/modules/metaData';
import * as Rules from '../../../utils/institute/formRules';
import { NULL_STRING } from '../../../utils/constants';
export default {
  name: 'EducationalProgramTab',
  components: {},
  props: {
    formData: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    NULL_STRING,
    rules: Rules,
  }),
  computed: {
    ...mapState(metaDataStore, ['getApplicationMultiPickListOptions']),
  },
};
</script>
