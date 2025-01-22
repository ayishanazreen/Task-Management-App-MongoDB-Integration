const errorHandler=((error,req,res,next) =>{
        const status=error.status || 500;
        let message=error.message ||"Internal server error"
        if (status===400){
            message=`${JSON.stringify(error.fields.body)} : this is not accepted, Require ${error.fields.required}`
        }
        res.status(status).json({
            message:message
        })

    })
module.exports={errorHandler}