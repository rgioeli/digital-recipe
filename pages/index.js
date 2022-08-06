import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import styled from "styled-components";
import Spacer from "../src/global-components-and-functions/components/Spacer";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    signIn("google");
  };

  return (
    <Wrapper>
      <div className="main-left">
        <Image
          src={"/images/main-image/main-image.jpg"}
          width={640}
          height={960}
          objectFit={"cover"}
          priority
        />
      </div>
      <div className="main-right">
        <Image
          src={"/images/main-image-right/main-image-right.jpg"}
          width={640}
          height={960}
          objectFit={"cover"}
          priority
        />
      </div>
      <div className="main-layover">
        <h1>DIGITAL RECIPE</h1>
        <Spacer direction={"top"} size={"0.5rem"} />
        <p>A place to store your recipes, digitally.</p>
        <Spacer direction={"top"} size={"1rem"} />
        <button onClick={handleClick}>Try Now for Free</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  position: relative;

  .main-right {
    max-width: 512px;
    max-height: 100vh;
    h1 {
      font-size: 2.2rem;
      margin-bottom: -1rem;
    }
    button {
      width: 100%;
    }
  }
  .main-left {
    max-width: 512px;
    max-height: 100vh;
  }
  .main-layover {
    position: absolute;
    text-align: center;
    background-color: #fff;
    width: 100%;
    padding: 1rem;
  }
`;

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
