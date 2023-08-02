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
            id="iosas_anaphylaxispolicyandprocedures"
            v-model="formData.iosas_anaphylaxispolicyandprocedures"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Appeals Process Policy </v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_appealsprocesspolicy"
            v-model="formData.iosas_appealsprocesspolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Boarding Safety and Supervision Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_boardingsafetyandsupervisionpolicy"
            v-model="formData.iosas_boardingsafetyandsupervisionpolicy"
            color="#003366"
            class="mt-4"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_childabusepreventionpolicy"
            v-model="formData.iosas_childabusepreventionpolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Student Conduct/Standards/Discipline Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_studentconductstandardsdisciplinepolicy"
            v-model="formData.iosas_studentconductstandardsdisciplinepolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_emergencydrillspolicyproceduresresponse"
            v-model="formData.iosas_emergencydrillspolicyproceduresresponse"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_policyincludessectionsdealingwithemergencies"
            v-model="
              formData.iosas_policyincludessectionsdealingwithemergencies
            "
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_otheremergencydrillsimplemeneted"
            v-model="formData.iosas_otheremergencydrillsimplemeneted"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_policyincludepermanentschoolclosure"
            v-model="formData.iosas_policyincludepermanentschoolclosure"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Graduation Program Credits policy (if applicable)</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_graduationprogramcreditspolicyifapplicable"
            v-model="formData.iosas_graduationprogramcreditspolicyifapplicable"
            color="#003366"
            class="mt-4"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_harassmentandbullyingpreventionpolicy"
            v-model="formData.iosas_harassmentandbullyingpreventionpolicy"
            color="#003366"
            class="mt-4"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_homeschoolingpolicyifapplicable"
            v-model="formData.iosas_homeschoolingpolicyifapplicable"
            color="#003366"
            class="mt-4"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_internationalstudentpoliciesifapplicable"
            v-model="formData.iosas_internationalstudentpoliciesifapplicable"
            color="#003366"
            class="mt-4"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_complywithhomestayguidelines"
            v-model="formData.iosas_complywithhomestayguidelines"
            color="#003366"
            class="mt-4"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
            <v-radio label="N/A" color="#003366" :value="null" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label class="ml-5"
            >Will the proposed school apply the Ministry’s
            <a
              :href="GOV_URL.internationalStudentGraduationCreditPolicyUrl"
              target="_blank"
              >International Student Graduation Credit Policy</a
            >determining equivalency credits for international students?
          </v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_willapplyforstudentgraduationcreditpolicy"
            v-model="formData.iosas_willapplyforstudentgraduationcreditpolicy"
            color="#003366"
            class="mt-4"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_privacypolicy"
            v-model="formData.iosas_privacypolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Special Education Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_specialeducationpolicy"
            v-model="formData.iosas_specialeducationpolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_willdevelopbudgetforexpenditurebasedoniep"
            v-model="formData.iosas_willdevelopbudgetforexpenditurebasedoniep"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_learningassistanceforspecialstudents"
            v-model="formData.iosas_learningassistanceforspecialstudents"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_willhavecompletioncertificatepolicy"
            v-model="formData.iosas_willhavecompletioncertificatepolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Educational Resource Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_educationalresourcepolicy"
            v-model="formData.iosas_educationalresourcepolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Testing Drinking Water for Lead Content Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_testingdrinkingwaterforleadcontentpolicy"
            v-model="formData.iosas_testingdrinkingwaterforleadcontentpolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>School Closure Policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_schoolclosurepolicy"
            v-model="formData.iosas_schoolclosurepolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Student Records policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_studentrecordspolicy"
            v-model="formData.iosas_studentrecordspolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_studentsupervisionpolicies"
            v-model="formData.iosas_studentsupervisionpolicies"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
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
            id="iosas_feerefundpolicyconsistentwithguidelines"
            v-model="formData.iosas_feerefundpolicyconsistentwithguidelines"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Teacher and Principal Evaluation policy</v-label>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            id="iosas_teacherandprincipalevaluationpolicy"
            v-model="formData.iosas_teacherandprincipalevaluationpolicy"
            color="#003366"
            class="mt-4"
            :rules="[rules.requiredRadio()]"
            @change="$emit('validateAndPopulate', $event)"
            inline
          >
            <v-radio label="Yes" color="#003366" :value="true" />
            <v-radio label="No" color="#003366" :value="false" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-label
        >If 'no' to any of the above policies, please explain below:</v-label
      >
      <v-row>
        <!--TODO: Additional logic to force requirement if any bool is false? -->
        <v-col cols="12">
          <v-textarea
            id="iosas_ifnotoanyschoolpolicyexplainwhy"
            v-model="formData.iosas_ifnotoanyschoolpolicyexplainwhy"
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
          <v-label>Anaphylaxis Policy and Procedures </v-label>
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
          <v-label>Appeals Process Policy </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_appealsprocesspolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Boarding Safety and Supervision Policy </v-label>
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
          <v-label>Child Abuse Prevention Policy </v-label>
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
          <v-label>Student Conduct/Standards/Discipline Policy </v-label>
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
          <v-label>Graduation Program Credits policy (if applicable) </v-label>
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
          <v-label>Harassment and Bullying Prevention Policy </v-label>
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
          <v-label>Homeschooling policy (if applicable) </v-label>
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
          <v-label>International Student policies (if applicable) </v-label>
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
            >Will the proposed school apply the Ministry’s
            <a
              :href="GOV_URL.internationalStudentGraduationCreditPolicyUrl"
              target="_blank"
              >International Student Graduation Credit Policy</a
            >determining equivalency credits for international students?
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
          </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_privacypolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Special Education Policy </v-label>
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
          <v-label>Educational Resource Policy </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(formData.iosas_educationalresourcepolicy)
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Testing Drinking Water for Lead Content Policy </v-label>
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
          <v-label>School Closure Policy </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_schoolclosurepolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Student Records policy </v-label>
        </v-col>
        <v-col cols="4">
          {{ formatBooleanToYesNoString(formData.iosas_studentrecordspolicy) }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label
            >Student Supervision (at school/field trips) policies
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
          </v-label>
        </v-col>
        <v-col cols="4">
          {{
            formatBooleanToYesNoString(
              formData.iosas_feerefundpolicyconsistentwithguidelines
            )
          }}
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="8">
          <v-label>Teacher and Principal Evaluation policy </v-label>
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
  emits: ['validateAndPopulate'],
  props: {
    formData: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    validateAndPopulate: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    NULL_STRING,
    GOV_URL,
    rules: Rules,
  }),
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
