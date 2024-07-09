import { Col } from "antd";
import React, { useEffect } from "react";
import { CustomCardView, CustomRow, Flex } from "@components/others";
import { StyledCardDash } from "@components/common/Styled";
import {
  getDashboardCard,
  ViewDashboardCardCount,
} from "@modules/Dashboard/DashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { SvgIcons } from "@assets/Svg";
import { BarChart, DiscountTable, DoubleBarChart, HighMovingProductTable, LineChart, OutofStockTable, ReturnProductTable } from "./Charts";
import order from "@assets/images/order.jpg";
import stock from "@assets/images/stock.png";
import sales from "@assets/images/sales.avif";
import delivery from "@assets/images/delivery.jpg";
import income from "@assets/images/income.png";
import customers from "@assets/images/customers.jpg";
import { CustomPageFormTitle } from "@components/others/CustomPageTitle";

const Cards_Dasboard = () => {
  const AllDashData = useSelector(ViewDashboardCardCount);
  console.log(AllDashData, "AllDashData");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardCard());
  }, []);

  const Sales = parseFloat((AllDashData?.currentDayIncome) || 0).toFixed(0) || 0
  const Currentincome = parseFloat((AllDashData?.currentYearIncome) || 0).toFixed(0) || 0

  const cardData = [
    {
      key: "1",
      rate: AllDashData?.totalOrdersCurrentDay || 0,
      // icon: SvgIcons.Order,
      p: "Orders",
      // backgroundColor: "#fec209", // yellow
      backgroundImage: order,
    },
    {
      key: "2",
      rate: AllDashData?.totalStock || 0,
      // icon: SvgIcons.Stock,
      p: "Stocks",
      // backgroundColor: "#16a3b8", // blue
      backgroundImage: stock,
    },
    {
      key: "3",
      rate: Sales,
      // icon: SvgIcons.Sale,
      p: "Sales",
      // backgroundColor: "#de3545", // red
      backgroundImage: sales,
    },
    {
      key: "4",
      rate: AllDashData?.totalDeliveredOrders || 0,
      // icon: SvgIcons.Delivered,
      p: "Delivered",
      // backgroundColor: "#29a744", // green
      backgroundImage: delivery,
    },
  ];

  const cardDatas = [
    {
      key: "1",
      rate: AllDashData?.totalCustomers || 0,
      // icon: SvgIcons.Order,
      p: "Customers",
      // backgroundColor: "#fec209", // yellow
      backgroundImage: customers,
    },
    {
      key: "2",
      rate: Currentincome,
      // icon: SvgIcons.Stock,
      p: "Current Month Income",
      // backgroundColor: "#16a3b8", // blue
      backgroundImage: income,
    },
  ];

  return (
    <div>
      <CustomRow space={[24, 24]}>
        {cardData.map((item, i) => (
          <Col span={24} md={12} key={i} lg={6} sm={12}>
            <StyledCardDash
              // backgroundcolor={item?.backgroundColor}
              background={item?.backgroundImage}
              style={{ padding: "30px 20px" }}
            >
              <h1>{item?.p} </h1>
              <h2>{item?.rate}</h2>
            </StyledCardDash>
          </Col>
        ))}
        <Col span={24} md={15}>
          <CustomCardView style={{ height: "100%" }}>
            <LineChart />
          </CustomCardView>
        </Col>

        <Col span={24} md={9}>
          <CustomRow space={[13, 13]} style={{ height: "48%" }}>
            {cardDatas.map((item, i) => (
              <Col span={24} md={24} key={i} style={{ height: "100%" }}>
                <StyledCardDash
                  backgroundcolor={item?.backgroundColor}
                  background={item?.backgroundImage}
                  style={{ padding: "30px 20px" }}
                >
                  <h1>{item?.p} </h1>
                  <h2>{item?.rate}</h2>
                </StyledCardDash>
              </Col>
            ))}
          </CustomRow>
        </Col>

        <Col span={24} md={13}>
          <CustomCardView style={{ height: "100%" }}>
            <CustomPageFormTitle
              Heading={"Product Discount"}
              style={{ color: "#373D3F" }}
            />
            <DiscountTable />
          </CustomCardView>
        </Col>

        <Col span={24} md={11}>
          <CustomCardView style={{ height: "100%" }}>
            <BarChart />
          </CustomCardView>
        </Col>

        <Col span={24} md={14}>
          <CustomCardView style={{ height: "100%" }}>
            <DoubleBarChart />
          </CustomCardView>
        </Col>

        <Col span={24} md={10}>
          <CustomCardView style={{ height: "100%" }}>
            <CustomPageFormTitle
              Heading={"Out of Stocks"}
              style={{ color: "#373D3F" }}
            />
            <OutofStockTable />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView style={{ height: "100%" }}>
            <CustomPageFormTitle
              Heading={"High Moving Products"}
              style={{ color: "#373D3F" }}
            />
            <HighMovingProductTable />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView style={{ height: "100%" }}>
            <CustomPageFormTitle
              Heading={"Return Products"}
              style={{ color: "#373D3F" }}
            />
            <ReturnProductTable />
          </CustomCardView>
        </Col>
      </CustomRow>
    </div>
  );
};

export default Cards_Dasboard;
