
const asynchErrorHandler = (asynchErrorHandler)=>(req,res,next)=>{
    Promise.resolve(asynchErrorHandler(req,res,next)).catch(next)
}
export default asynchErrorHandler;