import { CustomTable, CustomTag } from "@components/form";
import {
  CommonLoading,
  CustomModal,
  CustomRow,
  Flex,
} from "@components/others";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getAllReturnOrders,
  selectAllReturnOrders,
  selectReturnOrderError,
  selectReturnOrderStatus,
} from "../../OrderSlice";
import { TableIconHolder } from "@components/others/Style";
import { THEME } from "@theme/index";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";
import { Col, Popconfirm, Tooltip } from "antd";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import CustomInputSearch from "@components/form/CustomInputSearch";
import { MdOutlinePending } from "react-icons/md";

const ViewReturnOrder = ({ id }) => {
  const [dataSource, setDataSource] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const [searchTexts, setSearchTexts] = useState([]); // Search Bar
  const [trigger, setTrigger] = useState(0);

  const dispatch = useDispatch();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);

  const AllReturnOrders = useSelector(selectAllReturnOrders);
  const AllReturnOrdersStatus = useSelector(selectReturnOrderStatus);
  const AllReturnOrderError = useSelector(selectReturnOrderError);
  console.log(AllReturnOrders, 'AllReturnOrders');

  useEffect(() => {
    dispatch(getAllReturnOrders());
  }, []);

  const FindUserOrders = useMemo(
    () => AllReturnOrders?.find((item) => item?.userId === id?.id),
    [AllReturnOrders, id]
  );

  useEffect(() => {
    setDataSource(AllReturnOrders);
  }, [AllReturnOrders]);

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

  const GetOrders = () => {
    dispatch(getAllOrders());
  };
  const handleAcceptChange = (record) => {
    const Accepted = 'accepted'
    StatusChange(record, Accepted)
  }

  const handleRejectChange = (record) => {
    StatusChange(record)
  }

  const StatusChange = async (record, Accepted) => {
    console.log(record, "WWWW");

    const Ordervalues = {
      returnStatus: Accepted ? 'accepted' : 'rejected',
    };
    await baseRequest
      .put(
        `${APIURLS.PATCH_ORDERS_RETURN_STATUS}/${record?.orderReturnId}`,
        Ordervalues
      )
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Success",
          type: "success",
        });
        setStatusData(response.data?.orderReturn)
        console.log(response.data, 'dddddd');
        dispatch(getAllReturnOrders());
        GetOrders();
        return response.data;
      })
      .catch(function (error) {
        return errorHandler(error);
      });
  };
  console.log(statusData, 'statusData');
  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const TableColumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Reason for Return",
      dataIndex: "reasonForReturn",
      render: (text, record, index) => (
        <div style={{
          border: index % 2 === 0 ? "1px solid #ccc" : "#fff",
          padding: "5px",
          borderRadius: "3px",
          background: index % 2 === 0 ? "#f9f5f5" : "#fff",
        }}>
          {text}
        </div>
      ),
    },
    {
      title: "Return Status",
      dataIndex: "returnStatus",
      render: (text, record, index) => {
        console.log(record, "status");
        return (
          <Fragment>
            <Flex center={"true"}>
              {record?.returnStatus === "accepted" ? (
                <CustomTag
                  bordered={"true"}
                  color={"success"}
                  title={"accepted"}
                />
              ) : <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"Pending"}
              />}

            </Flex>
          </Fragment>
        );
      },
    },
    {
      title: "Action",
      render: (record) => {

        console.log(record, 'record');
        return (
          <Flex center={"true"} gap={"20px"}>

            {record?.accepted !== true ?
              <Popconfirm
                title="Change the Return Status"
                description="Are you sure to return accepted this order ?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleAcceptChange(record)}
              >
                <TableIconHolder color={THEME.red} size={"22px"}>
                  <MdOutlinePending size={24} />
                </TableIconHolder>
              </Popconfirm> :
              <Tooltip title={'Return Accepted'}>
                <TableIconHolder color={THEME.green} size={"22px"} style={{ cursor: 'normal' }}>
                  <GiConfirmed size={24} style={{ cursor: "context-menu" }} />
                </TableIconHolder>
              </Tooltip>
            }
            {/* {(record?.rejected || record?.accepted === false && record?.rejected === false) && (
              ((record?.accepted === false && record?.rejected === false) ?
                <Popconfirm
                  title="Change The Order Status"
                  description="Are you sure to rejected this order ?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleRejectChange(record)}
                >
                  <TableIconHolder color={THEME.red} size={"22px"} >
                    <GiCancel />
                  </TableIconHolder>
                </Popconfirm>
                : <Tooltip title={"rejected"} >
                  <TableIconHolder color={THEME.red} size={"22px"} >
                    <GiCancel style={{cursor: "context-menu"}}/>
                  </TableIconHolder>
                </Tooltip>)
            )} */}

          </Flex>
        );
      },
    },
  ];

  let content;

  if (AllReturnOrdersStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllReturnOrdersStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.orderItemId;
    content = (
      <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
    );
  } else if (AllReturnOrdersStatus === "failed") {
    content = <h2>{AllReturnOrderError}</h2>;
  }

  return (
    <Fragment>

      <CustomRow space={[24, 24]}>
        <Col span={24} md={14} lg={5}>
          <CustomPageTitle Heading={"View Order Retrun"} />
        </Col>
        <Col
          span={24}
          md={10}
          lg={8}
          style={{ display: "flex", alignItems: "center" }}
        >
          <CustomInputSearch
            placeholder={"Search by User Name"}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
      </CustomRow>

      <Flex spacebetween={true}></Flex>

      {content}
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

export default ViewReturnOrder;
