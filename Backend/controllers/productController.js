import productModel from "../models/productModel.js";
import ErrorHander from "../utils/errorhander.js";
import catchAsynchError from "../middleware/catchAsynchError.js"
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";

  
//create product   --For Admin
const createProduct= catchAsynchError(async (req, res, next)=>{


  let images = [];
  if(typeof req.body.images=== "string"){
    images.push(req.body.images)
  }
  else{
    images = req.body.images;
  }
  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i],{
      folder:"products"
    })
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }
    req.body.images = imagesLink; 
    req.body.user = req.user.id;
    
    const product =await productModel.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


// Get all products
const getAllProducts= catchAsynchError(async (req, res,next)=>{
    const resultPerPage = 8;
    const productsCount = await productModel.countDocuments();
    const apiFeature = new ApiFeatures(productModel.find(),req.query)
    .search().filter()

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);

    products= await apiFeature.query;

res.status(200).json({
    success:true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount
});
})

// Update product --Admin
const updateProduct = catchAsynchError(async (req,res,next)=>{
    let product = await productModel.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Prodcut not found",404));
    }
//  Images start here
      let images = [];
      if(typeof req.body.images=== "string"){
        images.push(req.body.images)
      }
      else{
        images = req.body.images;
      }

      if(images !== undefined ){
        // Deleting Images from cloudinary

        for (let i = 0; i < product.images.length; i++) {
              
          await cloudinary.v2.uploader.destroy(product.images[i].public_id) 
       }
       const imagesLink = [];
      for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i],{
      folder:"products"
    })
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }
  req.body.images = imagesLink;
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

// Deleting Images from cloudinary

            for (let i = 0; i < product.images.length; i++) {
              
               await cloudinary.v2.uploader.destroy(product.images[i].public_id)
              
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
        product,
    })

})
// Create or Update review
const createProductReview = catchAsynchError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await productModel.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

  // Get All Reviews of a product
const getProductReviews = catchAsynchError(async (req, res, next) => {
    const product = await productModel.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  // Delete Review
    const deleteReview = catchAsynchError(async (req, res, next) => {
    const product = await productModel.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await productModel.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });

  // Get all products (Admin)
const getAdminProducts= catchAsynchError(async (req, res,next)=>{
const products = await productModel.find();
res.status(200).json({
  success: true,
  products
});
})



export default { 
    getAllProducts, 
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts
}