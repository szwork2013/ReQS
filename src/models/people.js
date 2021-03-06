import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

import { edit, incPv, getUserInfoById, getLogsByUserId } from '../services/user';
import { getUserInfo } from '../services/app';

export default {
  namespace: 'people',
  state: {
    editModalVisible: false,
    confirmLoading: false,
    profile: {},
    current_type: 'question',
    dataSource: [],
  },
  reducers: {
    showEditModal(state) {
      return {
        ...state,
        editModalVisible: true,
      };
    },
    hideEditModal(state) {
      return {
        ...state,
        editModalVisible: false,
      };
    },
    showEditLoading(state) {
      return {
        ...state,
        confirmLoading: true,
      };
    },
    hideEditLoading(state) {
      return {
        ...state,
        confirmLoading: false,
      };
    },
    fetchUserInfoSuccess(state, { payload }) {
      return {
        ...state,
        profile: payload,
      };
    },
    handleChangeType(state, { payload }) {
      return {
        ...state,
        current_type: payload,
      };
    },
    handleChangeDataSource(state, { payload }) {
      return {
        ...state,
        dataSource: payload,
      };
    },
  },
  effects: {
    *editUser({ payload }, { call, put }) {
      yield put({ type: 'showEditLoading' });
      const data = yield call(edit, payload);
      if (data.success) {
        yield put({ type: 'fetchSelfUserInfo' });
        yield put({ type: 'hideEditLoading' });
        yield put({ type: 'hideEditModal' });
      } else {
        message.error('提交失败~网络出现问题');
        yield put({ type: 'hideEditModal' });
      }
    },
    *incPv({ payload }, { call, put }) {
      const data = yield call(incPv, payload);
      if (data.success) {
        console.log('incPv success');
      } else {
        console.log('error incPv');
      }
    },
    *fetchUserInfo({ payload }, { call, put }) {
      const data = yield call(getUserInfoById, payload);
      if (data.success && data.userinfo) {
        yield put({ type: 'fetchUserInfoSuccess', payload: data.userinfo });
      }
    },
    *fetchSelfUserInfo({ payload }, { call, put }) {
      const data = yield call(getUserInfo, payload);
      if (data.success && data.user) {
        yield put({ type: 'fetchUserInfoSuccess', payload: data.user });
      }
    },
    *fetchUserLogsByType({ payload }, { call, put }) {
      const data = yield call(getLogsByUserId, payload);
      if (data.success) {
        yield put({ type: 'handleChangeType', payload: payload.type });
        yield put({ type: 'handleChangeDataSource', payload: data.result });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('people') > 0) {
          const match = pathToRegexp('/people/:id').exec(location.pathname);
          if (match) {
            const userId = match[1];
            dispatch({
              type: 'fetchUserInfo',
              payload: userId,
            });
            dispatch({
              type: 'fetchUserLogsByType',
              payload: {
                id: userId,
                type: 'question',
              },
            });
          }
        }
      });
    },
  },
};
