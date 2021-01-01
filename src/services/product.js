import { callApi } from '@/utils/apiUtils';
import { product } from '@/utils/endpoints/product';

export const createProduct = (body) =>
  callApi({
    uriEndPoint: product.createProduct.v1,
    body,
  })
    .then((res) => ({ ...res, status: 'ok' }))
    .catch((err) => ({ ...err, status: 'notok' }));

export const allproducts = (query) =>
  callApi({ uriEndPoint: product.allProduct.v1, query })
    .then((res) => res)
    .catch((err) => err);

export const getProductBrands = (query) =>
  callApi({ uriEndPoint: product.getProductBrands.v1, query })
    .then((res) => res)
    .catch(() => {});

export const getContractTypeList = (query) =>
  callApi({ uriEndPoint: product.getContractTypeList.v1, query })
    .then((res) => res)
    .catch(() => {});

export const getProductfamilyList = (query) =>
  callApi({ uriEndPoint: product.getProductfamilyList.v1, query })
    .then((res) => res)
    .catch(() => {});

export const getDepartmentList = ({ query, pathParams }) =>
  callApi({ uriEndPoint: product.getDepartmentList.v1, query, pathParams })
    .then((res) => res)
    .catch(() => {});

export const getProductTypesList = (query) =>
  callApi({ uriEndPoint: product.productTypes.v1, query })
    .then((res) => res)
    .catch((err) => err);

export const getProductDetails = (pathParams) =>
  callApi({ uriEndPoint: product.getProductDetails.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const checkExistingProduct = (query) =>
  callApi({ uriEndPoint: product.checkExistingProduct.v1, query })
    .then((res) => res)
    .catch((err) => err);

export const isProductAttributeExists = (query) =>
  callApi({ uriEndPoint: product.isProductAttributeExists.v1, query })
    .then((res) => res)
    .catch((err) => err);
