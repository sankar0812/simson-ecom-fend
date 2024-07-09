import { CustomTable } from '@components/form'
import CustomInputSearch from '@components/form/CustomInputSearch'
import { CommonLoading, CustomCardView, CustomModal, CustomRow, Flex } from '@components/others'
import { CustomLableBack } from '@components/others/CustomLableBack'
import { CustomPageTitle } from '@components/others/CustomPageTitle'
import { TableIconHolder } from '@components/others/Style'
import { AddProducts } from '@modules/Products/AddProducts/Partials/AddProducts'
import { getAllProducts, selectAllProductsError, selectAllProductsStatus, selectProducts } from '@modules/Products/ProductSlice'
import { IMG_BASE_URL } from '@request/request'
import { THEME } from '@theme/index'
import { Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const ViewProducts = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  console.log(dataSource,'dataSource');
  const [searchTexts, setSearchTexts] = useState([]);
  const [modelwith, setModelwith] = useState(0);
  const [formReset, setFormReset] = useState(0);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);


  const IndividualProduct = (record) => {
    console.log(record, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    setModelwith(800)
    setModalTitle("Update Variation");
    setModalContent(<AddProducts productdata={record} />);
    showModal();
  };
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
  const handleSearchs = (value) => {
    setSearchTexts(value);
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

  const AllProducts = useSelector(selectProducts)
  const AllProductsStatus = useSelector(selectAllProductsStatus)
  const AllProductsError = useSelector(selectAllProductsError)
  console.log(AllProductsError,'AllProductsError');

  console.log(AllProducts, 'AllProductsAllProducts');

  useEffect(() => {
    setDataSource(AllProducts)
  }, [AllProducts])

  const columns = [
    {
      title: 'SL NO',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.productName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.productName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName'
    },
    // {
    //   title: 'Brand Name',
    //   dataIndex: 'brandName'
    // },
    {
      title: 'Product Images',
      dataIndex: 'productImages',
      render: (text, record, index) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            {record?.productImages?.map((imgObj, index) => (
              <div key={index} style={{ height: '40px', width: '40px' }}>

                <img src={`${IMG_BASE_URL}${imgObj.productImagesUploadUrl}`}
                  style={{ height: '40px', width: '40px' }}
                />

              </div>
            ))}
          </div>
        )
      }
    },
    // {
    //   title: 'Variant Images',
    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //         {record?.productList.map((product,index) => (
    //           <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //             {product?.varientImages?.map((varImgObj) => (
    //               <div key={varImgObj.id} style={{ height: '40px', width: '40px' }}>
    //                 <img onClick={() => console.log('pressed')} src={`${IMG_BASE_URL}${varImgObj.productVarientImageUrl}`} style={{ height: '40px', width: '40px' }} />
    //               </div>
    //             ))}
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   }
    // },
    // {
    //   title: 'Variants',
    //   dataIndex: 'productList',
    //   render: (text, record, index) => {
    //     console.log(record, 'fffffffffffff');
    //     return (
    //       <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //         {record?.productList?.map((product) => (
    //           <div key={product.id} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //             {product?.varientList?.map((varObj) => (
    //               <div key={varObj.id} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    //                 <p>
    //                   {varObj?.varientName} :  {varObj?.varientValue},
    //                 </p>
    //               </div>
    //             ))}
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   }
    // },
  ]


  let content;

  if (AllProductsStatus === 'loading') {
    content = <CommonLoading />
  } else if (AllProductsStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.productId;
    content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
      onClick: () => handleRowClick(record)
    })} />
  } else if (AllProductsStatus === 'failed') {
    content = <h2>{
      AllProductsError} </h2>
  }

  const handleRowClick = (record) => {
    navigate(`/view_individual_products/${record.productId}`)
  }

  return (
    <div>
      <CustomRow space={[24, 24]}>
        <Col span={24} md={12}>
          <Flex>
            <CustomLableBack />
            <CustomInputSearch
              placeholder={"Search By Product Name"}
              // value={searchTexts}
              onChange={(e) => handleSearchs(e.target.value)}
            />
          </Flex>
        </Col>
        <Col span={24} md={12}>
          <CustomPageTitle Heading={'View Products'} />
        </Col>
      </CustomRow>

      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}
