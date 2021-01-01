import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import NumberInput from '@/components/FormComponents/NumberInput';
import SelectDate from '@/components/FormComponents/SelectDate';
import UploadAttachment from '@/components/FormComponents/UploadAttachment';

const ProductExpiryDetails = ({ form }) => {
  return (
    <div className=" bg-white shadow rounded mb-4 border-b">
      <div className="text-blue-900 font-semibold text-xl border-b px-4 py-2">Warranty details</div>
      <Row gutter={[24, 0]} className="px-6 pt-6">
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <NumberInput
            rules={[{ required: true, message: 'Please enter number of years' }]}
            label="Warranty"
            name={['warranty_details', 'warranty']}
            placeholder="Enter number of years"
            form={form}
          />
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <UploadAttachment
            setFields={(id) => {
              const ids = form?.getFieldValue(['warranty_details', 'content']);
              form?.setFieldsValue({
                warranty_details: { content: ids ? ids.concat(id) : [id] },
              });
            }}
            name={['warranty_details', 'content']}
            multiple
          />
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <Row gutter={24}>
            <Col lg={12} xl={12} md={24} sm={24} xs={24}>
              <SelectDate
                rules={[{ required: true, message: 'Please select start date' }]}
                label="Start date"
                name="warranty_start_date"
                placeholder="Warranty start date"
                onChange={(date) => {
                  const warranty = form.getFieldsValue(['warranty_details', 'warranty']);

                  form?.setFieldsValue({
                    warranty_end_date: moment(date).add(
                      warranty?.warranty_details?.warranty,
                      'years',
                    ),
                  });
                }}
              />
            </Col>
            <Col lg={12} xl={12} md={24} sm={24} xs={24}>
              <SelectDate
                rules={[{ required: true, message: 'Please select end date' }]}
                label="End date"
                name="warranty_end_date"
                placeholder="Warranty end date"
              />
            </Col>
          </Row>
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          {' '}
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <NumberInput
            rules={[{ required: true, message: 'Please enter PMS number' }]}
            label="PMS (per year)"
            name={['pms_details', 'pms']}
            placeholder="Enter PMS number"
            setFields={(id) => {
              form?.setFieldsValue({
                pms_details: { pms: id },
              });
            }}
          />
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <UploadAttachment
            setFields={(id) => {
              const ids = form?.getFieldValue(['pms_details', 'content']);
              form?.setFieldsValue({
                pms_details: { content: ids ? ids.concat(id) : [id] },
              });
            }}
            name={['pms_details', 'content']}
            multiple
          />
        </Col>
      </Row>
    </div>
  );
};

export default connect()(ProductExpiryDetails);
