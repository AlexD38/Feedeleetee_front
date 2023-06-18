import styled from "styled-components";

// Create a styled component
const SideBar = styled.aside`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    padding: 0rem 2rem;
    position: fixed;
    min-height: 100dvh;
    min-width: 2dvw;
    border-right: 0.5px solid #eca869;
    left: 0;
    top: 0;
`;

export default SideBar;
