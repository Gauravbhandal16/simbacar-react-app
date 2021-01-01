import React from 'react';
import { Input, Row, Col, Form, Radio } from 'antd';
import { callApi } from '@/utils/apiUtils';

const InviteForm = ({ form }) => {
  return (
    <div className="bg-white shadow rounded">
      <div className="p-4 border-b">
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="first_name"
              label={<span className="formLabel">First name</span>}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "First name can't be blank!",
                },
              ]}
            >
              <Input size="large" autoFocus />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="last_name"
              label={<span className="formLabel">Last name</span>}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Last name can't be blank!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={<span className="formLabel">Email</span>}
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Email can't be blank!",
            },
            ({ getFieldError }) => ({
              validator(rule, value) {
                const a = getFieldError('email');
                if (a.includes("'email' is not a valid email") || !value || value.length < 2) {
                  return Promise.resolve();
                }
                return (
                  callApi(
                    {
                      uriEndPoint: {
                        uri: '/user/isExistingLoginId',
                        method: 'GET',
                        version: '/xapi/v1',
                      },
                      query: {
                        user_id: value,
                      },
                    },
                    {
                      disableNotifications: true,
                    },
                  )
                    .then(() => Promise.resolve())
                    // eslint-disable-next-line prefer-promise-reject-errors
                    .catch(() => Promise.reject('Email already exists. Try again!'))
                );
              },
            }),
            {
              message: 'Please enter a valid email address!',
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            },
          ]}
        >
          <Input size="large" type="email" />
        </Form.Item>
      </div>
      <div className="bg-gray-100 p-4 border-b">
        <div className="mb-4">
          <div className="font-semibold">What role would you like to give your staff?</div>
          <div>
            After your staff accepts their invitation they will be able to manage your organization
            in the role selected below.
          </div>
        </div>
        <Form.Item
          name="role_type_id"
          initialValue="EMPLOYEE"
          rules={[
            {
              required: true,
              message: 'Please select staff role',
            },
          ]}
        >
          <Radio.Group className="w-full ">
            <div className="rounded border bg-white rounded">
              <div
                onClick={() => form.setFieldsValue({ role_type_id: 'ADMIN' })}
                className="hover:bg-gray-100 border-b rounded rounded-b-none px-4 "
              >
                <Radio
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                  value="ADMIN"
                >
                  <div className="flex-auto whitespace-normal cursor-pointer leading-normal py-2">
                    <div className="">
                      <div className="font-semibold">Admin</div>
                      <span>
                        Has access to all organization manager functions plus manage organization
                        level settings.
                      </span>
                    </div>
                  </div>
                </Radio>
              </div>
              <div
                onClick={() => form.setFieldsValue({ role_type_id: 'MANAGER' })}
                className="flex items-center hover:bg-gray-100 border-b rounded rounded-b-none px-4 "
              >
                <Radio
                  value="MANAGER"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="whitespace-normal cursor-pointer leading-normal py-2">
                    <div className="font-semibold">Manager</div>
                    <div className="flex-1 w-full">
                      Has access to all employee functions plus can manage organization products,
                      pricing, order discounts.
                    </div>
                  </div>
                </Radio>
              </div>
              <div
                onClick={() => form.setFieldsValue({ role_type_id: 'EMPLOYEE' })}
                className="flex items-center hover:bg-gray-100 rounded rounded-b-none px-4 "
              >
                <Radio
                  value="EMPLOYEE"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <div className="flex-auto whitespace-normal cursor-pointer leading-normal py-2">
                    <div className="font-semibold">Employee</div>
                    <div>Has access to view and fullfill orders.</div>
                  </div>
                </Radio>
              </div>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );
};
export default InviteForm;
