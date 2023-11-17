import { GENERATE_URL } from "./helpers/request.js";

// dönen cevaplarda hangi end point kontrol edilsin.
// Backend'den bu bilgi alınmalı.
//! Bu alanın doldurulması zorunludur.
export const RESPONSE_CHECK_ENDPOINT = "message";

const BASE_AUTH = "Admins";
const BASE_COMPANIES = "Companies";
const BASE_SETTINGS = "Settings";
const BASE_CONTENTS = "Contents";
const BASE_ABOUTUS = "Contents";
const BASE_REFERENCES = "Contents";
const BASE_MOREABOUTUS = "Contents";
const BASE_FAQ = "Contents";
const BASE_COMPONENTS = "Components";
const BASE_OTHERSETTING = "CompanySetting";
const BASE_COMPANYSERVICE = "CompanyService"
const BASE_SERVERS = "Servers"

//example
// export const  GET_DEPARTMANT_PROGRAMS_URL = (options) => GENERATE_URL(`${BASE_AUTH}/something`, options);

// 1. LOGIN

// 1.1 USER - KULLANICI GİRİŞ URL'İ - POST
export const LOGIN_URL = (options) =>
  GENERATE_URL(`${BASE_AUTH}/Login`, options);

// 2. COMPONENTS

// 2.10 GET COMPONENTS - COMPONENTS GETIRIR
export const GET_COMPONENTS = (options) =>
  GENERATE_URL(`${BASE_COMPONENTS}`, options);

// 2.11 PUT COMPONENTS - COMPONENT GUNCELLER
export const PUT_COMPONENTS = (options) =>
  GENERATE_URL(`${BASE_COMPONENTS}/:id`, options);
//2.12 POST COMPONENTS - COMPONENTS EKLER
export const POST_COMPONENTS = (options) =>
  GENERATE_URL(`${BASE_COMPONENTS}`, options);
// 3. COMPANIES

// 3.10 GET COMPANIES - FIRMA LİSTESİNİ GETİRİR.
export const GET_COMPANIES_URL = (options) =>
  GENERATE_URL(`${BASE_COMPANIES}`, options);

// 3.11 POST COMPANİES - FIRMA EKLER
export const POST_COMPANY = (options) =>
  GENERATE_URL(`${BASE_COMPANIES}`, options);

// 3.12 GET SPESIFIC COMPANY - FIRMA GETİRİR.
export const GET_SPECIFIC_COMPANY = (options) =>
  GENERATE_URL(`${BASE_COMPANIES}/:id`, options);

// 3.13 PUT SPESIFIC COMPANY - FIRMA GUNCELLER
export const PUT_COMPANY = (options) =>
  GENERATE_URL(`${BASE_COMPANIES}/:id`, options);

//3.20 GET COMPANY SETTINGS - FIRMANIN SETTINGS KISMINI GETIRIR
export const GET_SPECIFIC_COMPANY_SETTINGS = (options) =>
  GENERATE_URL(`${BASE_SETTINGS}/:id`, options);

//3.21 PUT COMPANY SETTINS - FIRMANIN SETTINGSINI GUNCELLER
export const PUT_COMPANY_SETTINGS = (options) =>
  GENERATE_URL(`${BASE_SETTINGS}/:id`, options);

//3.22 PUT COMPANY SETTINS - FIRMANIN SETTINGSINI GUNCELLER
export const POST_COMPANY_SETTINGS = (options) =>
  GENERATE_URL(`${BASE_SETTINGS}`, options);

//3.30 GET COMPANY CONTENTS - CONTENTS GETIRIR
export const GET_SPECIFIC_COMPANY_CONTENTS = (options) =>
  GENERATE_URL(`${BASE_CONTENTS}`, options);

//GET isteğindeki content typeOne...typeFive datalarını getitirken put isteğindeki content sadece typeOne'dır (isim benzerliği)

//3.31 PUT COMPANY CONTENT - CONTENT GUNCELLER
export const PUT_COMPANY_CONTENT = (options) =>
  GENERATE_URL(`${BASE_CONTENTS}/:id`, options);

//3.32 POST COMPANY CONTENT - EGER BELİRLİ BİR CONTENT ÖNCEDEN DOLDURULMAMIŞSA PUT YERİNE ATOLAN POST İSTEĞİ

export const POST_COMPANY_CONTENT = (options) =>
  GENERATE_URL(`${BASE_CONTENTS}`, options);

//3.40 PUT ABOUTUS - ABOUTUS GUNCELLER
export const PUT_COMPANY_ABOUTUS = (options) =>
  GENERATE_URL(`${BASE_ABOUTUS}/:id`, options);

//3.41 POST ABOUTUS - ABOUTUS EKLER
export const POST_COMPANY_ABOUTUS = (options) =>
  GENERATE_URL(`${BASE_ABOUTUS}`, options);

//3.50 PUT REFERENCES - REFERENCES GUNCELLER

export const PUT_COMPANY_REFERENCES = (options) =>
  GENERATE_URL(`${BASE_REFERENCES}/:id`, options);

//3.51 POST REFERENCES - REFERENCES EKLER

export const POST_COMPANY_REFERENCES = (options) =>
  GENERATE_URL(`${BASE_REFERENCES}`, options);

//3.60 PUT MOREABOUTUS - MOREABOUTUS GUNCELLER
export const PUT_COMPANY_MOREABOUTUS = (options) =>
  GENERATE_URL(`${BASE_MOREABOUTUS}/:id`, options);

//3.61 POST MOREABOUTUS - MOREABOUTUS EKLER
export const POST_COMPANY_MOREABOUTUS = (options) =>
  GENERATE_URL(`${BASE_MOREABOUTUS}`, options);

//3.70 PUT FAQ - FAQ GUNCELLER
export const PUT_COMPANY_FAQ = (options) =>
  GENERATE_URL(`${BASE_FAQ}/:id`, options);

//3.71 POST FAQ -  FAQ EKLER
export const POST_COMPANY_FAQ = (options) =>
  GENERATE_URL(`${BASE_FAQ}`, options);

//4 OTHERCOMPANYSETTING (DIFFERENT WİTH 'COMPANY SETTINGS')

//4.1 GET OTHERCOMPANYSETTING - /CompanySetting/{:id} GETIRIR

export const GET_OTHERCOMPANYSETTING = (options) =>
  GENERATE_URL(`${BASE_OTHERSETTING}/:id`, options);

//4.2 PUT OTHERCOMPANYSETTING
export const PUT_OTHERCOMPANYSETTING = (options) =>
  GENERATE_URL(`${BASE_OTHERSETTING}/:companyId`, options);

//4.3 POST OTHERCOMPANYSETTING

export const POST_OTHERCOMPANYSETTING = (options) => 
  GENERATE_URL(`${BASE_OTHERSETTING}`, options);

// 5 COMPANYSERVICE  
export const GET_COMPANYSERVICE_BYCOMPANYID = (options) =>
  GENERATE_URL(`${BASE_COMPANYSERVICE}/ByCompany/:companyId`,options)

//5.1 GET COMPANYSERVICE
export const GET_COMPANYSERVICE = (options) =>
GENERATE_URL(`${BASE_COMPANYSERVICE}/:id`,options)

//5.2 PUT COMPANYSERVICE
export const PUT_COMPANYSERVICE = (options) =>
GENERATE_URL(`${BASE_COMPANYSERVICE}/:id`,options)

//5.3 POST COMPANYSERVICE

export const POST_COMPANYSERVICE = (options) =>
GENERATE_URL(`${BASE_COMPANYSERVICE}`,options)

//6 SERVERS

//6.10 POST SERVERS CREATESERVICE

export const POST_SERVERS_CREATESERVICE = (options) =>
GENERATE_URL(`${BASE_SERVERS}/CreateService`,options)

//6.11 POST SERVERS STARTSERVICE

export const POST_SERVERS_STARTSERVICE = (options) =>
GENERATE_URL(`${BASE_SERVERS}/StartService`,options)

//6.12 POST SERVERS STOPSERVICE

export const POST_SERVERS_STOPSERVICE = (options) =>
GENERATE_URL(`${BASE_SERVERS}/StopService`,options)

//6.13 POST SERVERS RESTRARTSERVICE

export const POST_SERVERS_RESTARTSERVICE = (options) =>
GENERATE_URL(`${BASE_SERVERS}/RestartService`,options)

//6.14 POST SERVERS CHECKSTATUS

export const POST_SERVERS_CHECKSTATUS = (options) =>
GENERATE_URL(`${BASE_SERVERS}/CheckStatus`,options)

//6.15 PUT SERVERS UPDATESERVICE

export const PUT_SERVERS_UPDATESERVICE = (options) =>
GENERATE_URL(`${BASE_SERVERS}/UpdateService`,options)
