import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  const errors = err.errors;

  if (err.name === "ZodError") {
    res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: errors.map((item: any) => {
        const { code, expected, message, path } = item;
        return { code, expected, message, name: path[0] };
      }),
      //   errrrr: errors,
    });
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorHandler;
