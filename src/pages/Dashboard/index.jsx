import { Card, Skeleton, Table } from 'antd';
import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { EyeOutlined } from '@ant-design/icons';
import CheckValidation from '@/components/CheckValidation';
import EmptyStateContainer from '@/components/EmptyStateContainer';
import AnalyticsCards from './AnalyticsCards';
import styles from './index.less';

const DashBoard = ({ dispatch, user, taskList, loading }) => {
  const recentTasks = [
    {
      title: 'Sr. No.',
      dataIndex: 'srno',
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Task name',
      dataIndex: 'name',
      // align: 'center',
    },
    {
      title: 'Class',
      dataIndex: 'class_name',
      align: 'center',
    },
    {
      title: 'Section',
      dataIndex: 'section_name',
      align: 'center',
    },
    {
      title: 'Subject',
      dataIndex: 'subject_name',
      align: 'center',
    },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => (
        <Link to={`/tasks/${record.id}/viewTask/submissions/all`}>
          <EyeOutlined /> View Task
        </Link>
      ),
    },
  ];

  useEffect(() => {
    if (user) {
      dispatch({
        type: 'teachers/getTeacherTasks',
        payload: {
          pathParams: {
            teacherId: user.id,
          },
        },
      });
    }
  }, [user]);

  return (
    <div className="container mx-auto">
      <div className={styles.DashBoard}>
        <div className="mb-8">
          <AnalyticsCards />
        </div>
        <Skeleton active loading={loading}>
          <Card
            style={{ marginBottom: 30 }}
            title="Recent Added Tasks"
            className="shadow mb-8"
            bordered={false}
          >
            <CheckValidation
              show={taskList?.records.length > 0}
              fallback={<EmptyStateContainer type="Recent Tasks" />}
            >
              <Table
                rowKey={(record) => record.srno}
                dataSource={taskList?.records}
                columns={recentTasks}
                pagination={false}
              />
            </CheckValidation>
          </Card>
        </Skeleton>
      </div>
    </div>
  );
};

export default connect(({ user, teachers, loading }) => ({
  user: user.currentUser,
  taskList: teachers.teacherTasks,
  loading: loading.effects['teachers/getTeacherTasks'],
}))(DashBoard);
