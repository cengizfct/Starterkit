// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import { PUT_COMPANY_REFERENCES , POST_COMPANY_REFERENCES } from "../Endpoints";
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
    //--start PUT_SPECIFIC_COMPANY_REFERENCES
export const REQUEST_TO_PUT_SPECIFIC_COMPANY_REFERENCES = async (options, data) => {
    const apiResponse = await $api.put(PUT_COMPANY_REFERENCES(options), data);
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
  }
  //--end PUT_SPECIFIC_COMPANY_REFERENCES

      //--start POST_SPECIFIC_COMPANY_REFERENCES
export const REQUEST_TO_POST_SPECIFIC_COMPANY_REFERENCES = async (options, data) => {
  const apiResponse = await $api.post(POST_COMPANY_REFERENCES(options), data);
  const response = await ResponseChecker(
      responseCheck(),
      apiResponse
  );
  return response
}
//--end POST_SPECIFIC_COMPANY_REFERENCES