import productModel from "../models/productModel.js";

 
//create product   --For Admin
const createProduct= async (req, res, next)=>{
        const product =await productModel.create(req.body);
        res.status(201).json({
            success:true,
            addProduct
        })
}


// Get all products
const getAllProducts=async (req, res)=>{
    const products= await productModel.find()
res.status(200).json({
    success:true,
    products
});
}

// Update product --Admin
const updateProduct = async (req,res,next)=>{
    let product = await productModel.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
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
    }

export default { 
    getAllProducts, 
    createProduct,
    updateProduct
}