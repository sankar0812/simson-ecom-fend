import { Button, CustomAddSelect, CustomInput, CustomTable, CustomTextArea, CustomUpload } from '@components/form'
import { CustomModal, CustomPopConfirm, CustomRow, Flex } from '@components/others'
import { IMG_BASE_URL, baseRequest } from '@request/request'
import { Card, Col, Divider, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { BiReset } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { AddVariation } from './AddVariations'
import successHandler from '@request/successHandler'
import errorHandler from '@request/errorHandler'
import TableProduct from './TableProduct'
import { ProductBrand, ProductCategory } from './ProductsAllModals'
import { getBrand, getCategory, getVariation, selectBrand, selectCategory, selectVariation } from '@modules/Products/ProductSlice'
import { RemoveBtn } from './style'
import { IoMdRemoveCircle } from 'react-icons/io'
import { APIURLS } from '@request/apiUrls/urls'
import { AiFillPlusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { getOutofStock } from '@modules/Dashboard/DashboardSlice'


export const AddProducts = ({ productdata, Formcancel, FormUpdateProduct, Trigger, CloseProduct, ItemUpdates, SaleTrigger, GetPurchaseTable, purchaseOk }) => {
console.log(productdata,'productdata');
    const [form] = Form.useForm()
    const dispatch = useDispatch();

    const [VarValueId, setVarValueId] = useState([])
    const [ImageInitialValue, setImageInitialValue] = useState([]);
    const [SlicedInitial, setSlicedInitial] = useState([])
    const [formUpdate, setFormUpdate] = useState(0);
    const [formUpdatebrand, setFormUpdatebrand] = useState(0);
    const [formUpdateCategory, setFormUpdateCategory] = useState(0);
    const [formUpdatesubCatry, setFormUpdatesubCatry] = useState(0);

    const [checked, setChecked] = useState(false)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [modelwith, setModelwith] = useState(0);
    const [imageUrl, setImageUrl] = useState([])
    const [trigger, setTrigger] = useState(0);
    const [initialTrigger, setInitialTrigger] = useState(0)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        form.resetFields()
    }, [productdata, SaleTrigger])

    useEffect(() => {
        const ProImg = productdata?.productImages?.map((image, index) => ({
            uid: image?.productImagesId,
            name: `example${index + 1}.jpg`,
            status: 'done',
            url: `${IMG_BASE_URL}${image?.productImagesUploadUrl}`,
        }));

        setImageInitialValue(ProImg);

    }, [productdata]);

    useEffect(() => {
        setSlicedImage(ImageInitialValue); // Pass ImageInitialValue as an argument
    }, [ImageInitialValue]);

    const setSlicedImage = async (ProImg) => {
        if (ProImg && ProImg.length > 0) {
            const ImageObjProduct = await Promise.all(ProImg.map(async (value) => {
                const fr = new FileReader()
                fr.readAsDataURL(value)

                let newObj = {};
                fr.addEventListener('load', () => {
                    const ref = fr.result
                    newObj = {
                        url1: ref,
                    };
                })

                return newObj;
            }));

            setSlicedInitial(ImageObjProduct);
        }
    };

    useEffect(() => {
        if (productdata) {
            const tableData = productdata?.varientImages?.map((value, index) => ({
                ...value,
                key: index
            }));

            setDynamicTableData(tableData);
        }
    }, [productdata]);

    //======    useEffect to SetFields  ======

    useEffect(() => {
        if (productdata) {
            form.setFieldsValue({
                productName: productdata?.productName,
                categoryId: productdata?.categoryId,
                brandId: productdata?.brandId,
                productImages: SlicedInitial,
                description:productdata?.description,
            })
            // form.setFieldsValue({ productImages: imageUrl })
            setInitialTrigger(initialTrigger + 1)
        }
    }, [productdata, Trigger, FormUpdateProduct])

    useEffect(() => {
        const tableData = productdata?.productList.map((value, index) => ({
            ...value,
            key: index
        }));

        setDynamicTableData(tableData);
    }, [initialTrigger])

    // =============  Dynamic Table Data

    // For Showing on Table 
    const [dynamicTableData, setDynamicTableData] = useState([])
    console.log(dynamicTableData,'dynamicTableData');


    // ===== Modal Functions Start =====
    const showModal = () => {
        setIsModalOpen(true);
        // productdata(true)
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormRest()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    };

    const onReset = () => {
        form.resetFields();
        setDynamicTableData([])
        setChecked(false)
    }

    const adding = (values) => {
        console.log(values,'values');
        const NewValue = { ...values, productList: dynamicTableData, productImages: imageUrl }
        AddProduct(NewValue)
        console.log(NewValue,'NewValuesimson');
    }

    const updating = (values) => {
        const NewValue = { ...values, productList: dynamicTableData, productImages: imageUrl }
        UpdateProduct(NewValue)
        console.log(NewValue,'NewValue');
       
    }

    const onFinish = (values) => {
        console.log(values,'values');
        if (productdata) {
            console.log(productdata,'called');
            updating(values)

        } else {

            if (dynamicTableData !== undefined) {
                adding(values)
            } else {
                toast.info('Please add atleast one variant')
            }
        }
    };
    const AddProduct = async (data) => {
        setLoading(true);
        await baseRequest.post(`${APIURLS.POST_PRODUCT}`, data)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Product Added Successfully',
                    type: 'success',
                })
                setDynamicTableData([])
                onReset()
                if (GetPurchaseTable) {
                    GetPurchaseTable()
                    purchaseOk()
                }
                if (CloseProduct) {
                    CloseProduct()
                }
                if (ItemUpdates) {
                    ItemUpdates()
                }
                dispatch(getOutofStock())
                setLoading(false)
                return response.data;
            })
            .catch(function (error) {
                setLoading(false)
                return errorHandler(error);
            })
    }

    const UpdateProduct = async (data) => {
        await baseRequest.patch(`${APIURLS.PATCH_PRODUCTS}/${productdata?.productId}`, data)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Product Edited Successfully',
                    type: 'success',
                })
                setDynamicTableData([])
                onReset()
                if (GetPurchaseTable) {
                    GetPurchaseTable()
                    purchaseOk()
                }
                if (CloseProduct) {
                    CloseProduct()
                }
                if (ItemUpdates) {
                    ItemUpdates()
                }
                dispatch(getOutofStock())
                console.log(response,'datassssssss');
                return response.data;
            })
            .catch(function (error) {
                return errorHandler(error);
            })
    }

    const onSubmit = () => {
        form.submit();
    }

    const onFinishFailed = () => {
        toast.warn("Please fill in all the required details !");
    };


    const onViewBrand = () => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Add Brand");
        setModalContent(<ProductBrand handleClose={handleOk} formReset={formReset} />);
        showModal();
    }

    const onViewCategory = () => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Add Category");
        setModalContent(<ProductCategory handleClose={handleOk} formReset={formReset} />);
        showModal();
    }

    const handleAddvariations = () => {
        dispatch(getVariation())
    }

    const variationAdd = (record) => {
        setTrigger(trigger + 1)
        setModelwith(600)
        setModalTitle("Add Variations");
        setModalContent(<AddVariation handleClose={handleOk} formReset={FormReset} productdata={record} handleAddvariations={handleAddvariations} />);
        showModal();
    }

    const onEditVariant = (record) => {
        setTrigger(trigger + 1)
        setModelwith(800)
        setModalTitle("Update Category");
        setModalContent(<TableProduct handleOk={handleOk} SetDynamicEditTable={SetDynamicEditTable} SetDynamicTable={SetDynamicTable} handleClose={handleOk} formReset={FormReset} trigger={trigger} FormUpdatecatry={FormUpdateCategory} UpdateSunCategory={FormUpdateSubCategory} productdata={productdata} handlerecord={record} />);
        showModal();
    }

    const FormUpdateCall = () => {
        setFormUpdate(formUpdate + 1)
    }

    const FormReset = () => {
        setFormReset(formReset + 1)
    }

    //   =========== brand =========


    const AllBrands = useSelector(selectBrand)

    const FormUpdateCallBrand = () => {
        setFormUpdatebrand(formUpdatebrand + 1)
    }

    useEffect(() => {
        dispatch(getBrand())
    }, [formUpdatebrand])


    const BrandOption = AllBrands?.map((item) => ({ label: item.brandName, value: item.brandId }));
    const handleGetbarnd = () => {
        dispatch(getBrand())
    }

    //   =========== category =========

    const AllCategory = useSelector(selectCategory)

    const FormUpdateCategory = () => {
        setFormUpdateCategory(formUpdateCategory + 1)
    }

    useEffect(() => {
        dispatch(getCategory())
    }, [formUpdateCategory])

    const CategoryOption = AllCategory?.map((item) => ({ label: item.categoryName, value: item.categoryId }));
    const [selectedid, setSelectedid] = useState({})

    const handleSelectCompany = (value) => {
        const SelectedCompany = AllCategory?.find((mem) => mem.category === value);
        setSelectedid(SelectedCompany);
    };

    const FormUpdateSubCategory = () => {
        // handlesubpost();
        setFormUpdatesubCatry(formUpdatesubCatry + 1)
    }

    // =========== variations ===========

    const AllVariations = useSelector(selectVariation);
    const variationsValueArray = AllVariations?.map((item) => item.variations_value);
    useEffect(() => {
        dispatch(getVariation())
    }, [])

    const VariationOption = AllVariations?.map((item) => ({ label: item.variations_name, value: item.variations_name }));

    // =========================  Other Functions End  =========================


    const handleChange = (event) => {
        const send = AllCategory.find(val => val.categoryId === event)
        form.setFieldsValue({ categoryName: send?.categoryName })
    };

    const handlechangeBrand = (value) => {
        const sendbrand = AllBrands.find(val => val.brandId === value)
        form.setFieldsValue({ brandName: sendbrand?.brandName })
    }

    useEffect(() => {
        form.setFieldsValue({
            id: VarValueId.object?.id
        });
    }, [VarValueId])

    // ---------- SET VALUE TO DYNAMIC DATA ------

    const SetDynamicTable = (value) => {
        setDynamicTableData((prev) => {
            if (!Array.isArray(prev)) {
                // If prev is not an array, create a new array with the current and new value
                return [{ ...value, key: 0 }];
            }

            // If prev is an array, create a new array with the previous elements and the new value
            // return [...prev, value];
            const maxKey = Math.max(...prev.map(item => item.key), 0);
            return [...prev, { ...value, key: maxKey + 1 }];
        });


    }

    const SetDynamicEditTable = (value) => {
        // if (productdata.product) {
        setDynamicTableData((prev) => {

            if (!Array.isArray(prev)) {
                // If prev is not an array, create a new array with the current and new value
                return [{ ...value, key: 0 }];
            }

            const rowIndexToUpdate = dynamicTableData.findIndex((item) => item.key === value.key);

            if (rowIndexToUpdate !== -1) {
                // Create a copy of the previous array
                const updatedDynamicTable = [...prev];

                // Update the values for the row at the specified index
                updatedDynamicTable[rowIndexToUpdate] = { ...value };

                return updatedDynamicTable;
            }

            // Find the index of the row to update based on the key

            // If the row doesn't exist, simply add it to the end of the array
            const maxKey = Math.max(...prev.map((item) => item.key), 0);
            return [...prev, { ...value, key: maxKey + 1 }];
        });
        // }
    };

    // }

    const RowRemove = (index) => {
        const newArr = [];

        for (let i = 0; i < dynamicTableData.length; i++) {
            if (i !== index) {
                newArr.push(dynamicTableData[i]);
            }
        }
        if (productdata?.product) {
            setDynamicTableData(newArr)
        }
        else {
            setDynamicTableData(newArr)
        }
    }

    const handleConfirm = (index) => {
        RowRemove(index)
    }
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
                const slicedImageUrl = base64Result.slice(`data:${value.type};base64,`.length);
                // Now, you can use base64Result
                const newObj = {
                    productImagesUploadUrl: slicedImageUrl,
                    type: value.type
                }

                return newObj

            }));

            setImageUrl(ImageObj);

        }

    }
    const columns = [

        {
            title: 'Sl.No',
            render: (value, item, index) => index + 1,
        },
        // {
        //     title: 'Size',
        //     render: (record) => {
        //         return (
        //             <CustomRow style={{ width: '60px' }}>
        //                 {
        //                     record?.varientList?.map((item, index) => (
        //                         <Col span={24} key={index}>
        //                             <p>{item?.sizeName}</p>
        //                         </Col>
        //                     ))
        //                 }
        //             </CustomRow>
        //         )
        //     }
        // },
        // {
        //     title: 'Variant Images',
        //     dataIndex: 'varity_images',
        //     render: (text, record, index) => {
        //         return (
        //             <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>

        //                 {record?.varientImages?.map((imgObj, index) => {
        //                     return (
        //                         <div key={index} style={{ height: '40px', width: '40px', }}>
        //                             {
        //                                 productdata ? (
        //                                     <img src={`${IMG_BASE_URL}${imgObj.productVarientImageUrl}`} style={{ height: '40px', width: '40px' }} />
        //                                 ) : (<img src={`data:${imgObj.type};base64,${imgObj.productVarientImageUrl}`} style={{ height: '40px', width: '40px' }} />)
        //                             }

        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //         )
        //     }
        // },
        {
            title: 'Size',
            dataIndex: 'sizeName',
        },
        {
            title: 'Mrp',
            dataIndex: 'mrp',
        },
        {
            title: 'Buy Rate',
            dataIndex: 'buyRate',
        },
        {
            title: 'Sale Rate',
            dataIndex: 'sellRate',
        },
        {
            title: 'Sale Rate',
            dataIndex: 'sellRate',
        },
        {
            title: 'GST',
            dataIndex: 'gst',
        },
        {
            title: 'GST Tax Amount',
            dataIndex: 'gstTaxAmount',
        },
        {
            title: 'Discount Percent',
            dataIndex: 'discountPercentage',
        },
        {
            title: 'Discount Amount',
            dataIndex: 'discountAmount',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <Flex gap={'true'} center={'true'}>
                        {productdata ? <RemoveBtn>
                            <AiFillPlusCircle style={{ fontSize: '23px', marginRight: '10px', color: 'blue' }} onClick={() => onEditVariant(record)} />
                        </RemoveBtn> : null}

                        <CustomPopConfirm
                            record={record}
                            confirm={() => handleConfirm(index)}
                            // cancel={handlePopConfrmCancel}
                            title={"Delete the Varient"}
                            description={"Are you sure to delete this Variation ?"}>

                            <RemoveBtn>
                                <IoMdRemoveCircle style={{ fontSize: '25px', color: 'red' }} />
                            </RemoveBtn>
                        </CustomPopConfirm>
                    </Flex>
                )
            }
        }
    ]

    return (
        <Fragment>
            <Form
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                name='product'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

                autoComplete="off">
                <CustomRow space={[24, 24]}>
                    <Col span={24} md={8} >
                        <div style={{ margin: '50px 0px' }}>
                            <h3 style={{ fontSize: '18px' }}>Product Name & Categories</h3><br />
                        </div>

                    </Col>

                    <Col span={24} md={16}>
                        <Card>
                            <CustomRow space={[24, 24]}>
                                <Col span={24} md={20}>
                                    <CustomInput label={'Product Name'} name={'productName'} placeholder={'Enter Product Name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Product Name!',
                                            }
                                        ]} />

                                </Col>
                                <Col span={24} md={20}>
                                    <CustomAddSelect label={'Category'} name={'categoryId'} placeholder={'Enter Category Name'} onButtonClick={onViewCategory} options={CategoryOption} onChange={handleChange} rules={[
                                        {
                                            required: true,
                                            message: 'Please Select Category!',
                                        }
                                    ]} />
                                    <CustomInput name={'categoryName'} display={'none'} />
                                </Col>
                                <Col span={24} md={20}>
                                    <CustomAddSelect label={'Brand'} name={'brandId'} placeholder={'Enter Brand Name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Select Brand Name !',
                                            }
                                        ]} onButtonClick={onViewBrand} options={BrandOption} onChange={handlechangeBrand} />
                                    <CustomInput name={'brandName'} display={'none'} />
                                </Col>
                                <Col>
                                    <CustomUpload multiple={true} onChange={handleproductImage} form={form} label={'Product Image (Multi Select)'} initialValue={SlicedInitial}
                                        name={'productImages'} listType='picture-card' maxCount={4}
                                    // accept=".png,.jpeg,.jpg"
                                    />
                                </Col>
                                <Col span={24} md={20}>
                            <CustomTextArea
                                label={"Description"}
                                name={"description"}
                                placeholder={"Enter description"}
                            />
                        </Col>
                            </CustomRow>
                        </Card>
                    </Col>
                </CustomRow>
            </Form>
            <br />
            <Divider />
            <CustomRow space={[24, 24]}>
                <Col span={24} md={8} >
                    <div style={{ margin: '50px 0px' }}>
                        <h3 style={{ fontSize: '18px' }}>Product Variation Name</h3><br />
                        <p style={{ color: 'gray' }}>Select Variation Name from here</p>
                    </div>
                </Col>
                <Col span={24} sm={24} md={24} lg={16}>
                    <TableProduct formname={'addvarient'} SetDynamicEditTable={SetDynamicEditTable} SetDynamicTable={SetDynamicTable} productdata={dynamicTableData} />
                </Col>
            </CustomRow>
            <br />
            <CustomTable columns={columns} data={dynamicTableData} />
            {productdata ?
                (<Flex center={'true'} gap={'20px'} margin={'20px 0px'}>
                    <Button.Primary text={'Update'} onClick={() => onSubmit()} />
                    <Button.Danger text={'Cancel'} onClick={() => Formcancel()} />
                </Flex>)
                :
                <Flex center={'true'} gap={'20px'} margin={'20px 0px'}>
                    <Button.Primary text={'Save'} onClick={() => onSubmit()} loading={loading} />
                    <Button.Danger text={'Reset'} icon={<BiReset style={{ marginRight: '5px' }} />} onClick={() => onReset()} />
                </Flex>
            }
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

        </Fragment>
    )
}
