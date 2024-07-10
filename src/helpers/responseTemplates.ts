import { Response } from "express";
const defaultMessages: { [statusCode: number]: string } = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

interface SuccessResponse {
  status: "success";
  statusCode: number;
  message: string;
  data?: any;
}

interface ErrorResponse {
  status: "error";
  statusCode: number;
  message: string;
  error?: any;
}

export class ResponseTemplates {
  public static success(
    message: string | null,
    statusCode: number = 200,
    response: Response,
    data?: any
  ): Response {
    const defaultMessage = defaultMessages[statusCode] || "Success";
    const successRes: SuccessResponse = {
      status: "success",
      statusCode,
      message: message || defaultMessage,
      data,
    };
    return response.status(statusCode).json(successRes);
  }

  public static error(
    message: string | null,
    statusCode: number = 500,
    response: Response,
    error?: any
  ): Response {
    const defaultMessage = defaultMessages[statusCode] || "Error";
    const errorRes: ErrorResponse = {
      status: "error",
      statusCode,
      message: message || defaultMessage,
      error,
    };
    return response.status(statusCode).json(errorRes);
  }
}
