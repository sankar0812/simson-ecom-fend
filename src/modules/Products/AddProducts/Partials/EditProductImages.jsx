import { Button, CustomTable } from '@components/form';
import { CustomModal, Flex } from '@components/others';
import CustomPopconfirm from '@components/others/CustomPopConfirm';
import { TableIconHolder } from '@components/others/Style';
import { IMG_BASE_URL } from '@request/request';
import { THEME } from '@theme/index';
import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { MdNotificationsActive } from 'react-icons/md';
import { AddMoreProductImage, ProductImagesEditModal, } from './ProductImagesModals';


export const EditProductImages = ({ imagedata, formname }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);


    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [modelwith, setModelwith] = useState(0);


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

    const FormRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateImageIndividually = (record) => {
        setModelwith(500)
        setModalTitle("Update Images");
        setModalContent(<ProductImagesEditModal editimgrecord={record} prodetails={imagedata} updateFormReset={formReset} brandhandleOk={handleOk} formname={'EditImg'} />);
        showModal();
    };

    const AddMoreProductImages = (record) => {
        setModelwith(500)
        setModalTitle("Update Images");
        setModalContent(<AddMoreProductImage editimgrecord={imagedata} updateFormReset={formReset} brandhandleOk={handleOk} formname={'EditImg'} />);
        showModal();
    };

    const imgupdate = [
        {
            title: 'Sl No',
            render: (value, item, index) =>
                index + 1

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
                        <img  src={`${IMG_BASE_URL}${record?.productImagesUploadUrl}`} style={{ height: '40px', width: '40px' }} />
                    </div>
                )
            }
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateImageIndividually(record) }}>
                            <FiEdit />
                        </TableIconHolder>

                        <CustomPopconfirm
                            record={record}
                            // confirm={handleConfirm}
                            // cancel={handlePopConfrmCancel}
                            title={"Change the status"}
                            description={"Sure about changing this image status into In-Active ?"}>
                            <TableIconHolder color={THEME.red} size={'22px'}>
                                <MdNotificationsActive />
                            </TableIconHolder>
                        </CustomPopconfirm>
                    </Flex>
                );
            },
        }
    ]

    return (
        <div>
            <CustomTable columns={imgupdate} data={imagedata?.productImages} />
            <div style={{ marginTop: '20px', marginBottom: "20px" }}>
                <h4>Add more images here . . .</h4>
            </div>
            <div >
                <Button.PrimaryNow text={'UPLOAD'} onClick={AddMoreProductImages} />
            </div>
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}


export const EditProductVarientImages = ({ imagedata, formname ,variantimageedit }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

console.log(variantimageedit,'variantimageeditvariantimageedit');
    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [modelwith, setModelwith] = useState(0);


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

    const FormRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateImageIndividually = (record) => {
        setModelwith(500)
        setModalTitle("Update Images");
        setModalContent(<ProductImagesEditModal editimgrecord={record} prodetails={imagedata} updateFormReset={formReset} brandhandleOk={handleOk} formname={'EditImg'} />);
        showModal();
    };

    const AddMoreProductImages = (record) => {
        setModelwith(500)
        setModalTitle("Update Images");
        setModalContent(<AddMoreProductImage editimgrecord={imagedata} updateFormReset={formReset} brandhandleOk={handleOk} formname={'EditImg'} />);
        showModal();
    };

    const imgupdate = [
        {
            title: 'Sl No',
            render: (value, item, index) =>
                index + 1

        },
        {
            title: 'Varient Image ID',
            dataIndex: 'productVarientImagesId'
        },
        {
            title: 'Product Images',
            dataIndex: 'productVarientImageUrl',
            render: (text, record, index) => {
                console.log(record,'yujtgjtgyjtyjygj');
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <img  src={`${IMG_BASE_URL}${record?.productVarientImageUrl}`} style={{ height: '40px', width: '40px' }} />
                    </div>
                )
            }
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateImageIndividually(record) }}>
                            <FiEdit />
                        </TableIconHolder>

                        <CustomPopconfirm
                            record={record}
                            // confirm={handleConfirm}
                            // cancel={handlePopConfrmCancel}
                            title={"Change the status"}
                            description={"Sure about changing this image status into In-Active ?"}>
                            <TableIconHolder color={THEME.red} size={'22px'}>
                                <MdNotificationsActive />
                            </TableIconHolder>
                        </CustomPopconfirm>
                    </Flex>
                );
            },
        }
    ]

    return (
        <div>
            <CustomTable columns={imgupdate} data={variantimageedit?.varientImages} />
            <div style={{ marginTop: '20px', marginBottom: "20px" }}>
                <h4>Add more images here . . .</h4>
            </div>
            <div >
                <Button.PrimaryNow text={'UPLOAD'} onClick={AddMoreProductImages} />
            </div>
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}
