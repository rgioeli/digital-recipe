import Navigation from "./Navigation/Navigation";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Navigation />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
`;

export default Layout;
