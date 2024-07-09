import React from 'react'
import styled from 'styled-components'
import { Col, Form, Input, Spin } from 'antd'
import { CustomRow, Flex } from '@components/others'
import { Button, CustomInput, CustomInputPassword } from '@components/form'
import { LoadingOutlined } from "@ant-design/icons";

const InputWrapper = styled.div`
  padding-bottom: 25px;

`
const Header = styled.div`
  color:black;
  margin-bottom:20px;

  & h1{
 font-family:'Red Rose', serif !important;
 font-size: 48px;
font-style: normal;
font-weight: 400;
line-height: normal;
  }

`
const SignInForm = ({ handleSignIn,isLoading }) => {

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = values => {
    handleSignIn(values)
    // console.log(values, 'successs');
    // form.resetFields();
  }

  return (
    <Form onFinish={onFinish}
      labelCol={{
        span: 24,
      }}
      autoComplete='off'
      wrapperCol={{
        span: 24,
      }}
      form={form}>

      <Flex center={'true'}>
        <Header>
          <h1>LOGIN</h1>
        </Header>
      </Flex>

      <CustomRow space={[24, 24]}>
        <Col span={24}>
          <CustomInput
            label={"User Name or Email"}
            name="email"
            type={"email"}
            placeholder={'user name or email'}
            rules={[
              { required: true, message: 'Please enter your email address' },
            ]} />
        </Col>

        <Col span={24}>
          <CustomInputPassword
            label={"Password"}
            name="password"
            placeholder={'password'}
            rules={[
              { required: true, message: 'Please enter a password' },
            ]} />
        </Col>

      </CustomRow>
      <Flex center={"true"} gap={"20px"} margin={"20px 0"}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "30px",
                width: "60px",
                marginTop: "3px",
              }}
            >
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 20,
                    }}
                    spin
                  />
                }
              />
            </div>
          ) : (
            <Button.PrimaryNow text={'SUBMIT'} htmlType="submit" />
          )}
        </Flex>

    </Form>
  )
}

export default SignInForm
