import Item from "./Item";

export default function Itemlist({ food, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        food.extendedIngredients.map((item) => <Item item={item} />)
      )}
      {}
    </div>
  );
}
