import React from 'react';
import { Table, Input, Row, Pagination, Avatar, Button, Popconfirm, message } from 'antd';
import { getIntials } from '@/utils/utils';
import moment from 'moment';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { debounce } from 'lodash';
import { connect, history } from 'umi';

const { Search } = Input;

/**
 *
 * @updateDisable - The purpose of this function is to update enabled prop to y or n
 */

const StaffListTable = ({
  currentPage,
  setViewSize,
  setCurrentPage,
  setStartIndex,
  viewSize,
  awaiting,
  setKeyword,
  totalRecords,
  staffLoading,
  dispatch,
  staffList,
  currentUser,
}) => {
  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const action = (value) => {
    setKeyword(value);
  };
  /**
   *
   * @param {object} staff
   */
  const updateDisable = (staff) => {
    dispatch({
      type: 'staff/disableStaff',
      payload: {
        pathParams: {
          type: staff?.enabled === 'Y' ? 'deactivate' : 'reactivate',
          staffId: staff.id,
        },
      },
    }).then((res) => {
      if (res) {
        message.success(
          `${staff.to_name}'s account has been ${staff?.enabled === 'Y' ? 'enabled' : 'disabled'}`,
        );
      }
    });
  };

  const debounceSearch = debounce(action, 400);
  const renderActionButton = (record) => {
    if (record && record.enabled && record.enabled === 'Y') {
      return (
        <Popconfirm
          title="Are you sure you want to disable this staff member?"
          onConfirm={(e) => {
            updateDisable(record);
            e.stopPropagation();
          }}
          okText="Disable"
          cancelText="Cancel"
          okType="danger"
          onCancel={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            size="small"
            type="danger"
            disabled={record.id === currentUser.id}
          >
            Disable
          </Button>
        </Popconfirm>
      );
    }
    return (
      <Button
        onClick={(e) => {
          updateDisable(record);
          e.stopPropagation();
        }}
        size="small"
        type="primary"
      >
        Enable
      </Button>
    );
  };

  const activeColumns = [
    {
      title: 'Sr. No.',
      dataIndex: 'srno',
      align: 'center',
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: 'Name',
      dataIndex: 'to_name',
      render: (name, record) => (
        <div className="flex items-center">
          <Avatar className="bg-blue-800 w-8 uppercase" style={{ backgroundColor: '#1c9cff' }}>
            {name && getIntials(name)}
          </Avatar>
          <div className="ml-2 w-48">
            <div
              className="font-medium truncate capitalize"
              title={record.to_name && record.to_name}
            >
              {record.to_name && record.to_name}
            </div>
            <div className="">Requested on {moment(record.created_at).format('LL')}</div>
          </div>
        </div>
      ),
    },
    {
      title: ' Email',
      dataIndex: 'email',
      render: (data) => <p>{data}</p>,
    },
    {
      title: 'Invited',
      dataIndex: 'invited',
      render: (_, record) => (
        <div className="">
          <div>
            Invited by{' '}
            <span className="font-medium text-gray-800">{record?.party_id_from?.name}</span>
          </div>
          <div>on {moment(record.last_invited_on).format('LL')}</div>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'statusId',
      render: (text, record) => <div>{renderActionButton(record)}</div>,
    },
  ];
  const awaitingColumns = [
    {
      title: 'Sr. No.',
      dataIndex: 'srno',
      align: 'center',
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: 'Name',
      dataIndex: 'to_name',
      render: (name, record) => (
        <div className="flex items-center">
          <Avatar className="bg-blue-800 w-8 uppercase" style={{ backgroundColor: '#1c9cff' }}>
            {name && getIntials(name)}
          </Avatar>
          <div className="ml-2 w-48">
            <div className="font-medium truncate capitalize" title={record?.to_name}>
              {record?.to_name}
            </div>
            <div className="">Requested on {moment(record.created_at).calendar()}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Invited on',
      dataIndex: 'last_invited_on',
      render: (data) => <p>{moment(data).format('LL')}</p>,
    },
    {
      title: ' Email',
      dataIndex: 'email',
      render: (data) => <p>{data}</p>,
    },
    {
      title: ' Invited by',
      dataIndex: 'party_id_from',
      render: (data) => (
        <div className="">
          <p>{data?.name}</p>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex mx-4 mb-4">
        <div className="w-full">
          <Search
            size="large"
            placeholder="Enter keyword here to search staff..."
            onInput={(value) => debounceSearch(value.target.value)}
            enterButton
          />
        </div>
      </div>
      <div className="w-full">
        <Table
          className="no-shadow zcp-fixed-w-table"
          rowClassName="cursor-pointer"
          pagination={false}
          columns={awaiting ? awaitingColumns : activeColumns}
          dataSource={staffList?.result}
          rowKey={(record) => record.id}
          loading={staffLoading}
          onRow={(record) => ({
            onClick: () => {
              if (!awaiting) {
                history.push(`/staff/${record.id}/profile`);
              }
            },
          })}
          locale={{
            emptyText: (
              <div className="text-center">
                <p className="text-lg">No staff member invited yet!</p>
                <img
                  src={SearchNotFound}
                  alt="No staff member found!"
                  style={{ height: '100px' }}
                />
              </div>
            ),
          }}
          footer={() => (
            <Row className="mt-2" type="flex" justify="end">
              <Pagination
                key={`page-${currentPage}`}
                showSizeChanger
                pageSizeOptions={['10', '25', '50', '100']}
                onShowSizeChange={(e, p) => {
                  setViewSize(p);
                  setCurrentPage(1);
                  setStartIndex(0);
                }}
                defaultCurrent={1}
                current={currentPage}
                pageSize={viewSize}
                total={totalRecords}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                onChange={handleChangePagination}
              />
            </Row>
          )}
        />
      </div>
    </div>
  );
};
export default connect(({ loading, staff, user }) => ({
  currentUser: user.currentUser,
  staffLoading: loading.effects['staff/getStaffList'],
  staffList: staff.staffList,
}))(StaffListTable);
