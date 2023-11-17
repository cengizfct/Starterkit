// -------------------------------------------- IMPORT FILES START --------------------------------------------------------------
// ## Import Files
import $api from "../Api";
import ResponseChecker from "../Middlewares/ResponseChecker";
import {PUT_SERVERS_UPDATESERVICE,
  POST_SERVERS_CREATESERVICE,
  POST_SERVERS_STARTSERVICE,
  POST_SERVERS_STOPSERVICE,
  POST_SERVERS_RESTARTSERVICE,
  POST_SERVERS_CHECKSTATUS,
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

//--start POST_SERVERS_CREATESERVICE
export const REQUEST_TO_POST_SERVERS_CREATESERVICE = async (data) => {
  const apiResponse = await $api.post(POST_SERVERS_CREATESERVICE(), data);
  const response = await ResponseChecker(responseCheck(), apiResponse);
  return response;
};
//--end POST_SERVERS_CREATESERVICE

//--start POST_SERVERS_STARTSERVICE
export const REQUEST_TO_POST_SERVERS_STARTSERVICE = async (data) => {
  const apiResponse = await $api.post(POST_SERVERS_STARTSERVICE(), data);
  const response = await ResponseChecker(responseCheck(), apiResponse);
  return response;
};
//--end POST_SERVERS_STARTSERVICE

//--start POST_SERVERS_STOPSERVICE
export const REQUEST_TO_POST_SERVERS_STOPSERVICE = async (data) => {
  const apiResponse = await $api.post(POST_SERVERS_STOPSERVICE(), data);
  const response = await ResponseChecker(responseCheck(), apiResponse);
  return response;
};
//--end POST_SERVERS_STOPSERVICE

//--start POST_SERVERS_RESTARTSERVICE
export const REQUEST_TO_POST_SERVERS_RESTARTSERVICE = async (data) => {
  const apiResponse = await $api.post(POST_SERVERS_RESTARTSERVICE(), data);
  const response = await ResponseChecker(responseCheck(), apiResponse);
  return response;
};
//--end POST_SERVERS_RESTARTSERVICE

//--start POST_SERVERS_CREATESERVICE
export const REQUEST_TO_POST_SERVERS_CHECKSTATUS = async (data) => {
  const apiResponse = await $api.post(POST_SERVERS_CHECKSTATUS(), data);
  const response = await ResponseChecker(responseCheck(), apiResponse);
  return response;
};
//--end POST_SERVERS_CHECKSTATUS

//--start PUT_SERVERS_UPDATESERVICE
export const REQUEST_TO_PUT_SERVERS_UPDATESERVICE = async (data) => {
    const apiResponse = await $api.put(PUT_SERVERS_UPDATESERVICE(), data);
    const response = await ResponseChecker(responseCheck(), apiResponse);
    return response;
  };
  //--end PUT_SERVERS_UPDATESERVICE