import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { Input as AntdInput, Space } from "antd";
import styled from "styled-components";

const CustomInputSearch = ({ value, onChange, placeholder,defaultValue,type,autoFocus,readOnly,onSearch,disabled,height,step,...rest }) => (
  //   <Space direction="vertical" size="middle">
  <StyledInput
    addonBefore={<SearchOutlined />}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    defaultValue={defaultValue}
    type={type}
    autoFocus={autoFocus}
    readOnly={readOnly}
    // onSearch={onSearch}
    disabled={disabled}
    height={height}
    step={step}
    {...rest}
  />
  //   </Space>
);

const StyledInput = styled(AntdInput)`
    .ant-input-group .ant-input-group-addon {
    background-color: #f0f0f0;
    border: 1px solid #d9d9d9;
    border-radius:7px 0px 0px 7px;
    /* font-size:15px */
    padding: 10px;
  }
  .ant-input {
    border: 1px solid #d9d9d9;
    border-radius:7px;
    padding: 8px;
    background-color: #fafafa;
  }
  .ant-input:hover {
    border-color: #1890ff;
  }
  .ant-input-group {
    border: 1px solid #d9d9d9;
    border-radius: 7px;
  }
`;

export default CustomInputSearch;
