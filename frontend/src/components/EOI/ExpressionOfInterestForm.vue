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
      <v-form
        @submit.prevent="handleSubmit"
        ref="expressionOfInterestForm"
        id="expressionOfInterestForm"
        v-model="expressionOfInterestFormValid"
      >
        <v-container fluid class="content-container">
          <div class="form-container">
            <div class="d-flex justify-space-between">
              <h1>Expression of Interest</h1>
              <PrimaryButton
                v-if="!isEditing && !isNew() && !isReadOnly()"
                secondary
                text="Edit"
                class="mr-2"
                :click-action="toggleEditMode"
              />
            </div>
            <br />
            <v-divider></v-divider>
            <div v-if="!isEditing && !isNew()">
              <ExpressionOfInterestReadOnlyView :eoi="this.eoi" />
            </div>
            <div v-else>
              <div v-if="!isNew()">
                <h4>General</h4>
                <br />
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-label>EOI Number </v-label>
                    <p>EOI-01020</p>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-label>Status </v-label>
                    <p>Draft</p>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </div>
              <h4>School Authority Information</h4>
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-label
                    >Name of School Authority (as it appears on attached
                    incorporation documents)</v-label
                  >

                  <v-text-field
                    id="iosas_edu_schoolauthorityname"
                    v-model="data.iosas_edu_schoolauthorityname"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <br />
              <v-label>School Authority Head's Name</v-label>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_authorityheadfirstname"
                    v-model="data.iosas_authorityheadfirstname"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="First Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_schoolauthorityheadname"
                    v-model="data.iosas_authorityheadname"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Last Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_schoolauthorityheademail"
                    v-model="data.iosas_schoolauthorityheademail"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="E-mail"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_schoolauthorityheadphone"
                    v-model="data.iosas_schoolauthorityheadphone"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Phone"
                    return-masked-value
                    mask="(###) ###-####"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-label
                    >Is the Designated Authority the same as Authority
                    Head?</v-label
                  >
                  <v-radio-group
                    v-model="data.iosas_designatedcontactsameasauthorityhead"
                    color="#003366"
                    class="mt-4"
                    direction="horizontal"
                    inline
                  >
                    <v-radio label="Yes" color="#003366" :value="true">
                      <template #label>
                        <span>Yes</span>
                      </template>
                    </v-radio>
                    <v-radio label="No" color="#003366" :value="false">
                      <template #label>
                        <span>No</span>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <div v-if="!data.iosas_designatedcontactsameasauthorityhead">
                <v-label>Designated Authority Contact's Name</v-label>
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="iosas_schoolauthoritycontactname"
                      v-model="data.iosas_schoolauthoritycontactname"
                      required
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="First Name"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="iosas_schoolauthoritycontactname"
                      v-model="data.iosas_schoolauthoritycontactname"
                      required
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="Last Name"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="iosas_schoolauthoritycontactemail"
                      v-model="data.iosas_schoolauthoritycontactemail"
                      required
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="E-mail"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" xs="12">
                    <v-text-field
                      id="ioas_schoolauthoritycontactphone"
                      v-model="data.ioas_schoolauthoritycontactphone"
                      required
                      :rules="
                        data.iosas_designatedcontactsameasauthorityhead
                          ? [rules.required()]
                          : []
                      "
                      :maxlength="255"
                      variant="outlined"
                      label="Phone"
                      return-masked-value
                      mask="(###) ###-####"
                      color="rgb(59, 153, 252)"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-label>Authority Mailing Address</v-label>
              <br />
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_authorityaddressline1"
                    v-model="data.iosas_authorityaddressline1"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 1"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_authorityaddressline2"
                    v-model="data.iosas_authorityaddressline2"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 2"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authoritycity"
                    v-model="data.iosas_authoritycity"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="City"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authorityprovince"
                    v-model="data.iosas_authorityprovince"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    disabled
                    variant="outlined"
                    label="Province"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authoritycountry"
                    v-model="data.iosas_authoritycountry"
                    required
                    disabled
                    :rules="[]"
                    :maxlength="255"
                    variant="outlined"
                    label="Country"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_authoritypostalcode"
                    v-model="data.iosas_authoritypostalcode"
                    required
                    :rules="[rules.required(), rules.postalCode()]"
                    :maxlength="7"
                    variant="outlined"
                    label="Postal Code"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <h4>School Information</h4>
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_proposedschoolname"
                    v-model="data.iosas_proposedschoolname"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Proposed School Name"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-label>School Address (If Known)</v-label>
              <br />
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_schooladdressline1"
                    v-model="data.iosas_schooladdressline1"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 1"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="8" xs="12">
                  <v-text-field
                    id="iosas_schooladdressline2"
                    v-model="data.iosas_schooladdressline2"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Address Line 2"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_schoolcity"
                    v-model="data.iosas_schoolcity"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="City"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_schoolprovince"
                    v-model="data.iosas_schoolprovince"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    disabled
                    variant="outlined"
                    label="Province"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_schoolcountry"
                    v-model="data.iosas_schoolcountry"
                    required
                    disabled
                    :rules="[]"
                    :maxlength="255"
                    variant="outlined"
                    label="Country"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12">
                  <v-text-field
                    id="iosas_schoolpostalcode"
                    :v-model="data.iosas_schoolpostalcode"
                    required
                    :rules="[rules.required(), rules.postalCode()]"
                    :maxlength="7"
                    variant="outlined"
                    label="Postal Code"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_website"
                    v-model="data.iosas_website"
                    required
                    :rules="[rules.website()]"
                    :maxlength="255"
                    variant="outlined"
                    label="Website address (optional)"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-text-field
                    id="iosas_edu_yearname"
                    v-model="data.iosas_edu_yearname"
                    required
                    :rules="[rules.required()]"
                    :maxlength="255"
                    variant="outlined"
                    label="School Year"
                    color="rgb(59, 153, 252)"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-label
                    >Group Calassification applying for: (Group classification
                    Information)</v-label
                  >
                  <v-radio-group
                    v-model="data.iosas_groupclassification"
                    color="#003366"
                    class="mt-4"
                    direction="horizontal"
                    inline
                    :rules="[rules.requiredSelect()]"
                  >
                    <v-radio
                      label="Group 1"
                      color="#003366"
                      value="groupOne"
                      disabled
                    >
                      <template #label>
                        <span>Group 1</span>
                      </template>
                    </v-radio>
                    <v-radio label="Group 2" color="#003366" value="groupTwo">
                      <template #label>
                        <span>Group 2</span>
                      </template>
                    </v-radio>
                    <v-radio label="Group 3" color="#003366" value="groupThree">
                      <template #label>
                        <span>Group 3</span>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-label
                    >For authorities applying for Group 2 classification, are
                    there current plans to seek Group 1 classification in the
                    second or subsequest year of operation?
                  </v-label>
                  <v-radio-group
                    v-model="data.iosas_seekgrouponeclassification"
                    color="#003366"
                    class="mt-4"
                    direction="horizontal"
                    inline
                    :rules="[rules.requiredSelect()]"
                  >
                    <v-radio label="Yes" color="#003366" value="yes">
                      <template #label>
                        <span>Yes</span>
                      </template>
                    </v-radio>
                    <v-radio label="No" color="#003366" value="no">
                      <template #label>
                        <span>No</span>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-label>Proposed grade range in first year of operation</v-label>
              <br />
              <br />
              <v-row>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-select
                    id="iosas_startgrade"
                    v-model="data.iosas_startgrade"
                    label="Select Start Grade"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                    :items="GRADE_OPTIONS"
                    :rules="[rules.requiredSelect()]"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" xs="12">
                  <v-select
                    id="iosas_endgrade"
                    v-model="data.iosas_endgrade"
                    label="Select End Grade"
                    variant="outlined"
                    color="rgb(59, 153, 252)"
                    :items="GRADE_OPTIONS"
                    :rules="[rules.requiredSelect()]"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </div>

          <br />
          <v-container v-if="isEditing || isNew()">
            <v-row align="end">
              <v-spacer />
              <v-btn
                :loading="isLoading"
                type="submit"
                primary
                class="mt-2 submit-button"
                variant="elevated"
                >Submit</v-btn
              >
            </v-row>
          </v-container>
        </v-container>
      </v-form>
    </template>
  </div>
</template>

<script>
import { authStore } from './../../store/modules/auth';
import { mapState } from 'pinia';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';
import { GRADE_OPTIONS } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';
import ExpressionOfInterestReadOnlyView from './ExpressionOfInterestReadOnlyView.vue';

export default {
  name: 'ExpressionOfInterestForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
    ExpressionOfInterestReadOnlyView,
  },
  mixins: [alertMixin],
  props: {
    eoi: {
      type: Object,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      GRADE_OPTIONS,
      expressionOfInterestFormValid: true,
      isEditing: false,
      rules: Rules,
      data: {
        iosas_expressionofinterestid: 'EOI-01020',
        status: 'Draft',
        iosas_edu_schoolauthority: null,
        iosas_edu_school: null,
        iosas_authorityaddressline1: null,
        iosas_authorityaddressline2: null,
        iosas_authoritycity: null,
        iosas_authoritycountry: null,
        iosas_authorityheadfirstname: null,
        iosas_authorityheadname: null,
        iosas_authorityheadyominame: null,
        iosas_authoritypostalcode: null,
        iosas_authorityprovince: 'BC',
        iosas_authoritycontactname: null,
        iosas_authoritycontactyominame: null,
        iosas_contactname: null,
        iosas_contactyominame: null,
        iosas_designatedcontactfirstname: null,
        iosas_designatedcontactsameasauthorityhead: false,
        iosas_edu_schoolauthorityname: null,
        iosas_edu_yearname: null,
        iosas_groupclassification: null,
        iosas_proposedschoolname: null,
        iosas_schooladdressline1: null,
        iosas_schooladdressline2: null,
        iosas_schoolcity: null,
        iosas_schoolcountry: 'Canada',
        iosas_schoolpostalcode: null,
        iosas_schoolprovince: 'BC',
        iosas_schoolauthoritycontactemail: null,
        iosas_schoolauthoritycontactname: null,
        ioas_schoolauthoritycontactphone: null,
        iosas_schoolauthorityheademail: null,
        iosas_schoolauthorityheadname: null,
        iosas_schoolauthorityheadphone: null,
        iosas_schoolauthorityname: null,
        iosas_seekgrouponeclassification: true,
        iosas_startgrade: null,
        iosas_endgrade: null,
        iosas_website: null,
      },
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
  },
  watch: {
    expressionOfInterestFormValid(value) {
      if (value !== null && value !== undefined) {
        this.$emit('is-form-valid', true);
      } else {
        this.$emit('is-form-valid', false);
      }
    },
  },
  created() {
    this.data = this.isNew() ? this.data : this.eoi;
  },
  methods: {
    isNew() {
      return this.$route.name === 'newExpressionOfInterest';
    },
    toggleEditMode() {
      return (this.isEditing = true);
    },
    isReadOnly() {
      return this.eoi.status !== 'Draft';
    },
    handleSubmit() {
      this.$refs.expressionOfInterestForm.validate();
      console.log(this.data);
    },
  },
};
</script>

<style scoped>
.v-label {
  white-space: break-spaces;
}

.submit-button {
  background-color: #003366 !important;
  color: white !important;
}
</style>
