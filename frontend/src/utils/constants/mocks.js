export const SCHOOL_APPLICATION_MOCK = [
  {
    // General
    iosas_applicationid: 'GUID',
    statuscode: 'Interim Certification',
    iosas_applicationnumber: 'APP-1011',
    iosas_nopromotionofinappropriatedoctrines: true,
    iosas_willcomplywithenactmentsofbc: false,
    iosas_authoritycomplieswithisaregulations: false,
    iosas_approvaldate: '2023-07-08T00:05:27Z',
    iosas_submissiondate: '2023-07-08T00:05:27Z',

    // School Information - GET CONFIRMATION
    iosas_proposedschoolname: 'iosas_proposedschoolname',
    iosas_startgrade: 100000000,
    iosas_endgrade: 100000005,
    iosas_overview: 'iosas_overview', // brief overview?
    iosas_addressline1: 'iosas_addressline1',
    iosas_addressline2: 'iosas_addressline2',
    iosas_postalcode: 'iosas_postalcode',
    iosas_country: 'iosas_country',
    iosas_province: 'iosas_province',
    iosas_city: 'iosas_city',
    iosas_mailingaddresscity: 'iosas_mailingaddresscity',
    iosas_mailingaddressprovince: 'iosas_mailingaddressprovince',
    iosas_mailingaddress2: 'iosas_mailingaddress2',
    iosas_mailingaddress1: 'iosas_mailingaddress1',
    iosas_mailingaddresscountry: 'iosas_mailingaddresscountry',
    iosas_mailingaddresspostalcode: 'iosas_mailingaddresspostalcode',
    iosas_website: 'iosas_website',
    iosas_phone: 'iosas_phone',
    iosas_phonenumber: 'iosas_phonenumber', // School Phone
    iosas_groupclassification: null,
    iosas_seekgroup1classification: false,
    iosas_schoolaffiliation: 'iosas_schoolaffiliation',

    // School Authority  - CONFIRMED
    iosas_preexistingauthorityhead: true,
    iosas_preexistingauthority: true,
    edu_incorporationtype: [], // if !iosas_existingauthority
    iosas_incorporationtype: [], // if iosas_existingauthority
    iosas_schoolauthority: 'iosas_schoolauthority',
    iosas_authorityheadphone: 'iosas_authorityheadphone',
    iosas_authorityheadfirstname: 'iosas_authorityheadfirstname',
    iosas_authorityheadlastname: 'iosas_authorityheadlastname',
    iosas_authorityaddressline1: 'iosas_authorityaddressline1',
    iosas_authorityheademail: 'iosas_authorityheademail',
    iosas_officialregistrationnumber: 'iosas_officialregistrationnumber',
    iosas_dateoflastannualreport: 'iosas_dateoflastannualreport',
    iosas_howwillyouexercisegovernanceduties:
      'iosas_howwillyouexercisegovernanceduties',
    iosas_proponentspreviouslyinvolvedinisbc: false,
    iosas_detailsofinvolvement: null,

    iosas_confirmationofwatertesting: false,
    statecode: 0,
    iosas_authorityprovince: 'BC',
    _iosas_edu_year_value: '2023/24 SY',
    iosas_authoritycity: 'Richmond',
    iosas_studentsafetypolicies: false,
    iosas_authoritycountry: 'CANADA',
    iosas_authoritypostalcode: 'V6X1N4',
    iosas_designatedcontactsameasauthorityhead: false,
    iosas_authoritycode: null,
    iosas_authoritywebsite: null,
    _iosas_edu_school_value: null,
    iosas_authorityaddressline2: null,
    iosas_completedfreetuitionrefundpolicy: false,
    iosas_feerefundpolicyconsistentwithguidelines: false,

    // Group Certification - CONFIRMED
    iosas_familiarwithgrantstoispolicyifseekingfunds: false,
    iosas_willsaoperateonnonprofitbasis: false,
    iosas_hasthesaobtainedirrevocableloc: false,
    iosas_hassaobtaineddocumentsregardingbondingreqs: null,
    iosas_hastheauthoritydevelopedarefundpolicy: null,

    // school Facility - CONFIRMED
    iosas_nameofmunicipalityorregionaldistrict:
      'iosas_nameofmunicipalityorregionaldistrict',
    iosas_whatstepsareyoutakingtoacquirethefacility:
      'iosas_whatstepsareyoutakingtoacquirethefacility',
    iosas_cantheauthorityconfirmtestingvspolicy: false, // NOT IN USE?
    iosas_confirmationofleadtestingfordrinkingwater: false, // CONFIRMED
    iosas_studentshousedinadormitorysetting: true,
    iosas_studentshousedinahomesetting: false,
    iosas_hastheauthoritycontactedlocalgovernment: false,

    // Scool Policies - CONFIRMED
    iosas_anaphylaxispolicyandprocedures: false,
    iosas_appealsprocesspolicy: false,
    iosas_boardingsafetyandsupervisionpolicy: null,
    iosas_childabusepreventionpolicy: false,
    iosas_studentconductstandardsdisciplinepolicy: false,
    iosas_emergencydrillspolicyproceduresresponse: false,
    iosas_policyincludessectionsdealingwithemergencies: false,
    iosas_otheremergencydrillsimplemeneted: false,
    iosas_policyincludepermanentschoolclosure: false,
    iosas_graduationprogramcreditspolicyifapplicable: null,
    iosas_harassmentandbullyingpreventionpolicy: false,
    iosas_homeschoolingpolicyifapplicable: null,
    iosas_internationalstudentpoliciesifapplicable: null,
    iosas_complywithhomestayguidelines: null,
    iosas_willapplyforstudentgraduationcreditpolicy: null,
    iosas_privacypolicy: false,
    iosas_specialeducationpolicy: null,
    iosas_willdevelopbudgetforexpenditurebasedoniep: false,
    iosas_learningassistanceforspecialstudents: false,
    iosas_willhavecompletioncertificatepolicy: false,
    iosas_educationalresourcepolicy: false,
    iosas_testingdrinkingwaterforleadcontentpolicy: true,
    iosas_schoolclosurepolicy: false,
    iosas_studentrecordspolicy: false,
    iosas_studentsupervisionpolicies: false,
    iosas_feerefundpolicyconsistentwithguidelines: false, // CONFIRM - given
    iosas_teacherandprincipalevaluationpolicy: false,
    iosas_ifnotoanyschoolpolicyexplainwhy:
      'iosas_ifnotoanyschoolpolicyexplainwhy',

    // student Enrolment - CONFIRMED
    iosas_numberofstudentskindergarten: 1,
    iosas_numberofstudentsg1: 2,
    iosas_numberofstudentsg2: 3,
    iosas_numberofstudentsg3: 0,
    iosas_numberofstudentsg4: 0,
    iosas_numberofstudentsg5: 0,
    iosas_numberofstudentsg6: 0,
    iosas_numberofstudentsg7: 0,
    iosas_primaryschooltotal: 6,
    iosas_numberofstudentsg8: 0,
    iosas_numberofstudentsg9: 0,
    iosas_numberofstudentsg10: 0,
    iosas_numberofstudentsg11: 0,
    iosas_numberofstudentsg12: 0,
    iosas_highschooltotal: 0,
    iosas_totalenrolment: 0,

    // school semester - CONFIRMED
    iosas_semestertype: [],
    iosas_halfdaykindergartenproposedhoursperday: 5,
    iosas_halfdaykindergartenproposedhoursperyear: 5,
    iosas_halfdaykindergartenproposeddaysinsession: 10,
    iosas_fulldaykindergartenproposedhoursperyear: 5,
    iosas_fulldaykindergartenproposeddaysinsession: 5,
    iosas_fulldaykindergartenproposedhoursperday: 3,
    iosas_grades112proposedhoursperyear: 5,
    iosas_grades112proposeddaysinsession: 5,
    iosas_grades112proposedhoursperday: 5,

    // Educational Program - CONFIRMED
    iosas_describefamiliaritywithbcscurriculum:
      'iosas_describefamiliaritywithbcscurriculum',
    iosas_additionalprograms: [],
    iosas_additionalprogramsother: 'iosas_additionalprogramsother',

    // teacher certification - CONFIRMED
    iosas_numberofteachers: 'iosas_numberofteachers',
    iosas_awareofcertificationrequirements: true,
    iosas_awareoftherequirementsforcrchecks: false,

    // Submission - CONFIRMED
    iosas_completesetofpoliciesoutlinedinchecklist: false,
    iosas_businessplanincludingfinancialinformation: false,
  },
];
