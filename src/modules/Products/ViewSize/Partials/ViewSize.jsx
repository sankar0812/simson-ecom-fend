import { Button, CustomTable } from '@components/form'
import { CommonLoading, CustomModal, CustomRow, Flex } from '@components/others'
import { CustomLableBack } from '@components/others/CustomLableBack'
import { CustomPageTitle } from '@components/others/CustomPageTitle'
import { TableIconHolder } from '@components/others/Style'
import { ProductBrand, ProductSize } from '@modules/Products/AddProducts/Partials/ProductsAllModals'
import { getBrand, getSize, getVariation, selectAllBrandError, selectAllBrandStatus,selectAllSizes,selectAllSizesError,selectAllSizesStatus,selectBrand } from '@modules/Products/ProductSlice'
import { THEME } from '@theme/index'
import { Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ViewSize = () => {
    const [dataSource, setDataSource] = useState([])

    const navigate = useNavigate();

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);


    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [modelwith, setModelwith] = useState(0);
    const [updateservice, setUpdateservice] = useState(0);
    const [profileFormUpdate, setProfileFormUpdate] = useState(0)
    const [trigger, setTrigger] = useState(0)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSize())
    }, [])

    const sizeDetails = useSelector(selectAllSizes)
    const getSizeStatus = useSelector(selectAllSizesStatus)
    const getSizeError = useSelector(selectAllSizesError)

    console.log(sizeDetails, 'sizeDetailssizeDetails');

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormRest()

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    };
    const FormUpdate = () => {
        setProfileFormUpdate(profileFormUpdate + 1)
    }

    const FormRest = () => {
        setFormReset(formReset + 1)
    }

    const GetVar = () => {
        dispatch(getVariation())
    }

    // ===== Modal Functions End =====

    const AddNewSizes = () => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Add Size");
        setModalContent(<ProductSize updateFormReset={formReset} sizehandleok={handleOk} GetVarr={GetVar} formname={'AddSize'} />);
        showModal();
    };

    const UpdateSize = (record) => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Update Size");
        setModalContent(<ProductSize sizerecord={record} updateFormReset={formReset} sizehandleok={handleOk} formname={'EditSize'} />);
        showModal();
    };

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Size Name',
            dataIndex: 'sizeName'
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateSize(record) }}>
                            <FiEdit />
                        </TableIconHolder>

                    </Flex>
                );
            },
        }
    ]
    useEffect(() => {
        setDataSource(sizeDetails)
    }, [sizeDetails])

    let content;

    if (getSizeStatus === 'loading') {
        content = <CommonLoading />
    } else if  (getSizeStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.brandId;
        content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    } else if  (getSizeStatus === 'failed') {
        content = <h2>{
            getSizeError} </h2>
    }

    return (
        <div>
            <CustomRow space={[24, 24]}>
                <Col span={24} md={15}>
                    <Flex>
                        <CustomLableBack />
                        <CustomPageTitle Heading={'Sizes'} />
                    </Flex>
                </Col>
                <Col span={24} md={9}>
                    <Flex flexend={'true'}>
                        <Button.Primary icon={<FiPlus style={{ marginRight: '5px', fontSize: '20px' }} />} text={'Add'}
                            onClick={AddNewSizes} />
                    </Flex>
                </Col>
            </CustomRow>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default ViewSize