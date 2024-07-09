import { Card, Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CustomAddSelect,
  CustomInput,
  CustomInputNumber,
  CustomMultiSelect,
  CustomRadioButton,
  CustomSelect,
  CustomTextArea,
  CustomUpload,
} from "@components/form";
import { CustomModal, CustomRow, Flex } from "@components/others";
import { getSize, getVariation, selectAllSizes, selectVariation } from "@modules/Products/ProductSlice";
import { IMG_BASE_URL, baseRequest } from "@request/request";
import { EditProductVarientImages } from "./EditProductImages";
import { APIURLS } from "@request/apiUrls/urls";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";
import { getOutofStock } from "@modules/Dashboard/DashboardSlice";
import { toast } from "react-toastify";
import { ProductSize } from "./ProductsAllModals";

const TableProduct = ({
  productid,
  callproduct,
  createnew,
  formname,
  HandleProduct,
  handleOk,
  AddSizesSubmit,
  SetDynamicTable,
  SetDynamicEditTable,
  handlerecord,
  trigger,
  productdata,
}) => {
  console.log(handlerecord, "QQQhandlerecord");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedVar, setSelectedVar] = useState([]);
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [ischeck, setIscheck] = useState(false);
  const [litresValue, setLitresValue] = useState(false);
  const [kgsValue, setKgsValue] = useState(false);
  const [nosValue, setNosValue] = useState(false);
  const [vartrigger, setVarTrigger] = useState(0);
  const [defaultSelected, setDefaultSelected] = useState([]);
  const [allVar, setAllVar] = useState([]);
  const [triggerr, setTriggerr] = useState(0);
  const [variationsAdd, setVariationsAdd] = useState({});
  console.log(variationsAdd, "variationsAdd");

  const [imageUrl, setImageUrl] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);
  const [varLoading, setVarLoading] = useState(false);

  const [removedRows, setRemovedRows] = useState([]);
  const [returnType, setReturnType] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    // productdata(true)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };
  const ReturnTypeOptions = [
    {
      label: "Yes",
      value: "yes",
    },
    {
      label: "No",
      value: "no",
    },
  ];
  const handleReturnType = (e) => {
    setReturnType(e.target.value);
  };
  console.log(returnType, "returnType");
  const EditVariantImages = (productdata) => {
    // setTrigger(trigger + 1)
    setModelwith(600);
    setModalTitle("Edit Images");
    setModalContent(
      <EditProductVarientImages
        variantimageedit={handlerecord}
        handleClose={handleOk}
      />
    );
    showModal();
  };

  const handleQuantity = (value) => {
    if (value === "lts") {
      setLitresValue(true);
      setKgsValue(false);
      setNosValue(false);
    } else if (value === "kgs") {
      setKgsValue(true);
      setLitresValue(false);
      setNosValue(false);
    } else {
      setNosValue(true);
      setLitresValue(false);
      setKgsValue(false);
    }
  };

  const dispatch = useDispatch();

  const [form] = Form.useForm(); // ----- Define Form

  //  Size

  useEffect(() => {
    dispatch(getSize())
    }, [])
    
    const sizeDetails  = useSelector(selectAllSizes)
    console.log(sizeDetails,'sizeDetails');

    const sizeOptions = sizeDetails?.map((item) => ({
      label: item.sizeName,
      value: item.sizeId,
    }));

  // Add Sizes

  const AddSizes = () => {
    setModelwith(500);
    setModalTitle("Add Sizes");
    setModalContent(<ProductSize formClose={handleCancel} />);
    showModal();
  };

  const sizeOnChange = (e) => {
    const sizeData = sizeDetails.find((item) => item.sizeId === e);
    console.log(sizeData, "sizeData");
    setVariationsAdd(sizeData);
    form.setFieldsValue({ sizeId: sizeData.sizeId });
  };


  // useEffect(() => {
  //   dispatch(getVariation());
  // }, []);

  // const AllVariations = useSelector(selectVariation);
  // console.log(AllVariations, "AllVariations");
  // console.log(AllVariations?.varientLists?.varientListName,'AllVariations');

  

  const [newData, setNewData] = useState([]);
  const [recordVarity, setRecordVarity] = useState([]);

  // const CallVarity = () => {
  //     baseRequest.get('product/add_variations/')
  //         .then(resp => {
  //             setAllVar(resp.data)
  //         })
  //         .catch(error => console.log(error, 'error on response'))
  // }

  useEffect(() => {
    if (handlerecord) {
      // CallVarity()
      // ===== to set fields values =====
      form.setFieldsValue(handlerecord);
      // default selected variation name
      // const varityNames = handlerecord?.varientList.map(
      //   (value) => value.varientName
      // );
      // setDefaultSelected(varityNames);
      // form.setFieldsValue({ variation_option: varityNames });
      // setAllVar(AllVariations);
      setReturnType(handlerecord?.returnType);

      //default selected variation value
      setNewData(handlerecord?.varientList);

      //default hidden variation name
      // add(varityNames);

      const ProImg = handlerecord?.varientImages?.map(
        ({ productVarientImagesId, productVarientImageUrl }) => ({
          uid: productVarientImagesId,
          name: `example${productVarientImagesId}.jpg`,
          status: "done",
          url: `${IMG_BASE_URL}${productVarientImageUrl}`,
        })
      );

      setImageInitialValue(ProImg);
      setImageUrl(ProImg);
    }
  }, [handlerecord]);

  useEffect(() => {
    console.log("var called", handlerecord);
    if (handlerecord) {
      const varityNames = handlerecord?.varientList?.map(
        (value) => value.varientName
      );
      const filteredArray1 = allVar.filter((item) =>
        varityNames.includes(item.varientName)
      );
      setRecordVarity(filteredArray1);
    }
  }, [allVar]);

  useEffect(() => {
    if (handlerecord) {
      const setFields = {};
      recordVarity.forEach((item) => {
        item.varientLists.forEach((variation) => {
          newData.forEach((varity) => {
            console.log(
              varity.varientValue,
              varity,
              variation.varientListName,
              "variation.varientListName"
            );
            if (varity.varientValue === variation.varientListName) {
              setFields[`varientListName${item.varientId}`] =
                variation.varientListName;
              setFields[`productVarientId${item.varientId}`] =
                varity.productVarientId;
            }
          });
        });
      });
      form.setFieldsValue(setFields);
    }
  }, [recordVarity]);

  const onReset = () => {
    if (handlerecord) {
      handleOk();
    } else {
      form.resetFields();
    }
  };

  const variationAdd = (record) => {
    setTriggerr(triggerr + 1);
    setModelwith(600);
    setModalTitle("Add Variations");
    setModalContent(
      <AddVariation handleClose={handleOk} productdata={record} />
    );
    showModal();
  };

  const findMissingImagesIds = (originalArray, editedArray) => {
    const originalIds = new Set(originalArray?.map((item) => item?.uid));
    const editedIds = new Set(
      editedArray?.map((item) => item?.uid).filter((uid) => uid !== undefined)
    );
    const missingIds = [...editedIds].filter((id) => !originalIds.has(id));
    return missingIds;
  };

  const findMissingVariantIds = (originalArray, editedArray) => {
    const originalIds = new Set(
      originalArray?.map((item) => item?.productVarientId)
    );
    const editedIds = new Set(
      editedArray
        ?.map((item) => item?.productVarientId)
        .filter((productVarientId) => productVarientId !== undefined)
    );
    const missingIds = [...editedIds].filter((id) => !originalIds.has(id));
    return missingIds;
  };

  const varientList = [
    {
      sizeId:variationsAdd?.sizeId,
      sizeName: variationsAdd?.sizeName,
    },
  ];

  const onFinish = (values) => {
    // console.log(parseFloat(values?.totalAmount),'onfinish');

    const checkstatus = imageUrl?.some((item) => item?.status === "done"); // check Image Status
    let productImages; // Initialize ProductImage
    if (checkstatus) {
      productImages = [];
    } else {
      const missingId = findMissingImagesIds(
        values?.variantproduct_image,
        ImageInitialValue
      );
      const combinedArray = imageUrl?.concat(
        missingId?.map((id) => ({
          productVarientImagesId: id,
          deleted: true,
        }))
      );

      productImages = combinedArray;
    }
    console.log(variationsAdd, "variationsAdd");

    // const VariantListNames = variationsAdd?.map((item) => ({
    //     label:item.variationName,
    //     value:item.varientId
    // }))

    // console.log(VariantListNames,'VariantListNames');

    // ===============  Update Varient Start ===========
    // let varientList = {
    //     variant: Object.entries(values)
    //         .filter(([key]) => key.startsWith('varientName'))
    //         .map(([key, varientName]) => {
    //             const index = key.match(/\d+/)[0];
    //             const variationValueKey = `varientListName${index}`;
    //             const productVarientKey = `productVarientId${index}`;

    //             const variantObject = {
    //                 varientName,
    //                 varientValue: values[variationValueKey],
    //             };

    //             if (values[productVarientKey] !== undefined) {
    //                 variantObject.productVarientId = values[productVarientKey];
    //             }

    //             return variantObject;
    //         })
    // }

    let variantList;
    if (handlerecord) {
      const missingVariantId = findMissingVariantIds(
        varientList?.variant,
        handlerecord?.varientList
      );
      const combinedArray = varientList?.variant?.concat(
        missingVariantId?.map((id) => ({
          productVarientId: id,
          deleted: true,
        }))
      );

      variantList = combinedArray;
      console.log(variantList, "handlerecord variantList");
    }

    // ===============  Update Varient Start ===========

    // Calculation
    const CalBuyRate = values?.buyRate || 0;

    const CalSellRate = values?.sellRate || 0;

    const CalGSTpercent = values?.gst || 0;

    const CalGSTamount = (CalGSTpercent / 100) * CalSellRate;

    const CalDisPercent = values?.discountPercentage || 0;

    const CalMRP = CalSellRate + CalGSTamount;

    const CalDisAmount = (CalDisPercent / 100) * CalMRP;

    const CalculatedTotalAmount = CalMRP - CalDisAmount;

    const EnteredQuantity = values?.quantity || 0;

    let result = {
      mrp: parseFloat(CalMRP).toFixed(0) || 0,
      buyRate: parseFloat(CalBuyRate).toFixed(2) || 0,
      sellRate: parseFloat(CalSellRate).toFixed(2) || 0,
      discountPercentage: parseFloat(CalDisPercent).toFixed(2) || 0,
      discountAmount: parseFloat(CalDisAmount).toFixed(2) || 0,
      gst: parseFloat(CalGSTpercent).toFixed(2) || 0,
      gstTaxAmount: parseFloat(CalGSTamount).toFixed(2) || 0,
      quantity: parseFloat(EnteredQuantity).toFixed(2) || 0,
      variant_stock_maintain: ischeck ? "true" : "false",
      totalAmount: parseFloat(CalculatedTotalAmount).toFixed(0) || 0,
      returnType: values?.returnType,
      returnCount: values?.returnCount,
      pieces: values?.pieces,
      key: values.key || null,
      // varientImages: productImages,
      alertQuantity: values?.alertQuantity,
      description: values?.description,
      unit: values.unit,
      ...(handlerecord && { productListId: values.productListId }),

      //   varientList: variationsAdd,
      // varientList,
      sizeId:variationsAdd?.sizeId,
      sizeName: variationsAdd?.sizeName,

      // varientList: Object.entries(values)
      //     .filter(([key]) => key.startsWith('varientName'))
      //     .map(([key, varientName]) => {
      //         const index = key.match(/\d+/)[0];
      //         const variationValueKey = `varientListName${index}`;

      //         return {
      //             varientName,
      //             varientValue: values[variationValueKey],
      //         };
      //     }),
    };

    let updateResult = {
      mrp: parseFloat(CalMRP).toFixed(0) || 0,
      buyRate: parseFloat(CalBuyRate).toFixed(2) || 0,
      sellRate: parseFloat(CalSellRate).toFixed(2) || 0,
      discountPercentage: parseFloat(CalDisPercent).toFixed(2) || 0,
      discountAmount: parseFloat(CalDisAmount).toFixed(2) || 0,
      gst: parseFloat(CalGSTpercent).toFixed(2) || 0,
      gstTaxAmount: parseFloat(CalGSTamount).toFixed(2) || 0,
      quantity: parseFloat(EnteredQuantity).toFixed(2) || 0,
      variant_stock_maintain: ischeck ? "true" : "false",
      totalAmount: parseFloat(CalculatedTotalAmount).toFixed(0) || 0,
      returnType: values?.returnType,
      returnCount: values?.returnCount,
      pieces: values?.pieces,
      key: values.key,
      // varientImages: productImages,
      unit: values.unit,
      alertQuantity: values?.alertQuantity,
      description: values?.description,
      ...(handlerecord && { productListId: values.productListId }),
      //   varientList: variationsAdd,
      // varientList,
      sizeId:values?.sizeId,

      // varientList: variantList,
    };
    const updateNewVariantdata = {
      productList: [updateResult],
    };

    let addResult = {
      mrp: parseFloat(CalMRP).toFixed(0) || 0,
      buyRate: parseFloat(CalBuyRate).toFixed(2) || 0,
      sellRate: parseFloat(CalSellRate).toFixed(2) || 0,
      discountPercentage: parseFloat(CalDisPercent).toFixed(2) || 0,
      discountAmount: parseFloat(CalDisAmount).toFixed(2) || 0,
      gst: parseFloat(CalGSTpercent).toFixed(2) || 0,
      gstTaxAmount: parseFloat(CalGSTamount).toFixed(2) || 0,
      quantity: parseFloat(EnteredQuantity).toFixed(2) || 0,
      variant_stock_maintain: ischeck ? "true" : "false",
      totalAmount: parseFloat(CalculatedTotalAmount).toFixed(0) || 0,
      returnType: values?.returnType,
      returnCount: values?.returnCount,
      pieces: values?.pieces,
      // varientImages: productImages,
      unit: values.unit,
      alertQuantity: values?.alertQuantity,
      //   varientList: variationsAdd,
      // varientList,
      sizeId:values?.sizeId,
      sizeName:values?.sizeName,

      // description: values?.description,

      // varientList: Object.entries(values)
      //     .filter(([key]) => key.startsWith('varientName'))
      //     .map(([key, varientName]) => {
      //         const index = key.match(/\d+/)[0];
      //         const variationValueKey = `varientListName${index}`;

      //         return {
      //             varientName,
      //             varientValue: values[variationValueKey],
      //         };
      //     }),
    };
    console.log(updateResult, "updateResult");
    const addNewVariantdata = {
      productList: [addResult],
    };

    console.log(values, "valuesvaluessimsonns");

    if (handlerecord) {
      console.log(handlerecord, "handlerecord handlerecord");
      console.log(values, "handlerecord values");
      // SetDynamicEditTable(result)
      UpdateProduct(updateNewVariantdata);
      console.log(updateNewVariantdata, "handlerecordupdateResult");
      // handleOk()
      // setIscheck(false)
    } else {
      if (createnew) {
        AddNewVariantProduct(addNewVariantdata);
      } else {
        SetDynamicTable(result);
        form.resetFields();
        setImageUrl([]);
        setIscheck(false);
      }
    }
    console.log(result, "result");
    setSelectedVar([]);
  };

  const AddNewVariantProduct = async (data) => {
    setVarLoading(true);
    await baseRequest
      .put(`${APIURLS.PATCH_PRODUCTS}/${productid}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Product Varient Added Successfully",
          type: "success",
        });
        // dispatch(getVariation())
        callproduct();
        form.resetFields();
        setVarLoading(false);
        dispatch(getOutofStock());
        return response.data;
      })
      .catch(function (error) {
        setVarLoading(false);
        return errorHandler(error);
      });
  };

  const UpdateProduct = async (data) => {
    setVarLoading(true);
    await baseRequest
      .put(`${APIURLS.PATCH_PRODUCTS}/${productdata?.productId}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Product Varient Edited Successfully",
          type: "success",
        });
        // dispatch(getVariation())
        callproduct();
        handleOk();
        dispatch(getOutofStock());
        setVarLoading(false);
        console.log(response, "response.data");
        return response.data;
      })
      .catch(function (error) {
        console.log(error, "Subupdateeee");
        setVarLoading(false);
        return errorHandler(error);
      });
  };

  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };

  const handlevarRefresh = (value) => {
    form.setFieldsValue({ varientListName: setVarTrigger(vartrigger + 1) });

    if (value) {
      form.setFieldsValue({ varientListName: "" });
    }
  };

  const add = (currentState, value) => {
    setSelectedOptions(currentState);
    const newState = [];

    currentState?.forEach((variation) => {
      const existingIndex = newState.findIndex(
        (item) => item.varientName === variation
      );

      if (existingIndex === -1) {
        // If the variation doesn't exist, add it
        const variationObject = AllVariations.find(
          (item) => item.varientName === variation
        );
        if (variationObject) {
          newState.push(variationObject);
        }
      } else {
        // If the variation exists, remove it
        newState.splice(existingIndex, 1);
        form.resetFields(`varientListName${existingIndex}`);
      }
    });
    const setFields = {};
    newState?.forEach((item) => {
      setFields[`varientName${item.varientId}`] = item.varientName;
    });

    form.setFieldsValue(setFields);
    setSelectedVar(newState);
    setRecordVarity(newState);
    handlevarRefresh();
  };

  const hanndleSubOption = (variation) => {};

  const handleCheck = () => {
    setIscheck(!ischeck);
  };

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

  const handleChange = async (img) => {
    console.log(img, "immmm");
    if (handlerecord) {
      if (img.fileList.length > 0) {
        const updatedFileList = await Promise.all(
          img.fileList.map(async (value) => {
            // Assuming getBase64 returns a Promise
            if (value?.originFileObj) {
              const base64Result = await getBase64(value.originFileObj);
              const slicedImageUrl = base64Result.slice(
                `data:${value.type};base64,`.length
              );

              // Add the 'url' property to the existing object
              return {
                productVarientImageUrl: slicedImageUrl,
              };
            } else {
              // If 'originFileObj' is not present, return the original object
              return {
                productVarientImagesId: value.uid,
                deleted: false,
              };
            }
          })
        );
        console.log(updatedFileList, "llllll");
        setImageUrl(updatedFileList);
      }
    } else {
      if (img.fileList.length > 0) {
        const ImageObj = await Promise.all(
          img.fileList.map(async (value) => {
            // Assuming getBase64 returns a Promise
            const base64Result = await getBase64(value.originFileObj);
            const slicedImageUrl = base64Result.slice(
              `data:${value.type};base64,`.length
            );
            // Now, you can use base64Result

            const newObj = {
              // id: imageUrl.length + 1,
              productVarientImageUrl: slicedImageUrl,
              type: value.type,
            };
            return newObj;
          })
        );
        setImageUrl(ImageObj);
      }
    }
  };

  // const sizeOptions = [
  //   { label: "Small", value: "S" },
  //   { label: "Medium", value: "M" },
  //   { label: "Large", value: "L" },
  //   { label: "Extra Large", value: "XL" },
  // ];
  return (
    <Fragment>
      <Card>
        <Form
          form={form}
          name={formname}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomRow space={[24, 24]}>

              <Col span={24} md={12} style={{marginTop:'20px'}}>
                <CustomAddSelect
                  label={"Size"}
                  options={sizeOptions}
                  onButtonClick={AddSizes}
                  onChange={sizeOnChange}
                  name={"sizeName"}
                />
                <CustomInput name={"sizeId"} display={'none'}  />

                {/* <CustomMultiSelect
                    maxTagCount={'responsive'}
                    // minWidth={'120px'}
                    showSearch
                    label={'Variation Name'}
                    name={'variation_option'}
                    options={sizeOptions}
                    onChange={add}
                    placeholder={'Select'}
                    onButtonClick={variationAdd}
                    rules={[
                        {
                            required: true,
                            message: 'Please Select variation!',
                        }
                    ]}
                /> */}
              </Col>
              {handlerecord && (
              <CustomInput name={"productListId"} display={"none"} />
            )}
    

            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Buy Rate"}
                name={"buyRate"}
                placeholder={"Buy Rate"}
                precision={2}
              />
            </Col>
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Sale Rate"}
                name={"sellRate"}
                placeholder={"Sale Rate"}
                precision={2}
              />
            </Col>
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Gst Percentage"}
                name={"gst"}
                placeholder={"Gst Percentage"}
                min={0}
                max={100}
                precision={0}
                // rules={[
                //     {
                //         required: true,
                //         message: 'This is a required field',
                //     }
                // ]}
              />
            </Col>
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Discount Percentage"}
                name={"discountPercentage"}
                precision={2}
                placeholder={"Discount Percentage"}
                min={0}
                max={100}
              />
            </Col>

            {/* <Col span={24} md={12}>
                            <CustomInputNumber
                                label={'Discount Amount'}
                                name={'discountAmount'}
                                placeholder={'Discount Amount'}
                         
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'This is a required field',
                            //     }
                            // ]}
                            />
                        </Col> */}

            {/* <Col span={24} md={12}>
                            <CustomInputNumber
                                label={'Gst Tax Amount'}
                                name={'gstTaxAmount'}
                                placeholder={'Gst Tax Amount'}
                                min={0}
                                max={100}
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'This is a required field',
                            //     }
                            // ]}
                            />
                        </Col> */}
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Quantity"}
                name={"quantity"}
                placeholder={"Quantity"}
                precision={2}
                rules={[
                  {
                    required: true,
                    message: "This is a required field",
                  },
                ]}
              />
            </Col>
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Alert Quantity"}
                name={"alertQuantity"}
                placeholder={"Alert Quantity"}
                precision={0}
              />
            </Col>

            <Col span={24} md={12}>
              <CustomInput
                name={"unit"}
                label={"Unit"}
                rules={[
                  {
                    required: true,
                    message: "This is a required field",
                  },
                ]}
              />
            </Col>
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Unit Quantity"}
                name={"pieces"}
                placeholder={"Enter Unit Quantity"}
                rules={[
                  {
                    required: true,
                    message: "This is a required field",
                  },
                ]}
              />
            </Col>
            <Col span={24} md={12}>
              <CustomRadioButton
                label={"Return Type"}
                name={"returnType"}
                data={ReturnTypeOptions}
                onChange={handleReturnType}
                rules={[
                  {
                    required: true,
                    message: "This is a required field",
                  },
                ]}
              />
            </Col>
            {returnType === "yes" && (
              <Col span={24} md={12}>
                <CustomInputNumber
                  label={"Return Days"}
                  name={"returnCount"}
                  placeholder={"Return Count"}
                />
              </Col>
            )}
            {/* <Col span={24} md={12}>
                            <CustomTextArea
                                label={"Description"}
                                name={"description"}
                                placeholder={"Enter description"}
                            />
                        </Col> */}

            {/* <Col span={24} md={12}>

                            <CustomUpload multiple={true} onChange={handleChange} form={form} label={'Product Image (Multi Select)'} initialValue={ImageInitialValue}
                                name={'variantproduct_image'} listType='picture-card'
                            // accept=".png,.jpeg,.jpg"
                            />
                        </Col> */}
          </CustomRow>
          <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
            <Button.Success
              text={handlerecord ? "Update" : "Add"}
              loading={varLoading}
              htmlType={"submit"}
            />
            <Button.Danger text={"Cancel"} onClick={() => onReset()} />
          </Flex>
        </Form>
      </Card>
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

export default TableProduct;
