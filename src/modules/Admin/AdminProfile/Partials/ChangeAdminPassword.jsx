import { AvImg } from '@assets/images'
import { Button, CustomInput, CustomInputPassword } from '@components/form'
import { CustomCardView, CustomRow, Flex } from '@components/others'
import { Col } from 'antd'
import React from 'react'
import { Form } from 'antd'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import errorHandler from '@request/errorHandler'
import { APIURLS } from '@request/apiUrls/urls'
import { toast } from 'react-toastify'

export const ChangeAdminPassword = () => {

    const [form] = Form.useForm();

    const ChangePasswordofAdmin = async (data) => {
        await baseRequest.post(APIURLS.ADMINCHANGEPASSWORD, data)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Admin Password Changed Successfully',
                    type: 'success',
                })
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return errorHandler(error);
            })
    }

    const onFinish = (data) => {
        ChangePasswordofAdmin(data)
    };

    const onFinishFailed = () => {
        toast.warn("Please fill in all the required details !");
    }

    return (
        <div>
            <Form
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <CustomCardView>
                    <CustomRow space={[12, 12]}>
                        <Col span={24} md={8}>
                            <img src={AvImg} />
                        </Col>
                        <Col span={24} md={8}>
                            <CustomInput label={"Mail Id"} name={'email'} type={"email"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Mail ID"
                                    }
                                ]} />
                            <CustomInputPassword label={"Old Password"} name={'oldPassword'}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Old Password"
                                    }
                                ]}
                            />
                        </Col>
                        <Col span={24} md={8}>
                            <CustomInputPassword label={"New Password"} name={'newPassword'}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter New Password"
                                    }
                                ]}
                            />
                            <Flex center={'true'} style={{ marginTop: '45px' }}>
                                <Button.Primary text={"Change Password"} htmlType={"submit"} />
                            </Flex>
                        </Col>
                    </CustomRow>

                </CustomCardView>
            </Form>
        </div>
    )
}
