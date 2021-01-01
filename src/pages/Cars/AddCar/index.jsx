import React, { useState } from 'react';
import Breadcrumbs from '@/components/BreadCrumbs';
import { connect } from 'umi';
import { Button, Form } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';

import Page from '@/components/Page';
import CarDetails from './CarDetails';
// import ProductChoiceForm from './ProductChoiceForm';
// import OtherDetails from './OtherDetails';

const AddCar = ({ dispatch }) => {
  const [finalData, setFinalData] = useState([]);
  const [basicDetails] = Form.useForm();
  const [sellerDetails] = Form.useForm();
  const [choiceDetails] = Form.useForm();
  const [additionalDetails] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState([]);

  return (
    <div className="container mx-auto">
      <Page
        title="Add Car"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Add Car',
                path: '/products/add',
              },
            ]}
          />
        }
      >
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            console.log(name, values, forms);
            // if (name === 'basicDetails') {
            //   setFinalData(...finalData,values);
            // }
            // if (name === 'choiceDetails ') {

            // }
            // if(name==='additionalDetails ') {

            // }
            // if(name ==='sellerDetails ')
            setFinalData([...finalData, { ...values }]);
            console.log(finalData, 'Data');
          }}
        >
          <div className="mb-12">
            <CarDetails
              {...{
                additionalDetails,
                basicDetails,
                choiceDetails,
                sellerDetails,
                fileList,
                setFileList,
                current,
                setCurrent,
              }}
            />
            {current === 4 && (
              <FooterToolbar
                extra={
                  <div className="container mx-auto">
                    <div className="flex justify-end xl:mr-16 py-2 ">
                      <Button type="primary" size="large" htmlType="submit">
                        Submit
                      </Button>
                    </div>
                  </div>
                }
              />
            )}
          </div>
        </Form.Provider>
      </Page>
    </div>
  );
};

export default connect()(AddCar);

/* <Form
          colon={false}
          layout="vertical"
          //   colon={false}
          hideRequiredMark
          form={form}
          onFinish={(values) => {
            const data = values;
            console.log(data, 'value');
            fileList.map((fileData) =>
              dispatch({
                type: 'common/uploadContent',
                payload: fileData,
              }).then((res) => {
                if (res) {
                  data.photos = [...data.photos, res];
                }
              }),
            );
            console.log(data, 'data');
          }}
        > */
