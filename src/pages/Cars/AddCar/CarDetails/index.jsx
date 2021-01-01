import NumberInput from '@/components/FormComponents/NumberInput';
import { FileDoneOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Col, DatePicker, Form, Row, Select, Steps } from 'antd';
import React from 'react';
import AdditionalDetails from '../AdditionalDetails';
import ChoiceDetails from '../ChoiceDetails';
import ReviewDetails from '../ReviewDetails';
import SellerInfo from '../SellerInfo';

const { Step } = Steps;

const CarDetails = ({
  additionalDetails,
  basicDetails,
  choiceDetails,
  sellerDetails,
  fileList,
  setFileList,
  current,
  setCurrent,
}) => {
  const onChange = (data) => {
    setCurrent(data);
  };
  const TextInput = ({ name, rules, label, placeholder }) => {
    return (
      <Form.Item
        name={name}
        rules={rules}
        label={<span className="uppercase font-semibold">{label}</span>}
      >
        <Select filterOption={false} size="large" showSearch placeholder={placeholder}>
          {additionalDetails?.searchResults?.map((brand) => (
            <Select.Option key={brand?.id} value={brand?.id}>
              {brand?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  const DateInput = ({ name, rules, label, placeholder }) => {
    return (
      <Form.Item
        name={name}
        rules={rules}
        label={<span className="uppercase font-semibold">{label}</span>}
      >
        <DatePicker
          format="DD MMMM YYYY"
          style={{ width: '100%' }}
          placeholder={placeholder}
          size="large"
        />
      </Form.Item>
    );
  };
  return (
    <div>
      <div className="bg-white shadow rounded p-4">
        <div className="">
          <div className=" px-2 pt-4 pb-2 shadow rounded border-b">
            <Steps current={current} onChange={onChange}>
              <Step
                title="Step One"
                description={<span className="formLabel">Basic details</span>}
              />
              <Step
                title="Step Two"
                description={<span className="formLabel">Other details</span>}
                disabled={current < 1}
              />
              <Step
                title="Step Three"
                description={<span className="formLabel">Additional details</span>}
                disabled={current < 2}
              />
              <Step
                title="Finish"
                description={<span className="formLabel">Seller&apos;s details</span>}
                disabled={current < 3}
              />
              <Step
                title="Review"
                description={<span className="formLabel">Review details</span>}
                disabled={current < 4}
              />
            </Steps>
          </div>
        </div>
        <div className="p-4 ">
          {current === 0 && (
            <Form
              colon={false}
              layout="vertical"
              scrollToFirstError
              hideRequiredMark
              form={basicDetails}
              name="basicDetails"
              onFinish={async () => {
                setCurrent(1);
              }}
            >
              <div>
                {' '}
                <div className="flex items-center">
                  <div className="text-2xl pr-2 text-blue-600 font-bold">
                    <FileDoneOutlined />
                  </div>
                  <div className="font-semibold text-2xl py-4">Basic details</div>
                </div>
                <Row gutter={[12, 0]}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      autofocus
                      name="brandName"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "Brand can't be blank!",
                        },
                      ]}
                      label="Brand"
                      placeholder="Select car brand"
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      name="model"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "Model can't be blank!",
                        },
                      ]}
                      label="Model"
                      placeholder="Select car model"
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      name="variant"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "Variant can't be blank!",
                        },
                      ]}
                      label="Variant"
                      placeholder="Select variant of car"
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      name="categoryId"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "Type can't be blank!",
                        },
                      ]}
                      label="Type"
                      placeholder="Select type of car"
                    />
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      name="color"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "Color can't be blank!",
                        },
                      ]}
                      label="Color"
                      placeholder="Select color of car"
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      name="owner"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "Owner can't be blank!",
                        },
                      ]}
                      label="Owner"
                      placeholder="Select owner type of car"
                    />
                  </Col>
                  <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                    <DateInput
                      name="insuranceDate"
                      label="Insurance valid till"
                      placeholder="Select Date"
                      // rules={[{ required: true, message: 'Please select date' }]}
                    />
                  </Col>
                  <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                    <DateInput
                      name="registrationYear"
                      label="Registration date"
                      placeholder="Select Date"
                      // rules={[{ required: true, message: 'Please select date' }]}
                    />
                  </Col>
                  <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                    <NumberInput
                      rules={[
                        {
                          whitespace: true,
                          // required: true,
                          message: 'Enter the driven Kms',
                        },
                      ]}
                      size="large"
                      style={{ width: '100%' }}
                      form={basicDetails}
                      label="Driven KMs"
                      name="kmsDriven"
                      placeholder="Driven Kms"
                    />
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      name="rtoCode"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "RTO code can't be blank!",
                        },
                      ]}
                      label="RTO code"
                      placeholder="Select RTO code"
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <TextInput
                      name="fuelType"
                      rules={[
                        {
                          // required: true,
                          whitespace: true,
                          message: "Fuel type can't be blank!",
                        },
                      ]}
                      label="Fuel type"
                      placeholder="Select fuel type"
                    />
                  </Col>
                  <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                    <NumberInput
                      rules={[
                        {
                          whitespace: true,
                          // required: true,
                          message: "Price estimation can't be blank!",
                        },
                      ]}
                      size="large"
                      style={{ width: '100%' }}
                      form={basicDetails}
                      label="Expected price"
                      name="price"
                      placeholder="Enter your expected price"
                    />
                  </Col>
                </Row>
              </div>
              <FooterToolbar
                extra={
                  <div className="container mx-auto">
                    <div className="flex justify-end xl:mr-16 py-2 ">
                      <Button type="primary" size="large" onClick={() => basicDetails.submit()}>
                        Next
                      </Button>
                    </div>
                  </div>
                }
              />
            </Form>
          )}
          {current === 1 && <ChoiceDetails form={choiceDetails} setCurrent={setCurrent} />}
          {current === 2 && (
            <AdditionalDetails
              form={additionalDetails}
              setCurrent={setCurrent}
              {...{ fileList, setFileList }}
            />
          )}
          {current === 3 && <SellerInfo setCurrent={setCurrent} form={sellerDetails} />}
          {current === 4 && <ReviewDetails />}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
