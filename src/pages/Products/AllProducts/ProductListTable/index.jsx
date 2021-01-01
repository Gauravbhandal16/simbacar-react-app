import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Input, Pagination, Table, Row, Popover, Col, Form, Select, Button } from 'antd';
import { debounce } from 'lodash';
import {
  CaretDownOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import AddProductAccessory from '../AddProductAccessory';

const ProductListTable = ({
  loading,
  productList,
  currentPage,
  setViewSize,
  setCurrentPage,
  setStartIndex,
  viewSize,
  setSearchText,
  inactive,
  totalRecords,
  dispatch,
  brandList,
  familyList,
  typeList,
  isVerified,
  currentUser,
}) => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [addAccessoryModal, setAddAccessoryModal] = useState({
    visible: false,
    product: null,
  });

  const [form] = Form.useForm();
  const action = (val) => setSearchText(val);
  const debounceSearch = debounce(action, 400);

  const activeColumns = [
    {
      title: 'Serial number',
      dataIndex: 'serial_number',
    },
    {
      title: 'Brand',
      dataIndex: 'brand_name',
      render: (data) => data || '-',
    },
    {
      title: 'Family',
      dataIndex: 'category_name',
      align: 'center',
      render: (data) => data || '-',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
    },

    {
      title: 'Department',
      dataIndex: 'department_name',
      align: 'center',
      render: (data) => data || '-',
    },
    {
      title: 'Model number',
      dataIndex: 'model_number',
      align: 'center',
      render: (data) => data || '-',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, row) => (
        <div>
          <Button
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={(event) => {
              event.stopPropagation();
              setAddAccessoryModal({
                visible: true,
                product: row,
              });
            }}
          >
            Add accessory
          </Button>
        </div>
      ),
    },
  ];
  const awaitingColumns = [
    {
      title: 'Serial number',
      dataIndex: 'serial_number',
    },
    {
      title: 'Brand',
      dataIndex: 'brand_name',

      render: (data) => data || '-',
    },
    {
      title: 'Family',
      dataIndex: 'category_name',
      align: 'center',
      render: (data) => data || '-',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
    },

    {
      title: 'Department',
      dataIndex: 'department_name',
      align: 'center',
      render: (data) => data || '-',
    },
    {
      title: 'Model number',
      dataIndex: 'model_number',
      align: 'center',
      render: (data) => data || '-',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, row) => (
        <div>
          <Button
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={(event) => {
              event.stopPropagation();
              setAddAccessoryModal({
                visible: true,
                product: row,
              });
            }}
          >
            Add accessory
          </Button>
        </div>
      ),
    },
  ];

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const getBrandList = (value) => {
    dispatch({
      type: 'product/getProductBrands',
      payload: {
        keyword: value,
      },
    });
  };

  const getTypeList = (value) => {
    dispatch({
      type: 'product/getProductTypesList',
      payload: { keyword: value, type_id: '' },
    });
  };

  const getFamilyList = (value) => {
    dispatch({
      type: 'product/getProductfamilyList',
      payload: {
        keyword: value,
      },
    });
  };

  useEffect(() => {
    getBrandList();
    getTypeList();
    getFamilyList();
  }, []);

  const onFinishSearch = (values) =>
    dispatch({
      type: 'product/allproducts',
      payload: {
        ...values,
        view_size: viewSize,
        start_index: 0,
        keyword: setSearchText,
        is_verified: isVerified,
        customer_id: currentUser?.personal_details?.organization_details?.org_party_id,
        // sub_type_id={value},
      },
    }).then(() => {
      setShowFilterPopup(false);
    });

  const onBrandSearch = debounce(getBrandList, 400);

  const onFamilySearch = debounce(getFamilyList, 400);

  const onTypeSearch = debounce(getTypeList, 400);

  const filterContent = () => (
    <div style={{ minWidth: 480 }}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Form onFinish={onFinishSearch} form={form} colon={false}>
            <Form.Item
              name="brand_id"
              label={
                <div className="formLabel text-left" style={{ minWidth: 120 }}>
                  Product Brand is
                </div>
              }
              values
            >
              <Select
                placeholder="Select a product brand"
                className="w-full"
                showSearch
                allowClear
                onClear={getBrandList}
                filterOption={false}
                onSearch={(text) => onBrandSearch(text)}
              >
                {brandList?.searchResults.map((brand) => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="family_id"
              label={
                <div className="formLabel text-left" style={{ minWidth: 120 }}>
                  Product Family is
                </div>
              }
            >
              <Select
                placeholder="Select a product family"
                className="w-full"
                showSearch
                allowClear
                onClear={getFamilyList}
                filterOption={false}
                onSearch={(text) => onFamilySearch(text)}
              >
                {familyList?.searchResults.map((family) => (
                  <Select.Option key={family.id} value={family.id}>
                    {family.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="type_id"
              label={
                <div className="formLabel text-left" style={{ minWidth: 120 }}>
                  Product type is
                </div>
              }
            >
              <Select
                placeholder="Select a product type"
                className="w-full"
                showSearch
                allowClear
                onClear={getTypeList}
                filterOption={false}
                onSearch={(text) => onTypeSearch(text)}
              >
                {typeList?.ProductTypes.map((pType) => (
                  <Select.Option key={pType.productTypeId} value={pType.productTypeId}>
                    {pType.description}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div className="text-right">
              <Button onClick={() => form.submit()} type="primary" loading={loading}>
                Filter Products <ArrowRightOutlined />
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="bg-white rounded shadow">
          <div className="px-4 mb-3">
            <Input.Search
              addonBefore={
                <Popover
                  visible={showFilterPopup}
                  // getPopupContainer={(trigger) => trigger.parentElement}
                  placement="bottomRight"
                  content={filterContent()}
                  title={
                    <div className="flex items-center justify-between">
                      <div className="text-blue-900 font-semibold py-2">Filter products where</div>
                      <div>
                        <Button type="default" onClick={() => setShowFilterPopup(false)}>
                          <CloseOutlined /> Close
                        </Button>
                      </div>
                    </div>
                  }
                  trigger="click"
                  onVisibleChange={(visible) => setShowFilterPopup(visible)}
                >
                  <div
                    className="px-3 font-semibold cursor-pointer"
                    onClick={() => setShowFilterPopup(false)}
                  >
                    Filter <CaretDownOutlined />
                  </div>
                </Popover>
              }
              size="large"
              enterButton
              onChange={(e) => debounceSearch(e?.target?.value)}
              placeholder="Enter serial number to search the product"
              allowClear
            />
          </div>
          <Table
            columns={inactive ? awaitingColumns : activeColumns}
            dataSource={productList?.records || []}
            rowKey={(record) => record.serial_number}
            pagination={false}
            loading={loading}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  event.stopPropagation();
                  history.push(`/products/${record.serial_number}`);
                }, // mouse leave row
              };
            }}
            rowClassName="cursor-pointer"
            footer={() => (
              <Row className="mt-2" type="flex" justify="end">
                <Pagination
                  key={`page-${currentPage}`}
                  showSizeChanger
                  pageSizeOptions={['10', '25', '50', '100']}
                  onShowSizeChange={(e, p) => {
                    setViewSize(p);
                    setCurrentPage(1);
                    setStartIndex(0);
                  }}
                  defaultCurrent={1}
                  current={currentPage}
                  pageSize={viewSize}
                  total={totalRecords}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  onChange={handleChangePagination}
                />
              </Row>
            )}
            locale={{
              emptyText: (
                <div className="text-center">
                  <img
                    src={SearchNotFound}
                    alt="No product found!"
                    className="p-4"
                    style={{ height: '100px' }}
                  />
                  <p className="text-base font-semibold text-blue-800">No product added yet!</p>
                </div>
              ),
            }}
          />
        </div>
      </div>
      {addAccessoryModal.visible && (
        <AddProductAccessory
          visible={addAccessoryModal.visible}
          product={addAccessoryModal.product}
          setVisible={(isVisible) =>
            setAddAccessoryModal({
              visible: isVisible || false,
              product: null,
            })
          }
        />
      )}
    </>
  );
};

export default connect(({ loading, product, user }) => ({
  loading: loading.effects['product/allproducts'],
  productList: product.productList,
  brandList: product.brandsList,
  typeList: product.ProductTypesList,
  familyList: product.productFamilyList,
  currentUser: user.currentUser,
}))(ProductListTable);
