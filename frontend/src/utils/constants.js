const baseRoot = '/api';
const authRoot = baseRoot + '/auth';
const edxRoot = baseRoot + '/edx';
const schoolRoot = baseRoot + '/schools';
const districtRoot = baseRoot + '/districts';
const instituteRoot = baseRoot + '/institute';
const studentRequestRoot = baseRoot + '/student';
const districtRequestRoot = baseRoot + '/institute/districts';
const schoolRequestRoot = baseRoot + '/institute/schools';
const sldRoot = baseRoot + '/sld';

let object;

object = {
  LOGIN: authRoot + '/login',
  DASHBOARD: '/',
  LOGIN_BCEID: authRoot + '/logout?loginBceid=true',
  LOGOUT: authRoot + '/logout',
  SESSION_EXPIRED: authRoot + '/logout?sessionExpired=true',
  LOGIN_FAILED: authRoot + '/logout?loginError=true',
  REFRESH: authRoot + '/refresh',
  TOKEN: authRoot + '/token',
  SESSION_REMAINING_TIME: authRoot + '/user-session-remaining-time',
  INSTITUTE_SELECTION: '/institute-selection',
  EOI: '/expression-of-interest',
  NEW_EOI: '/expression-of-interest/new',
  APPLICATION: '/school-application',
  PROFILE: '/user-profile',
};
//Authentication endpoints
export const AuthRoutes = Object.freeze(object);

export const ApiRoutes = Object.freeze({
  USER: baseRoot + '/user',
  CONFIG: baseRoot + '/config',
  school: {
    BASE_URL: schoolRoot,
    SCHOOLS_LAST_UPDATED_DATE: schoolRoot + '/lastUpdated',
    ALL_SCHOOLS_BY_CRIT: schoolRoot + '/allSchools',
    SCHOOL_DETAILS_BY_ID: schoolRoot + '/schoolDetailsById',
    UPDATE_SCHOOL_CONTACT_URL: schoolRoot + '/update-contact',
  },
  sld: {
    BASE_URL: sldRoot,
    SLD_COLLECTION_BY_SCHOOL_ID: sldRoot + '/getCollectionBySchoolId',
  },
  district: {
    BASE_URL: districtRoot,
    CREATE_DISTRICT_CONTACT_URL: `${districtRoot}/createContact`,
    UPDATE_DISTRICT_CONTACT_URL: districtRoot + '/update-contact',
  },
  institute: {
    BASE_URL: instituteRoot,
    DISTRICT: instituteRoot + '/districts',
    PROVINCE_CODES_URL: instituteRoot + '/province-codes',
    COUNTRY_CODES_URL: instituteRoot + '/country-codes',
    FACILITY_TYPES_URL: instituteRoot + '/facility-types',
    SCHOOL_CATEGORY_TYPES_URL: instituteRoot + '/school-category-types',
    SCHOOL_CONTACT_TYPE_CODES: instituteRoot + '/school-contact-types',
    SCHOOL_ORGANIZATION_TYPES_URL: instituteRoot + '/school-organization-types',
    SCHOOL_REPORTING_REQUIREMENT_TYPES_URL:
      instituteRoot + '/reporting-requirement-codes',
    SCHOOL_NEIGHBORHOOD_LEARNING_TYPES_URL:
      instituteRoot + '/school-neighborhood-learning-types',
    SCHOOL_GRADE_TYPES_URL: instituteRoot + '/school-grade-types',
    DISTRICT_CONTACT_TYPE_CODES: instituteRoot + '/district-contact-types',
    AUTHORITY_DATA_URL: instituteRoot + '/authority',
  },
  DISTRICT_DATA_URL: districtRequestRoot,
  SCHOOL_DATA_URL: schoolRequestRoot,
  edx: {
    EXCHANGE: edxRoot + '/exchanges',
    EXCHANGE_URL: edxRoot + '/exchange',
    EXCHANGE_COUNT_URL: edxRoot + '/exchange/count',
    DOCUMENT_TYPES_URL: edxRoot + '/document-types',
    FILE_REQUIREMENTS_URL: edxRoot + '/file-requirements',
    STATUSES_URL: edxRoot + '/exchange/statuses',
    MINISTRY_TEAM_URL: edxRoot + '/users/ministry-teams',
    USERS_URL: edxRoot + '/users',
    EXCHANGE_ACCESS_ROLES_URL: edxRoot + '/users/roles',
    EXCHANGE_REMOVE_USER: edxRoot + '/users/remove',
    EXCHANGE_RELINK_USER: edxRoot + '/users/relink',
    INSTITUTE_SELECTION_URL: edxRoot + '/institute-selection',
    USER_ACTIVATION: edxRoot + '/user-activation',
    UPDATE_ACTIVATION_URL: edxRoot + '/activation-code/url',
    NEW_SCHOOL_USER_ACTIVATION_INVITE:
      edxRoot + '/school-user-activation-invite',
    NEW_DISTRICT_USER_ACTIVATION_INVITE:
      edxRoot + '/district-user-activation-invite',
    PRIMARY_ACTIVATION_CODE_URL: edxRoot + '/users/activation-code/primary',
  },
  studentRequest: {
    ROOT_ENDPOINT: studentRequestRoot,
    SEARCH_URL: studentRequestRoot + '/',
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

export const MINISTRY_NAME = 'Ministry of Education and Child Care';

export const EDX_SAGA_REQUEST_DELAY_MILLISECONDS = 2000;

export const EOI_PAYLOAD = {
  iosas_expressionofinterestid: String,
  iosas_authorityhead: {},
  iosas_authoritycontact: {},
  iosas_contact: {},
  iosas_edu_schoolauthority: String,
  iosas_edu_school: String,
  iosas_authorityaddressline1: String,
  iosas_authorityaddressline2: String,
  iosas_authoritycity: String,
  iosas_authoritycountry: String,
  iosas_authorityheadfirstname: String,
  iosas_authorityheadname: String,
  iosas_authorityheadyominame: String,
  iosas_authoritypostalcode: String,
  iosas_authorityprovince: String,
  iosas_authoritycontactname: String,
  iosas_authoritycontactyominame: String,
  iosas_contactname: String,
  iosas_contactyominame: String,
  iosas_designatedcontactfirstname: String,
  iosas_designatedcontactsameasauthorityhead: Boolean,
  iosas_edu_schoolauthorityname: String,
  _iosas_edu_year_value: String,
  iosas_eionumber: String,
  iosas_existingauthority: Boolean,
  iosas_existingcontact: Boolean,
  iosas_existinghead: Boolean,
  iosas_groupclassification: String,
  iosas_name: String,
  iosas_notes: String,
  iosas_proposedschoolname: String,
  iosas_schooladdressline1: String,
  iosas_schooladdressline2: String,
  iosas_schoolcity: String,
  iosas_schoolcountry: String,
  iosas_schoolpostalcode: String,
  iosas_schoolprovince: String,
  iosas_schoolauthoritycontactemail: String,
  iosas_schoolauthoritycontactname: String,
  ioas_schoolauthoritycontactphone: String,
  iosas_schoolauthorityheademail: String,
  iosas_schoolauthorityheadname: String,
  iosas_schoolauthorityheadphone: String,
  iosas_schoolauthorityname: String,
  iosas_seekgrouponeclassification: Boolean,
  iosas_startgrade: String,
  iosas_endgrade: String,
  iosas_submissiondate: String,
  iosas_submissionmethod: String,
  iosas_website: String,
};

export const APPLICATION_PAYLOAD = {
  iosas_applicationid: String,
  iosas_edu_school: String,
  iosas_addressline1: String,
  iosas_addressline2: String,
  iosas_startgrade: String,
  iosas_endgrade: String,
  iosas_postalcode: String,
  iosas_province: String,
  iosas_phone: String,
  iosas_primaryschooltotal: Boolean,
  iosas_privacypolicy: Boolean,
  iosas_numberofstudentsg1: Number,
  iosas_numberofstudentsg2: Number,
  iosas_numberofstudentsg3: Number,
  iosas_numberofstudentsg4: Number,
  iosas_numberofstudentsg5: Number,
  iosas_numberofstudentsg6: Number,
  iosas_numberofstudentsg7: Number,
  iosas_numberofstudentsg8: Number,
  iosas_numberofstudentsg9: Number,
  iosas_numberofstudentsg10: Number,
  iosas_numberofstudentsg11: Number,
  iosas_numberofstudentsg12: Number,
  iosas_numberofstudentskindergarten: Number,
  iosas_willhavecompletioncertificatepolicy: String,
  iosas_willsaoperateonnonprofitbasis: String,
};

export const GRADE_OPTIONS = [
  'Kindergarten',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

export const YEAR_OPTIONS = [
  '2020/21 SY',
  '2021/22 SY',
  '2022/23 SY',
  '2023/24 SY',
  '2023/24 SY',
  '2025/26 SY',
  '2026/27 SY',
  '2027/28 SY',
  '2028/29 SY',
  '2029/30 SY',
];

export const GOV_URL = {
  independentActUrl:
    'https://www2.gov.bc.ca/assets/gov/education/administration/legislation-policy/legislation/schoollaw/independent_school_act_contents.pdf',
  schoolManualLawURL:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/manual-of-school-law',
  establishingSchoolURL:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/independent-schools/establishing-an-independent-school',
  bceidRegister: 'https://www.bceid.ca/register/',
  independentSchoolActUrl:
    'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96216_01',
  independentSchoolInfoUrl:
    'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/program-management/independent-schools',
  interviewChecklistPDFUrl:
    'https://www2.gov.bc.ca/assets/gov/education/administration/kindergarten-to-grade-12/independent-schools/independent-school-interview-checklist.pdf',
};

export const NULL_STRING = '-';
