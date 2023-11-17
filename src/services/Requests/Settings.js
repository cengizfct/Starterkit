// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import { GET_SPECIFIC_COMPANY_SETTINGS, PUT_COMPANY_SETTINGS,POST_COMPANY_SETTINGS } from "../Endpoints";
// -------------------------------------------- IMPORT FILES ENDED --------------------------------------------------------------

const responseCheckGetSpecificCompany = () => [
  {
      isLogin: true,
      controls: ["OK"],
      message: {
        text: "",
        status: true,
        variant: "success",
      },
    }, // işlem başarılı olduğunda yapılan kontrol
]


//--start GET_SPECIFIC_COMPANY_SETTINGS
export const REQUEST_TO_GET_SPECIFIC_COMPANY_SETTINGS = async (options) => {
  const apiResponse = await $api.get(GET_SPECIFIC_COMPANY_SETTINGS(options));
  const response = await ResponseChecker(
      responseCheckGetSpecificCompany(),
      apiResponse
  );
  return response
}
//--end GET_SPECIFIC_COMPANY_SETTINGS

//--start PUT_SPECIFIC_COMPANY_SETTINGS
export const REQUEST_TO_PUT_SPECIFIC_COMPANY_SETTINGS = async (options, data) => {
  const apiResponse = await $api.put(PUT_COMPANY_SETTINGS(options), data);
  const response = await ResponseChecker(
      responseCheckGetSpecificCompany(),
      apiResponse
  );
  return response
}
//--end PUT_SPECIFIC_COMPANY_SETTINGS
//--start POST_COMPANY_SETTINGS
export const REQUEST_TO_POST_COMPANY_SETTINGS = async (options, data) => {
  const apiResponse = await $api.post(POST_COMPANY_SETTINGS(options), data);
  const response = await ResponseChecker(
      responseCheckGetSpecificCompany(),
      apiResponse
  );
  return response
}
//--end POST_COMPANY_SETTINGS

