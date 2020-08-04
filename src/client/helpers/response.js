// https://github.com/cryptlex/rest-api-response-format
export default class Response {
  static success(data) {
    
    const res={
      status: true,
      data: data
    };
    return res;
  }
  static error(error) {
    const res={
      status: false,
      error: {
        message: error.message,
        code: error.code,
        errors: error.errors
      }
    };
    
    return res;
  }
}
