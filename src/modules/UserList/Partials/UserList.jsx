import { SvgIcons } from '@assets/Svg';
import { CustomTable } from '@components/form';
import { CommonLoading, CustomCardView, CustomModal, CustomRow, Flex } from '@components/others';
import React, { useEffect, useState } from 'react'
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectAllUsers, selectAllUsersError, selectAllUsersStatus } from '../UserSlice';
import UserAddressModal from './UserAddressModal';
import CustomInputSearch from '@components/form/CustomInputSearch';
import { Col } from 'antd';

const UserList = () => {

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
        dispatch(getUsers())
    }, [])

    const AllUsers = useSelector(selectAllUsers)
    const AllUsersStatus = useSelector(selectAllUsersStatus)
    const AllUserError = useSelector(selectAllUsersError)
    console.log(AllUsers, 'AllUsers');
    useEffect(() => {
        setDataSource(AllUsers)
    }, [AllUsers])

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

    const UserAddress = (record) => {
        setModelwith(800)
        setModalContent(<UserAddressModal record={record} />);
        showModal();
    }

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const TableColumns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'User ID',
            dataIndex: 'userId'
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
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
            title: 'Email Id',
            dataIndex: 'emailId'
        },
        {
            title: 'Gender',
            dataIndex: 'gender'
        },
        {
            title: 'D O B',
            dataIndex: 'dateOfBirth'
        },
        {
            title: 'Mobile',
            dataIndex: 'mobileNumber'
        },
        {
            title: 'Address',
            render: (record) => {
                return (
                    <Flex center gap={'10px'}>
                        <img src={SvgIcons.List} onClick={() => UserAddress(record)} style={{ cursor: 'pointer' }} />
                    </Flex>
                )
            }
        },
    ]

    let content;

    if (AllUsersStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllUsersStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.id;
        content = <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
    } else if (AllUsersStatus === 'failed') {
        content = <h2>{AllUserError}</h2>
    }

    return (
        <CustomCardView>
            <CustomRow space={[24, 24]}>
                <Col span={24} md={12} style={{ marginBottom: "14px", marginLeft: "0px" }}>
                    <CustomRow>
                        <Col span={24} md={10}>
                            <CustomPageTitle Heading={"All Users"} />
                        </Col>
                        <Col span={24} md={12} style={{ display: 'flex', alignItems: 'center' }}>
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

export default UserList