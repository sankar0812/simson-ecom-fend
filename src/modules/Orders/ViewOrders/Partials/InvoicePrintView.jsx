import { CustomModal, CustomRow, Flex } from "@components/others";
import {
  BillTable,
  Maindesign,
  PrintHolder,
  PrintSubTitle,
  PrintTableFooterHolders,
  PrintTitle,
  PrintViewValue,
  PrintWrapper,
} from "@components/others/Style";
import { Col } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { DotedLine, HeaderTitle, TopHeadTitle } from "./style";
import { SvgIcons } from "@assets/Svg";
import { baseRequest, IMG_BASE_URL } from "@request/request";
import { APIURLS } from "@request/apiUrls/urls";
import PdfView from "./InvoicePdf";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { RiWhatsappFill } from "react-icons/ri";
import { THEME } from "@theme/index";
import { PDFDownloadLink } from "@react-pdf/renderer";
import successHandler from "@request/successHandler";
import errorHandler from "@request/errorHandler";


const InvoicePrintView = ({ OrderListRecord, ChangeRecord, GetOrders, printTrigger }) => {

  const [orderInvoices, setOrderInvoices] = useState([]);
  const [orderInvoiceList, setOrderInvoiceList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [pdfViewVisible, setPdfViewVisible] = useState(false);  // use whatsup icon show
  const [shareBtn, setShareBtn] = useState([])   // use sharebtn hide
  console.log(OrderListRecord, 'OrderListRecord');
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [modelwith, setModelwith] = useState(0);
  // ===== Modal Functions Start =====
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    GetInvoiceDetailsPrint();
  }, [printTrigger]);

  console.log(OrderListRecord, "VBBOrderListRecord");

  console.log(orderInvoiceList, 'orderInvoiceList');

  const GetInvoiceDetailsPrint = async () => {
    try {
      const response = await baseRequest.get(
        `${APIURLS.GET_INVOICEPRINT}/${OrderListRecord?.orderItemId}`
      );
      setOrderInvoices(response.data);
      console.log(response, "INVOIPRINTTT");
      return response.data;
    } catch (error) {
      console.log(error, "eeeeDDDD");
    }
  };
  useEffect(() => {
    const FindOrderItemId = orderInvoices?.find(
      (item) => item?.orderItemId == OrderListRecord?.orderItemId
    );
    setOrderInvoiceList(FindOrderItemId);
  }, [orderInvoices, printTrigger]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const HeaderTable = () => {
    return (
      <Fragment>
        <PrintWrapper>
          <CustomRow space={[2, 2]}>
            <Col span={24} md={14}>
              <img src={SvgIcons.Logos} style={{ width: "60px" }} />
            </Col>
            <Col span={24} md={10}>
              <HeaderTitle>
                <h1>
                  Tax Invoice/Bill of supply/cash memo (Original for Recipient)
                </h1>
                <br />
                <DotedLine>
                  <h1>Invoice number&nbsp;:&nbsp;&nbsp;{orderInvoiceList?.invoiceId}</h1>
                </DotedLine>
              </HeaderTitle>
            </Col>
          </CustomRow>

          <CustomRow space={[0, 10]}>
            <Col span={24} md={24}>
              <Flex>
                <TopHeadTitle>
                  <h2>Sold By :</h2>
                </TopHeadTitle>
              </Flex>
            </Col>

            <Col span={24} xs={10} sm={8} md={6}>
              <Flex>
                <TopHeadTitle>
                  <h2>Shipping-From Address </h2>
                </TopHeadTitle>
              </Flex>
            </Col>

            <Col span={24} xs={14} sm={16} md={18}>
              <Flex>
                <span>:</span>
                <PrintViewValue>
                  {orderInvoiceList?.companyAddress}
                </PrintViewValue>
              </Flex>
            </Col>
          </CustomRow>

          <hr
            style={{
              border: "1px solid",
              marginTop: "15px",
            }}
          />

          <CustomRow space={[0, 24]} style={{ margin: "20px 0px" }}>
            <Col span={24} md={12}>
              <CustomRow space={[0, 10]}>
                <Col span={24} xs={10} sm={8} md={6}>
                  <Flex>
                    <HeaderTitle>
                      <h2>Order No</h2>
                    </HeaderTitle>
                  </Flex>
                </Col>

                <Col span={24} xs={14} sm={16} md={18}>
                  <Flex>
                    <span>:</span>
                    <PrintViewValue>
                      {orderInvoiceList?.orderItemId}
                    </PrintViewValue>
                  </Flex>
                </Col>
                <Col span={24} xs={10} sm={8} md={6}>
                  <Flex>
                    <HeaderTitle>
                      <h2>Invoice No</h2>
                    </HeaderTitle>
                  </Flex>
                </Col>

                <Col span={24} xs={14} sm={16} md={18}>
                  <Flex>
                    <span>:</span>
                    <PrintViewValue>
                      {orderInvoiceList?.invoiceId}
                    </PrintViewValue>
                  </Flex>
                </Col>
                <Col span={24} xs={10} sm={8} md={6}>
                  <Flex>
                    <HeaderTitle>
                      <h2>Order Date&nbsp;</h2>
                    </HeaderTitle>
                  </Flex>
                </Col>

                <Col span={24} xs={14} sm={16} md={18}>
                  <Flex>
                    <span>:</span>
                    <PrintViewValue>{orderInvoiceList?.date}</PrintViewValue>
                  </Flex>
                </Col>
                <Col span={24} xs={10} sm={8} md={6}>
                  <Flex>
                    <HeaderTitle>
                      <h2>Total Items</h2>
                    </HeaderTitle>
                  </Flex>
                </Col>

                <Col span={24} xs={14} sm={16} md={18}>
                  <Flex>
                    <span>:</span>
                    <PrintViewValue>
                      {orderInvoiceList?.totalItems}
                    </PrintViewValue>
                  </Flex>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24} md={6}>
              <Col span={24} md={24}>
                <HeaderTitle>
                  <h2>Billing Address:</h2>
                </HeaderTitle>
                <br />
                <PrintViewValue>
                  {orderInvoiceList?.userStreetAddress}, {orderInvoiceList?.userCity},<br />
                  {orderInvoiceList?.userDistrict},{orderInvoiceList?.userState},&nbsp;{orderInvoiceList?.userCountry},<br />
                  {orderInvoiceList?.userPostalCode}.
                  <div> Phn: {orderInvoiceList?.userMobileNumber}</div>
                </PrintViewValue>
              </Col>
            </Col>
            <Col span={24} md={6}>
              <HeaderTitle>
                <h2>Shipping Address:</h2>
              </HeaderTitle>
              <br />
              <PrintViewValue>
                {orderInvoiceList?.userStreetAddress}, {orderInvoiceList?.userCity},<br />
                {orderInvoiceList?.userDistrict},{orderInvoiceList?.userState},&nbsp;{orderInvoiceList?.userCountry},<br />
                {orderInvoiceList?.userPostalCode}.
                <div> Phn: {orderInvoiceList?.userMobileNumber}</div>
              </PrintViewValue>
            </Col>
          </CustomRow>
        </PrintWrapper>
      </Fragment>
    );
  };

  const handlePdf = (url) => {
    const pdfDownloadLink = document.getElementById("pdfDownloadLink");
    console.log(pdfDownloadLink, "pdfDownloadLink");
    if (pdfDownloadLink) {
      pdfDownloadLink.click();
    }
  };
  const actions = [
    { icon: <PictureAsPdfIcon onClick={handlePdf} />, name: "Pdf" },
    { icon: <PrintIcon onClick={handlePrint} />, name: "Print" },
    ...(shareBtn?.status === "success" || OrderListRecord?.invoiceFlag !== true ? [] : [{
      icon: <ShareIcon onClick={() => handleShare("whatsapp")} />,
      name: "Share",
    }])
  ];


  const handleShare = (platform) => {
    if (platform === "whatsapp") {
      setPdfViewVisible(!pdfViewVisible);
    } else {

    }
  };

  const Messages = `Hello ${OrderListRecord?.userName}! Welcome from simson. Your order for ${OrderListRecord?.productName} has been processed. Check out the invoice: [Attach PDF here]`;
  // const Messages = 'Hii';
  console.log(OrderListRecord, 'OrderListRecord');
  const WhatsappApp = async (blob) => {
    console.log(blob, "SIVVVVV");
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    console.log(reader, "reader");
    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1];

      const sendValues = {
        mobileNumber: OrderListRecord?.mobileNumber,
        message: Messages,
        pdfUrl: base64data,
        orderItemId: OrderListRecord?.orderItemId

      };

      console.log(sendValues, "sendValues");

      await baseRequest
        .post(`${APIURLS.SENDPDF}`, sendValues)
        .then(function (response) {
          successHandler(response, {
            notifyOnSuccess: true,
            notifyOnFailed: true,
            msg: "Successfully",
            type: "success",
          });
          setPdfViewVisible(false)
          if (GetOrders) {
            GetOrders()
          }
          setShareBtn(response?.data)
          console.log(response.data, 'wwwttt');
          return response.data;
        })
        .catch(function (error) {
          console.log(error, 'errrr');
          return errorHandler(error);
        });
    };
  };



  console.log(imageUrl, "imageUrl");
  return (
    <Fragment>
      {/* <Flex> */}
      <a href="https://mail.google.com/" target="_blank">
        {" "}
        {/* <Button.Primary text={"Email"} right={"true"} icon={<MdEmail />} /> */}
      </a>
      {/* <Button.Primary
          text={"PrintOut"}
          right={"true"}
          icon={<MdPrint />}
          onClick={handlePrint}
        /> */}

      {/* <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'relative' }}> */}
      <SpeedDial
        ariaLabel="Invoice"
        sx={{ position: "absolute", top: 6, left: 15 }}
        icon={<SpeedDialIcon style={{ fontSize: 10 }} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      {/* </Box> */}
      {/* </Flex> */}

      <PDFDownloadLink
        fileName="Invoice"
        id="pdfDownloadLink"
        document={<PdfView record={orderInvoiceList} />}
      >
        {({ blob, url, loading, error }) => (
          <>
            {pdfViewVisible && (
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "50px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <RiWhatsappFill
                  size={35}
                  color={THEME.green}
                  onClick={() => WhatsappApp(blob)}
                />
              </div>
            )}

            {/* {url && (
              <a href={url} target="_blank">
                View PDF
              </a>
            )} */}
          </>
        )}
      </PDFDownloadLink>
      <PrintWrapper>
        <PrintHolder ref={componentRef}>
          <Maindesign>
            <CustomRow gutter={[12, 12]}>
              <Col span={14}>
              </Col>
              <Col span={10}>
              </Col>
            </CustomRow>
            <HeaderTable />
          </Maindesign>
          {/* <br></br> */}
          <BillTable>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty </th>

                  <th>
                    Tax <br />%
                  </th>
                  <th>
                    Tax <br />
                    Amount
                  </th>
                  <th>
                    Total <br />
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderInvoiceList?.orderItemDetails?.map((item, index) => (
                  <tr>
                    <td>{item?.productName}</td>
                    <td>{item?.totalAmount}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.gst}</td>
                    <td>{item?.gstTaxAmount}</td>
                    <td>{item?.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
              <tr>
                <td colspan="5">
                  <Flex style={{ padding: "0px 20px" }}>
                    <HeaderTitle>
                      <h2>Total</h2>
                    </HeaderTitle>
                  </Flex>
                </td>
                <td style={{ border: "none" }}>
                  {" "}
                  {orderInvoiceList?.totalAmount}
                </td>
              </tr>
            </table>
          </BillTable>
          <PrintTableFooterHolders>
            <CustomRow>
              <Col span={24} md={16}>
              </Col>

              <Col span={24} md={8}>
                <CustomRow>
                  <Col span={24} md={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'end' }}>
                    <div style={{ width: '50%', textAlign: 'center', marginBottom: '-10px' }}>
                      <img src={`${IMG_BASE_URL}${orderInvoiceList?.signature}`} style={{ width: "115px" }} />
                    </div>

                    <PrintTitle
                      Size={"14px"}
                      TextAlign={"center"}
                      MT={"30px"}
                      BTM={"20PX"}
                    >
                      Authorised Signatory
                    </PrintTitle>
                  </Col>
                </CustomRow>
              </Col>
            </CustomRow>
          </PrintTableFooterHolders>
          <PrintTableFooterHolders>
            <hr
              style={{
                border: "1px solid",
                // marginTop: "5px",
              }}
            />
            <CustomRow space={[12, 12]}>
              <Col span={12} md={16}></Col>
              <Col span={12} md={8}>
                <CustomRow space={[12, 12]}>
                  <Col span={24} md={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'end' }}>
                    <div style={{ width: '50%', textAlign: 'center', margin: '10px 0px' }}>
                      {/* <img src={SvgIcons.Logos} style={{ width: "40px" }} /> */}
                      <img src={`${IMG_BASE_URL}${orderInvoiceList?.companyProfile}`} style={{ width: "50px" }} />
                    </div>

                    <PrintTitle Size={"14px"} TextAlign={"center"} style={{ marginRight: '10px' }} >
                      Thank You!
                    </PrintTitle>
                    <PrintTitle Size={"14px"} TextAlign={"center"}>
                      <p style={{ fontSize: "10px" }}>(for shopping with us)</p>
                    </PrintTitle>
                  </Col>
                </CustomRow>
              </Col>
            </CustomRow>
          </PrintTableFooterHolders>
          <PrintTableFooterHolders>
            {/* <div style={{ pageBreakInside: "avoid" }}> */}
            <CustomRow gutter={[12, 24]}>
              <Col span={24} md={24}>
                <PrintSubTitle Under Size={"14px"} Weight={"700"}>
                  Return Policy :&nbsp;
                  <span
                    style={{
                      // color: "#545454",
                      fontFamily: "Red Rose, serif",
                      fontSize: "11px",
                      fontWeight: "400",
                    }}
                  >
                    At Simson we try to deliver perfectly each and every time.
                    But in the off-chance that you need to return the item,
                    please do so with the
                    <b style={{ fontWeight: "bold" }}>
                      ORIGINAL BRAND BOX/PRICE tag, original packing, and
                      invoice
                    </b>{" "}
                    without which it will be really difficult for us to act on
                    your request. Please help us in helping you, Terms and
                    conditions apply. The goods sold are intended for end-user
                    consumption and not for re-sale.
                  </span>
                </PrintSubTitle>
                {/* <PrintTitle Size={"10px"}> */}
                <PrintViewValue></PrintViewValue>
                {/* </PrintTitle> */}
              </Col>
              <Col span={24} md={24}>
                <Flex>
                  <PrintSubTitle Under Size={"14px"} Weight={"700"}>
                    Contact Simson :
                  </PrintSubTitle>
                  <PrintViewValue>
                    {orderInvoiceList?.companyPhoneNumber} | www.simson.com |
                    help center
                  </PrintViewValue>
                </Flex>
              </Col>
            </CustomRow>
            {/* </div> */}
          </PrintTableFooterHolders>
        </PrintHolder>
      </PrintWrapper>

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modelwith}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};

export default InvoicePrintView;
