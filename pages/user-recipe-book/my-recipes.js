import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import styled from "styled-components";
import DisplayIngredient from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/my-recipes/DisplayIngredient";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { v4 } from "uuid";
import ImageWithCaption from "../../src/global-components-and-functions/components/ImageWithCaption";
import { useRouter } from "next/router";
import Spacer from "../../src/global-components-and-functions/components/Spacer";
import DisplayRecipe from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/my-recipes/DisplayRecipe";

const MyRecipesPage = () => {
  //ROUTER
  const router = useRouter();
  //STATE
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  //USEEFFECT
  useEffect(() => {
    handleGetMyRecipes();
  }, []);
  //FUNCTIONS
  const handleCreateRecipeLink = () => {
    router.push("/user-recipe-book/add-a-recipe");
  };

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
      <ImageWithCaption
        src={"/images/my-recipes-image/my-recipes-image.jpg"}
        title={"My Recipe Book"}
      />
      <Spacer direction={"top"} size={"0.5rem"} />
      {!loading ? (
        <Wrapper>
          {recipes.length > 0 &&
            recipes.map((x) => <DisplayRecipe recipe={x} />)}
        </Wrapper>
      ) : (
        <LoadingDiv>
          <Oval color="#40a5c5" secondaryColor="#40a5c5" />
        </LoadingDiv>
      )}
      {/* If we aren't loading and there are no
      recipes to load, show a message */}
      {!loading && recipes.length === 0 && (
        <NoRecipesMessage>
          <p>You do not have any recipes yet.</p>

          <button onClick={handleCreateRecipeLink}>
            Click here to create one
          </button>
        </NoRecipesMessage>
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
`;

const LoadingDiv = styled.div`
  width: 100%;
  margin: auto;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoRecipesMessage = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-flow: column;
  height: 30vh;
  justify-content: center;
  align-items: center;
`;
export default MyRecipesPage;
