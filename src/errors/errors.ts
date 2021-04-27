interface ErrorParams {
  status: number;
  message: string;
}

class ErrorApp {
  private readonly status;
  private readonly message;
  
  constructor({status, message}: ErrorParams) {
    this.status = status;
    this.message = message;
  }
}