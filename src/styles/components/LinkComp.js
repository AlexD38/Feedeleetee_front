import styled from "styled-components";

// Create a styled component
const Link = styled.a`
    display: block;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
        color: #eca869;
        transition: all 0.2s ease;
    }
`;

export default Link;
