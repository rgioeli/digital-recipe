import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { NavContext } from "../../context/OpenNavContext";

const NavigationDropdown = () => {
  //ROUTER
  const router = useRouter();
  const handleLinks = (link) => {
    router.push(link);
  };

  return (
    <Wrapper>
      <ul>
        <li onClick={() => handleLinks("/user-recipe-book/my-recipes")}>
          My Recipes
        </li>
        <li onClick={() => handleLinks("/api/auth/signout")}>Logout</li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: -4.25rem;
  z-index: 100;
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
