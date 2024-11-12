const Category=require('../models/Category');

const createCategory=async(req,res)=>{
    try{
        const newCategory=await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch(error){
        console.error("error creating category",error);
        res.status(500).json({message:"error creating category",error})
    }
};


const getAllCategories=async(req,res)=>{

    try{
      const categories=await Category.getAll();
      res.status(201).json(categories);
    }catch(error){
        console.error("error getting categories",error);
        res.status(500).json({message:"error getting category",error})
    }
};


const getCategoryById = async (req, res) => {
    const { category_id } = req.params;
    try {
        const category = await Category.getById(category_id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Error retrieving category:", error);
        res.status(500).json({ message: "Error retrieving category", error });
    }
};



const updateCategory = async (req, res) => {
    const { category_id } = req.params;
    const { category_name, description } = req.body;
  
    try {
      const updatedCategory = await Category.update(category_id, { category_name, description });
  
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Error updating category", error });
    }
  };
const deleteCategory = async (req, res) => {
    const { category_id } = req.params;
    try {
        const deletedCategory = await Category.delete(category_id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error deleting category", error });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};