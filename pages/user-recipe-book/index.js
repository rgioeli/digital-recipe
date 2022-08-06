import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import UserMenuOption from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/UserMenuOption";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import Spacer from "../../src/global-components-and-functions/components/Spacer";
import { useRouter } from "next/router";
import ImageWithCaption from "../../src/global-components-and-functions/components/ImageWithCaption";
import { useEffect, useState } from "react";
import RecipesToTry from "../../src/components-and-functions-used-sorted-by-page/user-recipe-book/my-recipes/RecipesToTry";

const Index = () => {
  //STATE
  const [loading, setLoading] = useState(false);
  const [recipesToTry, setRecipesToTry] = useState([]);
  //ROUTER
  const router = useRouter();
  //USEEFFECT
  useEffect(() => {
    handleGetRecipesToTry();
  }, []);
  //FUNCTIONS
  const handleGetRecipesToTry = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/recipes-to-try/recipes-to-try", {
        method: "GET",
      });
      const { error, success } = await response.json();
      setLoading(false);
      if (error) return;
      if (success) setRecipesToTry(success);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddNewRecipe = () => {
    router.push("/user-recipe-book/add-a-recipe");
  };

  const handleMyRecipeBook = () => {
    router.push("/user-recipe-book/my-recipes");
  };

  return (
    <>
      <ImageWithCaption
        src={"/images/menu-cover-image/menu-cover-image.jpg"}
        title={"Menu"}
      />
      <Spacer direction={"top"} size={"0.5rem"} />
      <MenuOptionsWrapper>
        <div className="cover-image">
          <Image
            src={"/images/cover-image/cover-image.jpg"}
            width={640}
            height={500}
            objectFit={"cover"}
            priority
          />
        </div>
        <div className="user-menu">
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
          <Spacer direction={"top"} size={"0.25rem"} />
        </div>
      </MenuOptionsWrapper>
      <ImageWithCaption
        title={"Recipes to Try"}
        src={"/images/recipes-to-try-image/recipes-to-try-image.jpg"}
      />
      <Spacer direction={"top"} size={"0.5rem"} />
      {loading ? (
        <LoadingDiv>
          <Oval color="#40a5c5" secondaryColor="#40a5c5" />
        </LoadingDiv>
      ) : (
        <RecipesToTry recipes={recipesToTry} />
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  //check if session is active
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) return { redirect: { destination: "/", permanent: true } };

  return { props: {} };
}

const MenuOptionsWrapper = styled.div`
  display: flex;
  max-width: 1024px;
  margin: auto;
  align-items: flex-start;
  .cover-image {
    flex: 1;
    position: relative;
    height: 100%;
  }
  .user-menu {
    flex: 1;
    padding-left: 0.5rem;
    display: flex;
    flex-flow: column;
  }
`;

const LoadingDiv = styled.div`
  width: 100%;
  margin: auto;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Index;
