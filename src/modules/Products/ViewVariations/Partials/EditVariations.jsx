import { Button, CustomInput } from '@components/form'
import { CustomRow, Flex } from '@components/others'
import { getVariation } from '@modules/Products/ProductSlice'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoMdRemoveCircle } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


export const EditVariation = ({ variationrecord, updateFormReset, variationhandleOk }) => {
    console.log(variationrecord,'variationrecord');


    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading,setloading] = useState(false);
    const EDIT__VARIATION_URL = 'product/edit_variations'

    // useEffect(() => {
    //     form.resetFields();
    // }, [updateFormReset])
    
    useEffect(() => {
        form.setFieldsValue(variationrecord)
    }, [variationrecord,updateFormReset])

    const onReset = () => {
        form.resetFields();
    }
    const UpdateVariation = async (values) => {
        setloading(true);
        await baseRequest.put(`${APIURLS.PUT_VARIATION}/${variationrecord?.varientId}/`,values)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Variation Updated Successfully',
                    type: 'info',
                })
                dispatch(getVariation())
                variationhandleOk();
                setloading(false);
                return response.data;
            })
            .catch(function (error) {
                setloading(false);
                return errorHandler(error);
            })
    }

    const onFinish = (values) => {
        UpdateVariation(values)
    };

    const onFinishFailed = () => {
        toast.warn("Please fill in all the required details !");
    };

    return (

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
            <CustomRow space={[24, 24]}>

                <Col span={24} md={24}>
                    <CustomInput label={'Variation Name'} placeholder={'Name'} name={'varientName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter unit!',
                            }
                        ]}
                    />
                </Col>
                {/* <Col span={24} md={24}>

                    <Form.List name="varientLists"  >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <CustomRow gutter={[24, 24]}>
                                        <Col span={10}>
                                            <CustomInput label={'variation value'} placeholder="variation value" name={[name, 'varientListName']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'This is required field!',
                                                    }
                                                ]}
                                            />
                                        </Col>
                                        <Col span={10} style={{ margin: '28px ' }}>
                                            {fields.length > 1 && (
                                            <IoMdRemoveCircle style={{ fontSize: '25px', color: 'red',cursor:'pointer' }}
                                            onClick={() => remove(name)}
                                        />
                                            )}
                                        </Col>
                                    </CustomRow>
                                ))}
                                <Form.Item style={{ margin: '20px 10px' }} >
                                    <Button type="dashed" onClick={() => add()} block >
                                        Add
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Col> */}

            </CustomRow>
            <Flex center gap={'20px'} style={{ margin: '30px' }}>
                <Button.Primary text={'UPDATE'} loading={loading} htmlType={'submit'} />
                <Button.Danger text={'CANCEL'} onClick={variationhandleOk} />
            </Flex>
        </Form>
    )
}
