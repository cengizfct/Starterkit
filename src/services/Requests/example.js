// -------------------------------------------- REQUEST LIST START --------------------------------------------------------------
// ## Requests
//  1. GET DEPARTMENT LIST
//   1.1.  store/user.js actions: GET_DEPARTMENT_LIST
// -------------------------------------------- REQUEST LIST ENDED --------------------------------------------------------------

// -------------------------------------------- INFO START --------------------------------------------------------------
// ## Info
//--start: Request başlangıç
//--end: Request bitiş

// ## RESPONSE CHECK ARRAY
// controls:
//   Api'den dönen mesajları kontrol eder.
//    hangi key'in kontrol edileceği "@services/Endpoints sayfasında {RESPONSE_CHECK_ENDPOINT} değerinde belirtilmelidir."
//   String array olarak belirtilmelidir.
// message:
//  text:String: Dönen cevabı kullanıcıya metin olarak dönmek için kullanılır.
//  status:Boolean: Dönen cevabı göstermek için kullanılır.
//  variant:String: işlem sonucunun varyatını belirtir.
//    variants:
//      success
//      danger
//      warning
//      info
// -------------------------------------------- INFO ENDED --------------------------------------------------------------

// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../services/Middlewares/ResponseChecker";
import i18n from "../../i18n";
import { GET_DEPARTMANT_PROGRAMS_URL } from "../Endpoints";
// -------------------------------------------- IMPORT FILES ENDED --------------------------------------------------------------

//--start GET

const responceCheckGetList = () => [
  {
    controls: ["OK", "NOTFOUND"], // not found: hiç item dönmezse
    message: {
      text: i18n.t("request.success"),
      status: true,
      variant: "success",
    },
  }, // işlem başarılı olduğunda yapılan kontrol
];

export const REQUEST_GET_DEPARTMENT_PROGRAMS = async (options) => {
  const apiResponse = await $api.get(`${GET_DEPARTMANT_PROGRAMS_URL(options)}`);
  return await ResponseChecker(responceCheckGetList(), apiResponse);
};
//--end  GET

//--start GET :id

// const responseCheckGetIdArray = () => [
//     {
//         controls: ["OK", "NOTFOUND"], // not found: hiç item dönmezse
//         message: {
//             text: i18n.t("request.success"),
//             status: true,
//             variant: "success",
//         },
//     }, // işlem başarılı olduğunda yapılan kontrol
// ]

// export const REQUEST_EMPLOYEE_DETAIL = async (id) => {
//     const apiResponse = await $api.get(`${GET_EMPLOYEE_DETAIL(id)}`);
//     return await ResponseChecker(
//         responseCheckGetIdArray(),
//         apiResponse
//     );

// }
//--end  GET :id

//--start POST

// const responseCheckPostArray = () => [
//     {
//         controls: ["OK"],
//         message: {
//             text: i18n.t("request.success"),
//             status: true,
//             variant: "success",
//         },
//     }, // işlem başarılı olduğunda yapılan kontrol
//     {
//         controls: ["REGISTERED"], // not found: hiç item dönmezse
//         message: {
//             text: i18n.t("request.registered"),
//             status: true,
//             variant: "warning",
//         },
//     }, // daha önce kayıtlı bir çalışan varsa
// ]

// export const REQUEST_POST_NEW_EMPLOYEE = async (form) => {
//     const fd = JSON_TO_FORM_DATA(form)
//     const apiResponse = await $api.post(`${POST_EMPLOYEE_LIST}`, fd);
//     return await ResponseChecker(
//         responseCheckPostArray(),
//         apiResponse
//     );

// }
//--end  POST

//--start UPDATE :id

const responseCheckPutArray = () => [
  {
    controls: ["OK"], // not found: hiç item dönmezse
    message: {
      text: i18n.t("department.getDepartmentList"),
      status: true,
      variant: "success",
    },
  }, // işlem başarılı olduğunda yapılan kontrol
  {
    controls: ["REGISTERED"], // not found: hiç item dönmezse
    message: {
      text: i18n.t("request.registered"),
      status: true,
      variant: "warning",
    },
  }, // daha önce kayıtlı ise
];

export const REQUEST_PUT_DEPARTMENT_PROGRAMS = async (options, form) => {
  const apiResponse = await $api.put(
    `${PUT_DEPARTMANT_PROGRAMS_URL(options)}`,
    form
  );
  return await ResponseChecker(responseCheckPutArray(), apiResponse);
};
//--end  UPDATE :id

//--start UPDATE IMAGE :id

// const responseCheckPutImageArray = () => [
//     {
//         controls: ["OK"], // not found: hiç item dönmezse
//         message: {
//             text: i18n.t("department.getDepartmentList"),
//             status: true,
//             variant: "success",
//         },
//     }, // işlem başarılı olduğunda yapılan kontrol
//     {
//         controls: ["REGISTERED"], // not found: hiç item dönmezse
//         message: {
//             text: i18n.t("request.registered"),
//             status: true,
//             variant: "warning",
//         },
//     }, // daha önce kayıtlı ise
// ]

// export const REQUEST_PUT_EMPLOYEE_IMAGE = async (id, fd) => {
//     const apiResponse = await $api.put(`${PUT_EMPLOYEE_IMAGE_URL(id)}`, fd);
//     return await ResponseChecker(
//         responseCheckPutImageArray(),
//         apiResponse
//     );

// }
//--end  UPDATE IMAGE :id

//--start DELETE :id

// const responseCheckDeleteArray = () => [
//     {
//         controls: ["OK"], // not found: hiç item dönmezse
//         message: {
//             text: i18n.t("department.getDepartmentList"),
//             status: true,
//             variant: "success",
//         },
//     }, // işlem başarılı olduğunda yapılan kontrol
//     {
//         controls: ["REGISTERED"], // not found: hiç item dönmezse
//         message: {
//             text: i18n.t("request.registered"),
//             status: true,
//             variant: "warning",
//         },
//     }, // daha önce kayıtlı ise
// ]

// export const REQUEST_DELETE_EMPLOYEE = async (id) => {
//     const apiResponse = await $api.delete(`${DELETE_EMPLOYEE_URL(id)}`);
//     return await ResponseChecker(
//         responseCheckDeleteArray(),
//         apiResponse
//     );

// }
//--end  DELETE :id
