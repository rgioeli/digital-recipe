import styled from "styled-components";

const Directions = ({ setDirections }) => {
  const handleUpdateDirectionsState = (e) => setDirections(e.target.value);

  return (
    <Wrapper>
      <p>Directions</p>
      <textarea
        onChange={handleUpdateDirectionsState}
        name="directions"
        rows="5"
        placeholder="How do you make this recipe?"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  textarea {
    width: 100%;
    resize: none;
  }
`;

export default Directions;
