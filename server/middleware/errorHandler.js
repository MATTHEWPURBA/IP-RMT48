function errorHandler(error, req, res, next) {
    let status = error.status;
    let message = error.message;

    if (message === "Unexpected field") {
      return res.status(400).json({
        message: "Image Key is required",
      });
    }

    switch (error.name) {
      case "InvalidInput":
        status = 400;
        message = "Email/Password is required";
        break;

      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        status = 400;
        message = error.errors.map((el) => el.message);
        break;
  
      case "JsonWebTokenError":
      case "InvalidToken":
        status = 401;
        message = "Unauthenticated";
        break;
  
      case "UserNotFound":
        status = 400;
        message = "Invalid input Email/Password";
        break;
  
      case "FileRequired":
        status = 404;
        message = "File is Required";
        break;
  
      case "CuisineNotFound":
        status = 404;
        message = "Cuisine Not Found";
        break;
  
      case "ForbiddenAuth":
        status = 403;
        message = "Forbidden to access Cuisine";
        break;
  
      case "NotFound":
        status = 404;
        message = "Cuisine Not Found";
        break;
  
      case "NotFoundCategory":
        status = 404;
        message = "Category Not Found";
        break;
  
      case "Category/UserNotFound":
        status = 404;
        message = "Category / User Not Found";
        break;
  
      default:
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  
    res.status(status).json({
      message,
    });
  }
  
  module.exports = errorHandler;
  