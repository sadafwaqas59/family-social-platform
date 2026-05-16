const errorHandler = (err,req,res,next) => {

  console.log(err);
  // show error in terminal

  res.status(500).json({

    success: false,

    message: err.message
  });
  // send error response
};

export default errorHandler;
// export middleware