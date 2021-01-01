const defaults = {
  methods: {
    GET: {
      method: 'GET',
    },
    POST: {
      method: 'POST',
    },
    PUT: {
      method: 'PUT',
    },
    DELETE: {
      method: 'DELETE',
    },
  },
  versions: {
    v1: {
      version: '/xapi/v1',
    },
  },
};

const apiEndPoints = {
  user: {
    fetchCurrent: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/me',
      },
    },
    updateCurrent: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/me',
      },
    },
    uploadAvatar: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/party/:partyId/profileImage',
        headerProps: {
          'Content-Type': 'multipart/form-data',
        },
      },
    },
    updateProfile: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId',
      },
    },
    forgotPassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/reset/password',
      },
    },
    updatePassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/update/password',
      },
    },
    checkExistingUser: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/user/isExistingLoginId',
      },
    },
    resetPassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/reset/password',
      },
    },
  },
  common: {
    getStateCodes: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/common/country/:countryId/provinces',
      },
    },
  },

  staff: {
    createStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/admin/clients/invite',
      },
    },
    inviteUser: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/clients/invite/accept',
      },
    },
    addClassToStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId/class/association',
      },
    },
    deleteClassOfStaff: {
      v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId/class/association',
      },
    },
    getStaffList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/clients/invite/:type',
      },
    },
    getStaffDetails: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId',
      },
    },
    updateStaffDetails: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId',
      },
    },
    disableStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId/:type',
      },
    },
  },
  students: {
    getStudents: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/:type',
      },
    },
    setApproval: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId/request/approve',
      },
    },
    getStudent: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId',
      },
    },
    updateStudentDetails: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId',
      },
    },
    getStudentTaskNotes: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks/:taskId/notes',
      },
    },
    getStudentTaskAssignment: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks/:taskId/contents',
      },
    },
    getStudentTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks',
      },
    },
    getStudentStats: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/stats',
      },
    },
  },
  teachers: {
    getTeachers: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers',
      },
    },
    searchTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/tasks/search',
      },
    },
    getTeacherTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks',
      },
    },
    getTaskNote: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks/:taskId/notes',
      },
    },
    getTaskAttachment: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks/:taskId/contents',
      },
    },
  },
};

export default apiEndPoints;
