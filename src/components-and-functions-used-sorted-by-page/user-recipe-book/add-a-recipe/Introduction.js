import styled from "styled-components";

const Introduction = ({ setIntroductionMessage }) => {
  const handleUpdateIntroductionState = (e) =>
    setIntroductionMessage(e.target.value);
  return (
    <Wrapper>
      <p>Recipe Introduction</p>
      <textarea
        onChange={handleUpdateIntroductionState}
        name="directions"
        rows="3"
        placeholder="What should people know about this recipe?"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  textarea {
    width: 100%;
    resize: none;
  }
`;

export default Introduction;
