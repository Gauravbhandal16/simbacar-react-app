import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import { connect, Link } from 'umi';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';
import { PlusSquareOutlined } from '@ant-design/icons';
import StaffListTable from './StaffListTable';

const { TabPane } = Tabs;

const StaffList = (props) => {
  const { staffList, dispatch } = props;
  const [acceptedKeyword, setAcceptedKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [tab, setTab] = useState('accepted');

  useEffect(() => {
    dispatch({
      type: 'staff/getStaffList',
      payload: {
        query: {
          view_size: viewSize,
          start_index: startIndex,
          keyword: acceptedKeyword,
        },
        pathParams: {
          type: tab,
        },
      },
    });
  }, [viewSize, startIndex, tab, acceptedKeyword]);

  return (
    <div className="container mx-auto">
      <Page
        title="Staff"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'All Staff',
                path: '/staff/list',
              },
            ]}
          />
        }
        primaryAction={
          <Link
            to={{
              pathname: '/staff/invite',
            }}
          >
            <Button icon={<PlusSquareOutlined />} type="primary" id="open-invite-staff">
              Invite Staff
            </Button>
          </Link>
        }
      >
        <div className="bg-white shadow rounded">
          <Tabs
            defaultActiveKey="ACTIVE"
            className=""
            onTabClick={(val) => {
              setTab(val === 'ACTIVE' ? 'accepted' : 'pending');
              setCurrentPage(1);
              setViewSize(10);
              setStartIndex(0);
              setAcceptedKeyword('');
            }}
          >
            <TabPane tab={<span className="px-4">Active</span>} key="ACTIVE">
              <StaffListTable
                viewSize={viewSize}
                totalRecords={staffList?.totalCount}
                currentPage={currentPage}
                setViewSize={setViewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setKeyword={setAcceptedKeyword}
              />
            </TabPane>
            <TabPane tab="Awaiting Response" key="AWAITING">
              <StaffListTable
                awaiting
                setKeyword={setAcceptedKeyword}
                viewSize={viewSize}
                totalRecords={staffList?.totalCount}
                currentPage={currentPage}
                setViewSize={setViewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
              />
            </TabPane>
          </Tabs>
        </div>
      </Page>
    </div>
  );
};
export default connect(({ staff }) => ({
  staffList: staff.staffList,
}))(StaffList);
