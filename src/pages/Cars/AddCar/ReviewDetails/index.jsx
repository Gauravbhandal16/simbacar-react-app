import {
  BarsOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import Form from 'antd/lib/form/Form';
import React from 'react';

const ReviewDetails = ({ form }) => {
  const details = [
    {
      name: 'Brand',
      detail: 'Brand',
      value: '1',
    },
    {
      name: 'model',
      detail: 'model',
      value: '2',
    },
    {
      name: 'Varient',
      detail: 'Varient',
      value: '3',
    },
    {
      name: 'Type',
      detail: 'Type',
      value: '4',
    },
    {
      name: 'Color',
      detail: 'Color',
      value: '5',
    },
    {
      name: 'Owner',
      detail: 'Owner',
      value: '6',
    },
    {
      name: 'Insurance valid till',
      detail: '16 December 2021',
      value: '7',
    },
    {
      name: 'Registration date',
      detail: '15 May 2019',
      value: '8',
    },
    {
      name: 'Driven KMs',
      detail: '15,000',
      value: '9',
    },
    {
      name: 'RTO code',
      detail: 'PB 08',
      value: '10',
    },
    {
      name: 'Fuel type',
      detail: 'Petrol',
      value: '11',
    },
    {
      name: 'Expected price',
      detail: '2,00,000',
      value: '12',
    },
  ];

  const choiceData = [
    {
      name: 'USB Compatibility',
      detail: 'Y',
      value: '1',
    },
    {
      name: 'AM/FM Radio',
      detail: 'N',
      value: '2',
    },
    {
      name: 'Accidental status',
      detail: 'Y',
      value: '3',
    },
    {
      name: 'Automatic Boot',
      detail: 'N',
      value: '4',
    },
    {
      name: 'Rear Parking Camera',
      detail: 'Y',
      value: '5',
    },
    {
      name: 'Parking Sensors',
      detail: 'Y',
      value: '6',
    },
    {
      name: 'Flood Affected',
      detail: 'N',
      value: '7',
    },
    {
      name: 'Rear Window Wiper',
      detail: 'Y',
      value: '8',
    },
    {
      name: 'Vehicle Certified',
      detail: 'Y',
      value: '9',
    },
    {
      name: 'Fog Lamps',
      detail: 'N',
      value: '10',
    },
    {
      name: 'Finance',
      detail: 'Y',
      value: '11',
    },
    {
      name: 'Exchange',
      detail: 'N',
      value: '12',
    },
    {
      name: 'Power steering',
      detail: 'Y',
      value: '13',
    },
    {
      name: 'Adjustable Steering',
      detail: 'Y',
      value: '14',
    },
    {
      name: 'ABS',
      detail: 'N',
      value: '15',
    },
    {
      name: 'Bluetooth',
      detail: 'Y',
      value: '16',
    },
    {
      name: 'Alloy Wheels',
      detail: 'Y',
      value: '17',
    },
    {
      name: 'Registration transfer',
      detail: 'Y',
      value: '18',
    },
  ];

  const additionalDetails = [
    {
      name: 'Air Conditioning',
      detail: 'Automatic Climate Control',
      value: '1',
    },
    {
      name: 'Service History',
      detail: 'Available',
      value: '2',
    },
    {
      name: 'Lock System',
      detail: 'Remote Controlled Central',
      value: '3',
    },
    {
      name: 'Number of Airbags',
      detail: '4',
      value: '4',
    },
    {
      name: 'Power Windows',
      detail: 'Front & rear',
      value: '5',
    },
    {
      name: 'Insurance Type',
      detail: 'Comprehensive',
      value: '6',
    },
    {
      name: 'Condition',
      detail: 'Used',
      value: '7',
    },
    {
      name: 'Adjustable External Mirror',
      detail: 'Power',
      value: '8',
    },
    {
      name: 'Registration Place',
      detail: 'MH',
      value: '9',
    },
    {
      name: 'Interior color',
      detail: 'Grey',
      value: '10',
    },
  ];
  const sellerInfo = [
    {
      name: 'Name',
      detail: 'Gaurav',
      value: '1',
    },
    {
      name: 'Contact Number',
      detail: '+91 9014523620',
      value: '2',
    },

    {
      name: 'city',
      detail: 'Amritsar',
      value: '4',
    },
    {
      name: 'state',
      detail: 'Punjab',
      value: '5',
    },
    {
      name: 'Country',
      detail: 'India',
      value: '6',
    },
    {
      name: 'ZIPcode',
      detail: '144000',
      value: '7',
    },
    {
      name: 'Address Line 1',
      detail: 'simba quartz',
      value: '3',
    },
  ];
  return (
    <div>
      <Form
        colon={false}
        layout="vertical"
        scrollToFirstError
        hideRequiredMark
        form={form}
        onFinish={() => {}}
      >
        <div className="">
          <Row gutter={[24, 0]}>
            <Col lg={16} xl={16} md={24} sm={24} xs={24}>
              <div className=" px-4">
                <div className="flex items-center">
                  <div className="text-2xl pr-2 text-blue-600 font-bold">
                    <SolutionOutlined />
                  </div>
                  <div className="font-semibold text-2xl py-4">Seller&apos;s information</div>
                </div>
                <Row gutter={[24, 0]}>
                  {sellerInfo.map((list) => (
                    <Col
                      lg={list.value === '3' ? 24 : 12}
                      xl={list.value === '3' ? 24 : 12}
                      md={24}
                      sm={24}
                      xs={24}
                    >
                      <div className="flex justify-between border-b px-2 py-4">
                        <div className="font-semibold text-gray-500 uppercase">{list.name}</div>
                        <div className="font-semibold">{list.detail}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="px-4">
                <div className="flex items-center">
                  <div className="text-2xl pr-2 text-blue-600 font-bold">
                    <FileDoneOutlined />
                  </div>
                  <div className="font-semibold text-2xl py-4">Basic details</div>
                </div>
                <Row gutter={[24, 0]}>
                  {details.map((list) => (
                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <div className="flex justify-between border-b px-2 py-4">
                        <div className="font-semibold text-gray-500 uppercase">{list.name}</div>
                        <div className="font-semibold">{list.detail}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="pt-4 px-4">
                <div className="flex items-center">
                  <div className="text-2xl pr-2 text-blue-600 font-bold">
                    <FileAddOutlined />
                  </div>
                  <div className="font-semibold text-2xl py-4">Additional details</div>
                </div>
                <Row gutter={[24, 0]}>
                  {additionalDetails.map((list) => (
                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <div className="flex justify-between border-b px-2 py-4">
                        <div className="font-semibold text-gray-500 uppercase">{list.name}</div>
                        <div className="font-semibold">{list.detail}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col lg={8} xl={8} md={24} sm={24} xs={24}>
              <div className="px-2">
                <div className="flex items-center">
                  <div className="text-2xl pr-2 text-blue-600 font-bold">
                    <BarsOutlined />
                  </div>
                  <div className="font-semibold text-2xl py-4">Other details</div>
                </div>

                {choiceData.map((list) => (
                  <div className="flex justify-between border-b px-2 py-4">
                    <div className="font-semibold text-gray-500 uppercase">{list.name}</div>
                    {list.detail === 'Y' ? (
                      <div className="font-semibold text-xl text-green-500">
                        <CheckCircleOutlined />
                      </div>
                    ) : (
                      <div className="font-semibold text-xl text-red-500">
                        <CloseCircleOutlined />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default ReviewDetails;
