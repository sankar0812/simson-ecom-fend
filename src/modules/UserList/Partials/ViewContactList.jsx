import { SvgIcons } from '@assets/Svg';
import { CustomTable } from '@components/form';
import { CommonLoading, CustomCardView, CustomModal, CustomRow, Flex } from '@components/others';
import React, { useEffect, useState } from 'react'
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getContact, getUsers, selectAllContacts, selectAllContactsError, selectAllContactsStatus } from '../UserSlice';
import UserAddressModal from './UserAddressModal';
import CustomInputSearch from '@components/form/CustomInputSearch';
import { Col, Popconfirm } from 'antd';
import { TableIconHolder } from '@components/others/Style';
import { MdDelete, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { baseRequest } from '@request/request';
import { THEME } from '@theme/index';
import { APIURLS } from '@request/apiUrls/urls';
import successHandler from '@request/successHandler';
import errorHandler from '@request/errorHandler';

const ViewContactList = () => {

    const [dataSource, setDataSource] = useState([])
    const [trigger, setTrigger] = useState(0)
    const [searchTexts, setSearchTexts] = useState([]); // Search Bar

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [modelwith, setModelwith] = useState(0);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getContact());
    }, [])

    const AllContactDetails = useSelector(selectAllContacts)
    const AllContactDetailsStatus = useSelector(selectAllContactsStatus)
    const AllContactError = useSelector(selectAllContactsError)
    console.log(AllContactDetails, 'AllContactDetails');
    useEffect(() => {
        setDataSource(AllContactDetails)
    }, [AllContactDetails])

    // ===== Modal Functions Start =====
    const showModal = () => {
        setIsModalOpen(true);
    };

    const ResetTrigger = () => {
        setTrigger(trigger + 1)
    }
    const handleOk = () => {
        setIsModalOpen(false);
        ResetTrigger()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const FormClose = () => {
        handleOk()
    }


    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const DeleteContactDetails = async (record) => {
        await baseRequest.delete(`${APIURLS.DELETE_CONTACT}/${record?.contactId}/`)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Deleted Successfully',
                    type: 'success',
                })
                dispatch(getContact());
                return response.data;
            })
            .catch(function (error) {
                return errorHandler(error);
            })
    }
    const TableColumns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'User ID',
            dataIndex: 'contactId'
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.name).includes(value.toUpperCase())
                );
            },
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Message',
            dataIndex: 'message'
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <Popconfirm
                        title="Change The Order Status"
                        description="Are you sure you want to delete this details ?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => DeleteContactDetails(record)}
                    >
                        <TableIconHolder color={THEME.red} size={"22px"}>
                            <MdDelete />
                        </TableIconHolder>
                    </Popconfirm>
                )
            }
        },
    ]

    let content;

    if (AllContactDetailsStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllContactDetailsStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.id;
        content = <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
    } else if (AllContactDetailsStatus === 'failed') {
        content = <h2>{AllContactError}</h2>
    }

    return (
        <CustomCardView>
            <CustomRow space={[24, 24]}>
                <Col span={24} md={24} style={{ marginBottom: "14px", marginLeft: "0px" }}>
                    <CustomRow>
                        <Col span={24} md={10}>
                            <Flex flexstart={true}>
                                <CustomPageTitle Heading={"View Contact Details (Feedback)"} />
                            </Flex>
                        </Col>
                        <Col span={24} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                            <CustomInputSearch
                                placeholder={"Search by User Name"}
                                value={searchTexts}
                                onChange={(e) => handleSearchs(e.target.value)}
                            />
                        </Col>
                    </CustomRow>
                </Col>
            </CustomRow>
            {content}
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={modelwith}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </CustomCardView>
    )
}

export default ViewContactList