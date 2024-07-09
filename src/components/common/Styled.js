// ============  Notification    ===============

import { THEME } from "@theme/index"
import styled from "styled-components"

export const MiniPopUpWrapper = styled.div`
  padding: 10px;
`
export const MiniPopUpTitle = styled.h4`
  letter-spacing: -0.01em;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: ${THEME.black};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0;
  text-overflow: ellipsis;
`
export const MiniPopUpPara = styled.h4`
  font-weight: 500;
  font-size: 0.8rem;
`


export const StyledCardDash = styled.div`
  border-radius: 10px!important;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  background: ${(props) => (props.background ? `url(${props.background})` : 'none')};
  background-color: ${(props) =>props.backgroundcolor || "#fff"};
  /* padding: 50px 20px; */
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;

  & h2 {
    /* color: #545454; */
    color: #fff;
    font-size: 24px !important;
    padding-top: 10px;
  }

  & h1 {
    font-size: 18px !important;
    /* color: #52c41a !important; */
    color: #fff !important;
  }

  & svg {
    font-size: 25px;
    /* margin:3px 5px; */
    color: #fff;
  }

  & p {
    font-size: 10px !important;
  }
  div {
    position: absolute;
    opacity: 0.5;
    right: 0;
    bottom: 0;
  }
`;
