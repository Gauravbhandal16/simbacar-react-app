// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'signup',
          path: '/user/signup',
          component: './user/signup',
        },
        {
          name: 'inviteUser',
          path: '/user/forgotpassword',
          component: './user/ForgotPassword',
        },
        {
          name: 'resetPassword',
          path: '/user/resetpassword',
          component: './user/ResetPassword',
        },
        {
          name: 'inviteUser',
          path: '/user/invitedUserLogin',
          component: './user/acceptInvitation',
        },
        {
          name: 'accountSetup',
          path: '/user/accountsetup',
          component: './user/AccountSetup',
        },
      ],
    },
    {
      path: '/privacy-policy',
      name: 'privacyPolicy',
      component: './Policy',
    },
    {
      path: '/',
      component: '../layouts/UserLayout',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              component: './Dashboard',
            },
            {
              path: '/requests',
              name: 'requests',
              icon: 'solution',
              routes: [
                {
                  path: '/requests/create',
                  name: 'create-request',
                  component: './Requests/CreateRequest',
                },
              ],
            },
            {
              path: '/products',
              name: 'products',
              icon: 'gold',
              routes: [
                {
                  path: '/products/all',
                  name: 'allproducts',
                  component: './Products/AllProducts',
                },
                {
                  path: '/products/add',
                  name: 'addproducts',
                  component: './Products/AddProduct',
                },
                {
                  path: '/products/:id',
                  name: 'viewproduct',
                  hideInMenu: true,
                  component: './Products/ViewProduct',
                },
              ],
            },
            {
              path: '/cars',
              name: 'cars',
              icon: 'gold',
              routes: [
                {
                  path: '/cars/add',
                  name: 'addcars',
                  component: './Cars/AddCar',
                },
              ],
            },
            {
              path: '/departments',
              name: 'Departments',
              icon: 'profile',
              component: './Departments',
            },
            {
              path: '/staff',
              name: 'staff',
              icon: 'user',
              routes: [
                { name: 'staff-list', path: '/staff/list', component: './Staff/StaffList' },
                {
                  name: 'staff-invite',
                  path: '/staff/invite',
                  component: './Staff/InviteStaff',
                  authority: ['admin', 'manager'],
                },
                {
                  name: 'staffDetails',
                  path: '/staff/:staffId/profile',
                  component: './Staff/StaffDetails',
                  hideInMenu: true,
                },
                {
                  name: 'staffUpdate',
                  path: '/teachers/:staffId',
                  component: './Staff/component/UpdateStaffDetails',
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/user-profile',
              name: 'user-profile',
              component: './UserProfile',
              hideInMenu: true,
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
