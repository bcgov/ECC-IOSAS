<template>
  <v-container>
    <h4>Independent School Policies</h4>
    <v-label
      ><strong>
        Except where noted, these policies are required for all B.C. Independent
        Schools. Please include all relevant policies with your submission. For
        information on specific policies please visit Independent School: Create
        School Specific Policies.
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
          >Does the policy include a section on dealing with accidents, medical
          alert situations, fire, earthquake, and lockdown drills?</v-label
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
          :disabled="!isEditing"
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
          >Does the policy include a section on dealing with permanent school
          closure?</v-label
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
        <v-label>Graduation Program Credits policy (if applicable)</v-label>
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
        <v-label>International Student policies (if applicable)</v-label>
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
          >Will the proposed school (or its agents) comply (or be required to
          comply) with the Homestay Guidelines, including obtaining health
          insurance, when hosting international students?</v-label
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
          >Will the proposed school apply the Ministry’s International Student
          Graduation Credit Policy determining equivalency credits for
          international students?</v-label
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
          >Privacy Policy (for the collection, use and disclosure of student,
          teacher and parent information collected by the school)</v-label
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
          :disabled="!isEditing"
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
          >Will the proposed school develop a separate Special Education Budget
          to reflect anticipated expenditures based on the needs identified in
          the IEPs?</v-label
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
          >Will the proposed school provide learning assistance support for
          special education students who are not additionally funded through
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
        <v-label>Testing Drinking Water for Lead Content Policy</v-label>
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
          :disabled="!isEditing"
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
        <v-label>Student Supervision (at school/field trips) policies</v-label>
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
          >School Fee Refund policy consistent with the Independent School Fee
          Refund Guidelines</v-label
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
          :disabled="!isEditing"
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
      >If 'no' to any of the above policies, please explain below:</v-label
    >
    <v-row>
      <v-col cols="12">
        <v-textarea
          :disabled="!isEditing"
          id="no"
          v-model="formData.contact_email"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label=""
          color="rgb(59, 153, 252)"
        />
      </v-col>
    </v-row>

    <!-- <br />
    <h4>Educational Program</h4>
    <br />
    <v-label
      >Describe familiarity with British Columbia’s curriculum and the school
      administration’s plans to support the implementation of B.C.s curriculum
      (pro-D, collaboration, etc.):</v-label
    >
    <v-row>
      <v-col cols="12">
        <v-textarea
          :disabled="!isEditing"
          id="no"
          v-model="formData.contact_email"
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
      >At this time does the proposed school intend on enrolling any of the
      following students? (Check all that apply)</v-label
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
          v-model="formData.contact_email"
          required
          :rules="[rules.required()]"
          :maxlength="255"
          variant="outlined"
          label="other"
          color="rgb(59, 153, 252)"
        />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
export default {
  name: 'SchoolPoliciesTab',
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
    requiredRules: [(v) => !!v || 'Required'],
    rules: Rules,
  }),
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.v-label {
  white-space: break-spaces;
}
</style>
