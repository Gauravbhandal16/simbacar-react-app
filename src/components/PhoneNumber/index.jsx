import React from 'react';
import { Input, Select, Form } from 'antd';

const { Option } = Select;
const PhoneNumber = (props) => {
  const { name, rules, countryCode } = props;
  const onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    // eslint-disable-next-line no-restricted-globals
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      props.form.setFieldsValue({
        [name]: value,
      });
    } else {
      props.form.setFieldsValue({
        [name]: '',
      });
    }
  };

  return (
    <Input.Group compact>
      <Form.Item initialValue="IN" name={countryCode} noStyle>
        <Select size="large" style={{ width: '20%' }} defaultValue="IN">
          <Option value="IN">IN (+91)</Option>
        </Select>
      </Form.Item>
      <Form.Item name={name} rules={rules} noStyle>
        <Input
          style={{ width: '80%' }}
          size="large"
          {...props}
          maxLength={10}
          onChange={onChange}
        />
      </Form.Item>
    </Input.Group>
  );
};

export default PhoneNumber;
