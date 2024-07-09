import {
  Button,
  CustomAddSelect,
  CustomInput,
  CustomTable,
  CustomTextArea,
  CustomUpload,
} from "@components/form";
import { CustomModal, CustomRow, Flex } from "@components/others";
import { IMG_BASE_URL, baseRequest } from "@request/request";
import { Card, Col, Divider, Form, Spin } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddVariation } from "./AddVariations";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";
import TableProduct from "./TableProduct";
import { ProductBrand, ProductCategory } from "./ProductsAllModals";
import {
  getBrand,
  getCategory,
  getVariation,
  selectBrand,
  selectCategory,
  selectVariation,
} from "@modules/Products/ProductSlice";
import { RemoveBtn } from "./style";
import { APIURLS } from "@request/apiUrls/urls";
import { AiFillPlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { EditProductImages } from "./EditProductImages";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

export const EditProducts = ({
  handleProductGet,
  Formcancel,
  FormUpdateProduct,
  Trigger,
  CloseProduct,
  ItemUpdates,
  SaleTrigger,
  GetPurchaseTable,
  purchaseOk,
  productTrigger,
}) => {
  const [form] = Form.useForm();

  const [VarValueId, setVarValueId] = useState([]);
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [SlicedInitial, setSlicedInitial] = useState([]);
  const [formUpdate, setFormUpdate] = useState(0);
  const [formUpdatebrand, setFormUpdatebrand] = useState(0);
  const [formUpdateCategory, setFormUpdateCategory] = useState(0);
  const [formUpdatesubCatry, setFormUpdatesubCatry] = useState(0);
  const [productdata, setProductDetails] = useState([]);
  const [varientdetails, setVarientDetails] = useState([]);

  const [checked, setChecked] = useState(false);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [modelwith, setModelwith] = useState(0);

  const [imageUrl, setImageUrl] = useState([]);
  const [updateImgUrl, setUpdateImgUrl] = useState([]);

  const [trigger, setTrigger] = useState(0);

  const [productImage, setProductImage] = useState([]);

  const [initialTrigger, setInitialTrigger] = useState(0);
  const [proLoading, setProLoading] = useState(false);
  const [addNew, setAddNew] = useState(0);

  const [initialImages, setInitialImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const CallProduct = () => {
    setAddNew(addNew + 1);
  };

  useEffect(() => {
    form.resetFields();
  }, [productdata, SaleTrigger]);

  useEffect(() => {
    const ProImg = productdata?.productImages?.map((image, index) => ({
      uid: image?.productImagesId,
      name: `example${index + 1}.jpg`,
      status: "done",
      url: `${IMG_BASE_URL}${image?.productImagesUploadUrl}`,
    }));

    setImageInitialValue(ProImg);
    setImageUrl(ProImg);
  }, [productdata]);

  useEffect(() => {
    setSlicedImage(ImageInitialValue); // Pass ImageInitialValue as an argument
  }, [ImageInitialValue]);

  const setSlicedImage = async (ProImg) => {
    if (ProImg && ProImg.length > 0) {
      const ImageObjProduct = await Promise.all(
        ProImg.map(async (value) => {
          const base64Result = await getBase64(value?.originFileObj);
          const SlicedimageUrl = base64Result.slice(
            "data:image/jpeg;base64".length
          );
          const newObj = {
            productImagesUploadUrl: SlicedimageUrl,
          };
          return newObj;
        })
      );

      setSlicedInitial(ImageObjProduct);
    }
  };

  useEffect(() => {
    getIndividualProducts();
  }, []);

  useEffect(() => {
    if (addNew) {
      getIndividualProducts();
    }
  }, [addNew]);

  const getIndividualProducts = async () => {
    setLoading(true);
    await baseRequest
      .get(`${APIURLS.GET_PRODUCTS}/${id}`)
      .then(function (response) {
        successHandler(response, {
          // notifyOnSuccess: true,
          // notifyOnFailed: true,
        });
        console.log(response, "gsdgsgsgsgsg");
        setProductDetails(response.data);
        setVarientDetails(response.data);
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        console.log(error, "indiierrr");
        setLoading(false);
        return errorHandler(error);
      });
  };
  console.log(productdata, "productdata");
  useEffect(() => {
    if (productdata) {
      const tableData = productdata?.varientImages?.map((value, index) => ({
        ...value,
        key: index,
      }));

      setDynamicTableData(tableData);
    }
  }, [productdata]);

  //======    useEffect to SetFields  ======
  useEffect(() => {
    if (productdata) {
      // handlesubpost(productdata.main_category)
      // form.setFieldsValue(productdata)
      form.setFieldsValue({
        productName: productdata?.productName,
        categoryId: productdata?.categoryId,
        brandId: productdata?.brandId,
        brandName: productdata?.brandName,
        categoryName: productdata?.categoryName,
        description:productdata?.description,
        productImages: SlicedInitial,
      });
      // form.setFieldsValue({ productImages: imageUrl })
      setInitialTrigger(initialTrigger + 1);
    }
  }, [productdata, Trigger, FormUpdateProduct]);

  useEffect(() => {
    const tableData = productdata?.productList?.map((value, index) => ({
      ...value,
      key: index,
    }));

    setDynamicTableData(tableData);
  }, [initialTrigger]);

  // useEffect(() => {

  //     const productData = productdata?.productImages?.map((value, index) => ({
  //         ...value,
  //         productImagesId: index
  //     }));

  //     setProdImage(productData);
  // }, [])

  // =============  Dynamic Table Data

  // For Showing on Table
  const [dynamicTableData, setDynamicTableData] = useState([]);
  console.log(dynamicTableData,'dynamicTableData');

  // const tableProducts = useSelector(getTableProducts)

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
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const onReset = () => {
    form.resetFields();
    setDynamicTableData([]);
    setChecked(false);
  };

  const dispatch = useDispatch();
  // const VariationsValues = useSelector(ViewVariationsValues)

  const adding = (values) => {
    const NewValue = {
      ...values,
      productList: dynamicTableData,
      productImages: imageUrl,
    };
    AddProduct(NewValue);
  };
  const findMissingIds = (originalArray, editedArray) => {
    const originalIds = new Set(originalArray.map((item) => item.uid));
    const editedIds = new Set(
      editedArray.map((item) => item.uid).filter((uid) => uid !== undefined)
    );
    const missingIds = [...editedIds].filter((id) => !originalIds.has(id));
    return missingIds;
  };

  const updating = (values) => {
    const checkstatus = imageUrl.some((item) => item.status === "done");

    let productImages; // Initialize ProductImage
    if (checkstatus) {
      productImages = [];
    } else {
      const missingId = findMissingIds(
        values?.productImages,
        ImageInitialValue
      );
      const combinedArray = imageUrl.concat(
        missingId.map((id) => ({
          productImagesId: id,
          deleted: true,
        }))
      );

      productImages = combinedArray;
    }
    const NewValue = { ...values, productImages: productImages };
    UpdateProduct(NewValue);
    console.log(NewValue,'1233455');
  };
  const AddProduct = async (data) => {
    await baseRequest
      .post(`${APIURLS.POST_PRODUCT}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Product Added Successfully",
          type: "success",
        });
        // dispatch(getVariation())
        setDynamicTableData([]);
        onReset();
        if (GetPurchaseTable) {
          GetPurchaseTable();
          purchaseOk();
        }
        if (CloseProduct) {
          CloseProduct();
        }
        if (ItemUpdates) {
          ItemUpdates();
        }

        return response.data;
      })
      .catch(function (error) {
        return errorHandler(error);
      });
  };

  const UpdateProduct = async (data) => {
    setProLoading(true);
    await baseRequest
      .put(`${APIURLS.PATCH_PRODUCTS}/${productdata?.productId}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Product Edited Successfully",
          type: "info",
        });
        // dispatch(getVariation())
        setDynamicTableData([]);
        onReset();
        if (GetPurchaseTable) {
          GetPurchaseTable();
          purchaseOk();
        }
        if (CloseProduct) {
          CloseProduct();
        }
        if (ItemUpdates) {
          ItemUpdates();
        }
        setProLoading(false);
        getIndividualProducts();
        console.log(response,'dddddddd');
        return response.data;
      })
      .catch(function (error) {
        setProLoading(false);
        return errorHandler(error);
      });
  };

  const onFinish = (values) => {
    if (productdata) {
      updating(values);
      console.log(values,'values');
      console.log('kkkkkkkkkkkkkk');
    } else {
      adding(values);
    }
    console.log(values, "SDDDDD");
  };

  const onSubmit = () => {
    form.submit();
  };

  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };

  // const onViewRow = () => {
  //     setTrigger(trigger + 1)
  //     setModelwith(500)
  //     setModalTitle("Add Unit");
  //     setModalContent(<AddProductUnit handleClose={handleOk} FormUpdateCall={FormUpdateCall} formReset={FormReset} GetUnit={GetUnit} />);
  //     showModal();
  // };

  const onViewBrand = () => {
    setTrigger(trigger + 1);
    setModelwith(500);
    setModalTitle("Add Brand");
    setModalContent(
      <ProductBrand handleClose={handleOk} formReset={formReset} />
    );
    showModal();
  };

  const onViewCategory = () => {
    setTrigger(trigger + 1);
    setModelwith(500);
    setModalTitle("Add Category");
    setModalContent(
      <ProductCategory handleClose={handleOk} formReset={formReset} />
    );
    showModal();
  };

  const handleAddvariations = () => {
    dispatch(getVariation());
  };

  const variationAdd = (record) => {
    setTrigger(trigger + 1);
    setModelwith(600);
    setModalTitle("Add Variations");
    setModalContent(
      <AddVariation
        handleClose={handleOk}
        formReset={FormReset}
        productdata={record}
        handleAddvariations={handleAddvariations}
      />
    );
    showModal();
  };

  const EditImages = (productdata) => {
    setTrigger(trigger + 1);
    setModelwith(600);
    setModalTitle("Edit Images");
    setModalContent(
      <EditProductImages
        handleClose={handleOk}
        formReset={FormReset}
        imagedata={productdata}
        handleAddvariations={handleAddvariations}
      />
    );
    showModal();
  };

  const onEditVariant = (record) => {
    setTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Update ProductList");
    setModalContent(
      <TableProduct
        handleOk={handleOk}
        callproduct={CallProduct}
        SetDynamicEditTable={SetDynamicEditTable}
        SetDynamicTable={SetDynamicTable}
        handleClose={handleOk}
        formReset={FormReset}
        trigger={trigger}
        FormUpdatecatry={FormUpdateCategory}
        UpdateSunCategory={FormUpdateSubCategory}
        productdata={productdata}
        handlerecord={record}
      />
    );
    showModal();
  };

  // useEffect(() => {
  //     GetUnit()
  // }, [formUpdate])

  // const GetUnit = () => {
  //     baseRequest.get(`${UNIT_GET_URL}`)
  //         .then(function (response) {
  //             setUnitArray(response.data);
  //         })
  //         .catch(function (error) {
  //             console.log(error)
  //         });
  // }

  const FormUpdateCall = () => {
    setFormUpdate(formUpdate + 1);
  };

  const FormReset = () => {
    setFormReset(formReset + 1);
  };

  //   =========== brand =========

  const AllBrands = useSelector(selectBrand);

  const FormUpdateCallBrand = () => {
    setFormUpdatebrand(formUpdatebrand + 1);
  };

  useEffect(() => {
    dispatch(getBrand());
  }, [formUpdatebrand]);

  const BrandOption = AllBrands?.map((item) => ({
    label: item.brandName,
    value: item.brandId,
  }));

  const handleGetbarnd = () => {
    dispatch(getBrand());
  };

  //   =========== category =========

  const AllCategory = useSelector(selectCategory);

  const FormUpdateCategory = () => {
    setFormUpdateCategory(formUpdateCategory + 1);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [formUpdateCategory]);

  const CategoryOption = AllCategory?.map((item) => ({
    label: item.categoryName,
    value: item.categoryId,
  }));

  const [selectedid, setSelectedid] = useState({});

  const handleSelectCompany = (value) => {
    const SelectedCompany = AllCategory?.find((mem) => mem.category === value);
    setSelectedid(SelectedCompany);
  };

  // useEffect(() => {
  //     form.setFieldsValue({ id: selectedid?.id })
  // }, [selectedid])

  //   =========== sub category =========

  // const AllSubCategory = useSelector(selectAllSubCategory)

  const FormUpdateSubCategory = () => {
    // handlesubpost();
    setFormUpdatesubCatry(formUpdatesubCatry + 1);
  };

  // =========== variations ===========

  const AllVariations = useSelector(selectVariation);
  const variationsValueArray = AllVariations?.map(
    (item) => item.variations_value
  );

  useEffect(() => {
    dispatch(getVariation());
  }, []);

  const handleChange = (event) => {
    const send = AllCategory.find((val) => val.categoryId === event);
    form.setFieldsValue({ categoryName: send?.categoryName });
  };

  const handlechangeBrand = (value) => {
    const sendbrand = AllBrands.find((val) => val.brandId === value);
    form.setFieldsValue({ brandName: sendbrand?.brandName });
  };

  useEffect(() => {
    form.setFieldsValue({
      id: VarValueId.object?.id,
    });
  }, [VarValueId]);

  // ---------- SET VALUE TO DYNAMIC DATA ------

  const SetDynamicTable = (value) => {
    console.log(value, "dynamicTable");
    setDynamicTableData((prev) => {
      if (!Array.isArray(prev)) {
        // If prev is not an array, create a new array with the current and new value
        return [{ ...value, key: 0 }];
      }
      console.log(prev, "prevvv");
      // If prev is an array, create a new array with the previous elements and the new value
      // return [...prev, value];
      const maxKey = Math.max(...prev.map((item) => item.key), 0);
      console.log(maxKey, "maxKey");
      return [...prev, { ...value, key: maxKey + 1 }];
    });
  };
  console.log(dynamicTableData, "daaaaaaaa");
  const SetDynamicEditTable = (value) => {
    // if (productdata.product) {
    setDynamicTableData((prev) => {
      if (!Array.isArray(prev)) {
        // If prev is not an array, create a new array with the current and new value
        return [{ ...value, key: 0 }];
      }

      const rowIndexToUpdate = dynamicTableData.findIndex(
        (item) => item.key === value.key
      );

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
      setDynamicTableData(newArr);
    } else {
      setDynamicTableData(newArr);
    }
  };

  const handleConfirm = (index) => {
    RowRemove(index);
  };

  const columns = [
    {
      title: "Sl.No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Size",
      dataIndex:"sizeName",
      // render: (record) => {
      //   return (
      //     <CustomRow style={{ width: "50px" }}>
      //       {record?.varientList?.map((item, index) => (
      //         <Col span={24} key={index}>
      //           <p>
      //             {item?.sizeName}
      //           </p>
      //         </Col>
      //       ))}
      //     </CustomRow>
      //   );
      // },
    },
    // {
    //   title: "Variant Images",
    //   dataIndex: "varity_images",
    //   render: (text, record, index) => {
    //     console.log(record, "varity_images");

    //     let variantImages;
    //     variantImages = "dsgdsfgdfo";

    //     const checkstatus = imageUrl.some((item) => item.status === "done");
    //     return (
    //       <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
    //         {record?.varientImages?.map((imgObj, index) => (
    //           <div key={index} style={{ height: "40px", width: "40px" }}>
    //             {productdata ? (
    //               <img
    //                 src={`${IMG_BASE_URL}${imgObj.productVarientImageUrl}`}
    //                 style={{ height: "40px", width: "40px" }}
    //               />
    //             ) : (
    //               <img
    //                 src={`${imgObj.url}`}
    //                 style={{ height: "40px", width: "40px" }}
    //               />
    //             )}
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Mrp",
      dataIndex: "mrp",
    },
    {
      title: "Buy Rate",
      dataIndex: "buyRate",
    },
    {
      title: "Sell Rate",
      dataIndex: "sellRate",
    },
    {
      title: "GST %",
      dataIndex: "gst",
    },
    {
      title: "GST Tax Amount",
      dataIndex: "gstTaxAmount",
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
    },
    {
      title: "Discount Amount",
      dataIndex: "discountAmount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <Flex gap={"true"} center={"true"}>
            {productdata ? (
              <RemoveBtn>
                <AiFillPlusCircle
                  style={{
                    fontSize: "23px",
                    marginRight: "10px",
                    color: "blue",
                  }}
                  onClick={() => onEditVariant(record)}
                />
              </RemoveBtn>
            ) : null}

            {/* <CustomPopConfirm
                            record={record}
                            confirm={() => handleConfirm(index)}
                            // cancel={handlePopConfrmCancel}
                            title={"Delete the Varient"}
                            description={"Are you sure to delete this Variation ?"}>
                        <RemoveBtn>
                            <IoMdRemoveCircle style={{ fontSize: '25px', color: 'red' }} />
                        </RemoveBtn>
                        </CustomPopConfirm> */}
          </Flex>
        );
      },
    },
  ];

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });

  const handleproductImage = async (img) => {
    if (img.fileList.length > 0) {
      const updatedFileList = await Promise.all(
        img.fileList.map(async (value) => {
          // Assuming getBase64 returns a Promise
          if (value?.originFileObj) {
            const base64Result = await getBase64(value?.originFileObj);
            const slicedImageUrl = base64Result.slice(
              `data:${value.type};base64,`.length
            );

            // Add the 'url' property to the existing object
            return {
              productImagesUploadUrl: slicedImageUrl,
            };
          } else {
            // If 'originFileObj' is not present, return the original object
            return {
              productImagesId: value.uid,
              deleted: false,
            };
          }
        })
      );
      console.log(updatedFileList, "llllll");
      setImageUrl(updatedFileList);
    }
  };
  return (
    <Fragment>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 80,
              position: "fixed",
            }}
            spin
          />
        }
        spinning={loading}
        size="large"
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          name="product"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomRow space={[24, 24]}>
            <Col span={24} md={8}>
              <div style={{ margin: "50px 0px" }}>
                <h3 style={{ fontSize: "18px" }}>Product Name & Categories</h3>
                <br />
              </div>
            </Col>

            <Col span={24} md={16}>
              <Card>
                <CustomRow space={[24, 24]}>
                  <Col span={24} md={20}>
                    <CustomInput
                      label={"Product Name"}
                      name={"productName"}
                      placeholder={"Enter Product Name"}
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Product Name!",
                        },
                      ]}
                    />
                  </Col>

                  <Col span={24} md={20}>
                    <CustomAddSelect
                      label={"Category"}
                      name={"categoryId"}
                      placeholder={"Enter Category Name"}
                      onButtonClick={onViewCategory}
                      options={CategoryOption}
                      onChange={handleChange}
                      rules={[
                        {
                          required: true,
                          message: "Please Select Category!",
                        },
                      ]}
                    />
                    <CustomInput name={"categoryName"} display={"none"} />
                  </Col>

                  <Col span={24} md={20}>
                    <CustomAddSelect
                      label={"Brand"}
                      name={"brandId"}
                      placeholder={"Enter Brand Name"}
                      rules={[
                        {
                          required: true,
                          message: "Please Select Brand Name",
                        },
                      ]}
                      onButtonClick={onViewBrand}
                      options={BrandOption}
                      onChange={handlechangeBrand}
                    />
                    <CustomInput name={"brandName"} display={"none"} />
                  </Col>

                  <Col span={24} md={20}>
                    <CustomUpload
                      onChange={handleproductImage}
                      multiple={true}
                      form={form}
                      label={"Product Image (Multi Select)"}
                      initialValue={ImageInitialValue}
                      name={"productImages"}
                      listType="picture-card"
                      maxCount={4}
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

                  <Col span={24} md={20}>
                    <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
                      <Button.Primary
                        text={"Update"}
                        loading={proLoading}
                        htmlType={"submit"}
                      />
                      {/* <Button.Danger text={'Cancel'} onClick={() => Formcancel()} /> */}
                    </Flex>
                  </Col>
                </CustomRow>
              </Card>
            </Col>
          </CustomRow>
        </Form>

        <br />
        <Divider />
        <CustomRow space={[24, 24]}>
          <Col span={24} md={8}>
            <div style={{ margin: "50px 0px" }}>
              <h3 style={{ fontSize: "18px" }}>Product Variation Name</h3>
              <br />
              <p style={{ color: "gray" }}>Select Variation Name from here</p>
            </div>
          </Col>
          <Col span={24} sm={24} md={24} lg={16}>
            <TableProduct
              productid={id}
              formname={"editVarient"}
              callproduct={CallProduct}
              createnew={true}
              SetDynamicEditTable={SetDynamicEditTable}
              SetDynamicTable={SetDynamicTable}
              productdata={dynamicTableData}
            />
          </Col>
        </CustomRow>

        <br />
        <CustomTable columns={columns} data={dynamicTableData} />
      </Spin>
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modelwith}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
