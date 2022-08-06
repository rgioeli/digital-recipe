import styled from "styled-components";
import DisplayRecipe from "./DisplayRecipe";

const RecipesToTry = ({ recipes }) => {
  return (
    <Wrapper>
      {recipes.length > 0 &&
        recipes.map((x) => <DisplayRecipe key={x._id} recipe={x} />)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 0.5rem;
`;

export default RecipesToTry;
