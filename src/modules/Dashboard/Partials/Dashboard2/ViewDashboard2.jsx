import { SvgIcons } from '@assets/Svg';
import { Button, CustomTable } from '@components/form';
import { CommonLoading, CustomModal, CustomRow, Flex } from '@components/others';
import React, { useEffect, useState } from 'react'
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard2, selectDashboard2, selectDashboard2Error, selectDashboard2Status } from '@modules/Dashboard/DashboardSlice';
import { IMG_BASE_URL } from '@request/request';
import Dashboard2 from './Dashboard2';
import { Col } from 'antd';

const ViewDashboard2 = () => {

    const [dataSource, setDataSource] = useState([])
    const [trigger, setTrigger] = useState(0)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [modelwith, setModelwith] = useState(0);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDashboard2())
    }, [])


    const AllDashboard2 = useSelector(selectDashboard2)
    const AllDashboard2Status = useSelector(selectDashboard2Status)
    const AllDashboard2Error = useSelector(selectDashboard2Error)

    console.log(AllDashboard2, 'AllDashboard2AllDashboard2');

    useEffect(() => {
        setDataSource(AllDashboard2)
    }, [AllDashboard2])

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

    const AddDash2 = () => {
        setTrigger(trigger+1)
        setModelwith(800)
        setModalTitle("Add Dashboard 2");
        setModalContent(<Dashboard2  FormClosee={FormClose} />);
        showModal();
    }

    const UserDash2 = (record) => {
        setModelwith(800)
        setModalTitle("Update Dashboard II");
        setModalContent(<Dashboard2 trigger={trigger} record={record} FormClose={FormClose}  />);
        showModal();
    }

    const TableColumns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'category Name',
            dataIndex: 'categoryName'
        },
        {
            title: 'Image',
            render: (record) => {
                console.log(record, 'recordrecordrecord');
                return (
                    <Flex center={'true'}>
                        <img src={`${IMG_BASE_URL}${record?.dashboardImageUrl}`} style={{ height: '40px', width: '40px', }} />
                    </Flex>
                )
            }
        },
        {
            title:'Title',
            dataIndex:'title'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Address',
            render: (record) => {
                console.log(record, "rrrrrrrrrrrrrrr");
                return (
                    <Flex center gap={'10px'}>
                        <img src={SvgIcons.Edit} onClick={() => { UserDash2(record) }} />
                    </Flex>
                )
            }
        },
    ]

    let content;

    if (AllDashboard2Status === 'loading') {
        content = <CommonLoading />
    } else if (AllDashboard2Status === 'succeeded') {
        const rowKey = (dataSource) => dataSource.id;
        content = <CustomTable columns={TableColumns} data={dataSource} rowKey={rowKey} />
    } else if (AllDashboard2Status === 'failed') {
        content = <h2>{AllDashboard2Error}</h2>
    }

    return (
        <CustomRow>
            <Col span={24} md={12}>
                <CustomPageTitle Heading={'View Dashboard II'} />
            </Col>
            <Col span={24} md={12}>
                <Flex flexend={'right'}>
                    <Button.PrimaryNow text={'+ ADD'} onClick={AddDash2} />
                </Flex>
            </Col>
            <Col span={24} md={24} style={{ marginTop: "10px" }}>
                {content}
            </Col>
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomRow>
    )
}

export default ViewDashboard2