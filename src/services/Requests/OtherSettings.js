// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import {
  GET_OTHERCOMPANYSETTING,
  POST_OTHERCOMPANYSETTING,
  PUT_OTHERCOMPANYSETTING,
} from "../Endpoints";
// -------------------------------------------- IMPORT FILES ENDED --------------------------------------------------------------

const responseCheckOtherCompanySetting = () => [
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

//--start GET_OTHERCOMPANYSETTING
export const REQUEST_TO_GET_OTHERCOMPANYSETTING = async (options) => {
  const apiResponse = await $api.get(GET_OTHERCOMPANYSETTING(options));
  const response = await ResponseChecker(
    responseCheckOtherCompanySetting(),
    apiResponse
  );
  return response;
};
//--end GET_OTHERCOMPANYSETTING

//--start PUT_OTHERCOMPANYSETTING
export const REQUEST_TO_PUT_OTHERCOMPANYSETTING = async (options, data) => {
  const apiResponse = await $api.put(PUT_OTHERCOMPANYSETTING(options), data);
  const response = await ResponseChecker(
    responseCheckOtherCompanySetting(),
    apiResponse
  );
  return response;
};
//--end PUT_OTHERCOMPANYSETTING

//--start POST_OTHERCOMPANYSETTING
export const REQUEST_TO_POST_OTHERCOMPANYSETTING = async (data) => {
  const apiResponse = await $api.post(POST_OTHERCOMPANYSETTING(), data);
  const response = await ResponseChecker(
    responseCheckOtherCompanySetting(),
    apiResponse
  );
  return response;
};
//--end POST_OTHERCOMPANYSETTING
