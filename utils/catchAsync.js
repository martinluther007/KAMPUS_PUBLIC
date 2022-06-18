// error handler for all async functions
module.exports =  catchAsyncErrors = fn => {
    return (req, res, next) => {
        fn(req,res,next).catch(next)
    }
}