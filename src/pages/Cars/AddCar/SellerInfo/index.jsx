import Address from '@/components/Address';
import NumberInput from '@/components/FormComponents/NumberInput';
import { SolutionOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';

const SellerInfo = ({ form, setCurrent }) => {
  const TextInput = ({ name, rules, label, placeholder, autofocus }) => {
    return (
      <Form.Item
        name={name}
        rules={rules}
        label={<span className="formLabel uppercase">{label}</span>}
      >
        <Input autoFocus={autofocus} size="large" placeholder={placeholder} />
      </Form.Item>
    );
  };
  return (
    <div>
      <Form
        colon={false}
        layout="vertical"
        scrollToFirstError
        hideRequiredMark
        form={form}
        name="sellerDetails"
        onFinish={async () => {
          setCurrent(4);
        }}
      >
        <div className="flex items-center">
          <div className="text-2xl pr-2 text-blue-600 font-bold">
            <SolutionOutlined />
          </div>
          <div className="font-semibold text-2xl py-4">Seller&apos;s information</div>
        </div>

        <Row gutter={[12, 0]}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Name can't be blank!",
                },
              ]}
              label="Name"
              placeholder="Enter name"
            />
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
            <NumberInput
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: "Contact number can't be blank!",
                },
              ]}
              size="large"
              style={{ width: '100%' }}
              form={form}
              label="Contact number"
              name="contactNumber"
              placeholder="Contact number"
            />
          </Col>
        </Row>
        <Address form={form} />
        <FooterToolbar
          extra={
            <div className="container mx-auto">
              <div className="flex justify-end xl:mr-16 py-2 ">
                <Button type="primary" size="large" onClick={() => form.submit()}>
                  Next
                </Button>
              </div>
            </div>
          }
        />
      </Form>
    </div>
  );
};

export default SellerInfo;
