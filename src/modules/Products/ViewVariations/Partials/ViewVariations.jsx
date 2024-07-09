import { Button, CustomTable } from '@components/form'
import { CommonLoading, CustomModal, CustomRow, Flex } from '@components/others'
import { CustomPageTitle } from '@components/others/CustomPageTitle'
import CustomPopconfirm from '@components/others/CustomPopConfirm'
import { TableIconHolder } from '@components/others/Style'
import { AddVariation } from '@modules/Products/AddProducts/Partials/AddVariations'
import { getVariation, selectAllVariationsError, selectAllVariationsStatus, selectVariation } from '@modules/Products/ProductSlice'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { THEME } from '@theme/index'
import { Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EditVariation } from './EditVariations'
import { CustomLableBack } from '@components/others/CustomLableBack'


const ViewVariations = () => {
    const [dataSource, setDataSource] = useState([])

    const DEL_VARTIATIONS = 'product/edit_variations'
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
        dispatch(getVariation())
    }, [])

    const ViewVariationsData = useSelector(selectVariation)
    const GetVariatiobStatus = useSelector(selectAllVariationsStatus)
    const GetVariationsError = useSelector(selectAllVariationsError)

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

    // ===== Modal Functions End =====

    const AddNewVariation = () => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Add Variation");
        setModalContent(<AddVariation formReset={formReset} variationhandleOk={handleOk} />);
        showModal();
    };

    const UpdateVariation = (record) => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Update Variation");
        setModalContent(<EditVariation variationrecord={record} updateFormReset={formReset} variationhandleOk={handleOk} />);
        showModal();
    };

    // ========== Delete post ==========

    const handleConfirm = (record) => {
        FormUpdate()
        DeleteVariant(record)
    }

    const DeleteVariant = async (record) => {
        await baseRequest.delete(`${APIURLS.DEL_VARIATION}/${record?.varientId}/`)
            .then(function (response) {
                successHandler(response, {
                    notifyOnSuccess: true,
                    notifyOnFailed: true,
                    msg: 'Variation Deleted Successfully',
                    type: 'success',
                })
                dispatch(getVariation())
                return response.data;
            })
            .catch(function (error) {
                return errorHandler(error);
            })
    }

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Vatiation Name',
            dataIndex: 'varientName'
        },
        // {
        //     title: 'Variations Value',
        //     render: (text, record) => {
        //       const variationsValue = record.varientLists.map((conn) => conn.varientListName).join(', ');
          
        //       return <span style={{ color: 'blue' }}>{variationsValue}</span>;
        //     },
        //   },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>
                       
                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateVariation(record) }}>
                            <FiEdit />
                        </TableIconHolder>

                        <CustomPopconfirm
                            record={record}
                            confirm={handleConfirm}
                            // cancel={handlePopConfrmCancel}
                            title={"Delete the Varient"}
                            description={"Are you sure you want to delete this Varient?"}>
                            <TableIconHolder color={THEME.red} size={'22px'}>
                                <MdDelete />
                            </TableIconHolder>
                        </CustomPopconfirm>
                    </Flex>
                );
            },
        }
    ]
    useEffect(() => {
        setDataSource(ViewVariationsData)
    }, [ViewVariationsData])


    useEffect(() => {
        dispatch(getVariation())
    }, [profileFormUpdate])


    let content;

    if (GetVariatiobStatus === 'loading') {
        content = <CommonLoading />
    } else if (GetVariatiobStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.varientId;
        content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey}/>
    } else if (GetVariatiobStatus === 'failed') {
        content = <h2>{
            GetVariationsError} </h2>
    }

    return (
        <div>
            <CustomRow space={[24, 24]}>
                <Col span={24} md={15}>
                    <Flex>
                        <CustomLableBack />
                        <CustomPageTitle Heading={'Variations'} />
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

export default ViewVariations