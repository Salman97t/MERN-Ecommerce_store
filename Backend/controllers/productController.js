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
export default { 
    getAllProducts, 
    createProduct
}