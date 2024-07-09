import { Button, CustomTable } from '@components/form'
import { CommonLoading, CustomModal, CustomRow, Flex } from '@components/others'
import { CustomLableBack } from '@components/others/CustomLableBack'
import { CustomPageTitle } from '@components/others/CustomPageTitle'
import CustomPopconfirm from '@components/others/CustomPopConfirm'
import { TableIconHolder } from '@components/others/Style'
import { AddVariation } from '@modules/Products/AddProducts/Partials/AddVariations'
import { ProductCategory } from '@modules/Products/AddProducts/Partials/ProductsAllModals'
import { getCategory, getVariation, selectAllCategoryError, selectAllCategoryStatus, selectCategory } from '@modules/Products/ProductSlice'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { IMG_BASE_URL, baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { THEME } from '@theme/index'
import { Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ViewCategory = () => {

    const [dataSource, setDataSource] = useState([])
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


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const ViewCategoryData = useSelector(selectCategory)
    const GetCategoryStatus = useSelector(selectAllCategoryStatus)
    const GetCategoryError = useSelector(selectAllCategoryError)
    console.log(ViewCategoryData,'ViewCategoryDataViewCategoryData');

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

    const GetCat = () => {
        dispatch(getCategory())
    }

    // ===== Modal Functions End =====

    const AddNewVariation = () => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Add Category");
        setModalContent(<ProductCategory formReset={formReset} categoryhandleOk={handleOk} GetCatt={GetCat} />);
        showModal();
    };

    const UpdateCategory = (record) => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Update Category");
        setModalContent(<ProductCategory categoryrecord={record} updateFormReset={formReset} categoryhandleOk={handleOk} />);
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
            title: 'Category Name',
            dataIndex: 'categoryName'
        },
        {
            title: 'Category Images',
            dataIndex: 'Category Images',
            render: (text, record, index) => {
              console.log(record,'TTTTTTTTTTTTTTT');
              return (
                <div style={{ display: 'flex', textAlign:'center',justifyContent:"center"}}>
                      <img onClick={() => console.log('pressed')} src={`${IMG_BASE_URL}${record?.url}`} style={{ height: '60px', width: '60px' }} />
                    </div>
      
              )
            }
          },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateCategory(record) }}>
                            <FiEdit />
                        </TableIconHolder>

                    </Flex>
                );
            },
        }
    ]
    useEffect(() => {
        setDataSource(ViewCategoryData)
    }, [ViewCategoryData])

    let content;

    if (GetCategoryStatus === 'loading') {
        content = <CommonLoading />
    } else if (GetCategoryStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.categoryId;
        content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    } else if (GetCategoryStatus === 'failed') {
        content = <h2>{
            GetCategoryError} </h2>
    }

    return (
        <div>
            <CustomRow space={[24, 24]}>
                <Col span={24} md={15}>
                    <Flex>
                        <CustomLableBack />
                        <CustomPageTitle Heading={'Category'} />
                    </Flex>
                </Col>
                <Col span={24} md={9}>
                    <Flex flexend={'true'}>
                        <Button.Primary icon={<FiPlus style={{ marginRight: '5px', fontSize: '20px' }} />} text={'Add'}
                            onClick={AddNewVariation} />
                    </Flex>
                </Col>
            </CustomRow >
            {/* <CustomTable columns={columns} data={dataSource} rowKey={rowKey} /> */}
            {content}
            < CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </div >
    )
}

export default ViewCategory