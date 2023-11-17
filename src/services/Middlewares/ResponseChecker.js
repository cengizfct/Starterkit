// atılan istekten dönülecek cevabı döndüren function'dır.
//  parameters:
//    1. arr: İstekte dönülecek verileri sağlar. RESPONSE_CHECK_ENDPOINT'den gelen key ile dönen cevabın value'su object içindeki controls arrayinden bulunur.Bulunan value ile cevap return eder.
//    2. response: Cevaptan dönen response'dur.

// result kontrolü client kontrolüdür. istek cevapları errorStatus harici dönüşlerde fail olarak gelecektir. Bu durumlarda modal açılır.

import store from "../../state/store";
import i18n from "../../i18n";
import { RESPONSE_CHECK_ENDPOINT } from "../Endpoints";
import Response from "../Response";

export default (arr, response) => {
  if (!ResponseChecker(response)) return IF_FAIL_RESPONSE(response); // check durumu fail gelirse dönülür.
  const message = response[RESPONSE_CHECK_ENDPOINT]; // dönüş kontrol bilgisi endpoint ile alınır.
  const reqResponseObject = arr.find((item) => item.controls.includes(message)); // istekteki cevap bulunur.
  if (reqResponseObject === undefined) return IF_FAIL_RESPONSE(response); // eğer object bulunamazsa.
  return { ...reqResponseObject.message, ...response }; // objenin içerisindeki mesaj objesini dön.
};

//  eğer cevap fail dönerse döndürülecek mesaj.
const IF_FAIL_RESPONSE = (response) => {
  return Response(
    response,
    i18n.t("authMessages.somethingWentWrong"),
    true,
    "danger"
  );
};

const ResponseChecker = (response) => {
  if (response.result === "OK") return true;
  store.dispatch("SET_ACTION_MODAL", {
    isLoading: false,
    status: true,
    message: i18n.t("authMessages.somethingWentWrong"),
    variant: "danger",
    duration: 100000,
  });
  return false;
};
