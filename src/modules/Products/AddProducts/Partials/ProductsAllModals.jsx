import { Button, CustomInput, CustomUpload } from "@components/form";
import { Flex } from "@components/others";
import { getBrand, getCategory, getSize } from "@modules/Products/ProductSlice";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { IMG_BASE_URL, baseRequest } from "@request/request";
import successHandler from "@request/successHandler";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const ProductCategory = ({
  categoryhandleOk,
  categoryrecord,
  formname,
  handleClose,
  updateFormReset,
  formReset,
}) => {
  // ----- Define Form
  const [form] = useForm();
  const dispatch = useDispatch();
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [form, updateFormReset, formReset]);

  useEffect(() => {
    form.setFieldsValue(categoryrecord);
  }, [categoryrecord, updateFormReset, formReset]);
  console.log(categoryrecord, "categoryrecordcategoryrecord");

  useEffect(() => {
    if (categoryrecord?.url?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${IMG_BASE_URL}${categoryrecord?.url}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }
  }, [categoryrecord, updateFormReset]);

  const AddCategoryPost = async (data) => {
    setLoading(true);
    await baseRequest
      .post(`${APIURLS.POST_CATEGORY}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Category Added Successfully",
          type: "success",
        });
        dispatch(getCategory());
        if (categoryhandleOk) {
          categoryhandleOk();
        }
        if (handleClose) {
          handleClose();
        }
        setLoading(false);
        form.resetFields();
        return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        return errorHandler(error);
      });
  };

  const UpdateCategory = async (data) => {
    setLoading(true);
    await baseRequest
      .put(`${APIURLS.PUT_CATEGORY}/${categoryrecord?.categoryId}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Category Updated Successfully",
          type: "info",
        });
        dispatch(getCategory());
        if (categoryhandleOk) {
          categoryhandleOk();
        }
        if (handleClose) {
          handleClose();
        }
        form.resetFields();
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        return errorHandler(error);
      });
  };

  const onFinish = (values) => {
    if (categoryrecord) {
      const formData = new FormData();
      formData.append(`categoryName`, values.categoryName);

      if (values?.categoryImage && values.categoryImage.length > 0) {
        values.categoryImage.forEach((file) => {
          formData.append(`categoryImage`, file.originFileObj);
        });
      } else {
        console.error("No Category Image selected");
      }
      UpdateCategory(formData);
    } else {
      const formData = new FormData();
      formData.append(`categoryName`, values.categoryName);

      if (values?.categoryImage && values.categoryImage.length > 0) {
        values.categoryImage.forEach((file) => {
          formData.append(`categoryImage`, file.originFileObj);
        });
      } else {
        console.error("No Category Image selected");
      }
      AddCategoryPost(formData);
    }
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
      <div style={{ margin: "30px 0px" }}>
        <CustomInput
          label={"Category"}
          placeholder={"Add Category"}
          name={"categoryName"}
          rules={[
            {
              required: true,
              message: "Please Enter Category !!!",
            },
          ]}
        />
        <CustomUpload
          form={form}
          label={"Category Image"}
          maxCount={1}
          name={"categoryImage"}
          listType="picture-card"
          // accept=".png,.jpeg,.jpg"
          initialValue={ImageInitialValue}
          rules={[
            {
              required: true,
              message: "Please Enter Category Image !!!",
            },
          ]}
        />
        <CustomInput name={"categoryId"} display={"none"} />
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {categoryrecord ? (
          <>
            <Button.Success text={"Update"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Cancel"} onClick={() => categoryhandleOk()} />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        )}
      </Flex>
    </Form>
  );
};

export const ProductBrand = ({
  brandrecord,
  formname,
  formReset,
  updateFormReset,
  handleClose,
  brandhandleOk,
}) => {
  // ----- Define Form
  const [form] = useForm();

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [form, updateFormReset, formReset]);

  useEffect(() => {
    form.setFieldsValue(brandrecord);
  }, [brandrecord, updateFormReset, formReset]);

  const AddBrandPost = async (data) => {
    setLoading(true);
    await baseRequest
      .post(`${APIURLS.POST_BRAND}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Brand Added Successfully",
          type: "success",
        });
        dispatch(getBrand());
        if (brandhandleOk) {
          brandhandleOk();
        }
        if (handleClose) {
          handleClose();
        }
        setLoading(false);
        form.resetFields();
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        return errorHandler(error);
      });
  };

  const UpdateBrand = async (data) => {
    setLoading(true);
    await baseRequest
      .put(`${APIURLS.PUT_BRAND}/${brandrecord?.brandId}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Brand Updated Successfully",
          type: "info",
        });
        dispatch(getBrand());
        if (brandhandleOk) {
          brandhandleOk();
        }
        form.resetFields();
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        return errorHandler(error);
      });
  };
  const onFinish = (values) => {
    if (brandrecord) {
      UpdateBrand(values);
    } else {
      AddBrandPost(values);
      console.log(values,'values');
    }
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
      <div style={{ margin: "30px 0px" }}>
        <CustomInput
          label={"Brand"}
          placeholder={"Add Brand"}
          name={"brandName"}
          rules={[
            {
              required: true,
              message: "Please Enter Brand !!!",
            },
          ]}
        />
        <CustomInput name={"brandId"} display={"none"} />
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {brandrecord ? (
          <>
            <Button.Success text={"Update"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Cancel"} onClick={() => brandhandleOk()} />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        )}
      </Flex>
    </Form>
  );
};

export const ProductSize = ({
  sizerecord,
  formname,
  formReset,
  updateFormReset,
  handleClose,
  formClose,
  sizehandleok,
}) => {
  console.log(sizerecord,'sizerecord');
  // ----- Define Form
  const [form] = useForm();

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [form, updateFormReset, formReset]);

  useEffect(() => {
    form.setFieldsValue(sizerecord);
  }, [sizerecord, updateFormReset, formReset]);

  const AddBrandPost = async (data) => {
    setLoading(true);
    await baseRequest
      .post(`${APIURLS.POST_SIZE}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Size Added Successfully",
          type: "success",
        });
        dispatch(getSize());
        if (sizehandleok) {
          sizehandleok();
        }
        if(formClose){
          formClose()
        }
        setLoading(false);
        form.resetFields();
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        return errorHandler(error);
      });
  };

  const UpdateBrand = async (data) => {
    setLoading(true);
    await baseRequest
      .put(`${APIURLS.PUT_SIZE}${sizerecord?.sizeId}`, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Brand Updated Successfully",
          type: "info",
        });
        dispatch(getSize());
        if (sizehandleok) {
          sizehandleok();
        }
        form.resetFields();
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        return errorHandler(error);
      });
  };
  const onFinish = (values) => {
    if (sizerecord) {
      UpdateBrand(values);
      console.log(values,'values');
    } else {
      AddBrandPost(values);
      console.log(values,'values');
    }
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
      <div style={{ margin: "30px 0px" }}>
        <CustomInput
          label={"Size"}
          placeholder={"Add Size"}
          name={"sizeName"}
          rules={[
            {
              required: true,
              message: "Please Enter Size !!!",
            },
          ]}
        />
        <CustomInput name={"sizeId"} display={"none"} />

      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {sizerecord ? (
          <>
            <Button.Success text={"Update"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Cancel"} onClick={() => sizehandleok()} />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} loading={loading} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        )}
      </Flex>
    </Form>
  );
};

