import { CustomTable } from "@components/form";
import CustomInputSearch from "@components/form/CustomInputSearch";
import {
  CommonLoading,
  CustomCardView,
  CustomModal,
  CustomRow,
  Flex,
} from "@components/others";
import { CustomLableBack } from "@components/others/CustomLableBack";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import {
  getAllProducts,
  selectAllProductsError,
  selectAllProductsStatus,
  selectProducts,
} from "@modules/Products/ProductSlice";
import { IMG_BASE_URL } from "@request/request";
import { Col } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Discount = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [modelwith, setModelwith] = useState(0);
  const [formReset, setFormReset] = useState(0);
 

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };
  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const columns = [
    {
      title: "SL NO",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
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
      title: "Category Name",
      dataIndex: "categoryName",
    },
    {
      title: "Product Images",
      dataIndex: "productImages",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            {record?.productImages?.map((imgObj, index) => (
              <div key={index} style={{ height: "40px", width: "40px" }}>
                <img
                  onClick={() => console.log("pressed")}
                  src={`${IMG_BASE_URL}${imgObj.productImagesUploadUrl}`}
                  style={{ height: "40px", width: "40px" }}
                />
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const AllProducts = useSelector(selectProducts);
  const AllProductsStatus = useSelector(selectAllProductsStatus);
  const AllProductsError = useSelector(selectAllProductsError);

  useEffect(() => {
    setDataSource(AllProducts);
  }, [AllProducts]);

  let content;

  if (AllProductsStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllProductsStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.productId;
    content = (
      <CustomTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    );
  } else if (AllProductsStatus === "failed") {
    content = <h2>{AllProductsError} </h2>;
  }

  const handleRowClick = (record) => {
    navigate(`/update_discount/${record.productId}`);
  };

  return (
    <Fragment>
      <CustomCardView>
        <CustomRow space={[24, 24]}>
        <Col span={24} md={12}>
          <Flex>
            <CustomLableBack />
            <CustomInputSearch
              placeholder={"Search By Product Name"}
              // value={searchTexts}
              onChange={(e) => handleSearchs(e.target.value)}
            />
          </Flex>
        </Col>
        <Col span={24} md={12}>
          <CustomPageTitle Heading={'View Products'} />
        </Col>
      </CustomRow>

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
