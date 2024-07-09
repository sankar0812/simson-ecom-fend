import React, { Fragment } from 'react'
import { CustomTabs } from '@components/others/CustomTabs';
import { useParams } from 'react-router-dom';
import ViewReturnOrder from './ReturnOrders/Partials/ViewReturnOrder';
import Vieworder from './ViewOrders/Partials/ViewOrder';
import { CustomCardView } from '@components/others';
import { ViewOrderList } from './ViewOrders/Partials/ViewOrderList';
import ViewRefundList from './RefundList/Partials/ViewRefundList';


const Orders = () => {
    const id = useParams()
    console.log(id,'idid');
    const items = [
        {key:1, label: 'View Orders', content: <Vieworder id={id}/> },
        {key:1, label: 'View Return Orders', content:<ViewReturnOrder id={id} />},
        {key:1, label: 'View Refund List', content:<ViewRefundList id={id} />},
      ];
      const onChangeTabs =()=>{

      }
      const labelStyles = {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        padding: '3px 9px',
        display: 'flex',
        borderRadius: '4px',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(6 177 220)', 
      };
    
      const activeLabelStyles = {
        color: '#df1f26',
      }
        
  return (
    <CustomCardView>
        <CustomTabs tabs={items} defaultActiveKey={'1'} onChange={onChangeTabs}
            labelStyles={labelStyles}
            activeLabelStyles={activeLabelStyles}
        />
    </CustomCardView>
  )
}

export default Orders
