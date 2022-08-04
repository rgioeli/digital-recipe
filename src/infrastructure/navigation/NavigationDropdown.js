import { useRouter } from "next/router";
import styled from "styled-components";

const NavigationDropdown = () => {
  //ROUTER
  const router = useRouter();
  const handleLinks = (link) => {
    router.push(link);
  };
  return (
    <Wrapper>
      <ul>
        <li onClick={() => handleLinks("user-recipe-book/my-profile")}>
          My Profile
        </li>
        <li onClick={() => handleLinks("user-recipe-book/my-recipes")}>
          My Recipes
        </li>
        <li onClick={() => handleLinks("user-recipe-book/settings")}>
          Settings
        </li>
        <li onClick={() => handleLinks("/api/auth/signout")}>Logout</li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: -9.5rem;
  z-index: 1;
  min-width: 200px;
  background-color: #fff;
  box-shadow: 1px 1px 2.5px 1px #999;

  ul {
    all: unset;
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    li {
      width: 100%;
      text-align: center;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: #40a5c5;
        color: #fff;
      }
    }
  }
`;

export default NavigationDropdown;