import { BarsOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Col, Form, Radio, Row } from 'antd';
import React from 'react';

const ChoiceDetails = ({ form, setCurrent }) => {
  const SelectInput = ({ name, label, initialValue }) => {
    return (
      <div className=" flex justify-between p-4 border-b">
        <div>
          <span className="uppercase font-semibold">{label}</span>
        </div>
        <Form.Item
          noStyle
          // defaultValue={initialValue}
          name={name}
          // label={<span className="uppercase font-semibold">{label}</span>}
        >
          <Radio.Group defaultValue={initialValue} buttonStyle="solid">
            <Radio.Button value="Yes">Yes</Radio.Button>
            <Radio.Button value="No">No</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </div>
    );
  };

  const choiceData = [
    {
      label: 'Registration transfer',
      name: 'registrationTransfer',
      initial: 'No',
      value: '1',
    },
    {
      label: 'USB Compatibility',
      name: 'USBCompatibility',
      initial: 'No',
      value: '2',
    },
    {
      label: 'AM/FM Radio',
      name: 'AM/FMRadio',
      initial: 'No',
      value: '3',
    },
    {
      label: 'Accidental status',
      name: 'Accidentalstatus',
      initial: 'No',
      value: '4',
    },
    {
      label: 'Automatic Boot',
      name: 'AutomaticBoot',
      initial: 'No',
      value: '5',
    },
    {
      label: 'Rear Parking Camera',
      name: 'RearParkingCamera',
      initial: 'No',
      value: '6',
    },
    {
      label: 'Parking Sensors',
      name: 'ParkingSensors',
      initial: 'No',
      value: '7',
    },
    {
      label: 'Flood Affected',
      name: 'FloodAffected',
      initial: 'No',
      value: '8',
    },
    {
      label: 'Rear Window Wiper',
      name: 'RearWindowWiper',
      initial: 'No',
      value: '9',
    },
    {
      label: 'Vehicle Certified',
      name: 'VehicleCertified',
      initial: 'No',
      value: '10',
    },
    {
      label: 'Fog Lamps',
      name: 'FogLamps',
      initial: 'No',
      value: '11',
    },
    {
      label: 'Finance',
      name: 'Finance',
      initial: 'No',
      value: '12',
    },
    {
      label: 'Exchange',
      name: 'Exchange',
      initial: 'No',
      value: '13',
    },
    {
      label: 'Power steering',
      name: 'Powersteering',
      initial: 'No',
      value: '14',
    },
    {
      label: 'Adjustable Steering',
      name: 'AdjustableSteering',
      initial: 'No',
      value: '15',
    },
    {
      label: 'ABS',
      name: 'ABS',
      initial: 'No',
      value: '16',
    },
    {
      label: 'Bluetooth',
      name: 'Bluetooth',
      initial: 'No',
      value: '17',
    },
    {
      label: 'Alloy Wheels',
      name: 'AlloyWheels',
      initial: 'No',
      value: '18',
    },
  ];

  return (
    <div>
      <Form
        colon={false}
        layout="vertical"
        scrollToFirstError
        hideRequiredMark
        name="choiceDetails"
        form={form}
        onFinish={async () => {
          setCurrent(2);
        }}
      >
        <div className="flex items-center">
          <div className="text-2xl pr-2 text-blue-600 font-bold">
            <BarsOutlined />
          </div>
          <div className="font-semibold text-2xl py-4">Other details</div>
        </div>
        <div className="px-2">
          <Row gutter={[12, 0]}>
            {choiceData.map((data) => (
              <Col lg={8} xl={8} md={24} sm={24} xs={24}>
                <SelectInput name={data.name} label={data.label} initialValue={data.initial} />
              </Col>
            ))}
          </Row>
        </div>
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

export default ChoiceDetails;
