import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable, CustomTag } from "@components/form";
import {
  CommonLoading,
  CustomCardView,
  CustomModal,
  CustomPopConfirm,
  CustomRow,
  Flex,
} from "@components/others";
import {
  getdiscount,
  selectAllDiscount,
  selectAllDiscountError,
  selectAllDiscountStatus,
} from "@modules/Discount/DiscountSlice";
import {
  CustomPageTitle,
} from "@components/others/CustomPageTitle";
import { useParams } from "react-router-dom";
import { Badge, Col, Tooltip } from "antd";
import CustomInputSearch from "@components/form/CustomInputSearch";
import DiscountListTable from "./ViewDiscountListTable";
import { TbEyeDiscount } from "react-icons/tb";
import { THEME } from "@theme/index";
import { TableIconHolder } from "@components/others/Style";
import { baseRequest } from "@request/request";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";
import { APIURLS } from "@request/apiUrls/urls";
import CustomPopconfirm from "@components/others/CustomPopConfirm";
import { MdDelete } from "react-icons/md";

const ViewDiscountTable = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]); // Search Bar

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
  
    // ----------  Form Reset UseState ---------
    const [modelwith, setModelwith] = useState(0);

  const AllDiscount = useSelector(selectAllDiscount);
  const AllDiscountStatus = useSelector(selectAllDiscountStatus);
  const AllDiscountError = useSelector(selectAllDiscountError);

  useEffect(() => {
    setDataSource(AllDiscount);
  }, [AllDiscount]);

  useEffect(() => {
    dispatch(getdiscount());
  }, []);

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  // ===== Modal Functions Start =====
  const showModal = () => {
      setIsModalOpen(true);
  };


  const handleOk = () => {
      setIsModalOpen(false);
  };
  const handleCancel = () => {
      setIsModalOpen(false);
  };


  const DiscountAmountModal = (record) => {
    setModelwith(800)
    setModalTitle("Discount Total");
    setModalContent(<DiscountListTable record={record} />);
    showModal();
}
  // ========== Delete post ==========

  const handleConfirm = (record) => {
    DeleteDiscountOffer(record)
}

const DeleteDiscountOffer = async (record) => {
    await baseRequest.delete(`${APIURLS.DELETE_DICOUNT}/${record?.discountId}/`)
        .then(function (response) {
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
                msg: ' Discount details deleted successfully',
                type: 'success',
            })
            dispatch(getdiscount())
            return response.data;
        })
        .catch(function (error) {
            return errorHandler(error);
        })
}
  const TableColumns = [
    {
      title: "SI No",
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
      title: "Discount Title",
      dataIndex: "discountTitle",
      render: (value) => (
        <CustomTag
        title={value}
        bordered={"true"}
        color={"warning"}
      />
      ),
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      render: (value) => <span style={{ color: "green" }}>{value} %</span>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: 'Action',
      render: (record) => {
          return (
              <Flex center gap={'10px'}>
                  {/* <img src={SvgIcons.List} onClick={()=>DiscountAmountModal(record)}/> */}
                  <Tooltip title={"Discount List"}>
                  <TableIconHolder color={THEME.PRIMARY_PURPLE} size={"25px"}>
                  <TbEyeDiscount onClick={()=>DiscountAmountModal(record)}/>
                </TableIconHolder>
                  </Tooltip>
                <CustomPopconfirm 
                            record={record}
                            confirm={handleConfirm}
                            // cancel={handlePopConfrmCancel}
                            title={"Delete the Discount"}
                            description={"Are you sure you want to delete this discount?"}>
                            <TableIconHolder color={THEME.red} size={'22px'}>
                                <MdDelete />
                            </TableIconHolder>
                        </CustomPopconfirm>
              </Flex>
          )
      }
  },
  ];
  let content;

  if (AllDiscountStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllDiscountStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.productId;
    content = (
      <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
    );
  } else if (AllDiscountStatus === "failed") {
    content = <h2>{AllDiscountError} </h2>;
  }
  return (
    <Badge.Ribbon text=" Discount Offer!" color="volcano" >
    <CustomCardView>
        <CustomRow space={[24, 24]}>
          <Col span={24}  md={10} lg={6}>
          <CustomPageTitle Heading={"View Discount Offer"} />
          </Col>
          <Col span={24}  md={10} lg={8} style={{ display: 'flex', alignItems: 'center' }}>
            <CustomInputSearch
              placeholder={"Search by Product Name"}
              value={searchTexts}
              onChange={(e) => handleSearchs(e.target.value)}
            />
          </Col>
        </CustomRow>
  
        <Flex spacebetween={true}>
        </Flex>
      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modelwith}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
  </CustomCardView>
  </Badge.Ribbon>
  
  );
};

export default ViewDiscountTable;
