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
        <v-container fluid class="content-container">
          <div class="form-container">
            <h1>Application for Independent School Certification</h1>
            <v-divider></v-divider>
            <h4>General</h4>
            <br />
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
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
              <v-col cols="12" sm="12" md="6" xs="12">
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
                Will the proposed school comply with Section 1 of the Schedule
                of the Independent School Act, which requires that:
              </strong>
            </v-label>
            <v-row>
              <br />
              <v-col cols="12">
                <v-label>
                  <ol type="1">
                    <li>
                      No program is in existence or is proposed at the
                      independent school that would, in theory or in practice,
                      promote or foster doctrines of:
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                      enactments of British Columbia and the municipality or
                      regional district in which the facilities are located,
                      and,
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
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
              >Please specify grade range to be offered in the first year of
              operation</v-label
            >
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-select
                  id="start_grade"
                  v-model="getData()[0].start_grade"
                  label="Select Start Grade"
                  variant="outlined"
                  color="rgb(59, 153, 252)"
                  :items="GRADE_OPTIONS"
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-select
                  id="end_grade"
                  v-model="getData()[0].end_grade"
                  label="Select End Grade"
                  variant="outlined"
                  color="rgb(59, 153, 252)"
                  :items="GRADE_OPTIONS"
                ></v-select>
              </v-col>
            </v-row>
            <v-label
              >Please provide a brief overview of the proposed school, nature of
              program (international/Montessori/Waldorf/IB/other) and plans for
              future years.</v-label
            >
            <v-row>
              <v-col cols="12">
                <v-textarea
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
              <v-col cols="12" sm="12" md="8" xs="12">
                <v-text-field
                  id="school_address_line_1"
                  v-model="getData()[0].school_address"
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
                  id="school_address_line_2"
                  v-model="getData()[0].school_address"
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
              <v-col cols="12" sm="12" md="4" xs="12">
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
              <v-col cols="12" sm="12" md="4" xs="12">
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
              <v-col cols="12" sm="12" md="4" xs="12">
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
              <v-col cols="12" sm="12" md="8" xs="12">
                <v-text-field
                  id="school_address_line_1"
                  v-model="getData()[0].school_address"
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
                  id="school_address_line_2"
                  v-model="getData()[0].school_address"
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
              <v-col cols="12" sm="12" md="4" xs="12">
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
              <v-col cols="12" sm="12" md="4" xs="12">
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
              <v-col cols="12" sm="12" md="4" xs="12">
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
              <v-col cols="12" sm="12" md="6" xs="12">
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
              <v-col cols="12" sm="12" md="6" xs="12">
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
              <v-col cols="12" sm="12" md="6" xs="12">
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
                  >For authorities applying for Group 2 classification, are
                  there current plans to seek Group 1
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
              <v-col cols="12" sm="12" md="6" xs="12">
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
            <br />
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Name of School Authority"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="School Authority Head's Name"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="E-mail"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-label
              >Please indicate under which legislation your School Authority is
              incorporated:</v-label
            >
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-checkbox
                  v-model="selected"
                  label="Societies Act"
                  value="Societies Act"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Business Corporation Act"
                  value="Business Corporation Act"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="an Order in Council or Private Act"
                  value="an Order in Council or Private Act"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Official Registration Number"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Date of last Annual Report (optional)"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>

            <v-label
              >Describe how the authority and/or the school board (where
              applicable) intends to exercise its governance duties.</v-label
            >
            <v-row>
              <v-col cols="12">
                <v-textarea
                  id="proposed_school_name"
                  v-model="getData()[0].proposed_school_name"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label=""
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>

            <v-label
              >Have any of the proponents for the proposed school been
              previously involved in operating an independent school in BC or
              elsewhere in the past 10 years. If so, please provide details
              below.
            </v-label>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  id="proposed_school_name"
                  v-model="getData()[0].proposed_school_name"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label=""
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <h4>Projected Student Enrolment</h4>
            <v-label
              ><strong>
                NOTE: A new school must have 10 or more school age students who
                are enrolled with the school and reported as 1.00 FTE each in
                accordance with the 1701 instructions for independent schools
                for the September data collection.
              </strong>
            </v-label>
            <br />
            <br />
            <v-label>Total Student enrolment projection at start-up</v-label>
            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Kindergarten"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 1"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 2"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 3"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 4"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 5"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 6"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 7"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Total (A)"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 8"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 9"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 10"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 11"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Grade 12"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Total (B)"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Total of A and B enrolment"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <h4>School Semester Indicator Type</h4>
            <v-label
              >Schools Seeking Group 1, 2 and 4 only. Please select however many
              fit the intended school.</v-label
            >
            <v-row>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="Semestered"
                  value="Semestered"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="Linear"
                  value="Linear"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="Regular School Year (Sept - June)"
                  value="Regular School Year (Sept - June)"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="Summer"
                  value="Summer"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="All Year"
                  value="All Year"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-label><strong>Half day Kindergarten</strong></v-label>
            <br />
            <v-label> Minimum required hours per year 450 Hours </v-label>
            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Hours Per Day"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Number of Days in Session"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Hours Per Year"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-label><strong>Full day Kindergarten</strong></v-label>
            <br />
            <v-label> Minimum required hours per year 850 Hours </v-label>
            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Hours Per Day"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Number of Days in Session"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Hours Per Year"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-label><strong>Grades 1-12</strong></v-label>
            <br />
            <v-label> Minimum required hours per year 850 Hours </v-label>
            <v-row>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Hours Per Day"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Number of Days in Session"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="contact_email"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Proposed Hours Per Year"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <h4>Application for Group Certification</h4>
            <v-label
              ><strong> (Schools Seeking group and 4 only) </strong></v-label
            >
            <v-label
              >The proposed school will establish an educational program that
              will comply with the instructional goals, time, and program
              requirements determined by the Minister, as specified in the
              Educational Standards Order.</v-label
            >
            <br />
            <br />

            <v-row align="center">
              <v-col cols="8">
                <v-label><strong>Group 2:</strong></v-label>
                <v-label
                  >If the proposed school is intending to seek funding, are you
                  familiar with Grants to Independent Schools Policy?
                </v-label>
              </v-col>
              <v-col cols="4">
                <v-radio-group
                  v-model="groupOneBoolRadioGroup"
                  color="#003366"
                  class="mt-4"
                  direction="horizontal"
                  inline
                >
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label><strong>Group 2:</strong></v-label>
                <v-label
                  >Group 2: Will the School Authority operate on a non-profit
                  basis?
                </v-label>
              </v-col>
              <v-col cols="4">
                <v-radio-group
                  v-model="groupOneBoolRadioGroup"
                  color="#003366"
                  class="mt-4"
                  direction="horizontal"
                  inline
                >
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <br />
            <v-label><strong>Group 4 only:</strong></v-label>
            <v-row align="center">
              <v-col cols="8">
                <v-label
                  >Has the school applicant's authority obtained written
                  confirmation from a bank or surety provider of the authority's
                  eligibility to meet the bonding requirements of the
                  Independent School Regulation (sections 12 to 17) as these
                  apply to Group 4 independent schools?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <br />

            <v-label class="block"
              >Has the school applicant’s authority obtained written
              confirmation from a financial institution or surety provider of
              their eligibility to obtain a bond in the form of an irrevocable
              letter of credit or surety bond in the amount of $100,000,
              consistent with requirements of the Independent School Regulation?
              <br />
              Specifically:
              <ul class="ml-10">
                <li>
                  $100,000 of bonding must be in place when making Application
                  for Interim Certification.
                </li>
                <li>
                  Bonding amount will be revised as required based on the
                  enrolment 30 days after the first day of class.
                </li>
              </ul>
            </v-label>
            <v-row align="center">
              <v-col cols="8">
                <v-label
                  >Please note that the Ministry will not issue an Interim
                  Certification until the required bonding instrument has been
                  provided by the Group 4 applicant.</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
                    <template #label>
                      <span :class="activeRadio">N/A</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <br />
            <v-label
              >Has the authority developed a fees and tuition refund policy that
              ensures refunds in the event the school is unable to obtain or
              maintain a Group 4 Certificate of Classification in the first year
              of operation?
            </v-label>
            <v-row>
              <v-col cols="12" sm="12" md="8" xs="12">
                <v-textarea
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label=""
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <h4>School Facility</h4>
            <br />
            <v-row>
              <v-col cols="12" sm="12" md="8" xs="12">
                <v-text-field
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="Name of Municipality of Regional District"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="8">
                <v-label
                  >Has the authority contacted local government for confirmation
                  that school facility will meet all current municipal/regional
                  district codes, regarding zoning, building, fire prevention,
                  and health?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <br />
            <v-label
              >If a school location has not yet been confirmed, please describe
              what steps you are taking to acquire a facility for the proposed
              school?
            </v-label>
            <v-row>
              <v-col cols="12" sm="12" md="8" xs="12">
                <v-textarea
                  id="school_phone"
                  v-model="getData()[0].school_phone"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label=""
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="8">
                <v-label
                  >Can the authority confirm that lead testing consistent with
                  the policy, Testing Lead Content in Drinking Water of
                  Independent School Facilities, will occur prior to students
                  using the facility?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <br />
            <v-row align="center">
              <v-col cols="8">
                <v-label
                  >Will Students attending the school be housed in:</v-label
                >
                <br />
                <v-label class="ml-10">A homestay setting:</v-label>
              </v-col>
              <v-col cols="4">
                <v-radio-group
                  v-model="groupOneBoolRadioGroup"
                  color="#003366"
                  class="mt-4"
                  direction="horizontal"
                  inline
                >
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-10">A boarding/dormitory setting:</v-label>
              </v-col>
              <v-col cols="4">
                <v-radio-group
                  v-model="groupOneBoolRadioGroup"
                  color="#003366"
                  class="mt-4"
                  direction="horizontal"
                  inline
                >
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <h4>Independent School Policies</h4>
            <v-label
              ><strong>
                Except where noted, these policies are required for all B.C.
                Independent Schools. Please include all relevant policies with
                your submission. For information on specific policies please
                visit Independent School: Create School Specific Policies.
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  >Emergency Drills Policy and Procedures and Emergency Response
                  Plan</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
                  >Does the policy include a section on dealing with accidents,
                  medical alert situations, fire, earthquake, and lockdown
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
                  >Are other emergency drills (emergency response plan, etc.)
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
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
                  >International Student policies (if applicable)</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
                    <template #label>
                      <span :class="activeRadio">N/A</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
                  >Will the proposed school (or its agents) comply (or be
                  required to comply) with the Homestay Guidelines, including
                  obtaining health insurance, when hosting international
                  students?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
                    <template #label>
                      <span :class="activeRadio">N/A</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
                  >Will the proposed school apply the Ministry’s International
                  Student Graduation Credit Policy determining equivalency
                  credits for international students?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
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
                  student, teacher and parent information collected by the
                  school)</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
                  >Will the proposed school develop a separate Special Education
                  Budget to reflect anticipated expenditures based on the needs
                  identified in the IEPs?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
                  >Will the proposed school provide learning assistance support
                  for special education students who are not additionally funded
                  through Supplementary Special Education grants?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="8">
                <v-label class="ml-5"
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  >Testing Drinking Water for Lead Content Policy</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  >School Fee Refund policy consistent with the Independent
                  School Fee Refund Guidelines</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                <v-textarea
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
            <br />
            <v-label
              >Describe familiarity with British Columbia’s curriculum and the
              school administration’s plans to support the implementation of
              B.C.s curriculum (pro-D, collaboration, etc.):</v-label
            >
            <v-row>
              <v-col cols="12">
                <v-textarea
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
            <v-divider></v-divider>
            <h4>Additional Programs</h4>
            <v-label
              >At this time does the proposed school intend on enrolling any of
              the following students? (Check all that apply)</v-label
            >
            <v-row>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="Indigenous Students"
                  value="Indigenous Students"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="English Language Learner Students"
                  value="English Language Learner Students"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="International Students"
                  value="Business Corporation Act"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="Students with diverse abilities"
                  value="Students with diverse abilities"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="6" md="4" xs="6">
                <v-checkbox
                  v-model="selected"
                  label="Other (please specify):"
                  value="Other (please specify):"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="4" xs="12">
                <v-text-field
                  id="no"
                  v-model="getData()[0].contact_email"
                  required
                  :rules="[rules.required()]"
                  :maxlength="255"
                  variant="outlined"
                  label="other"
                  color="rgb(59, 153, 252)"
                />
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <h4>Certification of Teachers</h4>
            <v-label
              ><strong>Schools seeking Group 2 and 4 only</strong></v-label
            >
            <br />
            <v-label>
              The school principal/head of school and all teachers teaching a
              subject that is reported out on student report cards must hold
              valid British Columbia teaching credentials issued by the Teacher
              Certification Branch (TCB). Initial certification of Group 2 and
              Group 4 schools will typically not be possible for schools
              employing teachers relying on a Letter of Permission as
              certification.
            </v-label>
            <br />
            <br />
            <v-label
              >Note: All employees must have a criminal record check completed
              through theMinistry of Public Safety and Solicitor General.
              Volunteers working with childrenmay also have their criminal
              record check completed by the Ministry of Public Safety and
              Solicitor General or local police.
            </v-label>
            <br />
            <br />
            <v-label
              >How many teachers does the proposed school intend to employ upon
              opening?</v-label
            >
            <v-row>
              <v-col cols="12" sm="12" md="6" xs="12">
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

            <v-row align="center">
              <v-col cols="8">
                <v-label
                  >Are you aware of the requirements of teacher certification as
                  they relate employees of Group 2, or 4 schools?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="null">
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
                  >Are you aware of the requirements for criminal record checks
                  for employees who are working with children and who are not
                  certified teachers, such as: administrative assistants,
                  business managers, secretaries, counsellors, teacher
                  assistants, health nurses, consultants, specialists, janitors,
                  and persons assigned other special tasks?</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <h4>Application Submission</h4>
            <v-label
              >You will be contacted via email with the results of your
              application. Successful applicants will be invited for an
              Interview as outlined In Step 3 of the Establishing an Independent
              School Policy.
            </v-label>
            <br />
            <br />
            <h5>Attachments</h5>
            <v-row align="center">
              <v-col cols="8">
                <v-label
                  >Complete set of policies/procedures as outlined in the
                  Interview Checklist (PDF)</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
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
                  >Business Plan with required financial information (Part A and
                  B) (Interview Checklist (PDF))</v-label
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
                  <v-radio label="Yes" color="#003366" v-bind:value="true">
                    <template #label>
                      <span :class="activeRadio">Yes</span>
                    </template>
                  </v-radio>
                  <v-radio label="No" color="#003366" v-bind:value="false">
                    <template #label>
                      <span :class="activeRadio">No</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-divider></v-divider>
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
        </v-container>
      </v-form>
    </template>
  </div>
</template>

<script>
import ApiService from './../../common/apiService';
import { ApiRoutes } from './../../utils/constants';
import { PERMISSION } from './../../utils/constants/Permission';
import { authStore } from './../../store/modules/auth';
import { mapState } from 'pinia';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';
import {
  formatPhoneNumber,
  formatDate,
  formatContactName,
} from './../../utils/format';
import { getStatusColor } from './../../utils/institute/status';
import { sortBy } from 'lodash';
import DocumentUpload from '../common/DocumentUpload.vue';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';
import { APPLICATION_PAYLOAD, GRADE_OPTIONS } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';

export default {
  name: 'SchoolApplicationForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
    DocumentUpload,
  },
  mixins: [alertMixin],
  props: {},
  data() {
    return {
      GRADE_OPTIONS,
      APPLICATION_PAYLOAD,
      isValidForm: false,
      requiredRules: [(v) => !!v || 'Required'],
      rules: Rules,
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
    isLoading() {
      return false;
    },
  },
  mounted() {},
  created() {},
  methods: {
    async validateForm() {
      const valid = await this.$refs.schoolApplicationForm.validate();
      this.isFormValid = valid.valid;
    },
    getData() {
      return [
        {
          application_number: 'APP-1048',
          status: 'Draft',
        },
      ];
    },
  },
};
</script>

<style scoped>
li {
  display: list-item;
  list-style-position: inside;
}

.block {
  display: block;
}

.v-label {
  white-space: break-spaces;
}
</style>
