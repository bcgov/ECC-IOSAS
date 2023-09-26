export const NULL_MESSAGES = {
  applications:
    "You don't currently have any active school applications. Your new school application will show up here after your Expression of Interest is approved.",
  eoi: "You don't currently have any active Expression of Interests. Click `Create new EOI` button to get started.",
};

export const TAB_CODES = {
  general: 100000000,
  schoolInfo: 100000001,
  schoolAuthority: 100000002,
  studentEnrolment: 100000003,
  schoolSemester: 100000004,
  groupCertification: 100000005,
  schoolFacility: 100000006,
  schoolPolicies: 100000007,
  educationalProgram: 100000008,
  teacherCertification: 100000009,
  documents: 100000010,
  submission: 100000011,
  preCertSubmission: 100000012,
};

export const APP_STATUS_CODES = {
  draft: 100000001,
  preCert: 100000009,
};

export const EOI_STATUS_CODES = {
  draft: 100000006,
};

/**
 * @type {Array} TAB_CONTENT is used to render Vuetify Tab/Window in SchoolApplicationForm.vue 
 * @property {number} tab - value that matches tab.value
 * @property {string} component - matches the name of the component imported, 
 * 
 *  <v-window-item
        v-for="t in TAB_CONTENT"
        :key="t.tab"
        :value="t.tab"
        :transition="false"
    >
        <component :is="t.component"/>
    </v-window-item>
 * 
 * 
 * */
export const TAB_CONTENT = [
  {
    tab: TAB_CODES.general,
    component: 'SchoolGeneralTab',
  },
  {
    tab: TAB_CODES.schoolInfo,
    component: 'SchoolInformationTab',
  },
  {
    tab: TAB_CODES.schoolAuthority,
    component: 'SchoolAuthorityInformationTab',
  },
  {
    tab: TAB_CODES.studentEnrolment,
    component: 'StudentEnrolmentTab',
  },
  {
    tab: TAB_CODES.schoolSemester,
    component: 'SchoolSemesterTab',
  },
  {
    tab: TAB_CODES.groupCertification,
    component: 'GroupCertificationTab',
  },
  { tab: TAB_CODES.schoolFacility, component: 'SchoolFacilityTab' },
  { tab: TAB_CODES.schoolPolicies, component: 'SchoolPoliciesTab' },
  { tab: TAB_CODES.educationalProgram, component: 'EducationalProgramTab' },
  { tab: TAB_CODES.teacherCertification, component: 'TeacherCertificationTab' },
  { tab: TAB_CODES.documents, component: 'DocumentTab' },
  { tab: TAB_CODES.submission, component: 'SubmissionTab' },
  {
    tab: TAB_CODES.preCertSubmission,
    component: 'PreCertificationTab',
  },
];

export const EOI_DOC_CODES = {
  incorporation: 100000000,
  goodStanding: 100000001,
  other: 100000002,
};

export const SCHOOL_APP_DOC_CODES = {
  otherDocCode: 100000001,
  schoolPolicyCode: 100000002,
  businessPlanCode: 100000003,
  confirmationOfEligibilityCode: 100000004,
  tuitionRefundPolicyCode: 100000005,
  businessReferencesCode: 100000006,
  preCertOther: 100000013,
  proofOfPurchaseCode: 100000010,
  mulicipalComplianceCode: 100000011,
  confimationWaterTestingCode: 100000012,
  creditOrSurityBondCode: 100000016,
};

export const SCHOOL_APP_DOC_CATEGORY_CODE = {
  shcoolApplication: 100000000,
  preCert: 100000002,
};

export const GROUP_CLASSIFICATION_CODES = {
  groupTwo: 100000000,
  groupThree: 100000001,
  groupFour: 100000002,
};

export const AFFILIATION_CODES = {
  other: 100000006,
};

export const ADDITIONAL_PROGRAM_CODES = {
  other: 100000004,
};

export const STATUS_MAP = {
  'New (Submitted)': 'New',
  'In Progress (Send Confirmation of Receipt Email)': 'In Progress',
  '1 - New App': 'New',
  '2 - Draft App': 'Draft',
  '3 - App Submitted': 'Submitted',
  '4 - App Review': 'In Review',
  '5 - Interview': 'Interview',
  '6 - Pre-Certification': 'Pre-Certification',
  '7 - Interim Certification': 'Interim Certification',
  '9 - Denied': 'Denied',
};

const generalTabBoolFields = [
  'iosas_nopromotionofinappropriatedoctrines',
  'iosas_willcomplywithenactmentsofbc',
  'iosas_authoritycomplieswithisaregulations',
];
const schoolAuthorityTabBoolFields = [
  'iosas_proponentspreviouslyinvolvedinisbc',
];
const groupCertificationTabBoolFields = [
  'iosas_familiarwithgrantstoispolicyifseekingfunds',
  'iosas_willsaoperateonnonprofitbasis',
  'iosas_hassaobtaineddocumentsregardingbondingreqs',
  'iosas_hasthesaobtainedirrevocableloc',
];
const schoolFaciltyTabBoolFields = [
  'iosas_hastheauthoritycontactedlocalgovernment',
  'iosas_confirmationofleadtestingfordrinkingwater',
  'iosas_studentshousedinahomesetting',
  'iosas_studentshousedinadormitorysetting',
];

const schoolPolicyTabBoolFields = [
  'iosas_anaphylaxispolicyandprocedures',
  'iosas_appealsprocesspolicy',
  'iosas_childabusepreventionpolicy',
  'iosas_studentconductstandardsdisciplinepolicy',
  'iosas_harassmentandbullyingpreventionpolicy',
  'iosas_privacypolicy',
  'iosas_educationalresourcepolicy',
  'iosas_testingdrinkingwaterforleadcontentpolicy',
  'iosas_schoolclosurepolicy',
  'iosas_studentrecordspolicy',
  'iosas_studentsupervisionpolicies',
  'iosas_feerefundpolicyconsistentwithguidelines',
  'iosas_teacherandprincipalevaluationpolicy',
  'iosas_emergencydrillspolicyproceduresresponse',
  'iosas_policyincludessectionsdealingwithemergencies',
  'iosas_otheremergencydrillsimplemeneted',
  'iosas_policyincludepermanentschoolclosure',
  'iosas_specialeducationpolicy',
  'iosas_willdevelopbudgetforexpenditurebasedoniep',
  'iosas_learningassistanceforspecialstudents',
  'iosas_willhavecompletioncertificatepolicy',
];

const teacherCertificationTabBoolFields = [
  'iosas_awareoftherequirementsforcrchecks',
];

const booleanFieldsOnSchoolApplication = [
  ...generalTabBoolFields,
  ...schoolAuthorityTabBoolFields,
  ...groupCertificationTabBoolFields,
  ...schoolFaciltyTabBoolFields,
  ...schoolPolicyTabBoolFields,
  ...teacherCertificationTabBoolFields,
];

const schoolPolicyTabPickListFields = [
  'iosas_boardingsafetyandsupervisionpolicy',
  'iosas_graduationprogramcreditspolicyifapplicable',
  'iosas_homeschoolingpolicyifapplicable',
  'iosas_internationalstudentpoliciesifapplicable',
  'iosas_complywithhomestayguidelines',
  'iosas_willapplyforstudentgraduationcreditpolicy',
  'iosas_specialeducationpolicy',
];

export const POLICY_TAB_FIELDS = [
  ...schoolPolicyTabBoolFields,
  ...schoolPolicyTabPickListFields,
];

/**
 * By default, when a School application is created, and booleans are defaulted to false.
 * This method deletes selected booleans, which forces the user to pupulate them as they
 * progress through the school application form
 * @param {*} formData
 */
export async function setChoiceFieldsToNull(formData) {
  let updatedData = formData;

  booleanFieldsOnSchoolApplication.forEach(
    (fieldName) => delete updatedData[fieldName]
  );
  return updatedData;
}
