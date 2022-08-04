import Image from "next/image";
import styled from "styled-components";

const ImageWithCaption = ({ src, title }) => {
  return (
    <Wrapper>
      <div className="image-container">
        <Image
          width={1024}
          height={200}
          objectPosition={"0 -200px"}
          objectFit={"cover"}
          src={src}
        />
        <h1>{title}</h1>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      position: absolute;
      font-size: 3rem;
      color: #fff;
    }
  }
`;

export default ImageWithCaption;
