import {
  createProduct,
  allproducts,
  getProductBrands,
  getContractTypeList,
  getProductfamilyList,
  getDepartmentList,
  getProductTypesList,
  getProductDetails,
} from '@/services/product';

const Model = {
  namespace: 'product',
  state: {
    productList: null,
    brandsList: null,
    ProductTypesList: null,
    ProductSubTypesList: null,
    departmentList: null,
    productFamilyList: null,
    contractTypeList: null,
    productDetails: null,
  },
  effects: {
    *createProduct({ payload }, { call }) {
      let res;
      let err;
      try {
        res = yield call(createProduct, payload);
      } catch (error) {
        err = error;
      }
      return { res, err };
    },
    *allproducts({ payload }, { call, put }) {
      let res;
      let err;
      try {
        res = yield call(allproducts, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'productList',
        });
      } catch (error) {
        err = error;
      }
      return { err, res };
    },
    *getProductTypesList({ payload }, { call, put }) {
      const res = yield call(getProductTypesList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'ProductTypesList',
      });
      return res;
    },
    *getProductSubTypesList({ payload }, { call, put }) {
      const res = yield call(getProductTypesList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'ProductSubTypesList',
      });
    },
    *getContractTypeList({ payload }, { call, put }) {
      const res = yield call(getContractTypeList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'contractTypeList',
      });
    },
    *getProductBrands({ payload }, { call, put }) {
      const res = yield call(getProductBrands, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'brandsList',
      });
      return res.searchResults;
    },
    *getDepartmentList({ payload }, { call, put }) {
      const res = yield call(getDepartmentList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'departmentList',
      });
    },
    *getProductfamilyList({ payload }, { call, put }) {
      const res = yield call(getProductfamilyList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'productFamilyList',
      });
    },
    *getProductDetails({ payload }, { call, put }) {
      let res;
      let err;
      try {
        res = yield call(getProductDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'productDetails',
        });
      } catch (error) {
        err = error;
      }
      return { err, res };
    },
  },
  reducers: {
    setStates(state, { payload, key }) {
      return {
        ...state,
        [key]: payload,
      };
    },
  },
};
export default Model;
