import { CustomTable, CustomTag } from "@components/form";
import {
  CommonLoading,
  CustomModal,
  CustomRow,
  Flex,
} from "@components/others";
import React, { Fragment, useEffect, useState } from "react";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  selectAllOrders,
  selectOrderError,
  selectOrderStatus,
} from "../../OrderSlice";
import CustomInputSearch from "@components/form/CustomInputSearch";
import { Col } from "antd";
import InvoicePrintView from "./InvoicePrintView";
import CustomDropdownButton2 from "@components/form/CustomDropDownButton2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ViewOrderList } from "./ViewOrderList";
import { useNavigate } from "react-router-dom";


const Vieworder = ({ id }) => {
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]); // Search Bar
  const [trigger, setTrigger] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);
  const [invoiceTrigger, setInvoiceTrigger] = useState(0);
  const [printTrigger, setPrintTrigger] = useState(0);

  const AllOrders = useSelector(selectAllOrders);
  const AllOrdersStatus = useSelector(selectOrderStatus);
  const AllOrderError = useSelector(selectOrderError);

  console.log(AllOrders, 'QWERAllOrders');

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  useEffect(() => {
    // const sortedOrders = [...AllOrders].sort(
    //   (a, b) => new Date(b.date) - new Date(a.date)
    // );
    setDataSource(AllOrders);
  }, [AllOrders]);

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
    handleOk()
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };


  const ChangeOrderList = (record) => {
    setInvoiceTrigger(invoiceTrigger + 1)
    setModelwith(1200);
    setModalContent(
      <ViewOrderList ChangeRecord={record} GetOrders={GetOrders} invoiceTrigger={invoiceTrigger} />
    );
    showModal();

    // navigate('/view_order_details')
  };
  const InvoicePrint = (record) => {
    setPrintTrigger(printTrigger + 1)
    setModelwith(1000);
    setModalContent(
      <InvoicePrintView OrderListRecord={record} GetOrders={GetOrders} ChangeRecord={record} printTrigger={printTrigger}/>
    );
    showModal();
  };

  const handleMenuClick = (e) => {
    console.log('click', e);
  };

  const menuProps = (record) => {
    return {
      items: [
        record?.invoiceFlag &&  {
          label: 'Invoice',
          key: '1',
          onClick: () => InvoicePrint(record),
        },
        // {
        //     label: 'Save',
        //     key: '2',
        //     danger: true,
        // }
      ],
      onClick: handleMenuClick,
    };
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
      title: "Customer",
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
      title: "Mobile No",
      dataIndex: "mobileNumber",
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
      render: (text, record) => (
        <span style={{ color: record.paymentType === 'Online' ? 'green' : 'blue' }}>
          {text}
        </span>
      ),
    },
    // {
    //   title: "Payment Status",
    //   dataIndex: "paymentStatus",
    //   render: (text, record, index) => {
    //     console.log(record, "status");
    //     return (
    //       <Fragment>
    //         <Flex center={"true"}>
    //           {record?.paymentStatus === "Paid" && (
    //             <CustomTag
    //               bordered={"true"}
    //               color={"#28a745"}
    //               title={"Paid"}
    //             />
    //           )}
    //           {record?.paymentStatus === "unpaid" && (
    //             <CustomTag
    //               bordered={"true"}
    //               color={"#ff6347"}
    //               title={"UnPaid"}
    //             />
    //           )}
    //               {record?.paymentStatus === null && (
    //             <CustomTag
    //               bordered={"true"}
    //               // color={"#ff6347"}
    //               title={"-"}
    //             />
    //           )}
    //         </Flex>
    //       </Fragment>
    //     );
    //   },
    // },
    {
      title: "Invoice Status",
      // dataIndex: "invoiceFlag",
      render: (text, record, index) => {
        return (
          <Fragment>
            <Flex center={"true"}>
              {record?.invoiceFlag ? (
                <CustomTag
                  bordered={"true"}
                  color={"success"}
                  title={"Completed"}
                />
              )
                :
                <CustomTag
                  bordered={"true"}
                  color={"red"}
                  title={"In-Completed"}
                />
              }

            </Flex>
          </Fragment>
        );
      },
    },
    // {
    //   title: "Invoice Status",
    //   // dataIndex: "invoiceFlag",
    //   render: (text, record, index) => {
    //     console.log(record, "status");
    //     return (
    //       <Fragment>
    //         <Flex center={"true"}>
    //           {record?.invoiceStatus === "InvoiceCompleted" ?(
    //             <CustomTag
    //               bordered={"true"}
    //               color={"success"}
    //               title={"Completed"}
    //             />
    //           )
    //           :
    //           <CustomTag
    //           bordered={"true"}
    //           color={"error"}
    //           title={"In-Completed"}
    //         />
    //         }

    //         </Flex>
    //       </Fragment>
    //     );
    //   },
    // },
    // {
    //   title: "Payment Type",
    //   dataIndex: "paymentType",
    // },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center={"true"} gap={"20px"}>
            <CustomDropdownButton2 text={'View'} menu={menuProps(record)} onClick={() => ChangeOrderList(record)} // Example custom icon style
              bgColor={'gray'} placement="bottomLeft" trigger={['click']} icon={<RiArrowDropDownLine size={22} color='grey' />} />

          </Flex>
        );
      },
    },
  ];

  let content;

  if (AllOrdersStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllOrdersStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.orderItemId;
    content = (
      <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
    );
  } else if (AllOrdersStatus === "failed") {
    content = <h2>{AllOrderError}</h2>;
  }

  return (
    <Fragment>

      <CustomRow space={[12, 12]}>
        <Col span={24} md={8} lg={5}>
          <CustomPageTitle Heading={"View Order"} />
        </Col>
        <Col
          span={24}
          md={12}
          lg={8}
          style={{ display: "flex", alignItems: "center" }}
        >
          <CustomInputSearch
            placeholder={"Search by Customer Name"}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
      </CustomRow>
      {/* <IoPrintOutline onClick={() => InvoicePrint()} /> */}

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

export default Vieworder;
