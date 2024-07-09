import React, { Fragment, useEffect } from "react";
import { CustomCardView, CustomRow, Flex } from "@components/others";
import { Card, Col, Dropdown } from "antd";
import { AvImg } from "@assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusinessProfile,
  selectAllBusinessProfile,
} from "@modules/Admin/BusinessProfile/BusinessProfileSlice";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import {
  CustomPageFormSubTitle,
  CustomPageTitle,
} from "@components/others/CustomPageTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/form";
import { LiaAddressCard } from "react-icons/lia";
export const ColDIv = styled(Col)`
  margin: 10px 15px;
  width: 100%;
  & p {
    font-size: 16px;
    padding: 10px 0px;
  }
`;

export const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBusinessProfile());
  }, []);

  const profileDetails = useSelector(selectAllBusinessProfile);
  console.log(profileDetails, "profileDetails");
  const items = [
    {
      key: "1",
      label: "Edit Profile",
      onClick: () => {
        navigate("/business_profile");
      },
    },
  ];
  return (
    <Fragment>
      {profileDetails ? (
        <>
          <CustomPageTitle Heading={"COMPANY PROFILE"} />
          <CustomPageFormSubTitle Heading={"MY BUSINESS"} />
          <Card
            style={{
              border: "1px solid #e1e1e1",
              borderRadius: "20px",
              //   padding: '20px',
              maxWidth: "350px",
              height: "450px",
              margin: "0 auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Flex end={true}>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <BsThreeDotsVertical size={18} />
                </a>
              </Dropdown>
            </Flex>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={24}>
                <Flex aligncenter={true}>
                  <img
                    src={profileDetails.avatarUrl || AvImg}
                    alt="User Avatar"
                    style={{
                      width: "75px",
                      height: "75px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                  <h2 style={{ color: "#545454" }}>
                    {profileDetails.companyName}
                  </h2>
                </Flex>
              </Col>
              <ColDIv>
              <div style={{display:'flex',alignItems:'center'}}>

                <p
                  style={{
                    color: "#888",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "start",
                  }}
                >
                  <LiaAddressCard style={{ marginRight: "8px" }} size={50} />
                  <span>
                    {profileDetails.address}, {profileDetails.state},{" "}
                    {profileDetails.country}-{profileDetails.pincode}
                  </span>
                </p>
              </div>

                <p style={{ color: "#888", marginBottom: "8px" }}>
                  <EnvironmentOutlined style={{ marginRight: "8px" }} />
                  {profileDetails.location},
                </p>
                <p style={{ color: "#888", marginBottom: "8px" }}>
                  <MailOutlined style={{ marginRight: "8px" }} />
                  {profileDetails.email}
                </p>
                <p style={{ color: "#888", marginBottom: "8px" }}>
                  <PhoneOutlined style={{ marginRight: "8px" }} />
                  {profileDetails.phoneNumber1}
                </p>
                {/* Add more fields as needed */}
              </ColDIv>
            </CustomRow>
          </Card>
        </>
      ) : (
        <div>
          <h1 style={{ color: "#545454", fontSize: "30px" }}>
            Please Add Business Profile!
          </h1>
          <br />
          <Button.Primary
            text={"Add Profile"}
            onClick={() => navigate("/business_profile")}
          />
        </div>
      )}
    </Fragment>
  );
};
