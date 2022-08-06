import DisplayIngredient from "./DisplayIngredient";
import { v4 } from "uuid";
import styled from "styled-components";

const DisplayRecipe = ({ recipe }) => {
  return (
    <Wrapper>
      <div key={v4()} className="recipe-container">
        <h2>{recipe.title}</h2>
        <p className="bold-text">Introduction</p>
        <p>{recipe.introduction || "N/A"}</p>
        <p className="bold-text">Ingredients</p>
        {recipe.ingredients.map((i) => (
          <DisplayIngredient
            key={v4()}
            name={i.ingredientName}
            type={i.typeOfMeasurement}
            fraction={i.fractionMeasurement}
            number={i.wholeNumberMeasurement}
          />
        ))}
        <p className="bold-text">Directions</p>
        <p>{recipe.directions}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .bold-text {
    font-weight: bold;
  }
  .recipe-container {
    border: 2px solid #40a5c5;
    padding: 0.75em;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }
`;

export default DisplayRecipe;
