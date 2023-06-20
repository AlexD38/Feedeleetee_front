import styled from "styled-components";

// Create a styled component
const SideBar = styled.aside`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    padding: 0rem 2rem;
    min-width: 100vw;
    border-right: 0.5px solid #eca869;
    left: 0;
    top: 0;
    right: 0;
    border: 1px solid red;
`;

export default SideBar;
