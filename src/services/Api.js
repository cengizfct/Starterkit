import Api from "gurhan/helpers/Api";
import router from "../router/index";
import { BASE_URL } from "./BaseUrl";
import { LOGIN_URL } from "./Endpoints";
const api = new Api({
  baseUrl: BASE_URL, // api adresi,
  bearerToken: true, // bearer token kullanılacaksa true değilse false,
  errorStatus: [400, 401, 403, 404, 500, 502], // uygulama hangi hata code'larını aldığında login'e gönderilir.
  loginRouterName: "login",
  loginUrl: LOGIN_URL(), // login için hangi url'e istek atacağını belirtir.
  vueRouter: router, // uygulamanın route bilgisini gönderir ve içerideki yönlendirmeleri yapar.
});
export default api;
