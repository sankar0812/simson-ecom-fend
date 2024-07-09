import { Card } from "antd";
import styled from "styled-components";

export const StyledIndividualProducts = styled.div`
    
/* background-color: #f0e5e4; */

`
export const StyledProductCard = styled(Card)`
  background: ${props => props.loading ? 'rgba(255, 255, 255, 0.5)' : '#fff'}; /* Change the opacity value to adjust the blur intensity */
  backdrop-filter: ${props => props.loading ? 'blur(5px)' : 'none'}; /* Adjust the blur radius as needed */
`;

export const StyledProductImageCard = styled.div`
    margin-top:30px;
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    gap:10px;

    & .img__holder{
        border:2px solid black;
        border-radius:6px;
        overflow:hidden;
        width:60px;
        height:60px;
        object-fit:cover;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
`