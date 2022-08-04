import { authOptions } from "../api/auth/[...nextAuth]";
import { unstable_getServerSession } from "next-auth";

import styled from "styled-components";
import Image from "next/image";
import UserMenuOption from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/UserMenuOption";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import Spacer from "../../src/global-components-and-functions/components/Spacer";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const handleAddNewRecipe = () => {
    router.push("/user-recipe-book/add-a-recipe");
  };

  const handleMyRecipeBook = () => {};

  return (
    <Wrapper>
      <div className="cover-image">
        <Image
          src={"/images/cover-image/cover-image.jpg"}
          width={640}
          height={480}
          objectFit={"cover"}
        />
      </div>
      <div className="user-menu">
        <h1>Menu</h1>
        <UserMenuOption
          iconName={<BsFillPlusSquareFill size={"1.5rem"} />}
          description={"Add a New Recipe"}
          handleClick={handleAddNewRecipe}
        />
        <Spacer direction={"top"} size={"0.5rem"} />
        <UserMenuOption
          iconName={<FaBook size={"1.5rem"} />}
          description={"My Recipe Book"}
          handleClick={handleMyRecipeBook}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  box-shadow: 1px 1px 5px 1px #333;
  max-width: 1024px;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  .cover-image {
    flex: 1;
    max-width: 500px;
  }
  .user-menu {
    flex: 1;
    display: flex;
    flex-flow: column;
    padding-left: 1rem;
  }
`;

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  if (!session) return { redirect: { destination: "/", permanent: true } };

  return {
    props: {},
  };
}

export default Index;
