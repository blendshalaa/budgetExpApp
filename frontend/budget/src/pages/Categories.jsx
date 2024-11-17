import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategories, setNewCategories] = useState({
    category_name: "",
    description: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentCategories, setCurrentCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/categories', newCategories);
      setCategories([...categories, response.data]);
      setNewCategories({
        category_name: "",
        description: ""
      });
    } catch (error) {
      console.error("Error posting category", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCategories({
      ...newCategories,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = (category) => {
    setEditMode(true);
    setCurrentCategories(category);
    setNewCategories({
      category_name: category.category_name,
      description: category.description
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/categories/${currentCategories.category_id}`, newCategories);
      setCategories(categories.map(category =>
        category.category_id === currentCategories.category_id ? response.data : category
      ));
      setEditMode(false);
      setNewCategories({
        category_name: "",
        description: ""
      });
      window.alert('Category updated');
      setCurrentCategories(null);
    } catch (error) {
      console.error('Error updating category', error);
    }
  };

  const handleDelete = async (category_id) => {
    try {
      const acceptDelete = window.confirm("Are you sure you want to delete this category?");
      if (acceptDelete) {
        await axios.delete(`http://localhost:5000/api/categories/${category_id}`);
        setCategories(categories.filter(category => category.category_id !== category_id));
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editMode ? "Edit Category" : "Add Category"}
          </h2>
          <form onSubmit={editMode ? handleEditSubmit : handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                name="category_name"
                value={newCategories.category_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={newCategories.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {editMode ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.category_id} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{category.category_name}</h3>
              <p className="text-lg text-blue-500 mb-4">{category.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEditClick(category)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.category_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
