// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import { PUT_COMPANY_MOREABOUTUS ,POST_COMPANY_MOREABOUTUS} from "../Endpoints";
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
  //--start PUT_SPECIFIC_COMPANY_MOREABOUTUS
export const REQUEST_TO_PUT_SPECIFIC_COMPANY_MOREABOUTUS = async (options, data) => {
    const apiResponse = await $api.put(PUT_COMPANY_MOREABOUTUS(options), data);
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
  }
  //--end PUT_SPECIFIC_COMPANY_MOREABOUTUS

      //--start POST_SPECIFIC_COMPANY_MOREABOUTUS
export const REQUEST_TO_POST_SPECIFIC_COMPANY_MOREABOUTUS = async (options, data) => {
  const apiResponse = await $api.post(POST_COMPANY_MOREABOUTUS(options), data);
  const response = await ResponseChecker(
      responseCheck(),
      apiResponse
  );
  return response
}
//--end POST_SPECIFIC_COMPANY_MOREABOUTUS