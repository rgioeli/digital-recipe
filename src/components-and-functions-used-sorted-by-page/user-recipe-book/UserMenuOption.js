import styled from "styled-components";
import Spacer from "../../global-components-and-functions/components/Spacer";

const UserMenuOption = ({ iconName, description, handleClick }) => {
  return (
    <Wrapper onClick={handleClick}>
      {iconName}
      <Spacer direction={"left"} size={"0.5rem"} />
      <p>{description}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  padding: 1rem;
  color: #fff;
  background-color: ${(props) => props.theme.themeColor};
  &:hover {
    cursor: pointer;
  }
`;

export default UserMenuOption;
