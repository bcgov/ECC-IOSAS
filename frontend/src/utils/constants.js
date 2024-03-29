const baseRoot = '/api';
const authRoot = baseRoot + '/auth';
const dynamicRoot = baseRoot + '/dynamic';

//Authentication endpoints
export const AuthRoutes = Object.freeze({
  LOGIN: authRoot + '/login',
  DASHBOARD: '/',
  LOGIN_BCEID: authRoot + '/logout?loginBceid=true',
  LOGOUT: authRoot + '/logout',
  SESSION_EXPIRED: authRoot + '/logout?sessionExpired=true',
  LOGIN_FAILED: authRoot + '/logout?loginError=true',
  REFRESH: authRoot + '/refresh',
  TOKEN: authRoot + '/token',
  SESSION_REMAINING_TIME: authRoot + '/user-session-remaining-time',
  EOI: '/expression-of-interest',
  NEW_EOI: '/expression-of-interest/new',
  APPLICATION: '/school-application',
  PROFILE: '/user-profile',
});

export const ApiRoutes = Object.freeze({
  USER: baseRoot + '/user',
  CONFIG: baseRoot + '/config',
  ENV: baseRoot + '/environment',
  dynamic: {
    BASE_URL: dynamicRoot,
    HEALTH: dynamicRoot + '/Health',
  },
  contact: {
    CONTACT: (id) => dynamicRoot + `/Contact/GetbyExternalId?externalId=${id}`,
  },
  meta: {
    ACTIVE_SCHOOL_YEARS: dynamicRoot + '/SchoolYear/GetActiveYears',
    PICK_LISTS: (tableName) =>
      dynamicRoot + `/Metdata/GetPickListValues?tableName=${tableName}`,
    MULTI_PICK_LISTS: (tableName) =>
      dynamicRoot +
      `/Metdata/GetMultiSelectPicklistValues?tableName=${tableName}`,
    SCHOOL_AUTHORITY:
      dynamicRoot + '/SchoolAuthority/GetActiveSchoolAuthorityList',
    CONTACT_BY_SCHOOL_AUTHORITY: (id) =>
      dynamicRoot + `/Contact/GetBySchoolAuthority?schoolAuthorityId=${id}`,
  },
  documents: {
    APPLICATION_DOCUMENTS: (id) =>
      dynamicRoot + `/Document/GetApplicationDocumentList?id=${id}`,
    EOI_DOCUMENTS: (id) =>
      dynamicRoot + `/Document/GetEOIDocumentList?id=${id}`,
    UPLOAD_DOCUMENT: dynamicRoot + '/Document/Upload',
    DELETE_DOCUMENT: (documentID) =>
      dynamicRoot + `/Document/Remove?id=${documentID}`,
  },
  eoi: {
    EOI_APPLICATIONS: dynamicRoot + '/EOI/GetAllByUser',
    EOI_APPLICATION: (id) => dynamicRoot + `/EOI/GetById?id=${id}`,
    UPDATE_EOI: (submitted, id) =>
      dynamicRoot + `/EOI/Update?submitted=${submitted}&id=${id}`,
    CREATE_EOI: (submitted) =>
      dynamicRoot + `/EOI/Create?submitted=${submitted}`,
    CANCEL_EOI: (id) => dynamicRoot + `/EOI/Cancel?id=${id}`,
  },
  app: {
    APPLICATIONS: dynamicRoot + '/Application/GetAllByUser',
    APPLICATION: (id) => dynamicRoot + `/Application/GetById?id=${id}`,
    CANCEL_APPLICATION: (id) => dynamicRoot + `/Application/Cancel?id=${id}`,
    UPDATE_APPLICATION: (id, submitted) =>
      submitted !== null
        ? dynamicRoot + `/Application/Update?id=${id}&submitted=${submitted}`
        : dynamicRoot + `/Application/Update?id=${id}`,
    CONTACT: (id) => dynamicRoot + `/Contact/GetbyId?contactId=${id}`,
  },
});

export const PAGE_TITLES = Object.freeze({
  ADMINISTRATION: 'Administration',
  DASHBOARD: 'Dashboard',
  EXCHANGE: 'Secure Messaging Inbox',
  VIEW_EXCHANGE: 'Secure Message',
  NEW_EXCHANGE: 'New Message',
  ACTIVATE_USER: 'Activate User',
  SCHOOL_EXCHANGE_USERS: 'School User Management',
  DISTRICT_EXCHANGE_USERS: 'District User Management',
  SELECTION: 'Institute Selection',
  LOGIN: 'Login',
  NEW_USER_INVITE: 'New User',
  SCHOOLS: 'Schools',
  SCHOOL_CONTACTS: 'School Contacts',
  SCHOOL_DETAILS: 'School Details',
  DISTRICT_DETAILS: 'District Details',
  DISTRICT_CONTACTS: 'District Contacts',
  SLD: 'Student Level Data (1701)',
  DATA_COLLECTION: 'Data Collections',
});

export const GOV_URL = {
  independentActUrl:
    'https://www2.gov.bc.ca/assets/gov/education/administration/legislation-policy/legislation/schoollaw/independent_school_act_contents.pdf',
  schoolManualLawURL:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/manual-of-school-law',
  establishingSchoolURL:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/independent-schools/establishing-an-independent-school',
  independentSchoolActUrl:
    'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96216_01#Schedule',
  independentSchoolInfoUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/program-management/independent-schools',
  interviewChecklistPDFUrl:
    'https://www2.gov.bc.ca/assets/gov/education/administration/kindergarten-to-grade-12/independent-schools/independent-school-interview-checklist.pdf',
  groupClassificationUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/independent-schools/classification-of-independent-schools#:~:text=%20Classification%20of%20Independent%20Schools%20%201%20Date,be%20operated%20by%20an%20authority.%20The...%20More%20',
  CIS: 'https://fisabc.ca/who-are-we/member-associations/catholic-independent-schools-british-columbia/',
  ISABC: 'https://www.isabc.ca/',
  SCSBC: 'https://scsbc.ca/',
  AMS: 'https://fisabc.ca/who-are-we/member-associations/associate-member-society/',
  ACSIBC:
    'https://fisabc.ca/who-are-we/member-associations/association-christian-schools-international/',
  SDA: 'https://sdabceducation.net/',
  independentSchoolGrants:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/independent-schools/grants-to-independent-schools',
  independentSchoolRegulations:
    'https://www2.gov.bc.ca/assets/gov/education/administration/legislation-policy/legislation/schoollaw/i/bcreg_262_89.pdf',
  societiesActUrl:
    'https://www2.gov.bc.ca/gov/content/employment-business/business/not-for-profit-organizations',
  businessCorporationActUrl:
    'https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies',
  instructionsForIndependentSchoolsUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/program-management/data-collections',
  educationalStandardsOrderUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/independent-schools/educational-standards-for-independent-schools#:~:text=Educational%20programs%20in%20Group%201%2C%202%20and%204,Educational%20Standards%20Order%20Rationale%20or%20purpose%20of%20policy',
  leadTestingUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/independent-schools/testing-lead-content-in-drinking-water',
  homestayGuidelinesUrl:
    'https://www2.gov.bc.ca/assets/gov/education/administration/kindergarten-to-grade-12/internationaleducation/home_stay_guidelines.pdf',
  internationalStudentGraduationCreditPolicyUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/international-student-graduation-credit',
  schoolCompletionCertificatePolicyUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/support/school-completion-certificate-program',
  schoolFeeRefundPolicyUrl:
    'https://www2.gov.bc.ca/assets/gov/education/administration/legislation-policy/independent-schools/school-fee-refund-guidelines.pdf',
  teacherCertificationBranchUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/teach',
  criminalRecordCheckUrl:
    'https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check',
  independentSchoolContractsUrl:
    'http://www.bced.gov.bc.ca/apps/imcl/imclWeb/IndSchool.do?school_category=Independent%20School',
  schoolInfoUpdateUrl:
    'http://www.bced.gov.bc.ca/apps/imcl/imclWeb/SchoolUpdateForm.do',
  teacherCertificationUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/teacher-certification?keyword=teacher&keyword=certification',
  FISAUrl: 'https://fisabc.ca/',
  certificateOfGoodStandingUrl:
    'https://www.corporateonline.gov.bc.ca/WebHelp/overview_cogs.htm',
  BClawsUrl:
    'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/15018_01#section1',
  BCLawBusinessActUrl:
    'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/02057_00',
  munLetterDocx:
    'https://www2.gov.bc.ca/assets/gov/education/administration/kindergarten-to-grade-12/independent-schools/mun_letter.doc',
};

export const NULL_STRING = '-';
