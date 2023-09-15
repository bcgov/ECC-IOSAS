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
            variant="outlined"
            :maxlength="2000"
            color="rgb(59, 153, 252)"
            auto-grow
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
      <v-label
        >At this time does the proposed school intend on enrolling any of the
        following students?
      </v-label>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-select
            v-if="isEditing"
            v-model="formData.iosas_additionalprograms"
            :items="
              getApplicationMultiPickListOptions['iosas_additionalprograms']
            "
            multiple
            :rules="[rules.requiredMultiSelect()]"
            item-title="label"
            item-value="value"
            placeholder="Select all that apply"
          ></v-select>
          <p v-else>
            {{
              formData[
                'iosas_additionalprograms@OData.Community.Display.V1.FormattedValue'
              ]
            }}
          </p>
        </v-col>
      </v-row>
      <v-label>Other</v-label>
      <v-row>
        <v-col cols="12" sm="12" md="12" xs="12">
          <v-text-field
            v-if="isEditing"
            id="iosas_additionalprogramsother"
            v-model="formData.iosas_additionalprogramsother"
            variant="outlined"
            color="rgb(59, 153, 252)"
            :maxlength="100"
            :rules="
              formData.iosas_additionalprograms.includes(
                ADDITIONAL_PROGRAM_CODES.other
              )
                ? [rules.required()]
                : []
            "
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
import * as Rules from '../../../utils/formRules';
import { NULL_STRING } from '../../../utils/constants';
import { ADDITIONAL_PROGRAM_CODES } from '../../../utils/application';
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
    ADDITIONAL_PROGRAM_CODES,
    rules: Rules,
  }),
  computed: {
    ...mapState(metaDataStore, ['getApplicationMultiPickListOptions']),
  },
};
</script>
