import { CustomTable } from "@components/form";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";

const DiscountListTable = ({ record }) => {

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(record?.discountList);
  }, [record]);

  const TableColumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Mrp",
      dataIndex: "mrp",
    },
    {
      title: "Buy Rate",
      dataIndex: "buyRate",
    },
    {
      title: "Sell Rate",
      dataIndex: "sellRate",
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
    },
    {
      title: "Discount Amt",
      dataIndex: "discountAmount",
    },
    {
      title: "Gst %",
      dataIndex: "gst",
    },
    {
      title: "Gst Amt",
      dataIndex: "gstTaxAmount",
    },
  ];

  return (
    <Fragment>
      <CustomTable columns={TableColumns} data={dataSource} />
    </Fragment>
  );
};

export default DiscountListTable;
