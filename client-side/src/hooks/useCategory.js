import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory(foodPointName) {
  const [categories, setCategories] = useState([]);
  console.log(foodPointName)

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/"+foodPointName+"/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
