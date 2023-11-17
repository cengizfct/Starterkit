// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import { GET_COMPONENTS, PUT_COMPONENTS ,POST_COMPONENTS } from "../Endpoints";
// -------------------------------------------- IMPORT FILES ENDED --------------------------------------------------------------

//--start GET COMPANIES
const responseCheckGetComponents = () => [
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

export const REQUEST_TO_GET_COMPONENTS = async (options) => {
    const apiResponse = await $api.get(GET_COMPONENTS(options));
    const response = await ResponseChecker(
      responseCheckGetComponents(),
      apiResponse
    );
    return response;
  };

        //--start POST_SPECIFIC_COMPANY_COMPONENTS
export const REQUEST_TO_PUT_COMPONENTS = async (options, data) => {
  const apiResponse = await $api.put(PUT_COMPONENTS(options), data);
  const response = await ResponseChecker(
      responseCheckGetComponents(),
      apiResponse
  );
  return response
}
//--end POST_SPECIFIC_COMPANY_COMPONENTS

      //--start POST_SPECIFIC_COMPANY_COMPONENTS
export const REQUEST_TO_POST_COMPONENTS = async (options, data) => {
  const apiResponse = await $api.post(POST_COMPONENTS(options), data);
  const response = await ResponseChecker(
      responseCheckGetComponents(),
      apiResponse
  );
  return response
}
//--end POST_SPECIFIC_COMPANY_COMPONENTS