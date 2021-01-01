import React, { useState } from 'react';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';
import { connect, history } from 'umi';
import moment from 'moment';
import { Button, Form } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import AddProductForm from './AddProductForm';

/**
 *
 * @AddProduct - The purpose of this component is to show the full page of add product.
 */

const AddProduct = ({ dispatch, loading, currentUser }) => {
  const [hasWarranty, setHasWarranty] = useState(false);
  const [hasContract, setHasContract] = useState(false);
  const [otherUploads, setOtherUploads] = useState(false);
  const [otherOptions, setOtherOptions] = useState([]);
  const [otherValue, setOtherValue] = useState({});

  const [form] = Form.useForm();
  return (
    <div className="container mx-auto">
      <Page
        title="Add Product"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Add Product',
                path: '/products/add',
              },
            ]}
          />
        }
      >
        <Form
          colon={false}
          layout="horizontal"
          // colon={false}
          form={form}
          onFinish={(values) => {
            const data = values;
            data.brand_info = otherValue.brand
              ? { id: 'OTHER-SUPPLIER', label: otherValue.brand }
              : values.brand_info;
            data.department_info = otherValue.department
              ? { id: 'DEPT_OTHER', label: otherValue.department }
              : values.department_info;
            data.type_info = otherValue.productType
              ? { id: 'PT_OTHER', label: otherValue.productType }
              : values.type_info;
            data.family_info = otherValue.productType
              ? { id: 'CT_OTHER', label: otherValue.family }
              : values.family_info;
            data.sub_type_details = otherValue.productSubType
              ? {
                  sub_type_id: 'PSBT_OTHER',
                  label: otherValue.productSubType,
                  content_id: values.sub_type_details?.content_id,
                }
              : values.sub_type_details;
            data.customer_id = currentUser?.personal_details?.organization_details?.org_party_id;
            data.has_warranty = hasWarranty ? 'Y' : 'N';
            data.after_warranty = hasContract ? 'Y' : 'N';
            data.installation_details = {
              ...data.installation_details,
              installation_date: moment(values.installation_details.installation_date).format(),
            };
            data.warranty_end_date = values?.warranty_end_date
              ? moment(values.warranty_end_date).format()
              : null;
            data.warranty_start_date = values?.warranty_start_date
              ? moment(values.warranty_start_date).format()
              : null;
            data.contract_details = {
              ...data.contract_details,
              end_date: values?.contract_details?.end_date
                ? moment(values?.contract_details?.end_date).format()
                : null,
              start_date: values?.contract_details?.start_date
                ? moment(values?.contract_details?.start_date).format()
                : null,
            };
            dispatch({
              type: 'product/createProduct',
              payload: data,
            }).then((res) => {
              if (res) {
                history.push('/products/all');
              }
            });
          }}
        >
          <div className="mb-12">
            <AddProductForm
              form={form}
              {...{
                hasWarranty,
                setHasWarranty,
                hasContract,
                setHasContract,
                setOtherOptions,
                otherOptions,
                otherValue,
                setOtherValue,
                otherUploads,
                setOtherUploads,
              }}
            />
          </div>
          <FooterToolbar
            extra={
              <div className="container mx-auto">
                <div className="flex justify-end xl:mr-16 py-2 ">
                  <Button type="primary" onClick={() => form.submit()} loading={loading}>
                    Add Product
                  </Button>
                </div>
              </div>
            }
          />
        </Form>
      </Page>
    </div>
  );
};

export default connect(({ loading, user }) => ({
  currentUser: user.currentUser,
  loading: loading.effects['product/createProduct'],
}))(AddProduct);
