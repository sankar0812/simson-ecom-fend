import React, { Fragment } from "react";
import dayjs from "dayjs";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import ProLogo from "@assets/images/DocLogo.jpg";
import { IMG_BASE_URL } from "@request/request";

const PdfView = ({ record, activePro }) => {
  console.log(record, "SIVASIVA");

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      lineHeight: 1.5,
      padding: "20px 30px",
      flexDirection: "column",
    },
    Dotted: {
      border: "2px dashed #000",
      borderRadius: "22px",
      background: "#F3F3F3",
      padding: "7px",
      fontSize: "13px",
      // display: "inline-block",
      fontWeight: "400",
      // lineHeight: "18.74px",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    hr: {
      //   flexDirection: "row",
      borderTopWidth: 1, //
      borderColor: "black",
      width: "100%", //
      //   marginVertical: 10, //
    },
    row: {
      flexDirection: "row",
      border: "1px solid black",
    },
    rows: {
      flexDirection: "row",
      border: "1px solid black",
      justifyContent: "space-between",
      padding: "10px 20px",
      marginBottom: 10,
    },
    column: {
      flex: 1,
      padding: "10px 0",
      borderRight: "1px solid black",
    },
    headerText: {
      fontSize: 10,
      fontWeight: "bold",
      textAlign: "center",
    },
    cellText: {
      fontSize: 10,
      textAlign: "center",
    },
    logoImage: {
      width: 50,
    },
    centeredContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "space-between",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "space-between", //
    },
    labelText: {
      fontSize: 14,
      padding: 5, //
    },
    amountText: {
      fontSize: 14,
      padding: 5, //
    },
  });

  const PrintedDate = dayjs().format("DD-MMM-YY [at] HH:mm");
  const formattedDate = dayjs(record?.invoice_date).format("DD-MMM-YY");
  const formattedAmount = "";
  const Header = () => {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.6, alignItems: "flex-start" }}>
            <Image src={ProLogo} style={styles.logoImage} />
          </View>
          <View
            style={{
              flex: 0.3,
              alignItems: "flex-end",
              gap: "3px",
            }}
          >
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              Tax Invoice/Bill of supply/cash
              <br /> memo (Original for Recipient)
            </Text>

            <View style={styles.Dotted}>
              <Text style={{ fontSize: "13px", fontWeight: "400" ,marginRight:'20px'}}>
                Invoice number&nbsp;:&nbsp;&nbsp;{record?.invoiceId}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={{ flex: 0.5, gap: "10px" ,marginBottom:'-80px',marginRight: "10px",}}>
          <View style={{ gap: "5px", padding: "5px" }}>
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              Sold By&nbsp;:&nbsp;{activePro?.gst_no}.
            </Text>
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              Shipping-From Address&nbsp;:&nbsp;{record?.companyAddress}.
            </Text>
            {/* <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              GST IN&nbsp;:&nbsp;{record?.email}
            </Text> */}
          </View>
        </View>
        <View>
          <View style={styles.hr} />
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: "15px 0px",
          }}
        >
          <View style={{ flex: 0.5, gap: "20px" }}>
            <View style={{ gap: "5px", padding: "5px 0px" }}>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Order No&nbsp;:&nbsp;{record?.orderItemId}.
              </Text>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Order Date&nbsp;:&nbsp;{record?.date}.
              </Text>
              {/* <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Invoice Date&nbsp;:&nbsp;{record?.invoice_date}
              </Text> */}
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Invoice No&nbsp;:&nbsp;{record?.invoiceId}
              </Text>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Total Items&nbsp;:&nbsp;{record?.totalItems}
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <View style={{ gap: "5px", padding: "5px" }}>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Billing Address&nbsp;:&nbsp;
              </Text>
            </View>
            <View style={{ gap: "5px", padding: "5px" }}>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                {/* {record?.userStreetAddress}. */}
                {record?.userStreetAddress}, {record?.userCity},{"\n"}
                  {record?.userDistrict},{record?.userState},&nbsp;{record?.userCountry},{"\n"}
                  {record?.userPostalCode}.
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <View style={{ gap: "5px", padding: "5px" }}>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Shipping Address&nbsp;:&nbsp;
              </Text>
            </View>
            <View style={{ gap: "5px", padding: "5px" }}>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                {/* {record?.userStreetAddress}. */}
                {record?.userStreetAddress}, {record?.userCity},{"\n"}
                  {record?.userDistrict},{record?.userState},&nbsp;{record?.userCountry},{"\n"}
                  {record?.userPostalCode}.
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  const TableHeadings = () => {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.headerText}>Product Name</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.headerText}>Price</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.headerText}>Qty</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.headerText}>Tax %</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.headerText}>Tax Amt</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.headerText}>Total Amt</Text>
          </View>
        </View>
        <View>
          {record?.orderItemDetails?.map((item, index) => {
            return (
              <>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.cellText}>{item?.productName}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.cellText}>{item?.totalAmount}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.cellText}>{item?.quantity}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.cellText}>{item?.gst}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.cellText}>{item?.gstTaxAmount}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.cellText}>{item?.totalPrice}</Text>
                  </View>
                </View>
              </>
            );
          })}

          <View style={{ borderTop: "none" }}>
            <View style={styles.rows}>
              <Text>Total</Text>
              <Text>{record?.totalAmount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={{ position: "relative", width: "100vw" }}>
        <View style={{ marginTop: "20px" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ flex: "0.5" }}>
              {/* <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Place of Supply&nbsp;:&nbsp;AAAAA.
              </Text>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Place of Delivery&nbsp;:&nbsp;BBBBB.
              </Text> */}
            </View>
            <View
              style={{
                flex: "0.5",
                display: "flex",
                // alignItems: "flex-end",
                flexDirection: "row",
                justifyContent: "flex-end",
                // rowGap:'10px'
              }}
            >
              <View style={{ flex: "0.5" }}>
                {/* <Text
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;{record?.companyName}
                </Text> */}
                <Image src={`${IMG_BASE_URL}${record?.signature}`} style={{ width: "90px" }} />
                <Text
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    marginTop:"10px",
                    marginBottom: "10px",
                    marginRight:'10px',
                  }}
                >
                  Authorised Signatory
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page style={styles.page} size={"A4"}>
        <View style={{ flexGrow: 1 }}>
          <Header />
          <TableHeadings />
          <Footer />
          <View style={styles.hr} />
          <View
            style={{
              display: "flex",
              margin: "15px 0px",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            {/* <Image src={ProLogo} style={{ width: 30, marginRight: "10px" }} /> */}

            <Image src={`${IMG_BASE_URL}${record?.companyProfile}`}style={{ width: 30, marginRight: "10px",marginBottom:'10px' }} />
            <Text
              style={{
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              Thank You!
            </Text>
            <Text
              style={{
                fontSize: "6px",
                fontWeight: "400",
              }}
            >
              (for shopping with us)
            </Text>
          </View>
          <View style={{ display: "flex" }}>
            <View style={{ margin: "5px 0px" }}>
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                Return Policy&nbsp;&nbsp;:&nbsp;&nbsp;
                <Text
                  style={{
                    fontSize: "8px",
                    fontWeight: "400",
                    marginBottom: "10px",
                  }}
                >
                  At Simson we try to deliver perfectly each and every time.
                  But in the off-chance that you need to return the item, please
                  do so with the ORIGINAL BRAND BOX/PRICE tag, original packing,
                  and invoice without which it will be really difficult for us
                  to act on your request. Please help us in helping you, Terms
                  and conditions apply. The goods sold are intended for end-user
                  consumption and not for re-sale.
                </Text>
              </Text>
            </View>
            <Text
              style={{
                fontSize: "11px",
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              Contact Simson :
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: "400",
                  marginBottom: "5px",
                }}
              >
                9056789076 | www.simson.com | help center
              </Text>
            </Text>
          </View>
        </View>
      </Page>
      {/* ))}  */}
    </Document>
  );
};

export default PdfView;
