import { Button, CustomInput, CustomUpload } from '@components/form'
import { CustomRow } from '@components/others'
import { APIURLS } from '@request/apiUrls/urls'
import errorHandler from '@request/errorHandler'
import { IMG_BASE_URL, baseRequest } from '@request/request'
import successHandler from '@request/successHandler'
import { Card, Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const DemoProduct = () => {

    const [form] = Form.useForm()
    const [SlicedInitial, setSlicedInitial] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const [record, setRecord] = useState({})
    const [ImageInitialValue, setImageInitialValue] = useState([]);

    const onFinish = (values) => {
        if(record.length !=0){
        const missingId = findMissingIds(record[1]?.demoProductImages,imageUrl)
        console.log(missingId,'kkkkkk');


        const combinedArray = imageUrl.concat(missingId.map(id => ({ 
            demoProImagesId: id,
            deleted:true })));

            console.log(combinedArray,'combined Array');
        } else{

            const newValue= {
                productName:values.productName,
                demoProductImages:imageUrl
            }
            console.log(newValue);
            AddProduct(newValue)
        }
    };
    const onFinishFailed = () => {
        toast.warn("Please fill in all the required details !");
    };

    useEffect(() => {
        GetProduct();
    }, [])

    useEffect(() => {
        if(record.length != 0){
            form.setFieldsValue({'productName':record[1]?.productName})


        const ProImg = record[1]?.demoProductImages?.map(({demoProImagesId,url}) => ({
            uid: demoProImagesId,
            name: `example${demoProImagesId}.jpg`,
            status: 'done',
            url: `${IMG_BASE_URL}${url}`,
        }));

        setImageInitialValue(ProImg);
        }
    }, [record])
    
    console.log(record,'kkkkk');

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (error) => {
                reject(error)
            };
        });

//     const handleproductImage = async (img) => {
//         if (img.fileList.length > 0) {
//             const ImageObj = await Promise.all(img.fileList.map(async (value) => {
                
//                 console.log(value,'gggggg');
//                 // Assuming getBase64 returns a Promise
//                 if(value?.originFileObj){
//                     const base64Result = await getBase64(value.originFileObj);
//                     const slicedImageUrl = base64Result.slice(`data:${value.type};base64,`.length);
//                     // Now, you can use base64Result
//                     const newObj = {
//                             url: slicedImageUrl
//                         }
                        
//                      return newObj
//                 }

//             }));
//             setImageUrl(ImageObj); 

//         }
// }

const handleProductImage = async (img) => {
    if (img.fileList.length > 0) {
      const updatedFileList = await Promise.all(img.fileList.map(async (value) => {
        // Assuming getBase64 returns a Promise
        if (value?.originFileObj) {
          const base64Result = await getBase64(value.originFileObj);
          const slicedImageUrl = base64Result.slice(`data:${value.type};base64,`.length);
  
          // Add the 'url' property to the existing object
          return {
            url: slicedImageUrl,
          };
        } else {
          // If 'originFileObj' is not present, return the original object
          return {
            demoProImagesId: value.uid,
            deleted:false
          };
        }
      }));
      console.log(updatedFileList,'llllll');
        // const newArray = [...updatedFileList[0],...updatedFileList[1]]
      setImageUrl(updatedFileList)
    }
  };

  console.log(imageUrl,'iiikkkn ');
  
const AddProduct = async (data) => {
    await baseRequest.post(`${APIURLS.DEMO_POST_PRODUCT}`, data)
        .then(function (response) {
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
                msg: 'Product Added Successfully',
                type: 'success',
            })

            return response.data;
        })
        .catch(function (error) {
            return errorHandler(error);
        })
}

const GetProduct = async (data) => {
    await baseRequest.get('demoo', data)
        .then(function (response) {
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
                msg: 'Product Added Successfully',
                type: 'success',
            })

            setRecord(response.data)

            return response.data;
        })
        .catch(function (error) {
            return errorHandler(error);
        })
}


const UpdateProduct = async (data) => {
    await baseRequest.put(`${APIURLS.DEMO_POST_PRODUCT}`, data)
        .then(function (response) {
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
                msg: 'Product Added Successfully',
                type: 'success',
            })

            return response.data;
        })
        .catch(function (error) {
            return errorHandler(error);
        })
}

  return (

    <Form
    form={form}
    labelCol={{
        span: 24,
    }}
    wrapperCol={{
        span: 24,
    }}
    name='product'
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}

    autoComplete="off">
    <CustomRow space={[24, 24]}>
        <Col span={24} md={8} >
            <div style={{ margin: '50px 0px' }}>
                <h3 style={{ fontSize: '18px' }}>Product Name & Categories</h3><br />
            </div>

        </Col>

        <Col span={24} md={16}>
            <Card>
                <CustomRow space={[24, 24]}>
                    <Col span={24} md={20}>
                        <CustomInput label={'Product Name'} name={'productName'} placeholder={'Enter Product Name'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Product Name!',
                                }
                            ]} />

                    </Col>
                    <Col>
                        <CustomUpload multiple={true} onChange={handleProductImage} form={form} label={'Product Image (Multi Select)'} initialValue={ImageInitialValue}
                            name={'productImages'} listType='picture-card'
                            // accept=".png,.jpeg,.jpg"
                        />
                    </Col>

                </CustomRow>
            </Card>
        </Col>

        <Col>
        <Button.Primary text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'Reset'} htmlType ={'reset'} />
        </Col>
    </CustomRow>

</Form>
  )
}
