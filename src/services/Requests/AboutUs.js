// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import { PUT_COMPANY_ABOUTUS , POST_COMPANY_ABOUTUS} from "../Endpoints";
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
  //--start PUT_SPECIFIC_COMPANY_ABOUTUS
export const REQUEST_TO_PUT_SPECIFIC_COMPANY_ABOUTUS = async (options, data) => {
    const apiResponse = await $api.put(PUT_COMPANY_ABOUTUS(options), data);
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
  }
  //--end PUT_SPECIFIC_COMPANY_ABOUTUS

    //--start POST_SPECIFIC_COMPANY_ABOUTUS
export const REQUEST_TO_POST_SPECIFIC_COMPANY_ABOUTUS = async (options, data) => {
  const apiResponse = await $api.post(POST_COMPANY_ABOUTUS(options), data);
  const response = await ResponseChecker(
      responseCheck(),
      apiResponse
  );
  return response
}
//--end POST_SPECIFIC_COMPANY_ABOUTUS

  