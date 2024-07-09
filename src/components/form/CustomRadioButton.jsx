/* eslint-disable */
import React, { useState } from 'react'
import { Radio as AntdRadio, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '@theme/index'

const StyledRadio = styled(AntdRadio)`
  width: 100%;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${THEME.HEADING};

  
  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: none !important;
    
  }
`

const CustomRadioButton = ({ onChange, data, rules, name, disabled, label, ...rest }) => {

    const [checked, setChecked] = useState(data[0].value)

    const handleOnChange = (e) => {
        onChange(e)
        setChecked(e.target.value)
    }

    return (
        <Form.Item name={name} rules={rules} label={label}>
            <StyledRadio.Group onChange={handleOnChange} disabled={disabled} >
                {data.map((radio) => (
                    <StyledRadio key={radio.value} value={radio.value}>
                        {radio.label}
                    </StyledRadio>
                ))}
            </StyledRadio.Group>
        </Form.Item>
    )
}

export default CustomRadioButton