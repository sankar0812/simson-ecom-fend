import {
  Button,
  CustomInput,
  CustomSelect,
  CustomTextArea,
  CustomUpload,
} from "@components/form";
import { CustomRow, Flex } from "@components/others";
import { getDashboard1, getDashboard3, getDashboard4 } from "@modules/Dashboard/DashboardSlice";
import { getCategory, selectCategory } from "@modules/Products/ProductSlice";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { baseRequest, IMG_BASE_URL } from "@request/request";
import successHandler from "@request/successHandler";
import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard4 = ({ record, trigger, FormClosee, FormClose }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [imageInitialvalue, setImageInitialValue] = useState([]); // Use image show during Edit
  const [allcategoryDetails, setCategoryDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const AllCategories = useSelector(selectCategory);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    setCategoryDetails(AllCategories);
  }, [AllCategories]);

  useEffect(() => {
    form.setFieldsValue({
      categoryId: record?.categoryId,
      title: record?.title,
      fileUpload: imageInitialvalue,
    });
  }, [record, trigger, imageInitialvalue]);

  useEffect(() => {
    if (record?.url?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: `example.jpg`,
          status: "done",
          url: `${IMG_BASE_URL}${record?.url}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }
  }, [record]);
  //=============== Category =====================

  const CategoryOptions = allcategoryDetails?.map((item) => ({
    label: item.categoryName,
    value: item.categoryId,
  }));

  const handleCategory = (value) => {
    console.log(value, "valuevaluevalue");
  };
  //===============================================
  const onReset = () => {
    if (FormClose) {
      FormClose();
    } else {
      form.resetFields();
    }
  };
  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };

  const AddDashboard3Post = async (data) => {
    setLoading(true);
    await baseRequest
      .post(`${APIURLS.POST_DASHBOARD4}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Carousel Details saved successfully.",
          type: "success",
        });
        form.resetFields();
        dispatch(getDashboard4());
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

  const UpdateDashboard3Put = async (data) => {
    setLoading(true);
    await baseRequest
      .put(`${APIURLS.PUT_DASHBOARD4}/${record?.dashboard4Id}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Dashboard updated successfully",
          type: "info",
        });
        form.resetFields();
        dispatch(getDashboard4());
        if (FormClose) {
          FormClose();
        }
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        console.log(error,'error');
        setLoading(false);
        return errorHandler(error);
      });
  };
  const onFinish = (data) => {
    if (record) {
      const formData = new FormData();
      formData.append("categoryId", data?.categoryId);
      formData.append("title", data?.title);

      if (data?.fileUpload[0].originFileObj) {
        data.fileUpload.forEach((file) => {
          formData.append(`fileUpload`, file.originFileObj);
        });
      } else {
        console.error("No file Upload selected");
      }
      console.log([...formData.entries()], "upppppppppppppp");
      UpdateDashboard3Put(formData, record?.dashboard4Id);
    } else {
      const formData = new FormData();
      formData.append("categoryId", data?.categoryId);
      formData.append("title", data?.title);

      if (data?.fileUpload && data.fileUpload.length > 0) {
        data.fileUpload.forEach((file) => {
          formData.append(`fileUpload`, file.originFileObj);
        });
      } else {
        console.error("No file Upload selected");
      }
      console.log([...formData.entries()], "addddddddddd");
      AddDashboard3Post(formData);
    }
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
            label={"Category"}
            name={"categoryId"}
            options={CategoryOptions}
            onChange={handleCategory}
            placeholder={"Select Category"}
            rules={[
              {
                required: true,
                message: "Please Enter Category!",
              },
            ]}
          />
        </Col>
        <CustomInput name={"productListId"} display={"none"} />
        <Col span={24} md={12}>
          <CustomInput
            label={"Title"}
            name={"title"}
            placeholder={"Enter Title"}
            rules={[
              {
                required: true,
                message: "Please Enter Title !",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomUpload
            form={form}
            label={"File Upload"}
            name={"fileUpload"}
            listType="picture-card"
            maxCount={1}
            initialValue={imageInitialvalue}
            rules={[
              {
                required: true,
                message: "Please Enter File Upload !",
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
            <Button.Primary text={"Add"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={onReset} />
          </>
        )}
      </Flex>
    </Form>
    // </CustomCardView>
  );
};

export default Dashboard4;
