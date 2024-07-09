import { getAllOrders, selectAllOrders } from '@modules/Orders/OrderSlice';
import errorHandler from '@request/errorHandler';
import { baseRequest } from '@request/request';
import successHandler from '@request/successHandler';
import { THEME } from '@theme/index';
import React, { useEffect, useState } from 'react';
import { RiWhatsappFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { WhatsappShareButton } from 'react-share';
import { toast } from 'react-toastify';
// import { WhatsAppShareButton } from './WhatsupShareButton';

const WhatsupSharePdfView = ({ OrderListRecord, ChangeRecord, pdfBlob,pdfUrl }) => {
  console.log(pdfBlob,'CCCpdfBlob');
  const inputString = pdfBlob;
  const uuidRegex = /[^\/]+$/;
  const uuidOnly = inputString.match(uuidRegex)[0];
  
  console.log(uuidOnly,'uuidOnly'); // Output: e3cf7c44-af3b-482b-bd1e-8b03afb1f026
  
  
  

  const fetchAndConvertPdf = async (pdfBlob) => {
    try {
      const response = await fetch(pdfBlob);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching or converting Blob:', error);
      return null;
    }
  };
  
  const dispatch = useDispatch();
  const AllOrders = useSelector(selectAllOrders);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);
console.log(OrderListRecord,'OrderListRecord');
  useEffect(() => {
    dispatch(getAllOrders());
    fetchAndConvertPdf(pdfBlob).then((url) => setPdfDataUrl(url));
  }, [pdfBlob, dispatch]);

  console.log(AllOrders,'AllOrders');

  const UserName = AllOrders?.find((ite)=>ite.userName == AllOrders.length )
  console.log(UserName,'MMsUserName');

  const Messages = `Hello ${AllOrders?.userName}! Welcome from Simson. Your order for ${OrderListRecord?.productName} has been processed. Check out the invoice: [Attach PDF here]`;

  const onClickWhatsApp = () => {
    // Handle WhatsApp click
  };
  console.log(baseRequest,'baseRequest');
const SendUrl = 'send-pdf'
  // const WhatsappApp =  () => {

  //   const cleanPdfUrl = pdfDataUrl.replace('blob:', '');
  //   const send = {
  //     mobileNumber: ChangeRecord?.mobileNumber,
  //     message: Messages,
  //     pdfUrl:cleanPdfUrl + ".pdf",
  //   };
  //      console.log(send,'XXXXsend');

  //    baseRequest.get(`${SendUrl}`, { params: send })
  //   .then(function (response) {
  //       successHandler(response, {
  //           notifyOnSuccess: true,
  //           notifyOnFailed: true,
  //           msg: 'Successfully',
  //           type: 'success',
  //       })
  //       return response.data;
  //   })
  //   .catch(function (error) {
  //     console.log(error,'eeeee');
  //       return errorHandler(error);
  //   })
  // };
  const WhatsappApp = async () => {
        const cleanPdfUrl = pdfDataUrl.replace('blob:', '');
    const send = {
      mobileNumber: ChangeRecord?.mobileNumber,
      message: Messages,
      pdfUrl:cleanPdfUrl + ".pdf",
    };
    try {
      const response = await baseRequest.get(
        `${SendUrl}`,{ params: send }
      );
      console.log(response, "Whtsuppp");
      return response.data;
    } catch (error) {
      console.log(error, "eeeeDDDD");
    }
  };
  return (
    <div>
      <RiWhatsappFill size={70} color={THEME.green} onClick={WhatsappApp} />
    </div >
  );
};

export default WhatsupSharePdfView;
