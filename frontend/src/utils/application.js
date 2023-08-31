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

export const allPolicyTabFields = [
  ...schoolPolicyTabBoolFields,
  ...schoolPolicyTabPickListFields,
];

export async function setChoiceFieldsToNull(formData) {
  let updatedData = formData;

  booleanFieldsOnSchoolApplication.forEach(
    (fieldName) => delete updatedData[fieldName]
  );
  return updatedData;
}
