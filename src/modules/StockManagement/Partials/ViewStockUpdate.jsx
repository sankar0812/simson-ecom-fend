import { Button, CustomTable } from "@components/form";
import {
  CommonLoading,
  CustomCardView,
  CustomModal,
  Flex,
} from "@components/others";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import {
  getAllProducts,
  getStocks,
  selectAllProductsError,
  selectAllProductsStatus,
  selectAllStocks,
  selectProducts,
} from "@modules/Products/ProductSlice";
import { StockModals } from "./AddStockForm";
import { useDispatch, useSelector } from "react-redux";

const UpdateStock = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const [varientdetails, setVarientDetails] = useState([]);
  console.log(varientdetails,'varientdetails');
  const [trigger, setTrigger] = useState(0);
  const [searchTexts, setSearchTexts] = useState([]);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);
  useEffect(() => {
    dispatch(getStocks());
    dispatch(getAllProducts());
  }, []);

  const AllProducts = useSelector(selectProducts);

  const AllStocksView = useSelector(selectAllStocks);
  const AllStocksStatusView = useSelector(selectAllProductsStatus);
  const AllStocksErrorView = useSelector(selectAllProductsError);

console.log(AllStocksView,'AllStocksView');
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

  //   View Stock data based on find stockid

  const StockViewData = useMemo(
    () => AllStocksView?.find((item) => item?.productId == id),
    [AllStocksView, id]
  );

  useEffect(() => {
    setVarientDetails(StockViewData?.stockList);
  }, [StockViewData]);

  // ===========productlist data find >>> based on productId ======================//

  const ProductlistDatas = useMemo(
    () => AllProducts?.find((item) => item?.productId == id),
    [AllProducts, id]
  );
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

  const Variantoptions = VarArray?.map((Val) => ({
    label: `${Val.Variant.map((v) => `${v.variationName}: "${v.variationValue}"`).join("/")}`,
    value: Val.ProductListId,
  }));

  //====================================================

const handleGet = ()=>{
  dispatch(getStocks());
  handleOk();
}
  const AddMoreStock = (record) => {
    setTrigger(trigger +1)
    setModelwith(700);
    setModalTitle("Add Stock");
    setModalContent(
      <StockModals
        record={record}
        varientdetails={varientdetails}
        ids={id}
        trigger={trigger}
        handleOk={handleOk}
        handleGet={handleGet}
        Variantoptions={Variantoptions}
        VarArray={VarArray}
      />
    );
    showModal();
  };
  const handleSearchs = (value) => {
    setSearchTexts(value);
  };
  const TableColumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
       title:"Product Name",
       dataIndex:"productName",
       filteredValue: searchTexts ? [searchTexts] : null,
       onFilter: (value, record) => {
           return (
               String(record.productName)
                   .toLowerCase()
                   .includes(value.toLowerCase()) ||
               String(record.productName).includes(value.toUpperCase())
           );
       },
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
    },
    // {
    //   title: "Variant Name",
    //   dataIndex: "varientName",
    // },
    // {
    //   title: "Variant Value",
    //   dataIndex: "varientValue",
    // },
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

  let content;
  if (AllStocksStatusView === "loading") {
    content = <CommonLoading />;
  } else if (AllStocksStatusView === "succeeded") {
    const rowKey = (varientdetails) => varientdetails.productListId;
    content = (
      <CustomTable
        columns={TableColumns}
        data={varientdetails}
        rowKey={rowKey}
      />
    );
  } else if (AllStocksStatusView === "failed") {
    content = <h2>{AllStocksErrorView} </h2>;
  }

  return (
    <Fragment>
    <CustomCardView>
      <CustomPageTitle Heading={'View Stock'}/>
      <Flex end={true}>
          <Button.PrimaryNow  text={"+ ADD"} onClick={AddMoreStock} />

          </Flex>
      {content}
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

export default UpdateStock;
