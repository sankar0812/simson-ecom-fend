import { THEME } from "@theme/index";
import styled from "styled-components";


export const HeaderTitle = styled.div`
/* padding: 11px 0px; */
  & h1{
 font-family:'Red Rose', serif !important;
 font-size: 20px;
font-style: normal;
font-weight: 400;
/* line-height: 18.74px; */

  }
  & h2{
     font-family:'Red Rose', serif !important;
 font-size: 14px;
font-style: normal;
font-weight: 600;
/* line-height: 13.52px; */
  }
  & h4{
     font-family:'Red Rose', serif !important;
 font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 13.52px;
  }

`;
export const TopHeadTitle = styled.div`
  & h2{
     font-family:'Red Rose', serif !important;
 font-size: 14px;
font-style: normal;
font-weight: 700;
/* line-height: 13.52px; */
  }
`;
export const DotedLine = styled.div`
margin-left:10px;
   & h1 {
      border: 2px dashed #000;
      border-radius: 22px;   
      background: #F3F3F3;
      padding: 10px;   
      font-size: 18px;      
      display: inline-block; 
      font-weight: 400;
      line-height: 18.74px;
    }

`;

export const VariantBox = styled.div`


& h1{
  font-size:14px;
  font-weight:600;
  text-transform:capitalize;
   
}
&:hover h1{
  color:${THEME.primary}
}
& p{
  color:rgb(103, 119, 136);
  font-weight:400;
}
& span{
  color:#53687e;
}

`;
export const VarImg = styled.div`

& img {
  /* display: flex; */
 max-Width: 90px;
 height: 90px;
}
`;

export const VariantTotal  = styled.div`

& h3{
  padding:7px 0px;
  /* align-items:end; */
  display: flex;
  justify-content: end;
  font-size:14px;
  font-weight:400;
}
& p{
  padding:7px 0px;
   color:green;
}

`