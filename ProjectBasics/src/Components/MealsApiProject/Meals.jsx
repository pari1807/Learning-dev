import React from 'react'
import './index.css';
import {useState, useEffect} from "react";
import axios from "axios";

const Meals = () => {

    const [items,setItems] = useState([]);

    useEffect(()=> {
        axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
        .then((response) => {
            //console.log(response.data.meals);
            setItems(response.data.meals);
        }).catch((error) => {
            console.log(error);
        });

    },[]);

    const itemsList = items.map(({strMeal, strMealThumb, idMeal})=>{
        return (
            <section className = "card" key={idMeal}>
                <img src={strMealThumb} alt={strMeal} />

                <section className = "content">
                    <p>{strMeal}</p>
                    <p>#{idMeal}</p>
                </section>
            </section>
        );
    })

  return (
    <div className = "items-container">{itemsList}</div>
  )
}

export default Meals;