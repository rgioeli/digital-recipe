import styled from "styled-components";

const Spacer = ({ direction, size }) => {
  return <SpacerTemplate direction={direction} size={size} />;
};

const SpacerTemplate = styled.div`
  ${(props) => `margin-${props.direction}: ${props.size}`}
`;

export default Spacer;
