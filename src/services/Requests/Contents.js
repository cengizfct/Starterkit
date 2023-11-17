// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import {
  GET_SPECIFIC_COMPANY_CONTENTS,
  PUT_COMPANY_CONTENT,
  POST_COMPANY_CONTENT
} from "../Endpoints";
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

export const REQUEST_TO_GET_SPECIFIC_COMPANY_CONTENTS = async (options) => {
  const apiResponse = await $api.get(GET_SPECIFIC_COMPANY_CONTENTS(options));
  const response = await ResponseChecker(
    responseCheck(),
    apiResponse
  );
  return response;
};

//--start PUT_SPECIFIC_COMPANY_CONTENT
export const REQUEST_TO_PUT_SPECIFIC_COMPANY_CONTENT = async (
  options,
  data
) => {
  const apiResponse = await $api.put(PUT_COMPANY_CONTENT(options), data);
  const response = await ResponseChecker(
    responseCheck(),
    apiResponse
  );
  return response;
};
//--end PUT_SPECIFIC_COMPANY_CONTENT

//--start POST_SPECIFIC_COMPANY_CONTENT
export const REQUEST_TO_POST_SPECIFIC_COMPANY_CONTENT = async (
  options,
  data
) => {
  const apiResponse = await $api.post(POST_COMPANY_CONTENT(options), data);
  const response = await ResponseChecker(responseCheck(), apiResponse);
  return response;
};
//--end POST_SPECIFIC_COMPANY_CONTENT
