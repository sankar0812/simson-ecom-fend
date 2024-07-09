import { THEME } from "@theme/index";
import styled from "styled-components";


export const ViewLabel = styled.h3`
    color:${THEME.GREEN_DARK};
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 1px;
`

export const ViewLabelData = styled.h3`
    color:${THEME.primary_color};
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
`

export const TableIconHolder = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;

    & svg{
        font-size:${props => props.size || '15px'};
        color:${props => props.color || 'black'};
        cursor: pointer;
    }
`;
export const Cardsin = styled.div`
border: 1px solid;
width: 100%;
/* padding: 10px; */
`;

export const PrintSubTitle = styled.span`
font-size:${props => props.Size || '12px'};
font-family:'Red Rose', serif !important;
text-transform:${props => props.UPPER ? 'uppercase' : 'none'};
font-weight:${props => props.Weight || '500'};
text-align:${props => props.TextAlign};
letter-spacing:.5px;
text-decoration:${props => props.Under};
margin-top:${props => props.MT};
`;
export const PrintTitle = styled.h5`
font-size:${props => props.Size || '12px'};
text-transform:${props => props.UPPER ? 'uppercase' : 'none'};
font-weight:${props => props.Weight || '500'};
text-align:${props => props.TextAlign};
margin-top:${props => props.MT};
margin-bottom:${props=> props.BTM}
`;

export const PrintViewTitle = styled.h2`
    /* color:black; */
 font-family:'Red Rose', serif !important;
 font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 13.52px;

`;
export const PrintViewValues = styled.h1`
    letter-spacing:1px;
    font-weight:600;
    font-size:12px;
    padding-left:5px;
    white-space: break-spaces !important;

 & pre{
  @media (max-width:1100px){
        white-space: break-spaces !important;
      }

 }   
`;
export const PrintViewValue = styled.p`
    font-family:'Red Rose', serif !important;
 font-size: 14px;
font-style: normal;
font-weight: 400;
/* line-height: 15px; */
margin: 0px 5px;
 /* white-space: break-spaces !important; */

 & pre{
    font-size:12px;
     white-space: break-spaces !important;
     overflow:hidden;
  @media (max-width:1100px){
        /* white-space: break-spaces !important; */
        
      }
 } 
 /* & h4{
        text-transform: capitalize;
 } */    
`

export const PrintHolder = styled.div`
    /* width:100%;
    margin:auto;
    background:green; */
    padding: 10px 10px;
    @media print{     
        width:100%;
        margin:auto;
    }
`

export const PrintWrapper = styled.div`
    width:100%;
    padding: 20px 20px;
`
export const Maindesign = styled.div`
background-color: var(--light-color);
width: 100%;
margin: 0 auto !important;
padding: -1 30px;
& h4 {
    margin: 5px 0;
}
& h3 {
    margin: 5px 0;
    color: ${THEME.primary_color};
    font-size: 26px;
    font-weight: 600;
}

.page-header,
.page-header-space {
  height: 100px;
}

.page-footer-space {
  height: 50px;
}

.footer_sign{
    border:1px solid black;
    padding:2px 5px;
    height:70px;    
    display:flex;
    flex-direction:column;
    justify-content:space-between;
}



@media print {
    .page-footer {
font-family:'Times New Roman', Times, serif !important;

  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  padding: 0 30px;
}
}

.page-header {
  position: fixed;
  top: 0mm;
  width: 100%;
}
.page {
  page-break-after: always !important;
  height: 20vh;
  margin-top: 52%;
}

@media print {
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }
}
`;

export const BillTable = styled.div`
padding: 0px 20px;
 font-family:'Red Rose', serif !important;
overflow-x:auto !important;
& table thead tr th{
    font-size:12px !important;
    padding: 10px;
    font-family: "Red Rose", serif !important;
    font-weight:600;
    
}

& table tbody tr td{
    font-size:12px !important;
    padding:5px
}

@media print {
    
}
table {
  width: 100%;
  height: 200px;
  border-collapse: collapse;
  /* padding: 2px; */
  margin-bottom:20px !important;
  border:2px solid #656565;

}

th {
  border-bottom: 1px solid black;
  border: 2px solid #656565;
  color:#000;
}

td {
  text-align: center;
  border: 2px solid #656565;
}
`;
export const SignImageHolder = styled.div`
    margin-right:10px;
    width:250px;
    height:70px;
    /* border:1px solid; */
    position:relative;
     
     & img{
        position:absolute;
        height: 100%;
        width: 100%;
        object-fit:contain;
     }
`

export const PrintTableFooterHolders = styled.div`
padding: 0px 20px;
    @media print {
        page-break-inside:auto;
        /* background:red; */
    }
`
