import { Button, CustomTable } from "@components/form";
import { CustomCardView, CustomModal, CustomRow, Flex } from "@components/others";
import { IMG_BASE_URL, baseRequest } from "@request/request";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { getAllProducts, selectProducts } from "@modules/Products/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { DiscountModals } from "./DiscountModals";
import { Col } from "antd";


const UpdateDiscount = () => {

  const [varientdetails, setVarientDetails] = useState([]);
  const [trigger, setTrigger] = useState(0);


  const { id } = useParams();
  const dispatch = useDispatch();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);

  // ===== Modal Functions Start =====
  const showModal = () => {
    setIsModalOpen(true);
  };

  const ResetTrigger = () => {
    setTrigger(trigger + 1);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    ResetTrigger();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FormClose = () => {
    handleOk();
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const AllProducts = useSelector(selectProducts);
  const ProductlistDatas = useMemo(() => AllProducts?.find((item) => item?.productId == id),[AllProducts, id]);
  useEffect(() => {
    setVarientDetails(ProductlistDatas?.productList);
  }, [ProductlistDatas]);
console.log(ProductlistDatas,'ProductlistDatas');
  //================ Variant list select options =====================
  let VarArray = [];

  ProductlistDatas?.productList?.forEach((item) => {
    const ProductListId = item.productListId;
    let Variant = [];

    item.varientList?.map((variation) => {
      const variationName = variation.varientName;
      const variationValue = variation.varientValue;
      Variant.push({ variationName, variationValue });
    });

    VarArray.push({
      ProductListId,
      Variant,
    });
  });

  // const Variantoptions = varientdetails.map((Val) => ({
  //   label: `${Val.Variant.map(
  //     (v) => `${v.variationName}:"${v.variationValue}"`
  //   ).join("/")}`,
  //   value: Val.ProductListId,
  // }));

  const  Variantoptions = varientdetails?.map((item) => ({
    label:item.sizeName,
    value:item.productListId,
  }))

  const editDiscount = (record) => {
    setTrigger(trigger +1)
    setModelwith(600);
    setModalTitle("Add Discount");
    setModalContent(
      <DiscountModals
        record={record}
        Variantoptions={Variantoptions}
        ProductlistDatas={ProductlistDatas}
        handleOk={handleOk}
        trigger={trigger}
      />
    );
    showModal();
  };

  const TableColumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    // {
    //   title: "Variant Images",
    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
    //         {record?.varientImages?.map((product, index) => (
    //           <div
    //             key={index}
    //             style={{ display: "flex", flexDirection: "row", gap: "5px" }}
    //           >
    //             <div key={product.id} style={{ height: "40px", width: "40px" }}>
    //               <img
    //                 onClick={() => console.log("pressed")}
    //                 src={`${IMG_BASE_URL}${product.productVarientImageUrl}`}
    //                 style={{ height: "40px", width: "40px" }}
    //               />
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   },
    // },
  ];
console.log(varientdetails,'varientdetails');
  return (
    <Fragment>

      <CustomCardView>
      <CustomRow>
        <Col span={24} md={12}>
        <CustomPageTitle Heading={"Discount Offer"} />
        </Col>
        <Col span={24} md={12}>
          <Flex end={true}>
          <Button.PrimaryNow text={"+ ADD"} onClick={editDiscount} />
          </Flex>
        </Col>
      </CustomRow>
     
      <CustomTable columns={TableColumns} data={varientdetails} />
      </CustomCardView>
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

export default UpdateDiscount;
