import { CustomTable } from '@components/form'
import { CustomCardView, CustomModal, CustomRow, Flex } from '@components/others'
import { TableIconHolder } from '@components/others/Style'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { IMG_BASE_URL, baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { THEME } from '@theme/index'
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import AddDescriptionModals from './AddDescriptionModals'
import { BsWindowPlus } from 'react-icons/bs'

const AddDescription = () => {

    const { id } = useParams()

    const [productDetails, setProductDetails] = useState([])
    console.log(productDetails, 'productDetailsproductDetails');
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);


    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [modelwith, setModelwith] = useState(0);
    const [profileFormUpdate, setProfileFormUpdate] = useState(0)
    const [trigger, setTrigger] = useState(0)


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


    useEffect(() => {
        getIndividualProducts()
    }, [])

    const getIndividualProducts = async () => {

        await baseRequest.get(`${APIURLS.GET_PRODUCTS}/${id}`)
            .then(function (response) {
                successHandler(response, {
                })
                setProductDetails(response.data[0])
                return response.data;
            })
            .catch(function (error) {
                return errorHandler(error);
            })
    }

    const AddNewDescription = (record) => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Description");
        setModalContent(<AddDescriptionModals record={record} productIdrecord={productDetails?.productId} categoryIdrecord={productDetails?.categoryId} trigger={trigger} handleOk={handleOk}/>);
        showModal();
    }

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Product Image ID',
            dataIndex: 'productImagesId'
        },
        {
            title: 'Product Images',
            dataIndex: 'productImagesUploadUrl',
            render: (text, record, index) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <img onClick={() => console.log('pressed')} src={`${IMG_BASE_URL}${record?.productImagesUploadUrl}`} style={{ height: '40px', width: '40px' }} />
                    </div>
                )
            }
        },
        {
            title: 'Add Description',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { AddNewDescription(record) }}>
                            <BsWindowPlus />
                        </TableIconHolder>
                    </Flex>
                );
            },
        }
    ]

    return (
        <CustomCardView>
            <CustomTable columns={columns} data={productDetails?.productImages} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>
    )
}

export default AddDescription

