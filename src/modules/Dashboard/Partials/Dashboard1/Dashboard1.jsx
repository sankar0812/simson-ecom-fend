import {
  Button,
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "@components/form";
import { CustomRow, Flex } from "@components/others";
import { getDashboard1 } from "@modules/Dashboard/DashboardSlice";
import {
  getAllProducts,
  selectProducts,
} from "@modules/Products/ProductSlice";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { baseRequest } from "@request/request";
import successHandler from "@request/successHandler";
import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const Dashboard1 = ({ record, trigger, FormClosee, FormClose }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const AllProducts = useSelector(selectProducts);

  const ProductOptions = AllProducts?.map((item) => ({
    label: item.productName,
    value: item.productId,  
  }));

  const handleProduct = (value) => {
    const Product = AllProducts?.find((item) => item.productId === value);
    setListData(Product);
  };

  const ProductListOptions = listData?.productList?.map((item) => {
    return { productListId: item.productListId };
  });
  const firstProductListId = ProductListOptions?.[0]?.productListId;

  useEffect(() => {
    form.setFieldsValue({ productListId: firstProductListId });
  }, [firstProductListId]);

useEffect(()=>{
form.setFieldsValue({productName:listData?.productId})
},[listData])

  useEffect(() => {
    form.setFieldsValue({
      productId: record?.productName,
      productName:record?.productId,
      description: record?.description,
      productListId: record?.product_list_id,
      productImagesId:record?.product_images_id,
    });
  }, [record, trigger]);

  const onReset = () => {
    if(FormClose){
        FormClose()
    }
    else{
        form.resetFields();
    }
  };
  const AddDashboard1Post = async (data) => {
    setLoading(true);
    await baseRequest
      .post(`${APIURLS.POST_DASHBOARD1}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Added Successfully",
          type: "success",
        });
        form.resetFields();
        dispatch(getDashboard1());
        if (FormClosee) {
          FormClosee();
        }
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        return errorHandler(error);
      });
  };

  const UpdateDashboard1Post = async (data) => {
    setLoading(true);
    await baseRequest
      .put(`${APIURLS.PUT_DASHBOARD1}/${record?.dashboard1id}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Updated Successfully",
          type: "info",
        });
        form.resetFields();
        dispatch(getDashboard1());
        if (FormClose) {
          FormClose();
        }
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        return errorHandler(error);
      });
  };
  const onFinish = (data) => {
    const newvalues ={
      productId:data?.productName,
      productListId:data?.productListId,
      productImagesId:data?.productImagesId,
      description:data?.description,
      status:true
    }
    if (record) {
      UpdateDashboard1Post(newvalues);
    } else {
      AddDashboard1Post(newvalues);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill in all the required details !");
  };



  return (
    // <CustomCardView>
    <Form
      name="DashboardForm"
      form={form}
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
        <Col span={24} md={12}>
          <CustomSelect
            label={"Product"}
            name={"productId"}
            options={ProductOptions || []}
            onChange={handleProduct}
            placeholder={"Select Product"}
            rules={[
              {
                required: true,
                message: "Please Enter Product!",
              },
            ]}
          />
        </Col>
        <CustomInput name={'productName'} display={"none"} />
        <CustomInput name={"productListId"} display={"none"} />
        <CustomInput name={"productImagesId"}  display={"none"}/>

        <Col span={24} md={12}>
          <CustomTextArea
            label={"Description"}
            name={"description"}
            placeholder={"Enter Description"}
            rules={[
              {
                required: true,
                message: "Please Enter Description !",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex center gap={"20px"} style={{ margin: "30px" }}>
        {record ? (
          <>
            <Button.Primary text={"Update"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Cancel"} onClick={onReset} />
          </>
        ) : (
          <>
            <Button.Primary text={"Add"}  loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={onReset} />
          </>
        )}
      </Flex>
    </Form>
    // </CustomCardView>
  );
};

export default Dashboard1;
