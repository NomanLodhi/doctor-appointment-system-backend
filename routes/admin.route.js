const app=require('express');
const routes=app.Router();
const {uploadCategory, editCategory, deleteCategory, uploadProduct, deleteProduct, deleteImage, editProduct}=require('../controllers/admin.controller');
const { storage } = require('../config/multer');

const postCategory=routes.post('/',storage.single('image'),uploadCategory);
const patchCategory=routes.patch('/edit/:id',storage.single('image'),editCategory);
const removeCategory=routes.delete('/delete/:id',deleteCategory);
const addProduct=routes.post('/:category_id',storage.array('images',5),uploadProduct);
const patchProduct=routes.patch('/editproduct/:id',storage.array('images',5),editProduct);
const removeProduct=routes.delete('/:id',deleteProduct);
const removeImage=routes.delete('/deleteimage/:imgName/:id',deleteImage);

module.exports={postCategory,patchCategory,removeCategory,addProduct,removeProduct,patchProduct,removeImage};