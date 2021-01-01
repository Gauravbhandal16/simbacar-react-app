import React from 'react';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';

const Requests = () => {
  return (
    <div className="container mx-auto">
      <Page
        title="Requests"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Requests',
                path: '/requests',
              },
            ]}
          />
        }
      >
        Requests
      </Page>
    </div>
  );
};

export default Requests;
