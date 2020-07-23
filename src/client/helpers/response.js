// https://github.com/cryptlex/rest-api-response-format
export default class Response {
  static success(data) {
    
    const res={
      success: true,
      data: data
    };
    return res;
  }
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
