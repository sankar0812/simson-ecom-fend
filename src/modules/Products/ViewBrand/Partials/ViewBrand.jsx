import { Button, CustomTable } from '@components/form'
import { CommonLoading, CustomModal, CustomRow, Flex } from '@components/others'
import { CustomLableBack } from '@components/others/CustomLableBack'
import { CustomPageTitle } from '@components/others/CustomPageTitle'
import { TableIconHolder } from '@components/others/Style'
import { ProductBrand } from '@modules/Products/AddProducts/Partials/ProductsAllModals'
import { getBrand, getVariation, selectAllBrandError, selectAllBrandStatus,selectBrand } from '@modules/Products/ProductSlice'
import { THEME } from '@theme/index'
import { Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ViewBrand = () => {
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
        dispatch(getBrand())
    }, [])

    const ViewBrandData = useSelector(selectBrand)
    const GetBrandStatus = useSelector(selectAllBrandStatus)
    const GetBrandError = useSelector(selectAllBrandError)

    console.log(ViewBrandData, 'ViewBrandDataViewBrandData');

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

    const AddNewVariation = () => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Add Variation");
        setModalContent(<ProductBrand updateFormReset={formReset} brandhandleOk={handleOk} GetVarr={GetVar} formname={'AddBrand'} />);
        showModal();
    };

    const UpdateBrand = (record) => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Update Variation");
        setModalContent(<ProductBrand brandrecord={record} updateFormReset={formReset} brandhandleOk={handleOk} formname={'EditBrand'} />);
        showModal();
    };

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Brand Name',
            dataIndex: 'brandName'
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateBrand(record) }}>
                            <FiEdit />
                        </TableIconHolder>

                    </Flex>
                );
            },
        }
    ]
    useEffect(() => {
        setDataSource(ViewBrandData)
    }, [ViewBrandData])

    let content;

    if (GetBrandStatus === 'loading') {
        content = <CommonLoading />
    } else if (GetBrandStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.brandId;
        content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    } else if (GetBrandStatus === 'failed') {
        content = <h2>{
            GetBrandError} </h2>
    }

    return (
        <div>
            <CustomRow space={[24, 24]}>
                <Col span={24} md={15}>
                    <Flex>
                        <CustomLableBack />
                        <CustomPageTitle Heading={'Brands'} />
                    </Flex>
                </Col>
                <Col span={24} md={9}>
                    <Flex flexend={'true'}>
                        <Button.Primary icon={<FiPlus style={{ marginRight: '5px', fontSize: '20px' }} />} text={'Add'}
                            onClick={AddNewVariation} />
                    </Flex>
                </Col>
            </CustomRow>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default ViewBrand