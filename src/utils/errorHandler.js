const errorHandler = (error, request, response, next) =>{
     if(error){
        request.status(500).json({
            message:"Sorry , Something is going wrong"
        })
     }
    // Error handling middleware functionality
  }


  module.exports = errorHandler;