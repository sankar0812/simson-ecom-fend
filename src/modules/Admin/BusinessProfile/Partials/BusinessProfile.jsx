import { Col, Form, Spin } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { CustomCardView, CustomRow, Flex } from "@components/others";
import { useDispatch, useSelector } from "react-redux";
import { Button, CustomInput, CustomInputNumber, CustomTextArea, CustomUpload } from "@components/form";
import { IMG_BASE_URL, baseRequest } from "@request/request";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import successHandler from "@request/successHandler";
import { getBusinessProfile, selectAllBusinessProfile } from "@modules/Admin/BusinessProfile/BusinessProfileSlice";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { TbRubberStampOff } from "react-icons/tb";


export const BusinessProfile = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [ImageInitialValue, setImageInitialValue] = useState([]);
    const [signInitialValue, setSignInitialValue] = useState([]);
    const [button, setButton] = useState('Submit');
    const [businessDetails, setBusinessDetails] = useState({});
    const [updateFormData, setUpdateFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalloading, setTotalLoading] = useState(false);



    useEffect(() => {
        if (businessDetails) {
            setBusinessProfile()
        }
    }, [businessDetails, updateFormData])

    const setBusinessProfile = () => {
        form.setFieldsValue({
            companyName: businessDetails?.companyName,
            address: businessDetails?.address,
            pincode: businessDetails?.pincode,
            state: businessDetails?.state,
            country: businessDetails?.country,
            location: businessDetails?.location,
            phoneNumber: businessDetails?.phoneNumber1,
            email: businessDetails?.email,
            gst: businessDetails?.gst,

        })
        form.setFieldsValue({ profile: ImageInitialValue })
        form.setFieldsValue({ signature: signInitialValue })

    }

    useEffect(() => {
        dispatch(getBusinessProfile())
    }, [])

    const selectedBusinessProfile = useSelector(selectAllBusinessProfile)
    console.log(selectedBusinessProfile, 'selectedBusinessProfile');

    useEffect(() => {
        setBusinessDetails(selectedBusinessProfile)
    }, [selectedBusinessProfile])

    useEffect(() => {
        if (businessDetails?.companyName && businessDetails?.companyName.length > 0) {
            setButton('Update')
        }
        else {
            setButton('Submit')
        }
    }, [businessDetails])
    console.log(`${IMG_BASE_URL}${businessDetails?.signatureUrl}`, 'sujinuuu');
    useEffect(() => {
        if (selectedBusinessProfile?.url?.length > 0) {
            setImageInitialValue(
                [{
                    uid: '1',
                    name: 'example.jpg',
                    status: 'done',
                    url: `${IMG_BASE_URL}${businessDetails?.url}`,
                }],
            )
        }
        else {
            setImageInitialValue([]);
        }
        setUpdateFormData(businessDetails)
    }, [businessDetails])

    useEffect(() => {
        if (selectedBusinessProfile?.signatureUrl?.length > 0) {
            setSignInitialValue(
                [{
                    uid: '1',
                    name: 'example.jpg',
                    status: 'done',
                    url: `${IMG_BASE_URL}${businessDetails?.signatureUrl}`,
                }],
            )
        }
        else {
            setSignInitialValue([]);
        }
        setUpdateFormData(businessDetails)
    }, [businessDetails])

    const AddBusinessProfile = async (data) => {
        await baseRequest.post(APIURLS.POSTBUSINESSPROFILE, data)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Company Profile Added Successfully',
                    type: 'success',
                })
                dispatch(getBusinessProfile())
                setButton('Update')
                return response.data;
            })
            .catch(function (error) {
                return errorHandler(error);
            })
    }

    const UpdateBusinessProfile = async (data, id) => {
        setLoading(TbRubberStampOff)
        await baseRequest.put(`${APIURLS.PUTBUSINESSPROFILE}${id}/`, data, config)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Company Profile Updated Successfully',
                    type: 'info',
                })
                dispatch(getBusinessProfile())
                setButton('Update');
                setLoading(false);
                return response.data;
            })
            .catch(function (error) {
                setLoading(false);
                return errorHandler(error);
            })
    }
    const onFinish = (values) => {

        if (button === 'Update') {
            const formData = new FormData()
            formData.append('companyName', values.companyName);
            formData.append('address', values.address);
            formData.append('pincode', values.pincode);
            formData.append('state', values.state);
            formData.append('country', values.country);
            formData.append('location', values.location);
            formData.append('phoneNumber', values.phoneNumber);
            formData.append('email', values.email);
            formData.append('gst', values.gst);

            if (values?.profile[0].originFileObj) {
                values.profile.forEach((file) => {
                    formData.append(`profile`, file.originFileObj);
                });
            }
            if (values?.signature[0].originFileObj) {
                values.signature.forEach((file) => {
                    formData.append(`signature`, file.originFileObj);
                });
            }
            UpdateBusinessProfile(formData, businessDetails?.companyId);
        }
        else {
            const formData = new FormData()
            formData.append('companyName', values.companyName);
            formData.append('address', values.address);
            formData.append('pincode', values.pincode);
            formData.append('state', values.state);
            formData.append('country', values.country);
            formData.append('location', values.location);
            formData.append('phoneNumber', values.phoneNumber);
            formData.append('email', values.email);
            formData.append('gst', values.gst);

            if (values?.profile && values.profile.length > 0) {
                values.profile.forEach((file) => {
                    formData.append(`profile`, file.originFileObj);
                });
            } else {
                console.error('No profile selected');
            }

            if (values?.signature && values.signature.length > 0) {
                values.signature.forEach((file) => {
                    formData.append(`signature`, file.originFileObj);
                });
            } else {
                console.error('No signature selected');
            }
            AddBusinessProfile(formData);
        }

    };


    const onReset = () => {
        form.resetFields()
    };

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return (
        <Fragment>
            <CustomPageTitle Heading={'Business Profile'} />
            <Form
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <CustomCardView>
                    <CustomRow space={[12, 12]}>

                        <Col span={24} md={12}>
                            <CustomInput
                                name={"companyName"}
                                label={"Company Name"}
                                placeholder={"Enter Company Name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Company Name !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomInput
                                label={"Email ID"}
                                placeholder={"Enter Email ID"}
                                name={"email"}
                                type={"email"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Email ID !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomInput
                                name={"phoneNumber"}
                                label={"Phone Number"}
                                placeholder={"Enter Phone Number"}
                                maxLength={10}
                                minLength={10}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Mobile Number !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomInput
                                name={"location"}
                                label={"Location"}
                                placeholder={"Enter Location"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Location !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomInput
                                name={"state"}
                                label={"State"}
                                placeholder={"Enter state"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter State !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomInput
                                name={"country"}
                                label={"Country"}
                                placeholder={"Enter country"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Country !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomInputNumber
                                name={"pincode"}
                                label={"Pincode"}
                                placeholder={"Enter Pincode"}
                                maxLength={6}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Pincode !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomTextArea
                                label={"Address"}
                                name={"address"}
                                placeholder={"Enter Address"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Address !",
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24} md={12}>
                            <CustomInput
                                name={"gst"}
                                label={"Gst In"}
                                placeholder={"Enter Gst"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Gst !",
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24} md={12}>
                            <CustomUpload form={form} label={'Signature'}
                                name={'signature'} listType='picture-card' maxCount={1} initialValue={signInitialValue}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Upload Signature !",
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24} md={12}>
                            <CustomUpload form={form} label={'Company Logo'}
                                name={'profile'} listType='picture-card' maxCount={1} initialValue={ImageInitialValue}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Upload Profile Pic !",
                                    },
                                ]}
                            />
                        </Col>

                    </CustomRow>

                    <Flex center={'true'} gap={'20px'} style={{ marginTop: "20px" }}>
                        {
                            button === 'Submit' && (<Button.Primary text={'Submit'} loading={loading} htmlType={'submit'} />)
                        }
                        {
                            button === 'Submit' && (<Button.Danger text={'Cancel'} onClick={() => onReset()} />)
                        }
                        {
                            button === 'Update' && (<Button.Primary text={'Update'} loading={loading} htmlType={'submit'} />)
                        }

                    </Flex>
                </CustomCardView>
            </Form>

        </Fragment>
    );
};