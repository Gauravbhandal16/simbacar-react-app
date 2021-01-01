import TextInput from '@/components/FormComponents/TextInput';
import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Switch } from 'antd';
import SelectInput from '@/components/FormComponents/SelectInput';

import { connect } from 'umi';
import UploadAttachment from '@/components/FormComponents/UploadAttachment';
import SelectDate from '@/components/FormComponents/SelectDate';
import { checkExistingProduct } from '@/services/product';
import { debounce } from 'lodash';
import ProductExpiryDetails from '../ProductExpiryDetails';
import ProductContractDetails from '../ProductContractDetails';
import ProductOtherUploads from '../ProductOtherUploads';

const ProductDetailsForm = ({
  dispatch,
  productTypesList,
  productSubTypesList,
  departmentList,
  productFamilyList,
  form,
  hasWarranty,
  setHasWarranty,
  hasContract,
  setHasContract,
  otherOptions,
  setOtherOptions,
  productBrandList,
  otherValue,
  setOtherValue,
  otherUploads,
  setOtherUploads,
  currentUser,
}) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [showOtherOptionError, setShowOtherOptionError] = useState(false);

  const getTypeList = (value) => {
    dispatch({
      type: 'product/getProductTypesList',
      payload: { keyword: value, type_id: '' },
    });
  };
  const onSubtypeChange = (type, value) => {
    dispatch({
      type: 'product/getProductSubTypesList',
      payload: {
        type_id: type,
        keyword: value,
      },
    });
  };
  const getProductfamilyList = (value) => {
    dispatch({
      type: 'product/getProductfamilyList',
      payload: {
        keyword: value,
      },
    });
  };

  const getDepartmentList = () => {
    dispatch({
      type: 'department/getAllDepartment',
      payload: {
        query: { view_size: '10', start_index: '0', keyword: '' },
        pathParams: {
          customerId: currentUser?.personal_details?.organization_details?.org_party_id,
        },
      },
    });
  };

  const brandList = (value) => {
    dispatch({
      type: 'product/getProductBrands',
      payload: {
        keyword: value,
      },
    });
  };

  useEffect(() => {
    getTypeList();
    brandList();
    getProductfamilyList();
    getDepartmentList();
  }, []);

  const brandSearch = debounce(brandList, 400);
  const departmentSearch = debounce(getDepartmentList, 400);

  const typeSearch = debounce(getTypeList, 400);
  const familySearch = debounce(getProductfamilyList, 400);

  return (
    <div>
      <div className=" bg-white shadow rounded mb-4 border-b">
        <div className="text-blue-900 font-semibold text-xl border-b px-4 py-2">
          Product details
        </div>
        <Row gutter={[24, 0]} className="px-6 pt-6">
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <SelectInput
              showSearch="true"
              rules={[{ required: true, message: 'Please select the brand' }]}
              label="Product brand"
              name={['brand_info', 'id']}
              type="brand"
              showOtherOptionError={showOtherOptionError}
              setShowOtherOptionError={setShowOtherOptionError}
              otherValue={otherValue}
              setOtherValue={setOtherValue}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onSelect={(value) => {
                if (value === 'OTHER-SUPPLIER') {
                  setSelectedOption((prev) => ({
                    ...prev,
                    brand: true,
                  }));
                } else {
                  setSelectedOption((prev) => ({
                    ...prev,
                    brand: false,
                  }));
                  setShowOtherOptionError({ brand: false });
                  setOtherValue((prev) => ({
                    ...prev,
                    brand: '',
                  }));
                }
              }}
              placeholder="Select product brand"
              onSearch={(value) => brandSearch(value)}
              setFields={(data) => {
                setOtherOptions([
                  ...otherOptions,
                  {
                    id: 'brand_info',
                    brand_info: { label: data, id: 'OTHER-SUPPLIER' },
                  },
                ]);
              }}
            >
              {productBrandList?.searchResults?.map((brand) => (
                <Select.Option key={brand?.id} value={brand?.id}>
                  {brand?.name}
                </Select.Option>
              ))}
            </SelectInput>
          </Col>

          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <SelectInput
              showSearch="true"
              rules={[{ required: true, message: 'Please enter product family' }]}
              label="Product family"
              name={['family_info', 'id']}
              placeholder="Select product family"
              onSearch={(value) => familySearch(value)}
              setFields={(data) =>
                setOtherOptions([
                  ...otherOptions,
                  {
                    id: 'family_info',
                    brand_info: { label: data, id: 'CT_OTHER' },
                  },
                ])
              }
              type="family"
              showOtherOptionError={showOtherOptionError}
              setShowOtherOptionError={setShowOtherOptionError}
              otherValue={otherValue}
              setOtherValue={setOtherValue}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onSelect={(value) => {
                onSubtypeChange(value);
                if (value === 'CT_OTHER') {
                  setSelectedOption((prev) => ({
                    ...prev,
                    family: true,
                  }));
                  form?.setFieldsValue({
                    family_info: { id: value, label: otherValue.family },
                  });
                } else {
                  setSelectedOption((prev) => ({
                    ...prev,
                    family: false,
                  }));
                  setShowOtherOptionError({ family: false });
                  setOtherValue((prev) => ({
                    ...prev,
                    family: '',
                  }));
                  form?.setFieldsValue({
                    family_info: { id: value },
                  });
                }
              }}
            >
              {Array.isArray(productFamilyList?.searchResults) &&
                productFamilyList?.searchResults?.map((family) => (
                  <Select.Option key={family?.id} value={family?.id}>
                    {family?.name}
                  </Select.Option>
                ))}
            </SelectInput>
          </Col>

          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <SelectInput
              rules={[{ required: true, message: 'Please enter department name' }]}
              label="Department name"
              name={['department_info', 'id']}
              placeholder="Select department name"
              showSearch="true"
              onSearch={(value) => departmentSearch(value)}
              setFields={(data) =>
                setOtherOptions([
                  ...otherOptions,
                  {
                    id: 'department_info',
                    brand_info: { label: data, id: 'DEPT_OTHER' },
                  },
                ])
              }
              type="department"
              showOtherOptionError={showOtherOptionError}
              setShowOtherOptionError={setShowOtherOptionError}
              otherValue={otherValue}
              setOtherValue={setOtherValue}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onSelect={(value) => {
                onSubtypeChange(value);
                if (value === 'DEPT_OTHER') {
                  setSelectedOption((prev) => ({
                    ...prev,
                    department: true,
                  }));
                  form?.setFieldsValue({
                    department_info: { id: value, label: otherValue.department },
                  });
                } else {
                  setSelectedOption((prev) => ({
                    ...prev,
                    department: false,
                  }));
                  setShowOtherOptionError({ department: false });
                  setOtherValue((prev) => ({
                    ...prev,
                    department: '',
                  }));
                  form?.setFieldsValue({
                    department_info: { id: value },
                  });
                }
              }}
            >
              {Array.isArray(departmentList?.departments) &&
                departmentList?.departments?.map((department) => (
                  <Select.Option key={department?.id} value={department?.id}>
                    {department?.name}
                  </Select.Option>
                ))}
            </SelectInput>
          </Col>

          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <SelectInput
              rules={[{ required: true, message: 'Please select the type' }]}
              label="Product type"
              name={['type_info', 'id']}
              placeholder="Select product type "
              showSearch="true"
              onSearch={(value) => typeSearch(value)}
              setFields={(data) =>
                setOtherOptions([
                  ...otherOptions,
                  {
                    id: 'type_info',
                    brand_info: { label: data, id: 'PT_OTHER' },
                  },
                ])
              }
              type="productType"
              showOtherOptionError={showOtherOptionError}
              setShowOtherOptionError={setShowOtherOptionError}
              otherValue={otherValue}
              setOtherValue={setOtherValue}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onSelect={(value) => {
                onSubtypeChange(value);
                if (value === 'PT_OTHER') {
                  setSelectedOption((prev) => ({
                    ...prev,
                    productType: true,
                  }));
                  form?.setFieldsValue({
                    type_info: { id: value, label: otherValue.productType },
                  });
                } else {
                  setSelectedOption((prev) => ({
                    ...prev,
                    productType: false,
                  }));
                  setShowOtherOptionError({ productType: false });
                  setOtherValue((prev) => ({
                    ...prev,
                    productType: '',
                  }));
                  form?.setFieldsValue({
                    type_info: { id: value },
                  });
                }
              }}
            >
              {Array.isArray(productTypesList?.ProductTypes) &&
                productTypesList?.ProductTypes?.map((product) => (
                  <Select.Option key={product?.productTypeId} value={product?.productTypeId}>
                    {product?.description}
                  </Select.Option>
                ))}
            </SelectInput>
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <SelectInput
              rules={[{ required: true, message: 'Please select the sub-type' }]}
              label="Product sub-type"
              placeholder="Select product sub-type "
              name={['sub_type_details', 'sub_type_id']}
              setFields={(data) =>
                setOtherOptions([
                  ...otherOptions,
                  {
                    id: 'Product',
                    brand_info: { label: data, id: 'PSBT_OTHER' },
                  },
                ])
              }
              type="productSubType"
              showOtherOptionError={showOtherOptionError}
              setShowOtherOptionError={setShowOtherOptionError}
              otherValue={otherValue}
              setOtherValue={setOtherValue}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onSelect={(value) => {
                if (value === 'PSBT_OTHER') {
                  setSelectedOption((prev) => ({
                    ...prev,
                    productSubType: true,
                  }));
                  form?.setFieldsValue({
                    sub_type_details: { sub_type_id: value, label: otherValue.productSubType },
                  });
                } else {
                  setSelectedOption((prev) => ({
                    ...prev,
                    productSubType: false,
                  }));
                  setShowOtherOptionError({ productSubType: false });
                  setOtherValue((prev) => ({
                    ...prev,
                    productSubType: '',
                  }));
                  form?.setFieldsValue({
                    sub_type_details: { sub_type_id: value },
                  });
                }
              }}
            >
              {Array.isArray(productSubTypesList?.ProductTypes) &&
                productSubTypesList?.ProductTypes?.map((product) => (
                  <Select.Option key={product?.productTypeId} value={product?.productTypeId}>
                    {product?.description}
                  </Select.Option>
                ))}
            </SelectInput>
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} xs={24} />
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <TextInput
              rules={[{ required: true, message: 'Please enter model number' }]}
              label="Model number"
              name={['model_details', 'model_number']}
              placeholder="Enter model number"
            />
          </Col>

          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <UploadAttachment
              setFields={(id) => {
                const ids = form?.getFieldValue(['model_details', 'content']);
                form?.setFieldsValue({
                  model_details: { content: ids ? ids.concat(id) : [id] },
                });
              }}
              name={['model_details', 'content']}
              multiple
            />
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <SelectDate
              rules={[{ required: true, message: 'Please select installation date' }]}
              label="Installation date"
              name={['"installation_details', 'installation_date']}
              placeholder="Installation date"
            />
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <UploadAttachment
              setFields={(id) => {
                const ids = form?.getFieldValue(['installation_details', 'content']);
                form?.setFieldsValue({
                  installation_details: { content: ids ? ids.concat(id) : [id] },
                });
              }}
              name={['installation_details', 'content']}
              multiple
            />
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <TextInput
              rules={[
                { required: true, message: 'Please enter model number' },
                () => ({
                  async validator(rule, value) {
                    if (value) {
                      const resp = await checkExistingProduct({
                        product_id: value,
                      });
                      if (resp.exists) {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        return Promise.reject('Product with serial number already exists');
                      }
                      return Promise.resolve();
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              label="Serial number"
              name={['serial_number_details', 'serial_number']}
              placeholder="Enter serial number"
            />
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <UploadAttachment
              setFields={(id) => {
                const ids = form?.getFieldValue(['serial_number_details', 'content']);
                form?.setFieldsValue({
                  serial_number_details: { content: ids ? ids.concat(id) : [id] },
                });
              }}
              name={['serial_number_details', 'content']}
              multiple
            />
          </Col>
        </Row>
      </div>
      <div className="font-medium mb-4 px-2">
        <Switch
          size="small"
          onChange={(checked) => {
            setHasWarranty(checked);
          }}
        />
        {'  '}
        Has warranty?
      </div>
      <div>{hasWarranty && <ProductExpiryDetails form={form} />}</div>
      <div className="font-medium mb-4 px-2">
        <Switch
          size="small"
          onChange={(checked) => {
            setHasContract(checked);
          }}
        />{' '}
        Has contract?
      </div>
      <div>{hasContract && <ProductContractDetails form={form} />}</div>
      {/* Other documents upload */}
      <div className="font-medium mb-4 px-2">
        <Switch
          size="small"
          onChange={(checked) => {
            setOtherUploads(checked);
          }}
        />{' '}
        Has other document uploads?
      </div>
      <div>{otherUploads && <ProductOtherUploads form={form} />}</div>
    </div>
  );
};

export default connect(({ product, department, user }) => ({
  productTypesList: product.ProductTypesList,
  productFamilyList: product.productFamilyList,
  departmentList: department.departmentList,
  productSubTypesList: product.ProductSubTypesList,
  productBrandList: product.brandsList,
  currentUser: user.currentUser,
}))(ProductDetailsForm);
