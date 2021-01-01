const { defaults } = require('./defaults');

export const product = {
  createProduct: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/products',
    },
  },
  allProduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products',
    },
  },
  getProductBrands: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/suppliers',
    },
  },
  getContractTypeList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products/contract/types',
    },
  },
  getProductfamilyList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products/families',
    },
  },
  getDepartmentList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/customers/:customerId/departments',
    },
  },
  productTypes: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products/types',
    },
  },
  getProductDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products/:productId',
    },
  },
  checkExistingProduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products/isExistingProductId',
    },
  },
  isProductAttributeExists: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/products/isExistingProductAttribute',
    },
  },
};
