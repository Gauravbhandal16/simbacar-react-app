import React, { useEffect } from 'react';
import { Row, Col, Select } from 'antd';
import SelectInput from '@/components/FormComponents/SelectInput';

import { connect } from 'umi';
import moment from 'moment';
import { debounce } from 'lodash';
import NumberInput from '@/components/FormComponents/NumberInput';
import SelectDate from '@/components/FormComponents/SelectDate';
import UploadAttachment from '@/components/FormComponents/UploadAttachment';

const ProductContractDetails = ({ form, dispatch, contractTypeList }) => {
  const getContractTypeList = (value) => {
    dispatch({
      type: 'product/getContractTypeList',
      payload: {
        keyword: value,
      },
    });
  };

  useEffect(() => {
    getContractTypeList();
  }, []);

  const contractTypeSearch = debounce(getContractTypeList, 400);

  return (
    <div className="bg-white shadow rounded mb-4 border-b">
      <div className="text-blue-900 font-semibold text-xl border-b px-4 py-2">Contract details</div>
      <Row gutter={[24, 0]} className="px-6 pt-6">
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <SelectInput
            rules={[{ required: true, message: 'Please select the type' }]}
            label="Contract type"
            placeholder="Select contract type "
            name={['contract_details', 'type_id']}
            showSearch="true"
            onSearch={contractTypeSearch}
          >
            {Array.isArray(contractTypeList?.searchResults) &&
              contractTypeList?.searchResults?.map((contract) => (
                <Select.Option key={contract?.id} value={contract?.id}>
                  {contract?.name}
                </Select.Option>
              ))}
          </SelectInput>
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <UploadAttachment
            setFields={(id) => {
              // just uncomment the following code to send array of content_ids to server, server yet to configure this.
              const ids = form?.getFieldValue(['contract_details', 'type_content_ids']);
              form?.setFieldsValue({
                contract_details: { type_content_ids: ids ? ids.concat(id) : [id] },
              });
              // form?.setFieldsValue({
              //   contract_details: { type_content_id: id },
              // });
            }}
            name={['contract_details', 'type_content_ids']}
            multiple
          />
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <NumberInput
            rules={[{ required: true, message: 'Please enter year' }]}
            label="Contract period"
            name={['contract_details', 'period']}
            placeholder="Enter number of years"
            form={form}
          />
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <Row gutter={24}>
            <Col lg={12} xl={12} md={24} sm={24} xs={24}>
              <SelectDate
                rules={[{ required: true, message: 'Please select start date' }]}
                label="Start date"
                name={['contract_details', 'start_date']}
                placeholder="Contract start date"
                onChange={(date) => {
                  const contract = form.getFieldsValue(['contract_details', 'period']);
                  form?.setFieldsValue({
                    contract_details: {
                      end_date: moment(date).add(contract?.contract_details?.period, 'years'),
                    },
                  });
                }}
              />
            </Col>
            <Col lg={12} xl={12} md={24} sm={24} xs={24}>
              <SelectDate
                rules={[{ required: true, message: 'Please select end date' }]}
                label="End date"
                name={['contract_details', 'end_date']}
                placeholder="Contract end date"
              />
            </Col>
          </Row>
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <NumberInput
            rules={[{ required: true, message: 'Please enter PMS number' }]}
            label="PMS (per year)"
            name={['contract_details', 'pms']}
            placeholder="Enter PMS number"
            form={form}
          />
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <UploadAttachment
            setFields={(id) => {
              // just uncomment the following code to send array of content_ids to server, server yet to configure this.
              const ids = form?.getFieldValue(['contract_details', 'pms_content_ids']);
              form?.setFieldsValue({
                contract_details: { pms_content_ids: ids ? ids.concat(id) : [id] },
              });
              // form?.setFieldsValue({
              //   contract_details: { pms_content_id: id },
              // });
            }}
            name={['contract_details', 'pms_content_ids']}
            multiple
          />
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ product }) => ({
  contractTypeList: product.contractTypeList,
}))(ProductContractDetails);
