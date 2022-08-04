import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import styled from "styled-components";
import DisplayIngredient from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/my-recipes/DisplayIngredient";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { v4 } from "uuid";

const MyRecipesPage = () => {
  //STATE
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  //USEEFFECT
  useEffect(() => {
    handleGetMyRecipes();
  }, []);
  //FUNCTIONS
  const handleGetMyRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/my-recipes/my-recipes", {
        method: "GET",
      });
      const { error, success } = await response.json();
      if (error) setError(error);
      if (success) setRecipes(success);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      {!loading ? (
        <Wrapper>
          {recipes.length ? (
            recipes.map((x) => (
              <div key={v4()} className="recipe-container">
                <h2>{x.title}</h2>
                <p className="bold-text">Introduction</p>
                <p>{x.introduction || "N/A"}</p>
                <p className="bold-text">Ingredients</p>
                {x.ingredients.map((i) => (
                  <DisplayIngredient
                    key={v4()}
                    name={i.ingredientName}
                    type={i.typeOfMeasurement}
                    fraction={i.fractionMeasurement}
                    number={i.wholeNumberMeasurement}
                  />
                ))}
                <p className="bold-text">Directions</p>
                <p>{x.directions}</p>
              </div>
            ))
          ) : (
            <>
              <p>You do not have any recipes yet.</p>
              <button>Click here to create one</button>
            </>
          )}
        </Wrapper>
      ) : (
        <LoadingDiv>
          <Oval color="#40a5c5" secondaryColor="#40a5c5" />
        </LoadingDiv>
      )}
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return { redirect: { destination: "/" } };

  return { props: {} };
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 0.5rem;
  .bold-text {
    font-weight: bold;
  }
  .recipe-container {
    border: 2px solid #40a5c5;
    padding: 0.75em;
  }
`;

const LoadingDiv = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: auto;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyRecipesPage;
