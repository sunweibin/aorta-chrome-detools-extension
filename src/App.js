import React from 'react';
import { Layout, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import NetWorkInfo from './components/NetworkInfo';
import { addNetwork, updateNetworkRspData} from './reducers/network';
import uuid from './utils/uuid';
import optimizeRequest from './utils/optimizeRequest';
import getRespContent from './utils/getRespContent';

import './App.css';


function App() {
  const dispatch = useDispatch();
  const requestCallback = React.useCallback(
    (request) => {
      // 只获取 xhr 和 fetch
      const isXhrOrFetch = request._resourceType === 'xhr' || request._resourceType === 'fetch';
      // 路径必须是 http开头
      const isHttp = /^http/.test(request.request.url);
      if (isXhrOrFetch && isHttp) {
        // 优化 request, 保留必要的数据
        const currentId = uuid();
        const optimizedRequest = optimizeRequest(request, currentId);
        dispatch(addNetwork(optimizedRequest));

        // 因为 response 的返回数据不一定会直接给数据所以需要通过getContent获取到数据
        if (!request.response.body) {
          request.getContent((content, encoding) => {
            const respData = getRespContent(currentId, content);
            dispatch(updateNetworkRspData(respData));
          });
        }
      }
    });

  React.useEffect(() => {
    window.chrome.devtools.network.onRequestFinished.addListener(requestCallback);
    return () => {
      window.chrome.devtools.network.onRequestFinished.removeListener(requestCallback);
    }
  });

  return (
    <Layout className="appContainer">
      <Layout.Header>
        <div className="logo-box">
          <div className="logo">Aorta MCRM</div>
        </div>
      </Layout.Header>
      <Layout.Content className='appContent'>
        <NetWorkInfo />
      </Layout.Content>
      <Layout.Footer className='appFooter'>
        <Divider plain>Developed by 高伟达-孙伟斌（K0100008） </Divider>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
