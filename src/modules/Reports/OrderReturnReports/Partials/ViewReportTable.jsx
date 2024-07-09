import { CustomDateRangePicker, CustomSelect, CustomTag } from "@components/form";
import ButtonStandard from "@components/form/CustomStandardButton";
import { CustomStandardTable } from "@components/form/CustomStandardTable";
import { CommonLoading, CustomModal, CustomRow, Flex } from "@components/others";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { getdiscount, selectAllDiscount, selectAllDiscountError, selectAllDiscountStatus } from "@modules/Discount/DiscountSlice";
import { APIURLS } from "@request/apiUrls/urls";
import errorHandler from "@request/errorHandler";
import { baseRequest, IMG_BASE_URL } from "@request/request";
import successHandler from "@request/successHandler";
import { Col, DatePicker, Form } from "antd";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { TbArrowsExchange } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const Filter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  font-size: 25px;
  color: #1677ff;
  font-weight: 600;
  margin: 0 0 20px 0;

  & svg {
    font-size: 25px;
  }
`;
export const MoveSlider = styled.div`
  position: relative;
  background: ${(props) => (props.showdetailsONs ? "#f8f8f8" : "white")};
  /* box-shadow: 0 0 5px 5px rgba(0,0,0,0.03); */
  width: 100%;
  height: ${(props) => (props.showdetailsONs ? "100%" : "0")};
  overflow: hidden;
  border-radius: 10px;
  border: white 1px;
  top: ${(props) => (props.showdetailsONs ? "0" : "-100px")};
  transition: all 0.5s;
`;
export const ViewAllOrderReturnReports = () => {
  const [form] = Form.useForm();
  const nevigate = useNavigate();

  const [dateRange, setDateRange] = useState([]);
  const [choiceFull, setChoiceFull] = useState("");
  const [dataSource, setDataSource] = useState([]);
  console.log(dataSource,'dataSource');
  const [searchTexts, setSearchTexts] = useState([]);

  const [modalWidth, setModalWidth] = useState(0);
  const [showdetailsON, setShowdetailsON] = useState(false);
  const [show, setShow] = useState(false); //  use Date filter
  const [monthshow, setMonthShow] = useState(false); // use  month filter
  const [monthData, setMonthData] = useState(null); //  use month handle fn
  const formattedMonth = monthData? dayjs(monthData).format('MMMM'): '';  // date format month string
  const formattedYear = monthData? dayjs(monthData).format('YYYY'): '';  // date format month string

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();


  const AllDiscount = useSelector(selectAllDiscount);
  const AllDiscountStatus = useSelector(selectAllDiscountStatus);
  const AllDiscountError = useSelector(selectAllDiscountError);

  // useEffect(() => {
  //   setDataSource(AllDiscount);
  // }, [AllDiscount]);

  useEffect(() => {
    dispatch(getdiscount());
  }, []);


  // ===== Modal Functions Start =====

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
// =========  Filter Show =======

  const handleChange = () => {
    setShowdetailsON(!showdetailsON);
  };
  
  //================= Delete filter Discount Date fn============

  const DatesFilter = [
    { label: "Month", value: "month" },
    { label: "Custom", value: "date" },
  ];



  const handleDateRangeChange = (values) => {
    setDateRange(values);
  };

  const handleMonth = (date) => {
    setMonthData(date);
    
  };

  const handleMonthSelect = (value) => {
    form.setFieldsValue({ range: null });
    if (value === "date") {
      setShow(true);
      setMonthShow(false);
      setChoiceFull(value);
    } else if (value === "month") {
      setMonthShow(true);
      setShow(false);
      setChoiceFull(value);
    } else {
      setMonthShow(false);
      setShow(false);
    }

  };

  const DateSearch = async (data) => {
    await baseRequest
      .post(APIURLS.POST_ORDERREPORT_DATE, data)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: response.data.length ? "Date Filter Search successful":"No data found",
          type: response.data.length ? "success" : "warning", 
        });
       setDataSource(response.data)
       console.log(response,'reaaaa');
        return response.data;
      })
      .catch(function (error) {
        return errorHandler(error);
      });
  };

  //==========

  const onFinish = (values) => {

    if(choiceFull === 'date'){
        const Customvalues = {
            startDate: dateRange?.start_date,
            endDate: dateRange?.end_date,
            choose: choiceFull,
          };
          DateSearch(Customvalues);  
    }
    else if(choiceFull === 'month'){
        const monthvalues = {
            choose: choiceFull,
            monthName: formattedMonth,
            year:formattedYear,
          };
          DateSearch(monthvalues);  
    }

  };
  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };
  const TableColumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
        title: "Variant Image",
        dataIndex: "productVarientImageUrl",
        render: (record) => {
          return (
            <img
              src={`${IMG_BASE_URL}${record}`}
              alt="Product Variant"
              style={{ height: "40px", width: "40px" }}
            />
          );
        },
      },
    {
        title: "Order No",
        dataIndex: "orderItemId",
      },
      {
        title: "User Name",
        dataIndex: "userName",
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
        title: "Variant",
        render: (record) => {
          return (
            <span style={{ color: "blue" }}>
              {record.varientName}/{record.varientValue}
            </span>
          );
        },
      },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      render: (text, record) => (
        <span style={{ color: "#FF8C00", fontWeight: "400" }}>
          {record.totalAmount}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
        title: "Status",
        render: (text, record, index) => {
          console.log(record, "status");
          return (
            <Fragment>
              <Flex center={"true"}>
                {record?.orderStatus === "delivered" && (
                  <CustomTag
                    bordered={"true"}
                    color={"success"}
                    title={"DELIVERED"}
                  />
                )}
                {record?.orderStatus === "cancelled" && (
                  <CustomTag
                    bordered={"true"}
                    color={"error"}
                    title={"CANCELED"}
                  />
                )}
                {record?.orderStatus === null && (
                  <CustomTag
                    bordered={"true"}
                    color={"processing"}
                    title={"PENDING"}
                  />
                )}
              </Flex>
            </Fragment>
          );
        },
      },
  ];
  let content;

  if (AllDiscountStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllDiscountStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeId;
    content = (
      <CustomStandardTable
        columns={TableColumns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllDiscountStatus === "failed") {
    content = <h2>{AllDiscountError}</h2>;
  }

  return (
    <Fragment>
      <CustomPageTitle Heading={"Order Reports"} />
      <br />
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          from_date: dayjs(),
          to_date: dayjs(),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[24, 24]}>
          <Col span={24} md={5}>
            <Filter onClick={handleChange}>
              <BiFilterAlt />
              &nbsp;&nbsp;Filter
            </Filter>
          </Col>
          <Col span={24} md={15}></Col>
          <Col span={24} md={4}>
          </Col>
        </CustomRow>
        <MoveSlider showdetailsONs={showdetailsON}>
          <CustomRow space={[24, 24]} style={{ marginTop: "20px",flexWrap: 'wrap' }} >
            <>
              <Col span={24} md={24} lg={3} style={{ marginTop: "10px" }}>
                <b>Choose</b>&nbsp;&nbsp;
              </Col>
              <Col span={24} md={24} lg={10}>
                <CustomSelect
                  options={DatesFilter}
                  name={"month"}
                  placeholder={"Select"}
                  onChange={handleMonthSelect}
                  rules={[
                    { required: true, message: "Please Select the Month" },
                  ]}
                />
              </Col>
              <Col span={24} md={24}>
                {show ? (
                  <CustomRow space={[24, 24]}>
                    <Col span={24} md={24} lg={3} >
                      <b>Between</b>&nbsp;&nbsp;
                      <TbArrowsExchange />
                    </Col>

                    <Col span={24} md={24} lg={8} >
                      <CustomDateRangePicker
                        onChange={handleDateRangeChange}
                        name={"range"}
                        value={dateRange}
                        rules={[
                          {
                            required: true,
                            message: "Please Select the Date",
                          },
                        ]}
                      />
                    </Col>

                    <Col span={24} md={24} lg={6} >
                      <Flex>
                        <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
                      </Flex>
                    </Col>
                  </CustomRow>
                ) : null}

                {monthshow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24}  lg={3}>
                        <b>Month</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8} >
                      <DatePicker.MonthPicker
                        format="MMMM, YYYY"
                        value={monthData}
                        onChange={handleMonth}
                        style={{width:'100%',height:'40px'}}
                      />
                      </Col>
                      <Col span={24}  md={24} lg={3}>
                        <Flex>
                          <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}
              </Col>
            </>
          </CustomRow>
        </MoveSlider>
      </Form>

      {content}

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modalWidth}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
