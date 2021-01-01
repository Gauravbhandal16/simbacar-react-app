const { defaults } = require('./defaults');

export const common = {
  uploadContent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/content',
      headerProps: {
        'Content-Type': 'multipart/form-data',
      },
    },
  },
};
