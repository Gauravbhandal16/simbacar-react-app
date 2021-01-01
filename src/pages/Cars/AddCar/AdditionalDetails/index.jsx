import { FileAddOutlined, UploadOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Col, Form, Row, Select, Upload } from 'antd';
import React from 'react';
import UploadDocument from './UploadDocument';

const AdditionalDetails = ({ form, setCurrent, fileList, setFileList }) => {
  const TextInput = ({ name, rules, label, placeholder }) => {
    return (
      <Form.Item
        name={name}
        rules={rules}
        label={<span className="uppercase font-semibold">{label}</span>}
      >
        <Select filterOption={false} size="large" showSearch placeholder={placeholder}>
          {form?.searchResults?.map((brand) => (
            <Select.Option key={brand?.id} value={brand?.id}>
              {brand?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  };
  const beforeUpload = (content) => {
    setFileList([].concat(fileList, content));
  };
  return (
    <div className="">
      <Form
        colon={false}
        layout="vertical"
        scrollToFirstError
        hideRequiredMark
        form={form}
        name="additionalDetails"
        onFinish={async () => {
          setCurrent(3);
        }}
      >
        <div className="flex items-center">
          <div className="text-2xl pr-2 text-blue-600 font-bold">
            <FileAddOutlined />
          </div>
          <div className="font-semibold text-2xl py-4">Additional details</div>
        </div>
        <Row gutter={[12, 0]}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="airConditioner"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Air conditioning type can't be blank!",
                },
              ]}
              label="Air Conditioning"
              placeholder="Select air conditioner "
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="serviceHistory"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Service history can't be blank!",
                },
              ]}
              label="Service History"
              placeholder="Select  service history"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="lockSystem"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Lock system can't be blank!",
                },
              ]}
              label="Lock System"
              placeholder="Enter lock system"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="numberOfAirbags"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Number of Airbags can't be blank!",
                },
              ]}
              label="Number of Airbags"
              placeholder="Enter number of airbags"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="powerWindows"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Registration place can't be blank!",
                },
              ]}
              label="Power Windows"
              placeholder="Select power windows"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="insuranceType"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Insurance type can't be blank!",
                },
              ]}
              label="Insurance Type"
              placeholder="Select insurance type"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="Condition"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Condition can't be blank!",
                },
              ]}
              label="Condition"
              placeholder="Select Condition of car"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="adjustableMirror"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Adjustable External Mirror info can't be blank!",
                },
              ]}
              label="Adjustable External Mirror"
              placeholder="Select adjustable external mirror type"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="registrationPlace"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Registration place can't be blank!",
                },
              ]}
              label="Registration Place"
              placeholder="Select state"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <TextInput
              name="interiorColor"
              rules={[
                {
                  // required: true,
                  whitespace: true,
                  message: "Interior color can't be blank!",
                },
              ]}
              label="Interior color"
              placeholder="Select color"
            />
          </Col>
        </Row>

        <Upload
          beforeUpload={(contentId) => beforeUpload(contentId)}
          fileList={[]}
          className="w-full"
        >
          <Button size="large" block icon={<UploadOutlined />}>
            Upload photos
          </Button>
        </Upload>

        <UploadDocument fileList={fileList} setFilelist={setFileList} />
        {/* <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit">
            Next
          </Button>
        </div> */}
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

export default AdditionalDetails;
