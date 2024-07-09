import React from 'react'
import { Tabs } from 'antd'

export const CustomTabs = ({ tabs, defaultActiveKey,activeKey,onChange,activeLabelStyles,labelStyles }) => {

    const { TabPane } = Tabs;

    const handleChange =(e)=>{
        onChange(e)
    }

    return (
        <Tabs activeKey={activeKey} defaultActiveKey={defaultActiveKey} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <TabPane
            key={index + 1}
            tab={<span style={activeKey === `${index + 1}` ? activeLabelStyles : labelStyles}>{tab.label}</span>}
          >
            {tab.content}
          </TabPane>
        ))}
      </Tabs>
    )
}
