import React, { useState, useEffect } from "react";
import { Layout, Tabs } from "antd";
import styled from "styled-components";
import { CustomCardView } from "@components/others";
import { ViewAllDiscountReports } from "./DiscountReports/Partials/ViewReportTable";
import DiscountReports from "./DiscountReports";
import StockReports from "./StockReports";
import OrderReports from "./OrderReports";
import ViewPrint from "./main";
import { ViewAllOrderReturnReports } from "./OrderReturnReports/Partials/ViewReportTable";


const { Content } = Layout;
const { TabPane } = Tabs;

const AllReports = () => {
  const [tabPosition, setTabPosition] = useState("top");
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Load the active tab from local storage if available
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  // Update the local storage when the active tab changes
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTabPosition("top");
      } else {
        setTabPosition("left");
      }
    };

    // Initial check when the component mounts
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const TabHeader = styled(Tabs)`
    :where(.css-dev-only-do-not-override-190m0jy).ant-tabs
      > .ant-tabs-nav
      .ant-tabs-nav-list,
    :where(.css-dev-only-do-not-override-190m0jy).ant-tabs
      > div
      > .ant-tabs-nav
      .ant-tabs-nav-list {
      position: relative;
      display: flex;
      transition: opacity 0.3s;
      margin-top: 66px;
    }
  `;

  return (
    <Layout>
      <Content style={{ margin: "24px 16px", padding: 0 }}>
        <CustomCardView>
          <TabHeader
            tabPosition={tabPosition}
            activeKey={activeTab}
            onChange={handleTabChange}
          >
            <TabPane tab="Discount Offer" key="1">
              <DiscountReports />
            </TabPane>

            <TabPane tab="Stocks" key="2">
              <StockReports />
            </TabPane>

            <TabPane tab="Orders" key="3">
              <OrderReports />
            </TabPane>
            {/* <TabPane tab="Return" key="4">
              <ViewAllOrderReturnReports />
            </TabPane> */}
          </TabHeader>
        </CustomCardView>
      </Content>
    </Layout>
  );
};

export default AllReports;
