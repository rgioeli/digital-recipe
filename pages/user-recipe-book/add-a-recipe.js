import { useEffect, useState } from "react";
import styled from "styled-components";
import AddIngredient from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/add-a-recipe/AddIngredient";
import InputWithLabel from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/add-a-recipe/InputWithLabel";
import Directions from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/add-a-recipe/Directions";
import Introduction from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/add-a-recipe/Introduction";
import { v4 } from "uuid";
import Spacer from "../../src/global-components-and-functions/components/Spacer";
import ImageWithCaption from "../../src/global-components-and-functions/components/ImageWithCaption";
import { Oval } from "react-loader-spinner";

const AddARecipePage = () => {
  //STATE
  const [numberOfIngredients, setNumberOfIngredients] = useState([]);
  const [introductionMessage, setIntroductionMessage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [directions, setDirections] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //FUNCTIONS
  const handleSaveRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/save-recipe/add-recipe-to-database", {
        method: "POST",
        body: JSON.stringify({
          ingredients: numberOfIngredients,
          introductionMessage,
          recipeName,
          directions,
        }),
      });

      const { error, success } = await response.json();
      if (error) {
        setLoading(false);
        setError(error);
      }
      if (success) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const handleAddAnotherIngredient = () =>
    setNumberOfIngredients((prevState) => {
      return [
        ...prevState,
        {
          id: v4(),
          wholeNumberMeasurement: "",
          typeOfMeasurement: "",
          ingredientName: "",
          fractionMeasurement: "",
        },
      ];
    });

  const handleDeleteIngredient = (id) => {
    const newIngredientList = numberOfIngredients.filter((x) => x.id !== id);
    setNumberOfIngredients(newIngredientList);
  };

  const handleRecipeName = (e) => {
    setRecipeName(e.target.value);
  };

  return (
    <Wrapper>
      <ImageWithCaption
        src={"/images/new-recipe-image/new-recipe-image.jpg"}
        title={"Adding a New Recipe"}
      />
      <Spacer direction={"top"} size={"1rem"} />
      {error && <p className="error">{error}</p>}
      <InputWithLabel
        label={"Name"}
        placeholder={"What do you call this recipe?"}
        handleClick={handleRecipeName}
      />
      <Spacer direction={"top"} size={"1rem"} />
      <Introduction setIntroductionMessage={setIntroductionMessage} />
      <p className={"title"}>Ingredients</p>
      {numberOfIngredients.map((x) => (
        <AddIngredient
          id={x.id}
          key={x.id}
          handleClick={handleDeleteIngredient}
          numberOfIngredients={numberOfIngredients}
          setNumberOfIngredients={setNumberOfIngredients}
        />
      ))}
      <button onClick={handleAddAnotherIngredient} className="small-button">
        Add ingredient line
      </button>
      <Spacer direction={"top"} size={"1rem"} />
      <Directions setDirections={setDirections} />
      <button onClick={handleSaveRecipe} className="small-button save-button">
        {loading ? (
          <Oval
            wrapperStyle={{ padding: 0 }}
            color="#fff"
            height="30"
            width="30"
            secondaryColor="#fff"
          />
        ) : (
          "Save Recipe"
        )}
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  position: relative;
  .title {
    max-width: 1024px;
    margin-top: 1rem;
  }

  .small-button {
    font-size: 14px;
    margin-top: 1rem;
    background-color: ${(props) => props.theme.themeColor};
  }

  .save-button {
    width: 100%;
  }

  button {
    display: flex;
    justify-content: center;
  }
`;

export default AddARecipePage;
