import React, { useState, useEffect } from 'react';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';
import { connect } from 'umi';
import { Tabs } from 'antd';
import ProductListTable from './ProductListTable';

const { TabPane } = Tabs;

const AllProducts = ({ dispatch, productList, currentUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [tab, setTab] = useState('Y');

  useEffect(() => {
    dispatch({
      type: 'product/allproducts',
      payload: {
        view_size: viewSize,
        start_index: startIndex,
        keyword: searchText,
        is_verified: tab,
        customer_id: currentUser?.personal_details?.organization_details?.org_party_id,
      },
    });
  }, [viewSize, startIndex, searchText, tab]);
  return (
    <div className="container mx-auto">
      <Page
        title="All Product"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'All Product',
                path: '/products/all',
              },
            ]}
          />
        }
      >
        <div className="bg-white shadow rounded">
          <Tabs
            defaultActiveKey="Active"
            className=""
            onTabClick={(val) => {
              setTab(val === 'Active' ? 'Y' : 'N');
              setSearchText('');
              setViewSize(10);
              setStartIndex(0);
              setCurrentPage(1);
            }}
          >
            <TabPane tab={<span className="px-4">Approved</span>} key="Active">
              <ProductListTable
                viewSize={viewSize}
                totalRecords={productList?.total_count}
                currentPage={currentPage}
                setViewSize={setViewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setSearchText={setSearchText}
                isVerified={tab}
              />
            </TabPane>
            <TabPane tab="Pending" key="Inactive">
              <ProductListTable
                inactive
                setSearchText={setSearchText}
                viewSize={viewSize}
                totalRecords={productList?.total_count}
                currentPage={currentPage}
                setViewSize={setViewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                isVerified={tab}
              />
            </TabPane>
          </Tabs>
        </div>
      </Page>
    </div>
  );
};

export default connect(({ product, user }) => ({
  productList: product.productList,
  currentUser: user.currentUser,
}))(AllProducts);
