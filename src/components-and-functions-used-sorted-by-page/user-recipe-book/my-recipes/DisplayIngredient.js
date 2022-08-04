import styled from "styled-components";
import Spacer from "../../../global-components-and-functions/components/Spacer";

const DisplayIngredient = ({
  number = "",
  type = "",
  fraction = "",
  name = "",
}) => {
  return (
    <Wrapper>
      {number && (
        <>
          <p>{number}</p>
          <Spacer direction="right" size="0.5rem" />
        </>
      )}
      {fraction && (
        <>
          <p>{fraction}</p>
          <Spacer direction="right" size="0.5rem" />
        </>
      )}
      {type && (
        <>
          <p>{type}</p>
          <Spacer direction="right" size="0.5rem" />
        </>
      )}
      {name && <p>{name}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  .space-left {
    margin-left: 0.25rem;
  }
`;

export default DisplayIngredient;
