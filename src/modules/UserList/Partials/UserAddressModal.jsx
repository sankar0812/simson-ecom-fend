import { CustomTable } from '@components/form';
import {  CustomRow, Flex } from '@components/others'
import { Col } from 'antd';
import React from 'react'

const UserAddressModal = ({ record }) => {
    console.log(record, 'recordrecord');

    const TableColumns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Street Address',
            dataIndex: 'streetAddress'
        },
        {
            title: 'District',
            dataIndex: 'district'
        },
        {
            title: 'State',
            dataIndex: 'state'
        },
        {
            title: 'Postal Code',
            dataIndex: 'postalCode'
        },
        {
            title: 'Country',
            dataIndex: 'country'
        },
    ]

    return (
        <div>
            {/* <CustomCardView> */}
                <CustomRow>
                    <Col span={24} md={12}>
                        <h3 style={{color:'#545454'}}>User Name : <span style={{fontWeight:'400'}}>{record?.userName}</span></h3>
                    </Col>

                    <Col span={24} md={24} style={{marginTop:"10px"}}>
                    <CustomTable columns={TableColumns} data={record?.addressDetails} />
                    </Col>

                </CustomRow>
            {/* </CustomCardView> */}
        </div>
    )
}

export default UserAddressModal