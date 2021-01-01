import Breadcrumbs from '@/components/BreadCrumbs';
import CardSection from '@/components/CardSection';
import Page from '@/components/Page';
import { SmileOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Form, notification } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import InviteForm from './InviteForm';

const InviteStaff = ({ dispatch, loading }) => {
  const [form] = Form.useForm();
  const button = (
    <Button
      onClick={() => {
        form.submit();
      }}
      type="primary"
      loading={loading}
    >
      Send Invite
    </Button>
  );
  return (
    <>
      <div className="container mx-auto">
        <Page
          title="Add Staff"
          primaryAction={button}
          breadcrumbs={
            <Breadcrumbs
              path={[
                {
                  name: 'Dashboard',
                  path: '/dashboard',
                },
                {
                  name: 'Add Staff',
                  path: '/staff/invite',
                },
              ]}
            />
          }
        >
          <CardSection
            noPadding
            leftContent={
              <div className="pr-8">
                <div className="text-blue-900 font-semibold text-xl">Staff information</div>
                <div className="text-gray-600">
                  <p className="mt-4">
                    Give staff access to your store by sending them an invitation.
                  </p>
                </div>
              </div>
            }
            rightContent={
              <Form
                layout="vertical"
                hideRequiredMark
                colon={false}
                onFinish={(values) => {
                  dispatch({ type: 'staff/createStaff', payload: [values] }).then((res) => {
                    if (res?.responseMessage === 'success') {
                      notification.open({
                        message: 'Great Job!',
                        description: (
                          <div>
                            You have successfully sent the invitation to{' '}
                            <strong>
                              {values.first_name} {values.last_name}
                            </strong>
                            .
                          </div>
                        ),
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                      });
                      form.resetFields();
                      history.push('/staff/list');
                    } else {
                      notification.error({
                        message: 'Oops! Something went wrong.',
                        description: 'Please verify your email and try again!',
                      });
                    }
                  });
                }}
                form={form}
              >
                <InviteForm form={form} />
              </Form>
            }
          />
        </Page>
      </div>
      <FooterToolbar
        extra={
          <div className="container mx-auto">
            <div className="flex justify-end xl:mr-16 py-2 ">{button}</div>
          </div>
        }
      />
    </>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['staff/createStaff'],
}))(InviteStaff);
