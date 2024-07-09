import React, { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerCount,
  getDashDiscount,
  getDashPercentage,
  getHighOrder,
  getOutofStock,
  getReturnProduct,
  getYearCount,
  selectAllCustomerCount,
  selectAllDiscount,
  selectAllHighOrder,
  selectAllOutofStock,
  selectAllPercentage,
  selectAllReturnProduct,
  selectAllYearCount,
} from "@modules/Dashboard/DashboardSlice";
import styled from "styled-components";
import { AiOutlineInbox } from "react-icons/ai";
import { IMG_BASE_URL } from "@request/request";

// const IncomeChart = ({ data }) => {
//   const chartData = [
//     { name: 'Current Day', income: data.currentDayIncome },
//     { name: 'Current Month', income: data.currentMonthIncome },
//     { name: 'Current Year', income: data.currentYearIncome },
//   ];

//   return (
//     <div>
//       <h2>Income Chart</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={chartData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="income" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default IncomeChart;

export const StyledTable = styled.div`
overflow: auto;
 table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th{
  color: #000;
}

td, th {
  /* border: 1px solid #dddddd; */
  text-align: center;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */

table thead {
    position: sticky;
    top: -1px;
    background-color: #f0f0f0;
  }

  table thead th {
    z-index: 1;
  }

  table th, table td {
    padding: 15px;
  }
`

export const LineChart = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  const AllYearCount = useSelector(selectAllYearCount);

  useEffect(() => {
    dispatch(getYearCount());
  }, []);

  useEffect(() => {
    setDataSource(AllYearCount);
  }, [AllYearCount]);

  useEffect(() => {
    const previousYear = dataSource?.map((item) => item.previouscount) || [];
    const currentYear = dataSource?.map((item) => item.currentcount) || [];
    const month = dataSource?.map((item) => item.month) || [];

    const options = {
      series: [
        {
          name: "Previous Year",
          data: previousYear,
          // data: [12, 52, 42, 68, 55, 32],
        },
        {
          name: "Current Year",
          data: currentYear,
          // data: [68, 55, 32, 12, 52, 42],
        },
      ],
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        // type: "category",
        // categories: month,
        categories: ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep", "Oct", "Nov", "Dec"],
      },
      tooltip: {
        x: {
          format: "MMMM", // Format to display the month
        },
      },
      title: {
        text: "Order Count",
        style: {
          fontSize: "16px",
        },
      },
      // colors: ["#FF4E1A", "#26B170"],
      responsive: [
        {
          breakpoint: 480, // Adjust this breakpoint as needed
          options: {
            chart: {
              height: 200,
            },
          },
        },
        {
          breakpoint: 768, // Adjust this breakpoint as needed
          options: {
            chart: {
              height: 300,
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(document.querySelector("#line"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [dataSource]);

  return <div id="line" />;
};

export const BarChart = () => {

  const dispatch = useDispatch();

  const AllCustomerCount = useSelector(selectAllCustomerCount);

  useEffect(() => {
    dispatch(getCustomerCount());
  }, []);

  useEffect(() => {

    const CustomerCount = AllCustomerCount?.map((item) => item.customerCount) || [];
    const year = AllCustomerCount?.map((item) => item.year) || [];

    setChartOptions(prevOptions => ({
      ...prevOptions,
      series: [
        {
          name: "Users",
          data: CustomerCount,
        },
      ],
      xaxis: {
        categories: year,
      },
    }));
  }, [AllCustomerCount]);

  const [chartOptions, setChartOptions] = useState({
    series: [],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      categories: [],
    },
    title: {
      text: "Yearly Customers",
    },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return val + "days";
    //     },
    //   },
    // },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export const DoubleBarChart = () => {
  const dispatch = useDispatch();

  const AllPercentage = useSelector(selectAllPercentage);

  useEffect(() => {
    dispatch(getDashPercentage());
  }, []);

  useEffect(() => {

    const deliveryPer = AllPercentage?.map((item) => item.deliveredPercentage) || [];
    const cancelledPer = AllPercentage?.map((item) => item.cancelledPercentage) || [];
    const year = AllPercentage?.map((item) => item.year) || [];

    const data = [15, 25, 23];

    const coloredData = deliveryPer.map((value, index) => {
      if (index % 2 === 0) {
        // Change color to red for even indices
        return { value, color: 'red' };
      } else {
        // Change color to black for odd indices
        return { value, color: 'green' };
      }
    });

    const color = coloredData?.map((item) => item.color) || [];

    setChartOptions(prevOptions => ({
      ...prevOptions,
      series: [
        {
          name: "Delivery",
          data: deliveryPer,
        },
        {
          name: "Cancelled",
          data: cancelledPer,
        },
      ],
      xaxis: {
        categories: year,
      },
    }));
  }, [AllPercentage]);

  const [chartOptions, setChartOptions] = useState({
    series: [],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      max: 100,
    },
    title: {
      text: "Yearly Product Sales",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  });

  return (
    <div>
      <div id="doubleChart">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export const OutofStockTable = () => {

  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  const AllOutofStock = useSelector(selectAllOutofStock);

  useEffect(() => {
    dispatch(getOutofStock());
  }, []);

  useEffect(() => {
    setDataSource(AllOutofStock)
  }, [AllOutofStock])

  // const dummy = [
  //   {
  //     projectName: "Biiling",
  //     taskname: "Sale",
  //     status: true,
  //     details: "completed",
  //   },
  //   {
  //     projectName: "Automation",
  //     taskname: "Purchase",
  //     status: false,
  //     details: "pending",
  //   },
  //   {
  //     projectName: "AI",
  //     taskname: "Expense",
  //     status: false,
  //     details: "onProcess",
  //   },
  //   {
  //     projectName: "Biiling",
  //     taskname: "Sale",
  //     status: true,
  //     details: "completed",
  //   },
  //   {
  //     projectName: "Automation",
  //     taskname: "Purchase",
  //     status: false,
  //     details: "pending",
  //   },
  //   {
  //     projectName: "AI",
  //     taskname: "Expense",
  //     status: false,
  //     details: "onProcess",
  //   },
  //   {
  //     projectName: "Biiling",
  //     taskname: "Sale",
  //     status: true,
  //     details: "completed",
  //   },
  //   {
  //     projectName: "Automation",
  //     taskname: "Purchase",
  //     status: false,
  //     details: "pending",
  //   },
  //   {
  //     projectName: "AI",
  //     taskname: "Expense",
  //     status: false,
  //     details: "onProcess",
  //   },
  // ];

  return (
    <StyledTable style={{height:'320px'}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <img
                    src={`${IMG_BASE_URL}${item?.productImagesUploadUrl}`}
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  </td>
                <td>{item?.productName}</td>
                <td>{item?.brandname}</td>
                <td>{item?.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};

export const DiscountTable = () => {

  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  const AllDiscount = useSelector(selectAllDiscount);

  useEffect(() => {
    dispatch(getDashDiscount());
  }, []);

  useEffect(() => {
    setDataSource(AllDiscount)
  }, [AllDiscount])

  console.log(dataSource,'dataSource');

  // const dummy = [
  //   {
  //     projectName: "Biiling",
  //     taskname: "Sale",
  //     status: true,
  //     details: "completed",
  //   },
  //   {
  //     projectName: "Automation",
  //     taskname: "Purchase",
  //     status: false,
  //     details: "pending",
  //   },
  //   {
  //     projectName: "AI",
  //     taskname: "Expense",
  //     status: false,
  //     details: "onProcess",
  //   },
  //   {
  //     projectName: "Biiling",
  //     taskname: "Sale",
  //     status: true,
  //     details: "completed",
  //   },
  //   {
  //     projectName: "Automation",
  //     taskname: "Purchase",
  //     status: false,
  //     details: "pending",
  //   },
  //   {
  //     projectName: "AI",
  //     taskname: "Expense",
  //     status: false,
  //     details: "onProcess",
  //   },
  //   {
  //     projectName: "Biiling",
  //     taskname: "Sale",
  //     status: true,
  //     details: "completed",
  //   },
  //   {
  //     projectName: "Automation",
  //     taskname: "Purchase",
  //     status: false,
  //     details: "pending",
  //   },
  //   {
  //     projectName: "AI",
  //     taskname: "Expense",
  //     status: false,
  //     details: "onProcess",
  //   },
  // ];

  return (
    <StyledTable style={{height:'320px'}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Title</th>
            {/* <th>Start</th> */}
            <th>End</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <img
                    src={`${IMG_BASE_URL}${item?.productImagesUploadUrl}`}
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  </td>
                <td>{item?.productName}</td>
                <td>{item?.discountTitle}</td>
                {/* <td>{item?.startDate}</td> */}
                <td>{item?.endDate}</td>
                <td style={{textAlign:'center'}}>{item?.discountPercentage}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};

export const HighMovingProductTable = () => {

  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  const AllHighOrder = useSelector(selectAllHighOrder);

  useEffect(() => {
    dispatch(getHighOrder());
  }, []);

  useEffect(() => {
    setDataSource(AllHighOrder)
  }, [AllHighOrder])

  return (
    <StyledTable style={{height:'320px'}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Order Count</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <img
                    src={`${IMG_BASE_URL}${item?.productImagesUploadUrl}`}
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  </td>
                <td>{item?.productName}</td>
                <td>{item?.categoryName}</td>
                <td>{item?.brandName}</td>
                <td>{item?.orderCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};

export const ReturnProductTable = () => {

  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  const AllReturnProducts = useSelector(selectAllReturnProduct);

  useEffect(() => {
    dispatch(getReturnProduct());
  }, []);

  useEffect(() => {
    setDataSource(AllReturnProducts)
  }, [AllReturnProducts])

  return (
    <StyledTable style={{height:'320px'}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Product</th>
            <th>Date</th>
            <th>Mobile No</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <img
                    src={`${IMG_BASE_URL}${item?.productImagesUploadUrl}`}
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  </td>
                <td>{item?.productName}</td>
                <td>{item?.date}</td>
                <td>{item?.mobileNumber}</td>
                <td>{item?.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};
