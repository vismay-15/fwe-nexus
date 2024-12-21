import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { PageTitle } from '../../components/PageTitle';

export const Dashboard = () => {
  return (
    <>
      <PageTitle>
        Dashboard
      </PageTitle>
      <div className='dashboard-tabs'>
      <Tabs
        defaultActiveKey="food"
        className="mb-3"
      >
          <Tab eventKey="food" title="Food">
            Tab content for Food
          </Tab>
          <Tab eventKey="water" title="Water">
            Tab content for Water
          </Tab>
          <Tab eventKey="energy" title="Enegry">
            Tab content for Energy
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
