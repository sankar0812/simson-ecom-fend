import { Button, CustomInput, CustomInputNumber, CustomTextArea } from '@components/form'
import { CustomCardView, CustomRow, Flex } from '@components/others'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddDescriptionModals = ({ record,productIdrecord ,categoryIdrecord,trigger,handleOk}) => {

    console.log(record?.productImagesId,'recccccccccc');
    console.log(productIdrecord,'productIdrecordproductIdrecord');
    console.log(categoryIdrecord,'categoryIdrecordcategoryIdrecord');

    const [form] = Form.useForm()

    useEffect(() => {
        form.resetFields();
    }, [trigger])

    useEffect(() => {
        form.setFieldsValue({ productImagesId: record?.productImagesId,
            productId : productIdrecord,
            categoryId : categoryIdrecord
         })
    }, [record,trigger])

    const onReset = () => {
        form.resetFields();
    }
    const AddDescriptionPost = async (data) => {
        await baseRequest.post(`${APIURLS.POST_DASHBOARD1}`, data)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Description Added Successfully',
                    type: 'success',
                })
                form.resetFields(['description'])
                handleOk()
                return response.data;
            })
            .catch(function (error) {
                return errorHandler(error);
            })
    }
    const onFinish = (data) => {
        AddDescriptionPost(data)
        console.log(data, 'hh');
    };

    const onFinishFailed = () => {
        toast.warn("Please fill in all the required details !");
    };

    return (

        <Form
            name='AddDescriptionForm'
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

            <CustomRow space={[24, 24]}>

                <Col span={24} md={24}>
                    <CustomTextArea label={'Description'} name={'description'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Description !',
                            }
                        ]}
                    />
                    <CustomInput name={'productImagesId'} display={'none'} />
                    <CustomInput name={'productId'} display={'none'}/>
                    <CustomInput name={'categoryId'} display={'none'} />
                </Col>

            </CustomRow>

            <Flex center gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Add'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>

    )
}

export default AddDescriptionModals

