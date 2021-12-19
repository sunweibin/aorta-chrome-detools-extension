import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';

import {
  Tabs,
  Descriptions,
  Collapse,
  Typography,
} from 'antd';

import JsonViewer from '../JsonViewer';
import QueryViewer from '../QueryViewer';
import transformToJson from '../../utils/transformToJson';

const { TabPane } = Tabs;
const { Text } = Typography;

function NetworkInfoDetail(props) {
  const { data } = props;

  if (_.isEmpty(data)) {
    return null;
  }

  console.log(data);

  const statusCode = data.response.status;
  const statusTextType = statusCode >= 200 && statusCode < 400 ? 'success' : 'danger';
  const method = data.request.method;
  const queryString = data.request.queryString;
  const postData = data.request.postData;
  const responseBody = data.response.body;

  const isGetMethod = method === 'GET';
  const isPostMethod = method === 'POST';
  const transformedPostData = isPostMethod && transformToJson(postData, 'text');

  return (
    <Tabs defaultActiveKey="Headers">
     <TabPane tab="Headers" key="Headers">
        <Collapse bordered={false} defaultActiveKey={['headers_general']}>
          <Collapse.Panel header="General" key="headers_general">
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Request URL">{data.request.url}</Descriptions.Item>
              <Descriptions.Item label="Request Method">
                <Text>{method}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status Code">
                <Text type={statusTextType}>{statusCode}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header="Response Headers" key="headers_response">
            <Descriptions size="small" column={1}>
              {
                _.map(data.response.headers, item => (<Descriptions.Item key={item.name} label={item.name}>{item.value}</Descriptions.Item>))
              }
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header="Request Headers" key="headers_request">
            <Descriptions size="small" column={1}>
              {
                _.map(data.request.headers, item => (<Descriptions.Item key={item.name} label={item.name}>{item.value}</Descriptions.Item>))
              }
            </Descriptions>
          </Collapse.Panel>
        </Collapse>
      </TabPane>
      <TabPane tab="Payload" key="Payload">
        {
          isGetMethod
            ? <QueryViewer data={queryString} />
            : <JsonViewer data={transformedPostData} />
        }
      </TabPane>
      <TabPane tab="Response" key="Response">
        <JsonViewer data={responseBody} />
      </TabPane>
    </Tabs>
  )
}

NetworkInfoDetail.propTypes = {
  data: PropTypes.object.isRequired,
}

export default NetworkInfoDetail

