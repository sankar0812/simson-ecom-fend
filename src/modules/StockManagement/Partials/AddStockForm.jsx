import {
  Button,
  CustomInputNumber,
  CustomMultiSelect,
} from "@components/form";
import { CustomRow, Flex } from "@components/others";
import { getAllProducts, selectProducts } from "@modules/Products/ProductSlice";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { baseRequest } from "@request/request";
import successHandler from "@request/successHandler";
import { Col, Form } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const StockModals = ({
  Variantoptions,
  handleOk,
  handleGet,
  trigger,
  VarArray,
}) => {

  const [form] = Form.useForm();
  const { id } = useParams();

  const dispatch = useDispatch()

  const [selectData, setSelectData] = useState([]);
  console.log(selectData,'selectData');
  const [loading,setLoading] = useState(false);

  const [sizeDetails, setSizeDetails] = useState([]);
  console.log(sizeDetails,'sizeDetails');


  const onReset = () => {
    form.resetFields();
    handleOk()
  };
  useEffect(() => {
    form.resetFields()
    setSelectData([])
  }, [trigger])

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const AllProducts = useSelector(selectProducts);
  const ProductlistDatas = useMemo(() => AllProducts?.find((item) => item?.productId == id),[AllProducts, id]);
  useEffect(() => {
    setSizeDetails(ProductlistDatas?.productList);
  }, [ProductlistDatas]);

  // ===============  variant Choose based on productListId ====================//

  const handleChange = (selectedVariant, index) => {
    const Prolist = selectedVariant.map((item) => ({ productListId: item }));
    const FindPro = VarArray?.filter((item) =>
      Prolist.some((pItem) => item?.ProductListId === pItem?.productListId)
    );

    setSelectData(FindPro);
    // setSelectData([...selectData,{text}])
  };

  //==================================================

  const AddStock = async (data) => {
    setLoading(true)
    await baseRequest
      .post(APIURLS.POST_ADDSTOCK, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "success",
          type: "success",
        });
        if (handleGet) {
          handleGet()
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
    let varientList = {
      addStockList: Object.entries(formValues)
        .filter(([key]) => key.startsWith("quantity"))
        .map(([key, quantity]) => {
          const index = key.match(/\d+/)[0];
          const productVarientKey = selectData?.map((pro) => (pro.ProductListId))

          const variantObject = {
            quantity,
            productListId: productVarientKey[index],
          };

          return variantObject;
        }),
    };
    AddStock(varientList);
    console.log(varientList,'varientList');
  };

  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };



  return (
    <Form
      name="StockModal"
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
        <Col span={24} md={20}>
          <CustomMultiSelect
            label={"Product List"}
            options={Variantoptions}
            name={"productListId"}
            onButtonClick={false}
            onChange={(selectedVariant) =>
              handleChange(selectedVariant)
            }
          />
        </Col>
        {selectData?.map((item, index) => (
          <Col span={24} md={20} key={index}>
            <CustomInputNumber
              label={
                <span>
                  Qty :&nbsp;
                  {item.Variant.map((vn, vnIndex) => (
                    <span key={vnIndex}>
                      <span style={{ color: 'black' }}>{vn.variationName}</span>:
                      <span style={{ color: 'blue' }}>{vn.variationValue}</span>
                      {vnIndex < item.Variant.length - 1 && <span>/</span>}
                    </span>
                  ))}
                </span>
              }
              name={`quantity_${index}`}
              placeholder={'Enter Quantity'}
              rules={[
                {
                  required: true,
                  message: "Please Enter Quantity!",
                },
              ]}
            />
          </Col>
        ))}

      </CustomRow>

      <Flex center gap={"20px"} style={{ margin: "30px" }}>
        <Button.Success text={"Add"} loading={loading} htmlType={"submit"} />
        <Button.Danger text={"Cancel"} onClick={onReset} />
      </Flex>
    </Form>
  );
};
