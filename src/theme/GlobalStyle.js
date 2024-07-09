import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding: 0;
        box-sizing:border-box;
        font-family: 'Radio Canada', sans-serif;
    } 
   
  & .ant-menu-item-icon {
    font-size: 23px !important;
   }

   .ant-drawer .ant-drawer-body {
    padding: 0% !important;
    overflow: hidden !important;
   }

   .scroll {
    overflow-y: scroll;
   }

   .ant-form-item .ant-form-item-label >label {
   /* height: 1px !important; */
   /* margin-top: 12px !important; */
   }
   .ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title{
        color :#df1f26 !important
    }
   .ant-menu-light .ant-menu-item-selected {
        border-right: 2px solid !important;
        background-color: #df1f26 !important;
        color:#fff;
    }
    .ant-menu-light:not(.ant-menu-horizontal) .ant-menu-item:not(.ant-menu-item-selected):hover {
        background: #00000000 !important;
        color:#df1f26 !important;
    }
    ::-webkit-scrollbar {
    width: 0px;
    height: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #1677ff; 
        cursor: pointer;
        border-radius: 10px;

    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(3 108 255 / 43%);
        border-radius: 10px;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(3 108 255 / 43%);
        visibility: visible;
    }

    /* Antd Form  */
    .ant-form-item {
        margin-bottom: 6px !important;
    }

    img{
        object-fit: cover;
    }

`

export default GlobalStyle
