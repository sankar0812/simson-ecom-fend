
import { Button, CustomUpload } from "@components/form";
import { CustomRow, Flex } from "@components/others";
import { getProduct } from "@modules/Auth/ExampleGetSlice";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { IMG_BASE_URL, baseRequest } from "@request/request";
import successHandler from "@request/successHandler";
import { Col, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { toast } from "react-toastify";


export const ProductImagesEditModal = ({
    formname,
    editimgrecord,
    prodetails
}) => {
    // ----- Define Form
    const [form] = useForm();
    const [imageUrl, setImageUrl] = useState([])

    console.log(editimgrecord, 'editimgrecordeditimgrecord');
    console.log(prodetails, 'prodetailsprodetails');

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (error) => {
                reject(error)
            };
        });

    const handleproductImage = async (img) => {

        if (img.fileList.length > 0) {
            const ImageObj = await Promise.all(img.fileList.map(async (value) => {

                // Assuming getBase64 returns a Promise
                const base64Result = await getBase64(value.originFileObj);
                const SlicedimageUrl = base64Result.slice("data:image/jpeg;base64,".length)
                // Now, you can use base64Result
                const newObj = {
                    productImagesId: editimgrecord?.productImagesId,
                    productImagesUploadUrl: SlicedimageUrl
                }
                return newObj
            }));

            setImageUrl(ImageObj);
        }
    }

    const onFinish = (values) => {

        const UpdateProduct = async (data) => {
            await baseRequest.patch(`${APIURLS.INDIVIDUAL_PRODUCT_IMG_EDIT}/${prodetails?.productId}`, data)
                .then(function (response) {
                    successHandler(response, {
                        notifyOnSuccess: true,
                        notifyOnFailed: true,
                        msg: 'Product Image Edited Successfully',
                        type: 'success',
                    })

                    return response.data;
                })
                .catch(function (error) {
                    return errorHandler(error);
                })
        }
        UpdateProduct(imageUrl)
    };

    const onFinishFailed = () => {
        toast.warn("Please fill in all the required details !");
     };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            form={form}
            name={formname}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <CustomRow >
                <Col span={24} md={12}>
                    <p style={{ textOrientation: "upright", writingMode: 'unset' }}>Existing Image</p>
                    <img src={`${IMG_BASE_URL}${editimgrecord?.productImagesUploadUrl}`} style={{ height: '100px', width: '100px', objectFit: 'cover' }} />
                </Col>
                <Col span={24} md={12}>
                    <CustomUpload
                        label={"Product Image"}
                        name={"productImage"}
                        listType={'picture-card'}
                        onChange={handleproductImage}
                        maxCount={1}
                        rules={[
                            {
                                required: true,
                                message: "Please Upload an Image !!!",
                            },
                        ]}
                    />
                </Col>
            </CustomRow>
            <Flex gap={"20px"} center={"true"} margin={"20px 0"}>

                <Button.Success text={"Submit"} htmlType={"submit"} />
                <Button.Danger text={"Reset"} onClick={() => onReset()} />

            </Flex>
        </Form>
    );
};

export const AddMoreProductImage = ({
    formname,
    editimgrecord
}) => {
    // ----- Define Form
    const [form] = useForm();
    
    console.log(editimgrecord,'editimgrecordeditimgrecord');
    const onFinish = (values) => {
        const formData = new FormData()

        if (values?.productImage && values.productImage.length > 0) {
            values.productImage.forEach((file) => {
                formData.append(`productImagesUpload`, file.originFileObj);
                formData.append(`productId`, editimgrecord?.productId)
            });
        } else {
            console.error('No Category Image selected');
        }
        AddAdditionalImages(formData);
        console.log([...formData.entries()], 'aditional');
    };
    const AddAdditionalImages = async (data) => {
        await baseRequest.post(`${APIURLS.POST_MORE_PRODUCT_IMG}`, data)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Additional Product Images Added Successfully',
                    type: 'success',
                })
                dispatch(getProduct())
                form.resetFields()
                return response.data;
            })
            .catch(function (error) {
                return errorHandler(error);
            })
    }
    const onFinishFailed = () => { 
        toast.warn("Please fill in all the required details !");
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            form={form}
            name={formname}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <CustomRow >
                <Col span={24} md={24}>
                    <CustomUpload
                        label={"Product Image"}
                        name={"productImage"}
                        listType='picture-card'
                        maxCount={1}
                        rules={[
                            {
                                required: true,
                                message: "Please Upload an Image !!!",
                            },
                        ]}
                    />
                </Col>
            </CustomRow>
            <Flex gap={"20px"} center={"true"} margin={"20px 0"}>

                <Button.Success text={"Submit"} htmlType={"submit"} />
                <Button.Danger text={"Reset"} onClick={() => onReset()} />

            </Flex>
        </Form>
    );
};
