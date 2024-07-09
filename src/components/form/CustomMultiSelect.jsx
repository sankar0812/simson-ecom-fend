import React, { Fragment } from 'react'
import { Select as AntdSelect, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'
import Button from './CustomButton'
import { PlusCircleOutlined } from '@ant-design/icons';

const { Item } = Form
const { Option } = AntdSelect;

const StyledItem = styled(Item)`
width:100%;
border-radius: 0.4rem;
margin-bottom: 0px !important;
  > div {
    width: 100%;
    text-align: left;
    /* align-items:center; */
  }
  
  border-radius: 10px;
  margin-bottom: -5px !important;

  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }

  & .ant-form-item-label > label > span {
    font-weight: 600 !important;
    position: relative;
    font-size: 14px;
    letter-spacing: 0.01em;
  }
`
const ButtonContainerHolder = styled.div`
  background:'green';
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  margin-bottom:5px;
`;

const AntdSelectStyle = styled(AntdSelect)`

margin-bottom:5px;
font-family:  'Poppins', sans-serif;
font-weight:600;
/* height: ${props => (props.height ? props.height : '40px')}; */
border-radius: 10px;
box-shadow: none;
border-color: ${props => (props.error ? 'red' : '#e9e9e9')};

::placeholder {
  font-size: 16px;
}

:focus {
  border-color: #e9e9e9;
  box-shadow: none;
}

:hover {
  border-color: #e9e9e9;
}

& .ant-select-selector {
    height:100% !important;
    border: 1px solid ${THEME.primary_color} !important;
    & input{
    height:100% !important;
    }
  }

  &.ant-input[disabled] {
    color: ${THEME.black};
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }

  & .ant-select-selection-item{
    margin:auto;
    font-size: 1rem;
    font-weight: 600;
  }

  & .ant-select-selection-placeholder { 
    margin:auto;
  }

  & .ant-select-selection-item {
    margin:5px;
    color: #1677ff;
    background: #e6f4ff;
  }

  :where(.css-dev-only-do-not-override-190m0jy).ant-select-multiple.ant-select-lg .ant-select-selection-item-content {
    display: inline-block;
    margin-inline-end: 8px;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
    top: 10px;
    margin-top: 6px;
}
`
const CustomMultiSelect = ({
  initialValue,
  label,
  type,
  name,
  rules,
  onChange,
  placeholder,
  required,
  disabled,
  options,
  width,
  minWidth,
  height,
  maxTagCount,
  notFoundContent,
  value,
  onButtonClick,
  showSearch,
  marginRight,
  labelStyle,
  defaultValue,
  optional,
  mode,
  noStyle = undefined,
  ...rest
}) => {
  return (
    <ButtonContainerHolder>
      {
        label && (
          <Fragment>
            <Label required={required} labelStyle={labelStyle}>
              {label} <span>{optional}</span>
            </Label>
          </Fragment>)
      }

      <ButtonContainer>
    <StyledItem
      style={{
        width: width,
        marginRight: marginRight,
        minWidth: minWidth
      }}
      rules={rules}
      noStyle={noStyle}
      name={name}
      colon={false}
      required={false}
      // initialValue={initialValue}
      // label={
      //   label && (
      //     <Fragment>
      //       <Label required={required} labelStyle={labelStyle}>
      //         {label} <span>{optional}</span>
      //       </Label>
      //     </Fragment>
      //   )
      // }
    >
      <AntdSelectStyle disabled={disabled} mode='multiple' size='large' maxTagCount={maxTagCount} value={value} onChange={onChange} defaultValue={defaultValue} showSearch={showSearch} notFoundContent={notFoundContent} placeholder={placeholder}>
        {options?.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </AntdSelectStyle>
      </StyledItem>
      <Button
          style={{
            height: '40px',
            backgroundColor: 'white',
            color: '#0958D9',
            borderTopRightRadius: '0.4rem',
            borderBottomRightRadius: '0.4rem',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
          }}
          // disabled={disabled || isSelectDisabled}
          onClick={onButtonClick}
        >
          <PlusCircleOutlined />
        </Button>
      </ButtonContainer>
    </ButtonContainerHolder>
  )
}

export default CustomMultiSelect


// import React, { Fragment } from 'react'
// import { Select as AntdSelect, Form  } from 'antd'
// import styled from 'styled-components'
// import { THEME } from '../../theme'
// import Label from './Label'
// const { Item } = Form
// const { Option } = AntdSelect;
// const StyledItem = styled(Item)`
//   > div {
//     width: 100%;
//     text-align: left;
//     /* align-items:center; */
//   }
//   border-radius: 10px;
//   margin-bottom: -5px !important;
//   & .ant-form-item-label {
//     display:block;
//     width:100%;
//     text-align:start;
//   }
//   & .ant-form-item-label > label > span {
//     font-weight: 600 !important;
//     position: relative;
//     font-size: 14px;
//     letter-spacing: 0.01em;
//   }
// `
// const AntdSelectStyle = styled(AntdSelect)`
// margin-bottom:5px;
// font-family:  'Poppins', sans-serif;
// font-weight:600;
// /* height: ${props => (props.height ? props.height : '40px')}; */
// border-radius: 10px;
// box-shadow: none;
// border-color: ${props => (props.error ? 'red' : '#E9E9E9')};
// ::placeholder {
//   font-size: 16px;
// }
// :focus {
//   border-color: #E9E9E9;
//   box-shadow: none;
// }
// :hover {
//   border-color: #E9E9E9;
// }
// & .ant-select-selector {
//     height:100% !important;
//     border: 1px solid ${THEME.primary_color} !important;
//     & input{
//     height:100% !important;
//     }
//   }
//   &.ant-input[disabled] {
//     color: ${THEME.black};
//     font-size: 1rem;
//     font-weight: 600;
//     text-align: center;
//   }
//   & .ant-select-selection-item{
//     margin:auto;
//     font-size: 1rem;
//     font-weight: 600;
//   }
//   & .ant-select-selection-placeholder {
//     margin:auto;
//   }
//   & .ant-select-selection-item {
//     margin:5px;
//     color: #1677FF;
//     background: #E6F4FF;
//   }
//   :where(.css-dev-only-do-not-override-190m0jy).ant-select-multiple.ant-select-lg .ant-select-selection-item-content {
//     display: inline-block;
//     margin-inline-end: 8px;
//     overflow: hidden;
//     white-space: pre;
//     text-overflow: ellipsis;
//     top: 10px;
//     margin-top: 6px;
// }
// `
// const CustomMultiSelect = ({
//     initialValue,
//     label,
//     type,
//     name,
//     rules,
//     onChange,
//     placeholder,
//     required,
//     disabled,
//     options,
//     width,
//     minWidth,
//     height,
//     maxTagCount,
//     notFoundContent,
//     value,
//     showSearch,
//     marginRight,
//     labelStyle,
//     defaultValue,
//     optional,
//     mode,
//     noStyle = undefined,
//     ...rest
// }) => {
//     return (
//         <StyledItem
//             style={{
//                 width: width,
//                 marginRight: marginRight,
//                 minWidth: minWidth
//             }}
//             rules={rules}
//             noStyle={noStyle}
//             name={name}
//             colon={false}
//             required={false}
//             initialValue={initialValue}
//             label={
//                 label && (
//                     <Fragment>
//                         <Label required={required} labelStyle={labelStyle}>
//                             {label} <span>{optional}</span>
//                         </Label>
//                     </Fragment>
//                 )
//             }
//         >
//             <AntdSelectStyle disabled={disabled} mode='multiple' size='large' maxTagCount={maxTagCount} value={value} onChange={onChange} defaultValue={defaultValue} showSearch={showSearch} notFoundContent={notFoundContent} placeholder={placeholder}>
//                 {options.map((option) => (
//                     <Option key={option.value} value={option.value}>
//                         {option.label}
//                     </Option>
//                 ))}
//             </AntdSelectStyle>
//         </StyledItem>
//     )
// }
//  export default CustomMultiSelect