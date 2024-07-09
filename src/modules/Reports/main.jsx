import React, { useEffect, useRef, useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import styled from 'styled-components';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { ToWords } from 'to-words';
// import { PrintWrapper, } from '../../../../../components/Form/Styled';
import { Button } from '@components/form';

const BillTable = styled.div`
  overflow-x: auto !important;

  & table thead tr th {
    font-size: 12px !important;
    padding: 10px;
  }

  & table tbody tr td {
    font-size: 12px !important;
    padding: 10px;
  }

  & table tbody tr:nth-child(even) td {
    background-color: #feefdf;
  }

  @media print {
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px !important;
    }

    th {
      background-color: #fe7900;
      color: #fff;
    }

    td {
      text-align: center;
    }
  }
`;

const ViewPrint = ({ businessProfile, record }) => {
  const [recordData, setRecordData] = useState([]);
  const dispatch = useDispatch();
  const Allinvoiceview = '';

//   useEffect(() => {
//     dispatch(getInvoice());
//   }, []);

//   const InvoiceId = Allinvoiceview.find((item) => item.invoiceId === record?.record);

//   useEffect(() => {
//     setRecordData(InvoiceId);
//   }, [InvoiceId]);

//   const toWords = new ToWords({
//     localeCode: 'en-IN',
//     converterOptions: {
//       currency: true,
//       ignoreDecimal: false,
//       ignoreZeroCurrency: false,
//       doNotAddOnly: false,
//       currencyOptions: {
//         name: 'Rupee',
//         plural: 'Rupees',
//         symbol: '₹',
//         fractionalUnit: {
//           name: 'Paisa',
//           plural: 'Paise',
//           symbol: '',
//         },
//       },
//     },
//   });

//   useEffect(() => {
//     dispatch(getBusinessProfile());
//   }, []);

  const profdetails = '';

  const componentRef = useRef();

  const handlePrint = () => {
    const pdfMake = window.pdfMake;
    pdfMake.createPdf(componentRef.current).download('eCommerceInvoice.pdf');
  };

//   const formattedAmount = toWords.convert(300, { currency: true });

  const Header = () => {
    return (
    //   <PrintWrapper>
        <div ref={componentRef}>
          {/* ... (rest of the code remains the same) ... */}
        </div>
    //   </PrintWrapper>
    );
  };

  return (
    <div>
      <Button.Primary text={<AiFillPrinter style={{ fontSize: '30px' }} />} onClick={handlePrint} />
      <Header />
    </div>
  );
};

export default ViewPrint;
