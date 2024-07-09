import {
  Button,
  CustomDatePicker,
  CustomInput,
  CustomInputNumber,
} from "@components/form";
import { CustomMultiSelect2 } from "@components/form/CustomMutiSelect2";
import { CustomRow, Flex } from "@components/others";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { baseRequest } from "@request/request";
import successHandler from "@request/successHandler";
import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DiscountModals = ({
  Variantoptions,
  ProductlistDatas,
  handleOk,
  trigger,
}) => {
  console.log(Variantoptions,'Variantoptions');

  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  ); //  --> Start Date
  const [selectedEndDate, setSelectedEndDate] = useState(
    dayjs().format("YYYY-MM-DD")
  ); //  --> End Date

  const [selectData, setSelectData] = useState([]); // Use Find ProductListId
  console.log(selectData,'selectData');
  const [disData, setDisData] = useState(0); // Use DiscountPer Fn
  const [titleData, setTitleData] = useState({}); // use DiscountTitle Fn
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [trigger]);

  const onReset = () => {
    form.resetFields();
    handleOk();
  };

  // ============== Start Date fn =========================//

  const handleStartDateOnChange = (date) => {
    setSelectedDate(date);
  };
  // ================  End date fn =======================//
  const handleEndDateOnChange = (date) => {
    setSelectedEndDate(date);
  };
  //================  ProductListId/ Variant Fn ===============//

  const handlevariant = (selectedVariant) => {
    const Prolist = selectedVariant.map((item) => ({ productListId: item }));

    const FindPro = ProductlistDatas?.productList?.filter((item) =>
      Prolist.some((pItem) => item?.productListId === pItem?.productListId)
    );
    setSelectData(FindPro);
  };

  //  =============  DiscountPer ===================//
  const handleDis = (e) => {
    setDisData(e);
  };

  // =============== Discount Title ===============//
  const handleTitle = (e) => {
    setTitleData(e.target.value);
  };

  //================================================//

  const UpdateDiscount = async (data) => {
    setLoading(true);
    await baseRequest
      .post(APIURLS.POSTDISCOUNT, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "success",
          type: "success",
        });
        if (handleOk) {
          handleOk();
        }
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        return errorHandler(error);
      });
  };

  const onFinish = (formValues) => {
    const record = {
      ...formValues,
      startDate: selectedDate,
      endDate: selectedEndDate,
      discountPercentage: disData,
      discountTitle: titleData,
    };

    const DiscountValues = selectData?.map((item) => ({
      productListId: item?.productListId,
      buyRate: item?.buyRate,
      sellRate: item?.sellRate,
      mrp: item?.mrp,
      gst: item?.gst,
      gstTaxAmount: item?.gstTaxAmount,
      totalAmount: item?.totalAmount,
    }));
    const Newvalues = {
      startDate: record?.startDate,
      endDate: record?.endDate,
      discountPercentage: record?.discountPercentage,
      discountTitle: record?.discountTitle,
      discountList: DiscountValues,
    };

    UpdateDiscount(Newvalues);
    console.log(Newvalues,'Newvalues');
  };

  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };

  return (
    <Form
      name="DiscountModal"
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
        <Col span={24} md={24}>
          <CustomMultiSelect2
            label={"Product List"}
            options={Variantoptions}
            name={"productListId"}
            onButtonClick={false}
            onChange={(selectedVariant) => handlevariant(selectedVariant)}
            rules={[
              {
                required: true,
                message: "Please Select Product List!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Discount Title"}
            name={`discountTitle`}
            onChange={handleTitle}
            rules={[
              {
                required: true,
                message: "Please Enter Discount Title !",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInputNumber
            label={"Discount %"}
            name={`discountPercentage`}
            onChange={handleDis}
            rules={[
              {
                required: true,
                message: "Please Enter Discount %!",
              },
              {
                validator: async (_, value) => {
                  if (value <= 100) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Discount % must not be greater than 100!")
                  );
                },
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Start Date"}
            name={"start_date"}
            onChange={handleStartDateOnChange}
            rules={[
              {
                required: true,
                message: "Please Enter Start Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"End Date"}
            name={"end_date"}
            onChange={handleEndDateOnChange}
            rules={[
              {
                required: true,
                message: "Please Enter End Date !",
              },
            ]}
          />
        </Col>
      </CustomRow>
      <Flex center gap={"20px"} style={{ margin: "30px" }}>
        <Button.Success text={"Add"} loading={loading} htmlType={"submit"} />
        <Button.Danger text={"Cancel"} onClick={onReset} />
      </Flex>
    </Form>
  );
};
