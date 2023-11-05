import productModel from "../models/productModel.js";
import ErrorHander from "../utils/errorhander.js";
import catchAsynchError from "../middleware/catchAsynchError.js"
import ApiFeatures from "../utils/apiFeatures.js";

  
//create product   --For Admin
const createProduct= catchAsynchError(async (req, res, next)=>{
    const product =await productModel.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


// Get all products
const getAllProducts= catchAsynchError(async (req, res)=>{

    const resultPerPage = 10;
    const apiFeature = new ApiFeatures(productModel.find(),req.query)
    .search().filter().pagination(resultPerPage)
    const products= await apiFeature.query;

res.status(200).json({
    success:true,
    products
});
})

// Update product --Admin
const updateProduct = catchAsynchError(async (req,res,next)=>{
    let product = await productModel.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Prodcut not found",404));

    }
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new:true, 
        runValidators: true,
         useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            product
        })
    })
// Delete prodcut --Admin
        const deleteProduct = catchAsynchError(async (req,res,next)=>{
            const product = await productModel.findById(req.params.id);
            if(!product){
                return next(new ErrorHander("Prodcut not found",404));
            }
            await product.deleteOne();
            res.status(200).json({
                success:true,
                message:"Product delete successfully"
            })
        })
        // Get Single product details
        const getSingleProduct = catchAsynchError(async (req, res, next)=>{
    const product = await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Prodcut not found",404));
    }

    res.status(200).json({
        success:true,
        product
    })

})



export default { 
    getAllProducts, 
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct
}