// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import { GET_COMPANIES_URL, GET_SPECIFIC_COMPANY, PUT_COMPANY ,POST_COMPANY} from "../Endpoints";
// -------------------------------------------- IMPORT FILES ENDED --------------------------------------------------------------

//--start GET COMPANIES
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


export const REQUEST_TO_GET_COMPANIES = async (options) => {
  const apiResponse = await $api.get(GET_COMPANIES_URL(options));
  const response = await ResponseChecker(
    responseCheck(),
    apiResponse
  );
  return response;
};

export const REQUEST_TO_GET_SPECIFIC_COMPANY = async (options) => {
    const apiResponse = await $api.get(GET_SPECIFIC_COMPANY(options));
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
};
//--end GET COMPANIES
//--start POST_COMPANY
export const REQUEST_TO_POST_COMPANY = async (
  options,
  data
) => {
  const apiResponse = await $api.post(POST_COMPANY(options), data);
  const response = await ResponseChecker(
    responseCheck(),
    apiResponse
  );
  return response;
};
//--end POST_COMPANY

//--start PUT_COMPANY
export const REQUEST_TO_PUT_COMPANY = async (
  options,
  data
) => {
  const apiResponse = await $api.put(PUT_COMPANY(options), data);
  const response = await ResponseChecker(
    responseCheck(),
    apiResponse
  );
  return response;
};
//--end PUT_COMPANY
