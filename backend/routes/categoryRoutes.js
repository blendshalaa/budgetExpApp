const express=require('express');
const router=express.Router();
const  categoryController=require('../controllers/categoryController');


router.post('/',categoryController.createCategory);

router.get('/',categoryController.getAllCategories);

router.get('/:category_id',categoryController.getCategoryById)

router.put('/:category_id',categoryController.updateCategory);

router.delete('/:category_id',categoryController.deleteCategory);

module.exports=router