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
        ref="schoolApplicationForm"
        v-model="isFormValid"
        @submit.prevent="submit"
      >
        <v-container class="content-container">
          <h1>Application for Independent School Certification</h1>
          <v-divider></v-divider>
          <h4>General</h4>
          <br />
          <v-row>
            <v-col cols="6">
              <v-text-field
                id="application_number"
                v-model="getData()[0].application_number"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                disabled
                label="Application Number"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                id="status"
                v-model="getData()[0].status"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Status"
                disabled
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-label
            ><strong>
              Will the proposed school comply with Section 1 of the Schedule of
              the Independent School Act, which requires that:
            </strong>
          </v-label>
          <v-row>
            <v-col cols="12">
              <v-label>
                <ol type="1">
                  <li>
                    No program is in existence or is proposed at the independent
                    school that would, in theory or in practice, promote or
                    foster doctrines of:
                  </li>
                  <ol type="a" class="ml-5">
                    <li>racial or ethnic superiority or persecution,</li>
                    <li>religious intolerance or persecution,</li>
                    <li>social change through violent action, or,</li>
                    <li>sedition.</li>
                  </ol>
                </ol>
              </v-label>
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-label>
                <ol start="2">
                  <li>
                    The independent school facilities will comply with the
                    enactments of British Columbia and the municipality
                    <br />or regional district in which the facilities are
                    located, and,
                  </li>
                </ol>
              </v-label>
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-label>
                <ol start="3">
                  <li>
                    The authority complies with the Independent School Act and
                    its regulations.
                  </li>
                </ol>
              </v-label>
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <h4>School Information</h4>
          <br />
          <v-label
            >Please specify grade range to be offered in the first year of
            operation</v-label
          >
          <v-row>
            <v-col cols="6">
              <v-text-field
                id="proposed_grade_range"
                v-model="getData()[0].proposed_grade_range"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Grade Range"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                id="proposed_school_name"
                v-model="getData()[0].proposed_school_name"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Proposed School Name"
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>
          <v-label
            >Please provide a brief overview of the proposed school, nature of
            program <br />(international/Montessori/Waldorf/IB/other) and plans
            for future years.</v-label
          >
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="proposed_school_name"
                v-model="getData()[0].proposed_school_name"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Overview"
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>

          <v-label>School Address (If Known)</v-label>
          <v-row>
            <v-col cols="8">
              <v-text-field
                id="school_address"
                v-model="getData()[0].school_address"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Address"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                id="school_city"
                v-model="getData()[0].school_city"
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
            <v-col cols="4">
              <v-text-field
                id="school_province"
                v-model="getData()[0].school_province"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                disabled
                variant="outlined"
                label="Province"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                id="school_country"
                v-model="getData()[0].school_country"
                required
                disabled
                :rules="[]"
                :maxlength="255"
                variant="outlined"
                label="Country"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                id="school_postal_code"
                v-model="getData()[0].school_postal_code"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Postal Code"
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>
          <v-label>School Mailing Address</v-label>
          <v-row>
            <v-col cols="8">
              <v-text-field
                id="school_address"
                v-model="getData()[0].school_address"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Address"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                id="school_city"
                v-model="getData()[0].school_city"
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
            <v-col cols="4">
              <v-text-field
                id="school_province"
                v-model="getData()[0].school_province"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                disabled
                variant="outlined"
                label="Province"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                id="school_country"
                v-model="getData()[0].school_country"
                required
                disabled
                :rules="[]"
                :maxlength="255"
                variant="outlined"
                label="Country"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                id="school_postal_code"
                v-model="getData()[0].school_postal_code"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Postal Code"
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                id="website_url"
                v-model="getData()[0].website_url"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Website address (optional)"
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                id="contact_email"
                v-model="getData()[0].contact_email"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Application Contact E-mail"
                color="rgb(59, 153, 252)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                id="school_phone"
                v-model="getData()[0].school_phone"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="School Phone (optional)"
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
                v-model="groupRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio
                  label="Group 1"
                  color="#003366"
                  value="groupOne"
                  disabled
                >
                  <template #label>
                    <span :class="activeRadio">Group 1</span>
                  </template>
                </v-radio>
                <v-radio label="Group 2" color="#003366" value="groupTwo">
                  <template #label>
                    <span :class="activeRadio">Group 2</span>
                  </template>
                </v-radio>
                <v-radio label="Group 3" color="#003366" value="groupThree">
                  <template #label>
                    <span :class="activeRadio">Group 3</span>
                  </template>
                </v-radio>
                <v-radio label="Group 3" color="#003366" value="groupFour">
                  <template #label>
                    <span :class="activeRadio">Group 4</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-label
                >For authorities applying for Group 2 classification, are there
                current plans to seek Group 1
              </v-label>
              <v-label
                >classification in the second or subsequest year(s) of
                operation?</v-label
              >
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-label
              >School's Intended Affiliation/Association (CIS, ISABC, SCSBC,
              AMG, ACSIBC, SDA, or other if applicable)</v-label
            >
            <v-col cols="6">
              <v-text-field
                id="intended_affilliation"
                v-model="getData()[0].contact_email"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label="Affiliation/Association"
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <h4>School Authority Information</h4>

          <v-divider></v-divider>
          <h4>Projected Student Enrolment</h4>
          <v-divider></v-divider>
          <h4>School Semester Indicator Type</h4>
          <v-divider></v-divider>
          <h4>Application for Group Certification</h4>
          <v-divider></v-divider>
          <h4>School Facility</h4>

          <v-divider></v-divider>
          <h4>Independent School Policies</h4>
          <v-label
            ><strong>
              Except where noted, these policies are required for all B.C.
              Independent Schools.<br />
              Please include all relevant policies with your submission.
              <br />For information on specific policies please visit
              Independent School: Create School Specific Policies.
            </strong>
          </v-label>
          <br />
          <v-row align="center">
            <v-col cols="8">
              <v-label>Anaphylaxis Policy and Procedures </v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Appeals Process Policy </v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Boarding Safety and Supervision Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="na">
                  <template #label>
                    <span :class="activeRadio">N/A</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Child Abuse Prevention Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Student Conduct/Standards/Discipline Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label
                >Emergency Drills Policy and Procedures and <br />Emergency
                Response Plan</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Does the policy include a section on dealing with accidents,
                <br />
                medical alert situations, fire, earthquake, and lockdown
                <br />
                drills?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Are other emergency drills (emergency response plan, etc.)
                <br />
                implemented at the proposed school?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Does the policy include a section on dealing with permanent
                school closure?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label
                >Graduation Program Credits policy (if applicable)</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="na">
                  <template #label>
                    <span :class="activeRadio">N/A</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Harassment and Bullying Prevention Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Homeschooling policy (if applicable)</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="na">
                  <template #label>
                    <span :class="activeRadio">N/A</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>International Student policies (if applicable)</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="na">
                  <template #label>
                    <span :class="activeRadio">N/A</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Will the proposed school (or its agents) comply (or be required
                to comply) <br />
                with the Homestay Guidelines, including obtaining health
                <br />insurance, when hosting international students?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="na">
                  <template #label>
                    <span :class="activeRadio">N/A</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Will the proposed school apply the Ministry’s International
                Student<br />Graduation Credit Policy determining equivalency
                credits <br />for international students?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="na">
                  <template #label>
                    <span :class="activeRadio">N/A</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label
                >Privacy Policy (for the collection, use and disclosure of
                student, teacher <br />
                and parent information collected by the school)</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Special Education Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Will the proposed school develop a separate Special Education
                <br />
                Budget to reflect anticipated expenditures based on the needs
                <br />identified in the IEPs?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Will the proposed school provide learning assistance support
                for <br />special education students who are not additionally
                funded through<br />
                Supplementary Special Education grants?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" class="ml-5">
            <v-col cols="8">
              <v-label
                >Will the proposed school have a School Completion Certificate
                Policy/Program?</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Educational Resource Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Testing Drinking Water for Lead Content Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>School Closure Policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Student Records policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Student Safety policies</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label
                >Student Supervision (at school/field trips) policies</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label
                >School Fee Refund policy consistent with the Independent School
                Fee Refund Guidelines</v-label
              >
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="8">
              <v-label>Teacher and Principal Evaluation policy</v-label>
            </v-col>
            <v-col cols="4">
              <v-radio-group
                v-model="groupOneBoolRadioGroup"
                color="#003366"
                class="mt-4"
                direction="horizontal"
                inline
              >
                <v-radio label="Yes" color="#003366" value="yes">
                  <template #label>
                    <span :class="activeRadio">Yes</span>
                  </template>
                </v-radio>
                <v-radio label="No" color="#003366" value="no">
                  <template #label>
                    <span :class="activeRadio">No</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-label
            >If 'no' to any of the above policies, please explain
            below:</v-label
          >
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="no"
                v-model="getData()[0].contact_email"
                required
                :rules="[rules.required()]"
                :maxlength="255"
                variant="outlined"
                label=""
                color="rgb(59, 153, 252)"
              />
            </v-col>
          </v-row>

          <br />
          <h4>Educational Program</h4>
          <v-divider></v-divider>
          <h4>Additional Programs</h4>
          <v-divider></v-divider>
          <h4>Certification of Teachers</h4>
          <v-divider></v-divider>
          <h4>Application Submission</h4>

          <v-divider></v-divider>
        </v-container>
      </v-form>
    </template>
    <br />
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
  </div>
</template>

<script>
import ApiService from "./../../common/apiService";
import { ApiRoutes } from "./../../utils/constants";
import { PERMISSION } from "./../../utils/constants/Permission";
import { authStore } from "./../../store/modules/auth";
import { mapState } from "pinia";
import alertMixin from "./../../mixins/alertMixin";
import * as Rules from "./../../utils/institute/formRules";
import {
  formatPhoneNumber,
  formatDate,
  formatContactName,
} from "./../../utils/format";
import { getStatusColor } from "./../../utils/institute/status";
import { sortBy } from "lodash";
import DocumentUpload from "../common/DocumentUpload.vue";
import ConfirmationDialog from "../../components/util/ConfirmationDialog.vue";
import { APPLICATION_PAYLOAD } from "../../utils/constants";

import PrimaryButton from "./../util/PrimaryButton.vue";

export default {
  name: "SchoolApplicationForm",
  components: {
    PrimaryButton,
    ConfirmationDialog,
    DocumentUpload,
  },
  mixins: [alertMixin],
  props: {},
  data() {
    return {
      APPLICATION_PAYLOAD,
      isValidForm: false,
      requiredRules: [(v) => !!v || "Required"],
      rules: Rules,
    };
  },
  computed: {
    ...mapState(authStore, ["isAuthenticated", "userInfo"]),
    isLoading() {
      return false;
    },
  },
  mounted() {
    // this.validateForm();
  },
  created() {},
  methods: {
    async validateForm() {
      const valid = await this.$refs.schoolApplicationForm.validate();
      this.isFormValid = valid.valid;
    },
    getData() {
      return [
        {
          application_number: "APP-1048",
          status: "Draft",
          proposed_school_name: null,
          school_year: null,
          group_classification: null,
          school_authority_name: null,
          autority_head_name: null,
          authority_head_email: null,
          authority_head_phone: null,
          designated_authority_name: null,
          designated_authority_email: null,
          designated_authority_phone: null,
          authority_address: null,
          authority_city: null,
          authority_country: null,
          authority_province: null,
          authority_postal_code: null,
          school_address: null,
          school_city: null,
          school_province: null,
          school_country: null,
          school_postal_code: null,
          website_url: null,
          seek_group_one: false,
          proposed_grade_range: null,
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

li {
  display: list-item;
  list-style-position: inside;
}

.v-divider {
  padding: 15px;
}
</style>
