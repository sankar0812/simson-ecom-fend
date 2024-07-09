import { Button, CustomInput } from '@components/form'
import { CustomRow, Flex } from '@components/others'
import { getVariation } from '@modules/Products/ProductSlice'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Col, Form } from 'antd'
import { useEffect, useState } from 'react'
import { IoMdRemoveCircle } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


export const AddVariation = ({ formReset, handleClose, variationhandleOk,formClose }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        form.resetFields();
    }, [form, formReset])

    const onReset = () => {
        form.resetFields();
    }

    const onFinish = (values) => {
        AddVariationPost(values)
        console.log(values,'values');
    };

    const onFinishFailed = () => {
        toast.warn("Please fill in all the required details !");
    };

    const AddVariationPost = async (data) => {
        setLoading(true);
        await baseRequest.post(`${APIURLS.POST_VARIATION}`, data)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Variation Added Successfully',
                    type: 'success',
                })
         
                dispatch(getVariation());
                form.resetFields()
                if (handleClose) {
                    handleClose()
                }
                if (variationhandleOk) {
                    variationhandleOk()
                }
                if(formClose){
                    formClose()
                }
                setLoading(false);
                return response.data;
            })

            .catch(function (error) {
                setLoading(false);
                return errorHandler(error);
            })
    }

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
            initialValues={{ varientLists: [''] }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <CustomRow space={[24, 24]}>

                <Col span={24} md={24}>
                    <CustomInput label={'Variation Name'} placeholder={'Name'} name={'varientName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Variation Name!',
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
                                        <Col span={10} style={{ margin: '25px ' }}>
                                            {fields.length > 1 && (
                                                <IoMdRemoveCircle style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }}
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
                <Button.Success text={'ADD'} loading={loading} htmlType={'submit'} />
                <Button.Danger text={'RESET'} onClick={onReset} />
            </Flex>
        </Form>
    )
}
