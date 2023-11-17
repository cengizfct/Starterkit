// -------------------------------------------- REQUEST LIST START --------------------------------------------------------------
// ## Requests
//  1. LOGIN
//   1.1.  store/user.js actions: TO_LOGIN
//  2. FORGET PASSWORD
//   2.1.  store/user.js actions: TO_FORGET_PASSWORD
// -------------------------------------------- REQUEST LIST ENDED --------------------------------------------------------------

// -------------------------------------------- INFO START --------------------------------------------------------------
// ## Info
//--start: Request başlangıç
//--end: Request bitiş

// ## RESPONSE CHECK ARRAY
// Login'in başarılı olarak döndürüldüğü isteğe isLogin true ekleyin.
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
import ResponseChecker from "../Middlewares/ResponseChecker";
import i18n from "../../i18n";
// -------------------------------------------- IMPORT FILES ENDED --------------------------------------------------------------
//--start 1.LOGIN
// ## Login Request
// responseCheckLoginArray: Login'in başarılı olarak döndürüldüğü isteğe isLogin true ekleyin.
const responseCheckLoginArray = () => [
  {
    isLogin: true,
    controls: ["OK"],
    message: {
      text: i18n.t("login.loginIsSuccess"),
      status: true,
      variant: "success",
    },
  }, // işlem başarılı olduğunda yapılan kontrol
  {
    isLogin: false,
    controls: ["NOTFOUND", "ERRORLOGIN"],
    message: {
      text: i18n.t("login.usernameOrPasswordIsWrong"),
      status: true,
      variant: "danger",
    },
  }, // şifre veya email doğru değil ise.
];

//    sisteme giriş yapan request.
//  await REQUEST_TO_LOGIN({email: "123131", "password": 1231312)
export const REQUEST_TO_LOGIN = async (form) => {
  $api.token = ""; // token sıfırlanır.
  const apiResponse = await $api.login(form);
  const response = await ResponseChecker(
    responseCheckLoginArray(),
    apiResponse
  );
  // Proje içinde kullanıcılacak token'ın yolunu aşağıya ekleyin.
  if (response.isLogin) $api.token = response.token;
  return response;
};

//--end LOGIN