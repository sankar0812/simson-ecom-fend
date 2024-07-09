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
    selectAllRefunds,
    selectAllRefundsrError,
    selectAllRefundsStatus,
    getAllRefunds,
    getAllOrders,
} from "../../OrderSlice";
import { TableIconHolder } from "@components/others/Style";
import { THEME } from "@theme/index";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";
import { Col, Popconfirm, Tooltip } from "antd";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest, IMG_BASE_URL } from "@request/request";
import CustomInputSearch from "@components/form/CustomInputSearch";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { TbBasketCancel } from "react-icons/tb";

const ViewRefundList = ({ id }) => {
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

    const AllRefundsList = useSelector(selectAllRefunds);
    const AllRefundsListStatus = useSelector(selectAllRefundsStatus);
    const AllRefundListError = useSelector(selectAllRefundsrError);
    console.log(AllRefundsList, 'AllRefundsList');

    useEffect(() => {
        dispatch(getAllRefunds());
    }, []);

    const FindUserOrders = useMemo(
        () => AllRefundsList?.find((item) => item?.userId === id?.id),
        [AllRefundsList, id]
    );

    useEffect(() => {
        setDataSource(AllRefundsList);
    }, [AllRefundsList]);

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

    // const GetOrders = () => {
    //     dispatch(getAllOrders());
    // };

    const StatusChange = async (record) => {
        console.log(record, "WWWW");

        const RefundValues = {
            returnStatus: "accepted",
        };
        console.log(RefundValues, "RefundValues");
        await baseRequest
            .put(
                `${APIURLS.PATCH_ORDERS_REFUND_STATUS}/${record?.orderRefundId}`,
                RefundValues
            )
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: response.data?.message,
                    type: "success",
                });
                console.log(response.data, 'dddddd');
                dispatch(getAllRefunds());
                dispatch(getAllOrders());
                return response.data;
            })
            .catch(function (error) {
                console.log(error, 'error');
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
            title: "Refund Date",
            dataIndex: "refundDate",
        },
        {
            title: "Image",
            render: (record) => {
                return <div style={{ width: '60px', height: '60px' }}>
                    <img src={`${IMG_BASE_URL}${record?.productImagesUploadUrl}`} style={{ width: '100%', height: '100%' }} />
                </div>
            }
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
            title: "Sell Rate",
            dataIndex: "sellRate",
        },
        {
            title: "Status",
            dataIndex: "orderStatus",
            render: (text, record, index) => {
                return (
                    <Fragment>
                        <Flex center={"true"}>
                            {record?.orderStatus === "refundRequestPending" ? (
                                <CustomTag
                                    bordered={"true"}
                                    color={"#8147ff"}
                                    title={"Pending"}
                                />
                            ) :
                                <CustomTag
                                    bordered={"true"}
                                    color={"#28a745"}
                                    title={"Accepted"}
                                />
                            }
                        </Flex>
                    </Fragment>
                )
            },
        },
        {
            title: "Action",
            render: (record) => {

                console.log(record, 'record');
                return (
                    <div>
                        {record?.accepted !== true ?
                            <Popconfirm
                                title="Change the Refund Status"
                                description="Are you sure to refund this order ?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => StatusChange(record)}
                            >
                                <TableIconHolder color={THEME.red} size={"22px"}>
                                    <TbBasketCancel size={24} />
                                </TableIconHolder>
                            </Popconfirm> :
                            <Tooltip title={'Refund Accepted'}>
                                <TableIconHolder color={THEME.green} size={"22px"} style={{ cursor: 'normal' }}>
                                    <HiOutlineReceiptRefund size={24} style={{ cursor: "context-menu" }} />
                                </TableIconHolder>
                            </Tooltip>
                        }
                    </div>


                );
            },
        },
    ];

    let content;

    if (AllRefundsListStatus === "loading") {
        content = <CommonLoading />;
    } else if (AllRefundsListStatus === "succeeded") {
        const rowKey = (dataSource) => dataSource.orderItemId;
        content = (
            <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
        );
    } else if (AllRefundsListStatus === "failed") {
        content = <h2>{AllRefundListError}</h2>;
    }

    return (
        <Fragment>

            <CustomRow space={[24, 24]}>
                <Col span={24} md={14} lg={5}>
                    <CustomPageTitle Heading={"View Refund List"} />
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

export default ViewRefundList;
