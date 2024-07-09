import {
  Button,
  CustomInput,
  CustomSelect,
  CustomTextArea,
  CustomUpload,
} from "@components/form";
import { CustomCardView, CustomRow, Flex } from "@components/others";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { getDashboard2 } from "@modules/Dashboard/DashboardSlice";
import { getCategory, selectCategory } from "@modules/Products/ProductSlice";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { IMG_BASE_URL, baseRequest } from "@request/request";
import successHandler from "@request/successHandler";
import { Col, Form, Spin } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

const Dashboard2 = ({ record, trigger, FormClosee, FormClose }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [allcategoryDetails, setCategoryDetails] = useState([]);
  const [imageInitialvalue, setImageInitialValue] = useState([]); // Use image show during Edit
  const [catId, setCatId] = useState([]);
  const [button, setButton] = useState("Submit");  //  Use once added,after hide the submit & update Btn
  const [editFormDatas, setEditFormDatas] = useState({});
  const [loading, setLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const AllCategories = useSelector(selectCategory);

  useEffect(() => {
    setCategoryDetails(AllCategories);
  }, [AllCategories]);

  const CategoryOptions = allcategoryDetails?.map((item) => ({
    label: item.categoryName,
    value: item.categoryId,
  }));

  const handleCategory = (value) => {
    setCatId(value);
  };

  useEffect(() => {
    if (button === "Update") {
      form.setFieldsValue(editFormDatas);
      // form.setFieldsValue({ categoryId: record?.categoryName })
      form.setFieldsValue({ fileUpload: imageInitialvalue });
      setMainLoading(false)
    }
    // else{
    //   setMainLoading(true)

    // }
  }, [editFormDatas, imageInitialvalue, trigger]);

  useEffect(() => {
    if (record) {
      form.setFieldsValue({ categoryId: catId });
    }
  }, [catId]);

  useEffect(() => {
    GetProfile()
  }, [])

  const GetProfile = async () => {
    try {
      const dashboard = "dashboardDetails";
      const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD2}`, {
        params: { dashboard },
      });

      if (response?.status === 200) {
        setButton("Update");
        setEditFormDatas(response.data);
      }
      else {
        setButton("Submit");
      }
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  useEffect(() => {
    if (button === "Update") {
      if (editFormDatas?.dashboardImageUrl?.length > 0) {
        setImageInitialValue([
          {
            uid: "1",
            name: `example.jpg`,
            status: "done",
            url: `${IMG_BASE_URL}${editFormDatas?.dashboardImageUrl}`,
          },
        ]);
      } else {
        setImageInitialValue([]);
      }
    }
  }, [editFormDatas]);

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };

  const AddDashboard2Post = async (data) => {
    setLoading(true);
    await baseRequest
      .post(`${APIURLS.POST_DASHBOARD2}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Added Successfully",
          type: "success",
        });
        form.resetFields();
        dispatch(getDashboard2());
        setButton('Update')
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

  const UpdateDashboard2 = async (data, id) => {
    setLoading(true);
    await baseRequest
      .put(`${APIURLS.PUT_DASHBOARD2}/${id}`, data, config)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Updated Successfully",
          type: "info",
        });
        dispatch(getDashboard2());
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
    if (button === "Update") {
      const formData = new FormData();
      formData.append("categoryId", editFormDatas?.categoryId);
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data?.fileUpload[0].originFileObj) {
        data.fileUpload.forEach((file) => {
          formData.append(`fileUpload`, file.originFileObj);
        });
      } else {
        console.error("No file Upload selected");
      }
      console.log([...formData.entries()], "upppppppppppppp");
      UpdateDashboard2(formData, editFormDatas?.dashboard2Id);
    } else {
      const formData = new FormData();
      formData.append("categoryId", data.categoryId);
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data?.fileUpload && data.fileUpload.length > 0) {
        data.fileUpload.forEach((file) => {
          formData.append(`fileUpload`, file.originFileObj);
        });
      } else {
        console.error("No file Upload selected");
      }
      console.log([...formData.entries()], "addddddddddd");
      AddDashboard2Post(formData);
    }
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return (
    <Fragment>
      <CustomPageTitle Heading={"Dashboard2"} />
      <CustomCardView width={"800px"}>
        <Form
          name="DashboardForm2"
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
          <Spin indicator={
            <LoadingOutlined
              style={{
                fontSize: 80,
                position: 'fixed'
              }}
              spin
            />
          } spinning={mainLoading} size="large">

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
                      message: "Please select a file to upload!",
                    },
                  ]}
                />
              </Col>
            </CustomRow>
          </Spin>

          <Flex center={"true"} gap={"20px"}>
            {button === "Submit" && (
              <Button.Primary text={"Submit"} loading={loading} htmlType={"submit"} />
            )}
            {button === "Submit" && (
              <Button.Danger text={"Cancel"} onClick={() => onReset()} />
            )}
            {button === "Update" && (
              <Button.Primary text={"Update"} loading={loading} htmlType={"submit"} />
            )}
          </Flex>
        </Form>
      </CustomCardView>
    </Fragment>
  );
};

export default Dashboard2;
