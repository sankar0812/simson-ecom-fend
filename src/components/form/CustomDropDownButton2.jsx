import React from 'react';
import {Dropdown as AntdDropdown , message } from 'antd'; 
import { UserOutlined } from '@ant-design/icons';
import { IoEyeOutline } from 'react-icons/io5';
import styled from 'styled-components';

const AntdDropdownStyle = styled(AntdDropdown)`
    border:none;
    
    & .ant-btn{
        height:auto;
    }
    
    & .ant-btn >span{
        font-size:.85rem;
        font-weight:600;
        text-transform:capitalize;
        letter-spacing: 1px;
    }

    &.ant-dropdown-menu .ant-dropdown-menu-title-content{
        font-size:1rem;
    }
`
const CustomDropdownButton2 = ({ items, onClick, menu, text, icon,trigger,placement }) => {

  return (
    <AntdDropdownStyle.Button menu={menu} trigger={trigger} onClick={onClick}  placement={placement} item={items} icon={icon}>
        <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
    <IoEyeOutline color='green' size={17} />
       <span style={{color:'blue'}}>{text} </span> 
        </div>

        </AntdDropdownStyle.Button>

  );
};

export default CustomDropdownButton2; 
