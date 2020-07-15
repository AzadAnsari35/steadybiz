// https://github.com/cryptlex/rest-api-response-format
export default class Response {

  static error(error) {
    const res={
      success: false,
      error: {
        message: error.message,
        code: error.code,
        errors: error.errors
      }
    };
    
    return res;
  }
}
