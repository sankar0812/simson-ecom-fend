import React, { useEffect, useState } from "react";
import { ImageProfile, NavTopDraw } from "./Style";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { RiMenu4Line } from "react-icons/ri";
import { Badge, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal, Flex } from "@components/others";
import { Button } from "@components/form";
import { logOut } from "@modules/Auth/authSlice";
import { AvImg, MainLogo } from "@assets/images";
import { useNavigate } from "react-router-dom";
import Notification from "./DynamicSubmenu/NotificationView";
import {
  ClearNotify,
  getOutofStock,
  selectAllOutofStock,
} from "@modules/Dashboard/DashboardSlice";
import { THEME } from "@theme/index";
import { FaRegUser, FaUserLarge } from "react-icons/fa6";

export const NavHeader = ({ showDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const LogOutModal = () => (
    <div>
      <h1 style={{ fontSize: "1.2rem" }}>Are you Sure You Want to Logout ?</h1>
      <br />
      <Flex style={{ justifyContent: "center", gap: "20px" }}>
        <Button.Success text={"Logout"} onClick={Signout} />
        <Button.Danger text={"Cancel"} onClick={handleOk} />
      </Flex>
    </div>
  );

  const Signout = () => {
    dispatch(logOut());
    localStorage.removeItem("openKeys");
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [notify, setNotify] = useState([]);
  const AllAlertQuantityData = useSelector(selectAllOutofStock);
  useEffect(() => {
    dispatch(getOutofStock());
  }, [dispatch]);

  // useEffect(() => {
  //   setNotify(AllAlertQuantityData);
  // }, [AllAlertQuantityData]);

  const ViewNotification = () => {
    setModalContent(<Notification notify={notify} />); // ---- > FUTURE USE
    showModal();
  };

  const items = [
    {
      key: "1",
      label: "My Business",
      onClick: () => {
        navigate("/admin_profile");
      },
    },
    {
      key: "2",
      label: "Change Password",
      onClick: () => {
        navigate("/change_admin_password");
      },
    },
    {
      key: "3",
      label: "Log Out",
      onClick: () => {
        setModalContent(<LogOutModal />);
        setModalTitle("Log Out");
        showModal();
      },
    },
  ];
  const NotificationTtems = () => {
    return (
      <div style={{ width: "350px", height: "400px" }}>
        <Notification notify={notify} />
      </div>
    );
  };
  const [clearData,setClearData] = useState([])
  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = localStorage.getItem(notify?.length);
    if (storedData) {
      setClearData(JSON.parse(storedData));
    }
    setNotify(AllAlertQuantityData);
  }, [AllAlertQuantityData]);

  const handleDropdownOpen = (data) => {
    if (data) {
      setNotify([]);
      dispatch(getOutofStock());
      dispatch(ClearNotify());
      // Clear count and update local storage
      setClearData([]);
      localStorage.setItem(notify?.length, JSON.stringify([]));
    } else {
      setClearData([]);
      dispatch(ClearNotify());
      localStorage.setItem(notify?.length, JSON.stringify([]));
    }
  };
console.log(clearData,'clearData');
  return (
    <NavTopDraw>
      <Flex spacebetween={"true"} aligncenter={"true"} H_100={"true"}>
        <span className="DrawBtn" onClick={showDrawer}>
          <RiMenu4Line style={{ fontSize: "20px" }} />
        </span>
        <div className="Btnresponsive">
          <Dropdown
            overlay={<NotificationTtems />}
            trigger={["click"]}
            placement="bottomRight"
            // onVisibleChange={handleDropdownOpen}
          >
            <div style={{ margin: "10px 20px 0px 0px" }}>
              <Badge
                count={notify?.length || clearData.length}
                overflowCount={10}
                style={{ backgroundColor: THEME.primary_color }}
              >
                <AiOutlineBell color="blue" size={"26px"} />
              </Badge>
            </div>
          {/* <h1>lore</h1> */}
          </Dropdown>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div style={{ margin: "8px 10px 0px 0px" }}>
              <ImageProfile>
                <FaUserLarge color="blue" size={"26px"} />
              </ImageProfile>
            </div>
          </Dropdown>
        </div>
      </Flex>

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={400}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </NavTopDraw>
  );
};
