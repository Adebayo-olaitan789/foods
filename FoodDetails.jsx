import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import Itemlist from "./ItemList";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "18e20d8996ac4e32967a3d7766949fac";

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch(`${URL}?apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data);
        setFood(data);
        setIsloading(false);
      } catch (error) {
        console.error("Failed to fetch food details:", error);
      }
    }
    fetchFood();
  }, [foodId]);

  if (!food.title) {
    return <div>Loading...</div>; // Show a loading state if food details haven't loaded yet
  }

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}> {food.title}</h1>
        <p>{food.details}</p>
        <img className={styles.recipeImage} src={food.image} alt={food.title} />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏱{food.readyInMinutes} Minute</strong>
          </span>
          <span>
            👨‍👨‍👧‍👦<strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🍖Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          💲
          <span>
            <strong>{food.pricePerServing / 100} Per Serving</strong>
          </span>
        </div>
      </div>
      {food.analyzedInstructions && food.analyzedInstructions.length > 0 && (
        <div className={styles.recipeInstruction}>
          <h2>Ingredients</h2>
          <Itemlist food={food} isLoading={isLoading} />
          <h1>Instructions</h1>
          <ol>
            {food.analyzedInstructions[0].steps.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
