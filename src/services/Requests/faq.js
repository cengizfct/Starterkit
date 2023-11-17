// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import { PUT_COMPANY_FAQ , POST_COMPANY_FAQ} from "../Endpoints";
// -------------------------------------------- IMPORT FILES ENDED --------------------------------------------------------------
const responseCheck = () => [
    {
      isLogin: true,
      controls: ["OK"],
      message: {
        text: "",
        status: true,
        variant: "success",
      },
    }, // işlem başarılı olduğunda yapılan kontrol
  ];
  //--start PUT_SPECIFIC_COMPANY_FAQ
export const REQUEST_TO_PUT_SPECIFIC_COMPANY_FAQ = async (options, data) => {
    const apiResponse = await $api.put(PUT_COMPANY_FAQ(options), data);
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
  }
  //--end PUT_SPECIFIC_COMPANY_FAQ

        //--start POST_SPECIFIC_COMPANY_FAQ
export const REQUEST_TO_POST_SPECIFIC_COMPANY_FAQ = async (options, data) => {
  const apiResponse = await $api.post(POST_COMPANY_FAQ(options), data);
  const response = await ResponseChecker(
      responseCheck(),
      apiResponse
  );
  return response
}
//--end POST_SPECIFIC_COMPANY_FAQ