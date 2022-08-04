import styled from "styled-components";

const InputWithLabel = ({ label, handleClick, placeholder }) => {
  return (
    <Wrapper>
      <p>{label}</p>
      <input onChange={handleClick} placeholder={placeholder} type={"text"} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  input {
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
  }
`;

export default InputWithLabel;
