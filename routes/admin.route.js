const app=require('express');
const routes=app.Router();
const {uploadCategory, editCategory, deleteCategory, uploadProduct, deleteProduct, deleteImage, editProduct}=require('../controllers/admin.controller');
const { storage } = require('../config/multer');
const { authorizeRole, authentication_middleware } = require('../middlewares/authentication.middleware');

routes.post('/',storage.single('image'),authentication_middleware,authorizeRole('Admin'),uploadCategory);
routes.patch('/edit/:id',storage.single('image'),authentication_middleware,authorizeRole('Admin'),editCategory);
routes.delete('/delete/:id',authorizeRole('Admin'),deleteCategory);
routes.post('/:category_id',storage.array('images',5),authentication_middleware,authorizeRole('Admin'),uploadProduct);
routes.patch('/editproduct/:id',storage.array('images',5),authentication_middleware,authorizeRole('Admin'),editProduct);
routes.delete('/:id',authorizeRole('Admin'),authentication_middleware,deleteProduct);
routes.delete('/deleteimage/:imgName/:id',authorizeRole('Admin'),authentication_middleware,deleteImage);

module.exports=routes;