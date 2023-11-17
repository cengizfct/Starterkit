// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import {GET_COMPANYSERVICE_BYCOMPANYID,GET_COMPANYSERVICE,PUT_COMPANYSERVICE, POST_COMPANYSERVICE } from "../Endpoints";
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
       //--start GET_COMPANYSERVICE_BYCOMPANYID
export const REQUEST_TO_GET_COMPANYSERVICE_BYCOMPANYID = async (data) => {
  const apiResponse = await $api.get(GET_COMPANYSERVICE_BYCOMPANYID(data),);
  const response = await ResponseChecker(
      responseCheck(),
      apiResponse
  );
  return response
}
//--end GET_COMPANYSERVICE
     //--start GET_COMPANYSERVICE
export const REQUEST_TO_GET_COMPANYSERVICE = async (data) => {
    const apiResponse = await $api.get(GET_COMPANYSERVICE(data),);
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
  }
  //--end GET_COMPANYSERVICE

      //--start PUT_COMPANYSERVICE
export const REQUEST_TO_PUT_COMPANYSERVICE = async (options, data) => {
    const apiResponse = await $api.put(PUT_COMPANYSERVICE(options), data);
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
  }
  //--end PUT_COMPANYSERVICE

     //--start POST_COMPANYSERVICE
export const REQUEST_TO_POST_COMPANYSERVICE = async (data) => {
    const apiResponse = await $api.post(POST_COMPANYSERVICE(),data);
    const response = await ResponseChecker(
        responseCheck(),
        apiResponse
    );
    return response
  }
  //--end POST_COMPANYSERVICE