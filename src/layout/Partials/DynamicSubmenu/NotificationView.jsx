import React from 'react';
import { Layout, notification, Avatar, List, Badge, Card } from 'antd';
import { IMG_BASE_URL } from '@request/request';

const { Content } = Layout;

const Notification = ({ notify }) => {
  console.log(notify, 'notify');

  const openNotification = (product) => {
    notification.open({
      message: `Product ${product.productName} Details`,
      description: (
        <div>
          <p>Alert Quantity: {product.alertQuantity}</p>
          <p>Brand Name: {product.brandname}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ),
    });
  };

  const notificationData = notify?.map(product => ({
    key: product.productId,
    title: `${product.productName} - ${product.brandname}`,
    avatar: (
      <div style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '50%' }}>
        <img
          src={`${IMG_BASE_URL}${product.productImagesUploadUrl}`}
          alt={product.productName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    description: (
      <div>
        <p>Alert Quantity: {product.alertQuantity}</p>
        <p>Brand Name: {product.brandname}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
    ),
  }));

  return (
    <Layout style={{ height: '400px', overflowY: 'auto', borderRadius: '10px' }}>
      <Content style={{ padding: '15px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 360 }}>
          <Badge.Ribbon text=" Stock Alert!" color="volcano">
            <Card title="" size="small">

              <h1 style={{ color: '#545454', fontSize: '20px', fontWeight: '500' }}>Alert Quantity!</h1>
            </Card>
          </Badge.Ribbon>
          {/* <h1 style={{color:'#545454'}}>Stock Alert!</h1> */}
          <List
            itemLayout="horizontal"
            dataSource={notificationData}
            renderItem={item => (
              <List.Item
                //   onClick={() => openNotification(notify.find(product => product.productId === item.key))}
                style={{ cursor: 'pointer' }}
              >
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Notification;
