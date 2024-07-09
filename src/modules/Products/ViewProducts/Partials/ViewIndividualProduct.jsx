import { APIURLS } from '@request/apiUrls/urls';
import errorHandler from '@request/errorHandler';
import { IMG_BASE_URL, baseRequest } from '@request/request';
import successHandler from '@request/successHandler';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { StyledIndividualProducts, StyledProductCard, StyledProductImageCard } from '../style';
import { CustomModal, CustomRow } from '@components/others';
import { Col, Spin } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { CustomLableBack } from '@components/others/CustomLableBack';
import { CustomStandardTable } from '@components/form/CustomStandardTable';
import { Button } from '@components/form';
import { LoadingOutlined } from "@ant-design/icons";


const ViewIndividualProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [modelwith, setModelwith] = useState(0);
  const [productdetails, setProductDetails] = useState([])
  const [varientdetails, setVarientDetails] = useState([])
  console.log(varientdetails,'varientdetails');
  const [loading, setLoading] = useState(false);

  const columns = [

    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    // {
    //   title: 'Variants',
    //   dataIndex: 'varientList',
    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //         {record?.varientList?.map((varients) => (
    //           <div key={varients.id} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //             <p>
    //               {varients?.varientName} :  {varients?.varientValue}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   }
    // },
    // {
    //   title: 'Variant Images',
    //   dataIndex: 'varientImages',
    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //         {record?.varientImages?.map((varimage) => (
    //           <div key={varimage.id} style={{ height: '40px', width: '40px' }}>
    //             <img src={`${IMG_BASE_URL}${varimage.productVarientImageUrl}`} style={{ height: '40px', width: '40px' }} />
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   }
    // },
    {
      title: 'Size',
      dataIndex: 'sizeName'
    },
    {
      title: 'MRP',
      dataIndex: 'mrp'
    },
    {
      title: 'Buy Rate',
      dataIndex: 'buyRate'
    },
    {
      title: 'Sell Rate',
      dataIndex: 'sellRate'
    },
    {
      title: 'GST % ',
      dataIndex: 'gst'
    },
    {
      title: 'GST Tax Amount',
      dataIndex: 'gstTaxAmount'
    },
    {
      title: 'Discount %',
      dataIndex: 'discountPercentage'
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discountAmount'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    },

    {
      title: 'Total Amount',
      dataIndex: 'totalAmount'
    },

  ]

  const IndividualProduct = () => {

    // setModelwith(800)
    // setModalTitle("Update Product");
    // setModalContent(<AddProducts productdata={productdetails} />);
    // showModal();
    navigate(`/edit_products_update/${productdetails?.productId}`)

  };

  const AddDescription = () => {
    navigate(`/add_description/${productdetails?.productId}`)
  }

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

  useEffect(() => {
    getIndividualProducts()
  }, [])

  const getIndividualProducts = async () => {
    setLoading(true)
    await baseRequest.get(`${APIURLS.GET_PRODUCTS}/${id}`,

    )
      .then(function (response) {

        successHandler(response, {
          // notifyOnSuccess: true,
          // notifyOnFailed: true,
        })
        console.log(response.data, 'fddgdgfdgfdgfdg');
        setProductDetails(response.data)
        setVarientDetails(response.data?.productList)
        setLoading(false);
        return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        return errorHandler(error);
      })
  }

  return (
    <StyledIndividualProducts>
      <CustomLableBack />
      <StyledProductCard >
        <Spin indicator={
          <LoadingOutlined
            style={{
              fontSize: 80,
              position:'fixed'
            }}
            spin
          />
        } spinning={loading} size="large">
          <CustomRow space={[24, 24]}>
            <Col span={24} md={12}>
              <h1 style={{ color: '#676666', textTransform: 'capitalize' }}>Product Name : {productdetails?.productName}</h1>
            </Col>
            <Col span={24} md={12}>
              <h1 style={{ color: '#676666', textTransform: 'capitalize' }}>Category : {productdetails?.categoryName}</h1>
            </Col>

            <Col span={24} md={12}>
              <h1 style={{ color: '#676666', textTransform: 'capitalize' }}>Brand Name : {productdetails?.brandName}</h1>
            </Col>
            <Col span={24} md={12}>
              <StyledProductCard>
                <h1 style={{ color: '#676666', textTransform: 'capitalize' }}> All product images</h1>
                <StyledProductImageCard>
                  {productdetails?.productImages?.map((imgObj) => (
                    <div key={imgObj.id}  >
                      <img className='img__holder' src={`${IMG_BASE_URL}${imgObj.productImagesUploadUrl}`} />
                    </div>
                  ))}

                </StyledProductImageCard>
              </StyledProductCard>
            </Col>
            <Col span={24} md={12}>
              <Button.PrimaryNow text={'EDIT PRODUCT'} icon={BiEdit} onClick={IndividualProduct} />
              {/* <Button.Success text={'ADD DESCRIPTION'} icon={BiEdit} onClick={AddDescription}/> */}
            </Col>
          </CustomRow>
          <CustomStandardTable columns={columns} data={varientdetails} />
        </Spin>
      </StyledProductCard>
      {/* ViewIndividualProduct */}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
    </StyledIndividualProducts>
  )
}

export default ViewIndividualProduct

