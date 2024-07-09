import { SvgIcons } from '@assets/Svg';
import { CustomTable } from '@components/form';
import { CommonLoading, CustomModal, Flex } from '@components/others';
import React, { Fragment, useEffect, useState } from 'react'
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectAllUsers, selectAllUsersError, selectAllUsersStatus } from '@modules/UserList/UserSlice';
import UserAddressModal from '@modules/UserList/Partials/UserAddressModal';
import { useNavigate } from 'react-router-dom';

const OrderUserList = () => {
    const navigate = useNavigate()

    const [dataSource, setDataSource] = useState([])
    const [trigger,setTrigger] = useState(0)

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
    console.log(AllUsers,'AllUsers');

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
        setModalTitle("User Address");
        setModalContent(<UserAddressModal record={record} />);
        showModal();
    }

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
            dataIndex: 'userName'
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
            title: 'Address',
            render: (record) => {
                console.log(record, "rrrrrrrrrrrrrrr");
                return (
                    <Flex center gap={'10px'}>
                        <img src={SvgIcons.List} onClick={()=>{UserAddress(record)}} />
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
        content = <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
            onClick: () => handleRowClick(record)
          })}/>
    } else if (AllUsersStatus === 'failed') {
        content = <h2>{AllUserError}</h2>
    }
    const handleRowClick = (record) => {
        navigate(`/all_orders_status/${record.userId}`)
      }
    
    return (
        <Fragment>
            <CustomPageTitle Heading={'View Order Users'}/>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}

export default OrderUserList