import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextAuth]";
import { unstable_getServerSession } from "next-auth/next";
import styled from "styled-components";
import Spacer from "../src/global-components-and-functions/components/Spacer";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("api/auth/signin");
  };

  return (
    <Wrapper>
      <h1>DIGITAL RECIPE</h1>
      <Spacer direction={"top"} size={"0.5rem"} />
      <h3>A place to store your recipes, digitally.</h3>
      <Spacer direction={"top"} size={"1rem"} />
      <button onClick={handleClick}>Try Now for Free</button>
    </Wrapper>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) return { props: {} };

  return {
    redirect: {
      destination: "/user-recipe-book",
      permanent: true,
    },
  };
}

const Wrapper = styled.div`
  height: 30vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
