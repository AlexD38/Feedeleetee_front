import styled from "styled-components";

// Create a styled component
const HomePageImg = styled.img`
  position: relative;
  top: 0;
  left: 0;
  z-index: -1;
  max-width: 100%;
  object-fit: cover;
  // filter: brightness(50%);
  @media (max-width: 1400px) {
    height: 100vh;
    // filter: contrast(10%);
    // max-width: 100%;
  }
`;

export default HomePageImg;
