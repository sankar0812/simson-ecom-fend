import { SvgIcons } from "@assets/Svg";
import { Button, CustomTable } from "@components/form";
import {
  CommonLoading,
  CustomModal,
  CustomRow,
  Flex,
} from "@components/others";
import React, { useEffect, useState } from "react";
import { CustomPageTitle } from "@components/others/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboard1,
  getDashboard3,
  selectDashboard1,
  selectDashboard1Error,
  selectDashboard1Status,
  selectDashboard3,
  selectDashboard3Error,
  selectDashboard3Status,
} from "@modules/Dashboard/DashboardSlice";
import { Col, Popconfirm, Tooltip } from "antd";
import { baseRequest, IMG_BASE_URL } from "@request/request";
import { TableIconHolder } from "@components/others/Style";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { APIURLS } from "@request/apiUrls/urls";
import { THEME } from "@theme/index";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";
import Dashboard3 from "./Dashboard3";

const ViewDashboard3 = () => {
  const [dataSource, setDataSource] = useState([]);
  const [trigger, setTrigger] = useState(0);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);
  const [statusData, setStatusData] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard3());
  }, []);

  const AllDashboard3 = useSelector(selectDashboard3);
  const AllDashboard1Status = useSelector(selectDashboard3Status);
  const AllDashboard1Error = useSelector(selectDashboard3Error);

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
    setModalTitle("Add Dashboard 3");
    setModalContent(<Dashboard3 FormClosee={FormClose} />);
    showModal();
  };

  const EditDash1 = (record) => {
    setTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Update Dashboard 3");
    setModalContent(
      <Dashboard3 record={record} FormClose={FormClose} trigger={trigger} />
    );
    showModal();
  };

  const Dash3Status = async (record) => {
    if (record?.status === true) {
      setStatusData("inactive");
    } else if (record?.status === false) {
      setStatusData("");
    }
    const newValues = record?.status? "inactive":""
    const Statusvalues = {
      dashboardStatus: newValues,
    };
    await baseRequest
      .put(
        `${APIURLS.PUT_DASHBOARD3_STATUS}/${record?.dashboard3Id}`,
        Statusvalues
      )
      .then(function (response) {
        successHandler(response, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
          msg: "Successfully",
          type: "info",
        })
        dispatch(getDashboard3());
        return response.data;
      })
      .catch(function (error) {
        console.log(error, "errr");
        return errorHandler(error);
      });
  };

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
      title: "Description",
      dataIndex: "description",
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
        console.log(record, "record");
        return (
          <Flex center gap={"10px"}>
            {record?.status === true && (
              <Tooltip title={"Active"}>
                <Popconfirm
                  title="Change The Status"
                  description="Do you want to change the status into 'IN-ACTIVE'?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => Dash3Status(record)}
                >
                  <TableIconHolder color={THEME.green} size={"22px"}>
                    <HiOutlineBellAlert />
                  </TableIconHolder>
                </Popconfirm>
              </Tooltip>
            )}
            {record?.status === false && (
              <Tooltip title={"In-Active"}>
                <Popconfirm
                  title="Change The Status"
                  description="Do you want to change the status into 'ACTIVE'?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => Dash3Status(record)}
                >
                  <TableIconHolder color={THEME.red} size={"22px"}>
                    <HiOutlineBellSlash />
                  </TableIconHolder>
                </Popconfirm>
              </Tooltip>
            )}
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
    <div>
      <CustomRow>
        <Col span={24} md={12}>
          <CustomPageTitle Heading={"View Dashboard III"} />
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
    </div>
  );
};

export default ViewDashboard3;
