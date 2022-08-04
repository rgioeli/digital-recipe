import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BsFillBookFill } from "react-icons/bs";
import Image from "next/image";
import Spacer from "../../global-components-and-functions/components/Spacer";
import NavigationDropdown from "./NavigationDropdown";

const Navigation = () => {
  //SESSION
  const { data: session, status } = useSession();

  //ROUTER
  const router = useRouter();

  //STATE
  const [openNav, setOpenNav] = useState(false);

  //FUNCTIONS
  const handleDropdownNavigation = () => {
    setOpenNav(!openNav);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Wrapper>
      <BsFillBookFill
        style={{ cursor: "pointer" }}
        color={"#40A5C5"}
        size={"2rem"}
        onClick={handleGoHome}
      />
      <ul>
        {status === "authenticated" && (
          <li>
            <StyledLink href={"/user-recipe-book"}>Home</StyledLink>
          </li>
        )}
        <Spacer direction={"right"} size={"2rem"} />
        <li>
          <StyledLink href={"/how-to-use"}>How to use this app</StyledLink>
        </li>
        <Spacer direction={"right"} size={"2rem"} />
        {
          // if user is logged in, show the logout button
          status === "authenticated" && (
            <UserOptions onClick={handleDropdownNavigation}>
              <p>{session.user.name}</p>
              <Spacer direction={"left"} size={"0.5rem"} />
              <Image
                src={"/default-profile-picture/default-profile-picture.jpg"}
                width={50}
                height={50}
                objectFit={"contain"}
                style={{
                  borderRadius: "100%",
                }}
              />
            </UserOptions>
          )
        }
      </ul>
      {openNav && <NavigationDropdown />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
    width: 100%;
    max-width: 500px;
    justify-content: flex-end;
    align-items: center;

    li {
      list-style-type: none;
    }
  }
`;

const UserOptions = styled.div`
  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.themeColor};
  border-radius: 0.5rem;
  p {
    color: #fff;
  }
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)``;

export default Navigation;
