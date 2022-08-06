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
          priority
        />
        <h1>{title}</h1>
        <div className="image-tint"></div>
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
    position: relative;
    z-index: 1;
    .image-tint {
      max-width: 1024px;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: rgba(0, 0, 0, 0.3);
    }
    h1 {
      position: absolute;
      font-size: 3rem;
      color: #fff;
      z-index: 3;
    }
  }
`;

export default ImageWithCaption;
