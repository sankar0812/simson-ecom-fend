import { SvgIcons } from "@assets/Svg";
import { Button, CustomInput, CustomTable } from "@components/form";
import {
  CommonLoading,
  CustomCardView,
  CustomModal,
  CustomRow,
  Flex,
} from "@components/others";
import React, { Fragment, useEffect, useState } from "react";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboard4,
  selectDashboard4,
  selectDashboard4Error,
  selectDashboard4Status,
} from "@modules/Dashboard/DashboardSlice";
import { Col, Popconfirm } from "antd";
import { baseRequest, IMG_BASE_URL } from "@request/request";
import Dashboard4 from "./Dashboard4";

const ViewDashboard4 = () => {
  const [dataSource, setDataSource] = useState([]);
  const [trigger, setTrigger] = useState(0);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard4());
  }, []);

  const AllDashboard3 = useSelector(selectDashboard4);
  const AllDashboard1Status = useSelector(selectDashboard4Status);
  const AllDashboard1Error = useSelector(selectDashboard4Error);


  useEffect(() => {
    setDataSource(AllDashboard3);
  }, [AllDashboard3]);

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
  const AddDash1 = () => {
    setModelwith(800);
    setModalTitle("Add Dashboard 4");
    setModalContent(<Dashboard4  FormClosee={FormClose} />);
    showModal();
  };

  const EditDash1 = (record) => {
    setTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Update Dashboard 4");
    setModalContent(<Dashboard4 record={record} FormClose={FormClose} trigger={trigger}/>);
    showModal();
  };
  const [statusData, setStatusData] = useState('');


  const TableColumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Product Images",
      dataIndex: "url",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <div key={index} style={{ height: "40px", width: "40px" }}>
              <img
                onClick={() => console.log("pressed")}
                src={`${IMG_BASE_URL}${record.url}`}
                style={{ height: "40px", width: "40px" }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center gap={"10px"}>
            <img
              src={SvgIcons.Edit}
              onClick={() => {
                EditDash1(record);
              }}
              style={{cursor:'pointer'}}
            />
          </Flex>
        );
      },
    },
  ];

  let content;

  if (AllDashboard1Status === "loading") {
    content = <CommonLoading />;
  } else if (AllDashboard1Status === "succeeded") {
    const rowKey = (dataSource) => dataSource.id;
    content = (
      <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
    );
  } else if (AllDashboard1Status === "failed") {
    content = <h2>{AllDashboard1Error}</h2>;
  }

  return (
    <Fragment>
      <CustomCardView>
      <CustomRow>
        <Col span={24} md={12}>
          <CustomPageTitle Heading={"View Dashboard IV"} />
        </Col>
        <Col span={24} md={12}>
          <Flex flexend={"right"}>
            <Button.PrimaryNow text={"+ ADD"} onClick={AddDash1} />
          </Flex>
        </Col>
        <Col span={24} md={24} style={{ marginTop: "10px" }}>
          {content}
        </Col>
        <CustomModal
          isVisible={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          width={modelwith}
          modalTitle={modalTitle}
          modalContent={modalContent}
        />
      </CustomRow>
      </CustomCardView>
    </Fragment>
  );
};

export default ViewDashboard4;
