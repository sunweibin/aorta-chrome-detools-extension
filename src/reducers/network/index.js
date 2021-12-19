import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  // 接口列表
  list: [],
};

export const networkInfoSlice= createSlice({
  name: 'networkInfo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addNetwork: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    clearNetwork: (state) => {
      state.list = [];
    },
    updateNetworkRspData: (state, action) => {
      const { id , data } = action.payload;

      state.list = _.map(state.list, item => {
        if (item.id === id) {
          item = {
            ...item,
            response: {
              ...item.response,
              body: data,
            }
          }
        }

        return item;
      });
    },
  },
});

export const { addNetwork, clearNetwork, updateNetworkRspData } = networkInfoSlice.actions;

export const selectNetworkList = (state) => state.networkInfo.list
export const filterNetworkList = (value) => (state) => {
  if (_.isEmpty(value)) {
    return state.networkInfo.list;
  }
  return _.filter(state.networkInfo.list, item =>  _.includes(item.request.url, value));
}

export default networkInfoSlice.reducer;
