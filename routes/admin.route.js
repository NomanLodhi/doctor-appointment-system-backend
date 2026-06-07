const app=require('express');
const routes=app.Router();
const {uploadCategory, editCategory, deleteCategory, uploadProduct, deleteProduct, deleteImage, editProduct, getAllorders, getSingleorder, registerDoctor, doctorSchedule, deleteDoctor, editDoctor}=require('../controllers/admin.controller');
const { storage } = require('../config/multer');
const { authorizeRole, authentication_middleware } = require('../middlewares/authentication.middleware');

routes.post('/registerdoctor',authentication_middleware,authorizeRole('Admin'),storage.single('avatar'),registerDoctor);
routes.post('/:doctor_id/availibilty',authentication_middleware,authorizeRole('Admin'),doctorSchedule);
routes.delete('/:doctor_id/delete_doctor',authentication_middleware,authorizeRole('Admin'),deleteDoctor);
routes.patch('/:doctor_id/edit_doctor',authentication_middleware,authorizeRole('Admin'),storage.single('avatar'),editDoctor);
routes.post('/',authentication_middleware,authorizeRole('Admin'),storage.single('image'),uploadCategory);
routes.patch('/edit/:id',authentication_middleware,authorizeRole('Admin'),storage.single('image'),editCategory);
routes.delete('/delete/:id',authorizeRole('Admin'),deleteCategory);
routes.post('/:category_id',authentication_middleware,authorizeRole('Admin'),storage.array('images',5),uploadProduct);
routes.patch('/editproduct/:id',authentication_middleware,authorizeRole('Admin'),storage.array('images',5),editProduct);
routes.delete('/:id',authentication_middleware,authorizeRole('Admin'),deleteProduct);
routes.delete('/deleteimage/:imgName/:id',authentication_middleware,authorizeRole('Admin'),deleteImage);
routes.get('/allorders',authentication_middleware,authorizeRole('Admin'),getAllorders);
routes.get('/singleorder/:id',authentication_middleware,authorizeRole('Admin'),getSingleorder);

module.exports=routes;