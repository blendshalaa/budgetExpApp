import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';



function Categories() {

const[categories,setCategories]=useState([]);











useEffect(()=>{
  const fetchCategories=async()=>{
    try{
      const response=await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data)
    }catch(error){
      console.error("error fetching categories",error)
    }
  };
  fetchCategories()
},[]);











  return (
    <div>
      <Navbar/>
      <div>
        <ul>
          {categories.map((category)=>(
            <li key={category.category_id}>{category.category_name} {category.description}</li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Categories