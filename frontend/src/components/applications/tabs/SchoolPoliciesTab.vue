<template>
  <v-container>
    <h4>Independent School Policies</h4>
    <v-label
      ><strong
        >Except where noted, these policies are required for all B.C.
        Independent Schools. Please include all relevant policies with your
        submission. For information on specific policies please visit
        <a :href="GOV_URL.independentSchoolInfoUrl"
          >Independent School: Create School Specific Policies.</a
        >
      </strong>
    </v-label>
    <br />
    <br />
    <div v-if="isEditing">
      <v-row align="center">
        <v-col cols="8">
          <v-label>Anaphylaxis Policy and Procedures </v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_anaphylaxispolicyandprocedures"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Appeals Process Policy </v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_appealsprocesspolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Boarding Safety and Supervision Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_boardingsafetyandsupervisionpolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Child Abuse Prevention Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_childabusepreventionpolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Student Conduct/Standards/Discipline Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_studentconductstandardsdisciplinepolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="formData.iosas_emergencydrillspolicyproceduresresponse"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="
              formData.iosas_policyincludessectionsdealingwithemergencies
            "
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="formData.iosas_otheremergencydrillsimplemeneted"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="formData.iosas_policyincludepermanentschoolclosure"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Graduation Program Credits policy (if applicable)</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_graduationprogramcreditspolicyifapplicable"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Harassment and Bullying Prevention Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_harassmentandbullyingpreventionpolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Homeschooling policy (if applicable)</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_homeschoolingpolicyifapplicable"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>International Student policies (if applicable)</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_internationalstudentpoliciesifapplicable"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school (or its agents) comply (or be required to
            comply) with the
            <a :href="GOV_URL.homestayGuidelinesUrl" target="_blank"
              >Homestay Guidelines,</a
            >
            including obtaining health insurance, when hosting international
            students?</v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_complywithhomestayguidelines"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
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
            v-model="formData.iosas_willapplyforstudentgraduationcreditpolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
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
            v-model="formData.iosas_privacypolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Special Education Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_specialeducationpolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="formData.iosas_willdevelopbudgetforexpenditurebasedoniep"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="formData.iosas_learningassistanceforspecialstudents"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school have a
            <a
              :href="GOV_URL.schoolCompletionCertificatePolicyUrl"
              target="_blank"
              >School Completion Certificate Policy/Program?</a
            ></v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_willhavecompletioncertificatepolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Educational Resource Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_educationalresourcepolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Testing Drinking Water for Lead Content Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_testingdrinkingwaterforleadcontentpolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>School Closure Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_schoolclosurepolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Student Records policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_studentrecordspolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            v-model="formData.iosas_studentsupervisionpolicies"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >School Fee Refund policy consistent with the Independent School Fee
            Refund
            <a :href="GOV_URL.schoolFeeRefundPolicyUrl" target="_blank"
              >Guidelines</a
            ></v-label
          >
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_refundpolicyconsistentwiththeguidelines"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Teacher and Principal Evaluation policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="formData.iosas_teacherandprincipalevaluationpolicy"
            color="#003366"
            class="mt-4"
            direction="horizontal"
            inline
            :disabled="!isEditing"
          >
            <v-radio label="Yes" color="#003366" v-bind:value="true" />
            <v-radio label="No" color="#003366" v-bind:value="false" />
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
            id="iosas_ifnotoanyschoolpolicyexplainwhy"
            v-model="formData.iosas_ifnotoanyschoolpolicyexplainwhy"
            required
            :rules="[rules.required()]"
            :maxlength="255"
            variant="outlined"
            label=""
            color="rgb(59, 153, 252)"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Anaphylaxis Policy and Procedures
            <span class="orange">iosas_anaphylaxispolicyandprocedures</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_anaphylaxispolicyandprocedures
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Appeals Process Policy
            <span class="orange">iosas_appealsprocesspolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_appealsprocesspolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Boarding Safety and Supervision Policy

            <span class="orange">iosas_boardingsafetyandsupervisionpolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_boardingsafetyandsupervisionpolicy
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Child Abuse Prevention Policy

            <span class="orange">iosas_childabusepreventionpolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_childabusepreventionpolicy
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Student Conduct/Standards/Discipline Policy

            <span class="orange"
              >iosas_studentconductstandardsdisciplinepolicy</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_studentconductstandardsdisciplinepolicy
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Emergency Drills Policy and Procedures and Emergency Response Plan

            <span class="orange"
              >iosas_emergencydrillspolicyproceduresresponse</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_emergencydrillspolicyproceduresresponse
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Does the policy include a section on dealing with accidents,
            medical alert situations, fire, earthquake, and lockdown drills?

            <span class="orange"
              >iosas_policyincludessectionsdealingwithemergencies</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_policyincludessectionsdealingwithemergencies
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Are other emergency drills (emergency response plan, etc.)
            implemented at the proposed school?
            <span class="orange">iosas_otheremergencydrillsimplemeneted</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_otheremergencydrillsimplemeneted
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Does the policy include a section on dealing with permanent school
            closure?

            <span class="orange"
              >iosas_policyincludepermanentschoolclosure</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_policyincludepermanentschoolclosure
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Graduation Program Credits policy (if applicable)

            <span class="orange"
              >iosas_graduationprogramcreditspolicyifapplicable</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_graduationprogramcreditspolicyifapplicable
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Harassment and Bullying Prevention Policy

            <span class="orange"
              >iosas_harassmentandbullyingpreventionpolicy</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_harassmentandbullyingpreventionpolicy
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Homeschooling policy (if applicable)

            <span class="orange">iosas_homeschoolingpolicyifapplicable</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_homeschoolingpolicyifapplicable
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >International Student policies (if applicable)

            <span class="orange"
              >iosas_internationalstudentpoliciesifapplicable</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_internationalstudentpoliciesifapplicable
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school (or its agents) comply (or be required to
            comply) with the
            <a :href="GOV_URL.homestayGuidelinesUrl" target="_blank"
              >Homestay Guidelines,</a
            >, including obtaining health insurance, when hosting international
            students?

            <span class="orange">iosas_complywithhomestayguidelines</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_complywithhomestayguidelines
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school apply the Ministry’s International Student
            Graduation Credit Policy determining equivalency credits for
            international students?

            <span class="orange"
              >iosas_willapplyforstudentgraduationcreditpolicy</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_willapplyforstudentgraduationcreditpolicy
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Privacy Policy (for the collection, use and disclosure of student,
            teacher and parent information collected by the school)

            <span class="orange">iosas_privacypolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_privacypolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Special Education Policy

            <span class="orange">iosas_specialeducationpolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(formData.iosas_specialeducationpolicy)
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school develop a separate Special Education
            Budget to reflect anticipated expenditures based on the needs
            identified in the IEPs?

            <span class="orange"
              >iosas_willdevelopbudgetforexpenditurebasedoniep</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_willdevelopbudgetforexpenditurebasedoniep
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school provide learning assistance support for
            special education students who are not additionally funded through
            Supplementary Special Education grants?

            <span class="orange"
              >iosas_learningassistanceforspecialstudents</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_learningassistanceforspecialstudents
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school have a
            <a
              :href="GOV_URL.schoolCompletionCertificatePolicyUrl"
              target="_blank"
              >School Completion Certificate Policy/Program?</a
            >

            <span class="orange"
              >iosas_willhavecompletioncertificatepolicy</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_willhavecompletioncertificatepolicy
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Educational Resource Policy

            <span class="orange">iosas_educationalresourcepolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(formData.iosas_educationalresourcepolicy)
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Testing Drinking Water for Lead Content Policy

            <span class="orange"
              >iosas_testingdrinkingwaterforleadcontentpolicy</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_testingdrinkingwaterforleadcontentpolicy
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >School Closure Policy

            <span class="orange">iosas_schoolclosurepolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_schoolclosurepolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Student Records policy

            <span class="orange">iosas_studentrecordspolicy</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_studentrecordspolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Student Supervision (at school/field trips) policies

            <span class="orange">iosas_studentsupervisionpolicies</span>
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_studentsupervisionpolicies
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >School Fee Refund policy consistent with the Independent School Fee
            Refund
            <a :href="GOV_URL.schoolFeeRefundPolicyUrl" target="_blank"
              >Guidelines</a
            >

            <span class="orange"
              >iosas_refundpolicyconsistentwiththeguidelines</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_refundpolicyconsistentwiththeguidelines
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Teacher and Principal Evaluation policy

            <span class="orange"
              >iosas_teacherandprincipalevaluationpolicy</span
            >
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_teacherandprincipalevaluationpolicy
            )
          }}
        </v-col>
      </v-row>
      <v-row>
        <v-label
          >If 'no' to any of the above policies, please explain below:</v-label
        >
        <v-col cols="12">
          {{ formData.iosas_ifnotoanyschoolpolicyexplainwhy || NULL_STRING }}
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import * as Rules from '../../../utils/institute/formRules';
import { formatBooleanToYesNoString } from '../../../utils/format';
import { NULL_STRING, GOV_URL } from '../../../utils/constants';
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
    NULL_STRING,
    GOV_URL,
    rules: Rules,
  }),
  mounted() {},
  computed: {},
  methods: {
    formatBooleanToYesNoString,
  },
};
</script>

<style scoped>
.v-label {
  display: inline-block;
}
</style>
