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
    <div class="d-flex justify-space-between" v-if="!isLoading">
      <div class="flex-1">
        <v-tabs v-model="tab" bg-color="transparent" direction="vertical">
          <v-tab v-for="item in items" :key="item" :value="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </div>
      <div class="flex-4">
        <v-form
          ref="schoolApplicationForm"
          v-model="isFormValid"
          @submit.prevent="submit"
        >
          <v-container class="content-container">
            <div class="form-container">
              <div class="d-flex justify-space-between">
                <h1>Application for Independent School Certification</h1>
                <PrimaryButton
                  v-if="!isEditing"
                  secondary
                  text="Edit"
                  class="mr-2"
                  :click-action="toggleEditMode"
                />
              </div>
              <br />
              <v-divider></v-divider>

              <v-window v-model="tab">
                <v-window-item key="General" value="General">
                  <h4>General</h4>
                  <br />
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-text-field
                        id="application_number"
                        v-model="data.application_number"
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
                        v-model="data.status"
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
                  <v-label
                    ><strong>
                      Will the proposed school comply with Section 1 of the
                      Schedule of the Independent School Act, which requires
                      that:
                    </strong>
                  </v-label>
                  <v-row>
                    <br />
                    <v-col cols="12">
                      <v-label>
                        <ol type="1">
                          <li>
                            No program is in existence or is proposed at the
                            independent school that would, in theory or in
                            practice, promote or foster doctrines of:
                          </li>
                          <ol type="a" class="ml-5">
                            <li>
                              racial or ethnic superiority or persecution,
                            </li>
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
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                            The independent school facilities will comply with
                            the enactments of British Columbia and the
                            municipality or regional district in which the
                            facilities are located, and,
                          </li>
                        </ol>
                      </v-label>
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                            The authority complies with the Independent School
                            Act and its regulations.
                          </li>
                        </ol>
                      </v-label>
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
                          <template #label>
                            <span :class="activeRadio">No</span>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item
                  key="School Information"
                  value="School Information"
                >
                  <h4>School Information</h4>
                  <br />
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-text-field
                        :disabled="!isEditing"
                        id="proposed_school_name"
                        v-model="data.proposed_school_name"
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
                    >Please specify grade range to be offered in the first year
                    of operation</v-label
                  >
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-select
                        :disabled="!isEditing"
                        id="start_grade"
                        v-model="data.start_grade"
                        label="Select Start Grade"
                        variant="outlined"
                        color="rgb(59, 153, 252)"
                        :items="GRADE_OPTIONS"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-select
                        :disabled="!isEditing"
                        id="end_grade"
                        v-model="data.end_grade"
                        label="Select End Grade"
                        variant="outlined"
                        color="rgb(59, 153, 252)"
                        :items="GRADE_OPTIONS"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-label
                    >Please provide a brief overview of the proposed school,
                    nature of program
                    (international/Montessori/Waldorf/IB/other) and plans for
                    future years.</v-label
                  >
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        :disabled="!isEditing"
                        id="proposed_school_name"
                        v-model="data.proposed_school_name"
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
                        :disabled="!isEditing"
                        id="school_address_line_1"
                        v-model="data.school_address"
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
                        :disabled="!isEditing"
                        id="school_address_line_2"
                        v-model="data.school_address"
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
                        :disabled="!isEditing"
                        id="school_city"
                        v-model="data.school_city"
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
                        v-model="data.school_province"
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
                        v-model="data.school_country"
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
                        :disabled="!isEditing"
                        id="school_postal_code"
                        v-model="data.school_postal_code"
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
                        :disabled="!isEditing"
                        id="school_address_line_1"
                        v-model="data.school_address"
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
                        :disabled="!isEditing"
                        id="school_address_line_2"
                        v-model="data.school_address"
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
                        :disabled="!isEditing"
                        id="school_city"
                        v-model="data.school_city"
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
                        v-model="data.school_province"
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
                        v-model="data.school_country"
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
                        v-model="data.school_postal_code"
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
                        :disabled="!isEditing"
                        id="website_url"
                        v-model="data.website_url"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        >Group Calassification applying for: (Group
                        classification Information)</v-label
                      >
                      <v-radio-group
                        v-model="groupRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
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
                        <v-radio
                          label="Group 2"
                          color="#003366"
                          value="groupTwo"
                        >
                          <template #label>
                            <span :class="activeRadio">Group 2</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="Group 3"
                          color="#003366"
                          value="groupThree"
                        >
                          <template #label>
                            <span :class="activeRadio">Group 3</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="Group 3"
                          color="#003366"
                          value="groupFour"
                        >
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
                        >For authorities applying for Group 2 classification,
                        are there current plans to seek Group 1 classification
                        in the second or subsequest year(s) of operation?
                      </v-label>
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
                          <template #label>
                            <span :class="activeRadio">No</span>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-label
                    >School's Intended Affiliation/Association (CIS, ISABC,
                    SCSBC, AMG, ACSIBC, SDA, or other if applicable)</v-label
                  >
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-text-field
                        :disabled="!isEditing"
                        id="intended_affilliation"
                        v-model="data.contact_email"
                        required
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label="Affiliation/Association"
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item key="School Authority" value="School Authority">
                  <h4>School Authority Information</h4>
                  <br />
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-text-field
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                    >Please indicate under which legislation your School
                    Authority is incorporated:</v-label
                  >
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Societies Act"
                        value="Societies Act"
                      ></v-checkbox>
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Business Corporation Act"
                        value="Business Corporation Act"
                      ></v-checkbox>
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="an Order in Council or Private Act"
                        value="an Order in Council or Private Act"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-text-field
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                    applicable) intends to exercise its governance
                    duties.</v-label
                  >
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        :disabled="!isEditing"
                        id="proposed_school_name"
                        v-model="data.proposed_school_name"
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
                    previously involved in operating an independent school in BC
                    or elsewhere in the past 10 years. If so, please provide
                    details below.
                  </v-label>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        :disabled="!isEditing"
                        id="proposed_school_name"
                        v-model="data.proposed_school_name"
                        required
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label=""
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item
                  key="Student Enrolment"
                  value="Student Enrolment"
                >
                  <h4>Projected Student Enrolment</h4>
                  <v-label
                    ><strong>
                      NOTE: A new school must have 10 or more school age
                      students who are enrolled with the school and reported as
                      1.00 FTE each in accordance with the 1701 instructions for
                      independent schools for the September data collection.
                    </strong>
                  </v-label>
                  <br />
                  <br />
                  <v-label
                    >Total Student enrolment projection at start-up</v-label
                  >
                  <v-row>
                    <v-col cols="12" sm="12" md="4" xs="12">
                      <v-text-field
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        disabled
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        disabled
                        id="school_phone"
                        v-model="data.school_phone"
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
                        disabled
                        id="contact_email"
                        v-model="data.contact_email"
                        required
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label="Total of A and B enrolment"
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item key="School Semester" value="School Semester">
                  <h4>School Semester Indicator Type</h4>
                  <v-label
                    >Schools Seeking Group 1, 2 and 4 only. Please select
                    however many fit the intended school.</v-label
                  >
                  <v-row>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Semestered"
                        value="Semestered"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Linear"
                        value="Linear"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Regular School Year (Sept - June)"
                        value="Regular School Year (Sept - June)"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Summer"
                        value="Summer"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
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
                        :disabled="!isEditing"
                        id="contact_email"
                        v-model="data.contact_email"
                        required
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label="Proposed Hours Per Year"
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item
                  key="Group Certification"
                  value="Group Certification"
                >
                  <h4>Application for Group Certification</h4>
                  <v-label
                    ><strong>
                      (Schools Seeking group and 4 only)
                    </strong></v-label
                  >
                  <v-label
                    >The proposed school will establish an educational program
                    that will comply with the instructional goals, time, and
                    program requirements determined by the Minister, as
                    specified in the Educational Standards Order.</v-label
                  >
                  <br />
                  <br />

                  <v-row align="center">
                    <v-col cols="8">
                      <v-label><strong>Group 2:</strong></v-label>
                      <v-label
                        >If the proposed school is intending to seek funding,
                        are you familiar with Grants to Independent Schools
                        Policy?
                      </v-label>
                    </v-col>
                    <v-col cols="4">
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                        >Group 2: Will the School Authority operate on a
                        non-profit basis?
                      </v-label>
                    </v-col>
                    <v-col cols="4">
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                        confirmation from a bank or surety provider of the
                        authority's eligibility to meet the bonding requirements
                        of the Independent School Regulation (sections 12 to 17)
                        as these apply to Group 4 independent schools?</v-label
                      >
                    </v-col>
                    <v-col cols="4">
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                    confirmation from a financial institution or surety provider
                    of their eligibility to obtain a bond in the form of an
                    irrevocable letter of credit or surety bond in the amount of
                    $100,000, consistent with requirements of the Independent
                    School Regulation?
                    <br />
                    Specifically:
                    <ul class="ml-10">
                      <li>
                        $100,000 of bonding must be in place when making
                        Application for Interim Certification.
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
                        Certification until the required bonding instrument has
                        been provided by the Group 4 applicant.</v-label
                      >
                    </v-col>
                    <v-col cols="4">
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                    >Has the authority developed a fees and tuition refund
                    policy that ensures refunds in the event the school is
                    unable to obtain or maintain a Group 4 Certificate of
                    Classification in the first year of operation?
                  </v-label>
                  <v-row>
                    <v-col cols="12" sm="12" md="8" xs="12">
                      <v-textarea
                        :disabled="!isEditing"
                        id="school_phone"
                        v-model="data.school_phone"
                        required
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label=""
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item key="School Facility" value="School Facility">
                  <SchoolFacility :formData="data" :isEditing="isEditing" />
                </v-window-item>
                <v-window-item key="School Policies" value="School Policies">
                  <SchoolPolicies :formData="data" :isEditing="isEditing" />
                </v-window-item>
                <v-window-item
                  key="Educational Program"
                  value="Educational Program"
                >
                  <br />
                  <h4>Educational Program</h4>
                  <br />
                  <v-label
                    >Describe familiarity with British Columbia’s curriculum and
                    the school administration’s plans to support the
                    implementation of B.C.s curriculum (pro-D, collaboration,
                    etc.):</v-label
                  >
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        :disabled="!isEditing"
                        id="no"
                        v-model="data.contact_email"
                        required
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label=""
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                  <h4>Additional Programs</h4>
                  <v-label
                    >At this time does the proposed school intend on enrolling
                    any of the following students? (Check all that
                    apply)</v-label
                  >
                  <v-row>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Indigenous Students"
                        value="Indigenous Students"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="English Language Learner Students"
                        value="English Language Learner Students"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="International Students"
                        value="Business Corporation Act"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Students with diverse abilities"
                        value="Students with diverse abilities"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="6" sm="6" md="4" xs="6">
                      <v-checkbox
                        :disabled="!isEditing"
                        v-model="selected"
                        label="Other (please specify):"
                        value="Other (please specify):"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="12" md="4" xs="12">
                      <v-text-field
                        :disabled="!isEditing"
                        id="no"
                        v-model="data.contact_email"
                        required
                        :rules="[rules.required()]"
                        :maxlength="255"
                        variant="outlined"
                        label="other"
                        color="rgb(59, 153, 252)"
                      />
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item
                  key="Teacher Certification"
                  value="Teacher Certification"
                >
                  <h4>Certification of Teachers</h4>
                  <v-label
                    ><strong
                      >Schools seeking Group 2 and 4 only</strong
                    ></v-label
                  >
                  <br />
                  <v-label>
                    The school principal/head of school and all teachers
                    teaching a subject that is reported out on student report
                    cards must hold valid British Columbia teaching credentials
                    issued by the Teacher Certification Branch (TCB). Initial
                    certification of Group 2 and Group 4 schools will typically
                    not be possible for schools employing teachers relying on a
                    Letter of Permission as certification.
                  </v-label>
                  <br />
                  <br />
                  <v-label
                    >Note: All employees must have a criminal record check
                    completed through theMinistry of Public Safety and Solicitor
                    General. Volunteers working with childrenmay also have their
                    criminal record check completed by the Ministry of Public
                    Safety and Solicitor General or local police.
                  </v-label>
                  <br />
                  <br />
                  <v-label
                    >How many teachers does the proposed school intend to employ
                    upon opening?</v-label
                  >
                  <v-row>
                    <v-col cols="12" sm="12" md="6" xs="12">
                      <v-text-field
                        :disabled="!isEditing"
                        id="no"
                        v-model="data.contact_email"
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
                        >Are you aware of the requirements of teacher
                        certification as they relate employees of Group 2, or 4
                        schools?</v-label
                      >
                    </v-col>
                    <v-col cols="4">
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                        >Are you aware of the requirements for criminal record
                        checks for employees who are working with children and
                        who are not certified teachers, such as: administrative
                        assistants, business managers, secretaries, counsellors,
                        teacher assistants, health nurses, consultants,
                        specialists, janitors, and persons assigned other
                        special tasks?</v-label
                      >
                    </v-col>
                    <v-col cols="4">
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
                          <template #label>
                            <span :class="activeRadio">No</span>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item key="Submissions" value="Submissions">
                  <h4>Application Submission</h4>
                  <v-label
                    >You will be contacted via email with the results of your
                    application. Successful applicants will be invited for an
                    Interview as outlined In Step 3 of the Establishing an
                    Independent School Policy.
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
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
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
                        >Business Plan with required financial information (Part
                        A and B) (Interview Checklist (PDF))</v-label
                      >
                    </v-col>
                    <v-col cols="4">
                      <v-radio-group
                        v-model="groupOneBoolRadioGroup"
                        color="#003366"
                        class="mt-4"
                        direction="horizontal"
                        inline
                        :disabled="!isEditing"
                      >
                        <v-radio
                          label="Yes"
                          color="#003366"
                          v-bind:value="true"
                        >
                          <template #label>
                            <span :class="activeRadio">Yes</span>
                          </template>
                        </v-radio>
                        <v-radio
                          label="No"
                          color="#003366"
                          v-bind:value="false"
                        >
                          <template #label>
                            <span :class="activeRadio">No</span>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>

              <br />
              <v-container v-if="isEditing">
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
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from './../../store/modules/auth';
import { mapState } from 'pinia';
import alertMixin from './../../mixins/alertMixin';
import * as Rules from './../../utils/institute/formRules';

import DocumentUpload from '../common/DocumentUpload.vue';
import ConfirmationDialog from '../../components/util/ConfirmationDialog.vue';
import { GRADE_OPTIONS } from '../../utils/constants';

import PrimaryButton from './../util/PrimaryButton.vue';
import SchoolPolicies from './SchoolPolicies.vue';
import SchoolFacility from './SchoolFacility.vue';

export default {
  name: 'SchoolApplicationForm',
  components: {
    PrimaryButton,
    ConfirmationDialog,
    DocumentUpload,
    SchoolPolicies,
    SchoolFacility,
  },
  mixins: [alertMixin],
  props: {
    data: {
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
      isEditing: false,
      isValidForm: false,
      requiredRules: [(v) => !!v || 'Required'],
      rules: Rules,
      tab: 'General',
      items: [
        'General',
        'School Information',
        'School Authority',
        'Student Enrolment',
        'School Semester',
        'Group Certification',
        'School Facility',
        'School Policies',
        'Educational Program',
        'Teacher Certification',
        'Submissions',
      ],
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'userInfo']),
  },
  mounted() {},
  created() {},
  methods: {
    async validateForm() {
      const valid = await this.$refs.schoolApplicationForm.validate();
      this.isFormValid = valid.valid;
    },
    toggleEditMode() {
      return (this.isEditing = true);
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

.v-window {
  margin-top: 20px;
}

/* Override the default settings for content-container as this view has side navigation */
.content-container {
  padding-top: 0;
  padding-right: 15em !important;
  padding-left: 2em !important;
}

@media screen and (max-width: 1900px) {
  .content-container {
    padding-right: 5em !important;
    padding-left: 1em !important;
  }
}

@media screen and (max-width: 1500px) {
  .content-container {
    padding-right: 4em !important;
    padding-left: 1em !important;
  }
}

@media screen and (max-width: 600px) {
  .content-container {
    padding-right: 0.5em !important;
    padding-left: 0.5em !important;
  }
}

.flex-1 {
  flex: 1;
}

.flex-4 {
  flex: 4;
}
</style>
