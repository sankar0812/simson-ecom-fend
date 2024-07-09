import { CustomRow, Flex } from "@components/others";
import { Card, Carousel, Col, message, Pagination, Popconfirm, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { VariantBox, VariantTotal, VarImg } from "./style";
import { Button, CustomTag } from "@components/form";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";
import { baseRequest, IMG_BASE_URL } from "@request/request";

import {
  getBusinessProfile,
  selectAllBusinessProfile,
} from "@modules/Admin/BusinessProfile/BusinessProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { TableIconHolder } from "@components/others/Style";
import { THEME } from "@theme/index";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TbShoppingCartCancel } from "react-icons/tb";
import { APIURLS } from "@request/apiUrls/urls";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsPinFill } from "react-icons/bs";

export const ViewOrderList = ({ ChangeRecord, GetOrders, invoiceTrigger }) => {

  const dispatch = useDispatch();
  console.log(ChangeRecord, 'ChangeRecord');

  const [dataSource, setDataSource] = useState([]);
  console.log(dataSource,'dataSource');

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;
  const totalItems = dataSource?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setDataSource(ChangeRecord?.orderItemListDetails);
  }, [ChangeRecord, invoiceTrigger]);

  //------------Order Total Amount Calc-------------------------
  const OrderTotalAmount = ChangeRecord?.orderItemListDetails?.reduce((sum, item) => {
    return  sum + parseFloat(item.totalPrice)
  }, 0)
  // console.log(OrderTotalAmount, 'OrderTotalAmount');
  //--------------------------------
  useEffect(() => {
    dispatch(getBusinessProfile());
  }, []);

  const ComapanyDetails = useSelector(selectAllBusinessProfile);

  const PostInvoice = async () => {
    // const newOrderStatus = dataSource.delivered ? "cancelled" : "delivered";
    const InvoiceDetails = {
      orderItemId: ChangeRecord?.orderItemId,
      companyId: ComapanyDetails?.companyId,
      statusType: "approved",
    };
    console.log(InvoiceDetails,'InvoiceDetails');
    setLoading(true);
    await baseRequest
      .post(`${APIURLS.POST_INVOICE}`, InvoiceDetails)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "success",
          type: "success",
        });
        if (GetOrders) {
          GetOrders();
        }
        setLoading(false);
        // console.log(response, '111qqqresponse');
        return response.data;
      })
      .catch(function (error) {
        // console.log(error, 'error');
        setLoading(false);
        return errorHandler(error);

      });
  };

  const StatusChange = async (record) => {
    const newOrderStatus = record.delivered ? "cancelled" : "delivered";

    const Ordervalues = {
      orderStatus: newOrderStatus,
      userOrderId: ChangeRecord?.orderItemId
    };

    await baseRequest
      .put(`${APIURLS.PATCH_ORDERS_STATUS}/${record?.orderItemListId}`, Ordervalues)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "success",
          type: "success",
        });
        if (GetOrders) {
          GetOrders();
        }
        return response.data;
      })
      .catch(function (error) {
        return errorHandler(error);
      });
  };

  const InvoiceChange = async (record) => {
    console.log(record,'record');
    const newOrderStatus = record.delivered ? "cancelled" : "delivered";

    const Ordervalues = {
      orderStatus: newOrderStatus,
      userOrderId: ChangeRecord?.orderItemId
    };

    await baseRequest
      .put(`${APIURLS.INVOICE_STATUS}${record?.orderItemListId}`, Ordervalues)
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "success",
          type: "success",
        });
        // if (GetOrders) {
        //   GetOrders();
        // }
        console.log(response.data,'ghghghgh');
        return response.data;
      })
      .catch(function (error) {
        return errorHandler(error);
      });
  };
  const renderProductsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return dataSource?.slice(startIndex, endIndex).map((pro) => (

      <div>
        <CustomRow
          space={[12, 12]}
          style={{
            borderBottom: "1px solid #e9e2e2",
            padding: "10px 0px",
          }}
        >
          <Col span={24} md={14} lg={10}>
            {/* <div style={{display:'flex'}} > */}
            <CustomRow space={[24, 24]}>
              <Col span={24} md={10}>
                <Carousel
                  slidesPerRow={1}
                  autoplay
                  autoplaySpeed={3000}
                  dots={false}
                  draggable
                  slidesToScroll={1}

                >
                  {pro?.productImages?.map((varImg) => {
                    return (
                      <VarImg>
                        <img
                          src={`${IMG_BASE_URL}${varImg?.productImagesUploadUrl}`}
                          alt="pro1"
                        />
                      </VarImg>
                    );
                  })}
                </Carousel>
              </Col>
              <Col span={24} md={14}>
                <VariantBox>
                  <h1>{pro?.productName}</h1>

                  {pro?.varientList?.map((varient, index) => (
                    <div key={index}>
                      <p>
                        {varient.varientName} :&nbsp;
                        <span>{varient?.varientValue}</span>
                      </p>
                    </div>
                  ))}

                </VariantBox>
              </Col>
            </CustomRow>

            {/* </div> */}

            {/* </Flex> */}
          </Col>

          <Col span={24} md={8} lg={10} >
            <CustomRow space={[24, 24]}>
              <Col span={24} md={8}>
                <p>Price</p>
                <h1
                  style={{
                    margin: "20px 0px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {pro?.totalAmount.toFixed(2)}
                </h1>
              </Col>
              <Col span={24} md={8}>
                <p>Quantity</p>
                <h1
                  style={{
                    margin: "20px 0px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {pro?.quantity}
                </h1>
              </Col>
              <Col span={24} md={8}>
                <p>Total Amount</p>
                <h1
                  style={{
                    margin: "20px 0px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {pro?.totalPrice.toFixed(2)}
                </h1>
              </Col>
            </CustomRow>
          </Col>
          
          <Col span={14} md={24} lg={2} style={{ margin: '20px 0px' }}>
            <Flex center={"true"} >
              <Tooltip title={'Order Status'}>
                {pro?.orderStatus === 'delivered' && (
                  <CustomTag
                    bordered={"true"}
                    color={"success"}
                    title={"Delivered"}
                  />
                )
                }

                {(pro?.orderStatus === 'cancelled' || pro?.orderStatus === 'cancel') && (
                  <CustomTag
                    bordered={"true"}
                    color={"error"}
                    title={"Cancelled"}
                  />
                )}
                {pro?.orderStatus === 'confirmed' && (
                  <CustomTag
                    bordered={"true"}
                    color={"processing"}
                    title={"Confirmed"}
                  />
                )}
                {pro?.orderStatus === 'pending' && (
                  <CustomTag
                    bordered={"true"}
                    color={"grey"}
                    title={"Pending"}
                  />
                )}
                {pro?.orderStatus === 'refundAccepted' && (
                  <CustomTag
                    bordered={"true"}
                    color={"orange"}
                    title={"Refund Accepted"}
                  />
                )}
                {pro?.orderStatus === 'returnAccepted' && (
                  <CustomTag
                    bordered={"true"}
                    color={"yellow"}
                    title={"Return Accepted"}
                  />
                )}
                   {pro?.orderStatus === 'returnRequestPending' && (
                  <CustomTag
                    bordered={"true"}
                    color={"grey"}
                    title={"Return Pending"}
                  />
                )}
              </Tooltip>
            </Flex >
          </Col>
          {pro?.delivered !== true &&
            (pro?.orderStatus !== 'cancelled' && pro?.orderStatus !== 'cancel' && pro?.orderStatus !== 'pending' && pro?.orderStatus !== 'refundAccepted' &&  pro?.orderStatus !== 'returnRequestPending' &&
              <Col span={14} md={24} lg={2} style={{ margin: '20px 0px' }}>
                {pro?.delivered ? (
                  // <Tooltip title={"Delivered"}>
                  //   <Popconfirm
                  //     title="Change The Order Status"
                  //     description="Are you sure to Cancelled this order ?"
                  //     okText="Yes"
                  //     cancelText="No"
                  //     onConfirm={() => StatusChange(pro)}
                  //   >
                  <TableIconHolder color={THEME.green} size={"22px"}>
                    <AiOutlineDeliveredProcedure />
                  </TableIconHolder>
                  //   </Popconfirm>
                  // </Tooltip>
                ) : (
                  // <Tooltip title={"Cancelled"}>
                  <Popconfirm
                    title="Change The Order Status"
                    description="Are you sure to Delivered this order ?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => StatusChange(pro)}
                  >
                    <TableIconHolder color={THEME.blue} size={"22px"}>
                      <MdOutlineProductionQuantityLimits />
                    </TableIconHolder>
                  </Popconfirm>
                  //  </Tooltip>
                )}
              </Col>)}
              <Col span={14} md={24} lg={2} style={{ margin: '20px 0px' }} >
              {/* <BsPinFill  fontSize={20}/>  */}
              <Popconfirm
                    title="Change The Invoice Status"
                    // description="Are you sure to Invoice this order ?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => InvoiceChange(pro)}
                  >
                    {pro?.invoicePdf === true ? (
                         <TableIconHolder color={THEME.blue} size={"22px"}>
                         <BsPinFill />
                       </TableIconHolder>
                    ) : (
                      <TableIconHolder color={THEME.red} size={"22px"}>
                      <BsPinFill />
                    </TableIconHolder>
                    )}
                  </Popconfirm>
              </Col>
        </CustomRow>
      </div>

    ));
  };
  return (
    <Card>
      <h1 style={{ fontSize: '20px' }}>Add Invoice</h1><br />
      <Flex gap={"10px"}>
        <h3 style={{ color: "rgb(103, 119, 136)", fontWeight: "400" }}>
          View Order&nbsp;
          <span style={{ color: "#000", fontWeight: "400" }}>
            / Invoice details
          </span>
        </h3>
        {ChangeRecord?.paymentStatus === "paid" && (
          <CustomTag
            bordered={"true"}
            color={"#28a745"}
            title={"Paid"}
          />
        )}
        {ChangeRecord?.paymentStatus === "unpaid" && (
          <CustomTag
            bordered={"true"}
            color={"#ff6347"}
            title={"UnPaid"}
          />
        )}
        {ChangeRecord?.invoiceStatus === "InvoiceCompleted" ? <Tooltip title={'Invoice Status'}> <CustomTag title={"Completed"} bordered={"true"} color={"green"} /></Tooltip> :
          <Tooltip title={'Invoice Status'}><CustomTag title={"In-Complete"} bordered={"true"} color={"error"} /> </Tooltip>
        }
      </Flex >
      <Card style={{ margin: "10px 0px" }}>
        <h3
          style={{ color: "#000", fontWeight: "400", borderBottom: "1px solid #e9e2e2", paddingBottom: '10px' }}
        >
          Orders Item&nbsp;:&nbsp;{ChangeRecord?.orderItemList?.length}
        </h3>

        <div>
          {renderProductsForPage()}
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={onPageChange}
            style={{ padding: '10px 0px' }}
          />
        </div>
        <CustomRow>
          <Col span={24}  md={12} offset={12} >
            <Flex aligncenter={true} spaceevenly={true}>
              <VariantTotal>
                <h3>Subtotal&nbsp;:</h3>
                <h3>Grand Total&nbsp;:</h3>
              </VariantTotal>
              <VariantTotal>
                <p>₹&nbsp;{OrderTotalAmount}</p>
                <p>₹&nbsp;{OrderTotalAmount}</p>
              </VariantTotal>
            </Flex>
          </Col>
        </CustomRow>
      </Card>
      {ChangeRecord?.invoiceFlag === true &&
        <Flex center gap={"15px"}>
          <Button.PrimaryNow text={"Submit"} onClick={() => PostInvoice()} loading={loading} />
          <Button.Danger text={"Cancel"} onClick={GetOrders} />
        </Flex>}
    </Card>
  );
};
