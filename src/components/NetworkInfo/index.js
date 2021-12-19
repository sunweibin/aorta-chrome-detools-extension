import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Space,
  Input,
  Tooltip,
  List,
  Tag,
  Drawer,
} from 'antd';
import { StopOutlined } from '@ant-design/icons';

import { filterNetworkList, clearNetwork } from '../../reducers/network';

import NetworkInfoDetail  from '../NetworkInfoDetail';

const Search = Input.Search;

function NetworkInfo(props) {
  const [value, setValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [networkInfo, setNetworkInfo] = React.useState(null);

  const dispatch = useDispatch();
  const data = useSelector(filterNetworkList(value));

  const handleSearch = React.useCallback((keyword) => {
    setValue(keyword);
  }, []);

  const handleItemClick = React.useCallback((item) => {
    setVisible(true);
    setNetworkInfo(item);
  });

  const handleDrawerClose = React.useCallback(() => {
    setVisible(false);
  });

  return (
    <div className='netWorkInfo'>
      <Row gutter={16}>
        <Col span={24}>
          <Space align='center' size={20}>
            <Tooltip title="清空列表" color="#108ee9" placement='right'>
              <StopOutlined onClick={() => dispatch(clearNetwork())}/>
            </Tooltip>
            <Search
              placeholder="搜索接口"
              onSearch={handleSearch}
              enterButton
              allowClear
            />
          </Space>
        </Col>
      </Row>
      <div className='networkList'>
        <List
          itemLayout="horizontal"
          dataSource={data}
          size="small"
          split
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                onClick={() => handleItemClick(item)}
                avatar={<Tag color="#108ee9">{item.request.method}</Tag>}
                description={item.request.url}
              />
            </List.Item>
          )}
        />
      </div>
      <Drawer
        key={networkInfo?.id || 'emptyDetail'}
        bodyStyle={{ padding: '0 20px'}}
        visible={visible}
        width="70%"
        mask={false}
        title="接口详情"
        onClose={handleDrawerClose}
      >
        <NetworkInfoDetail data={networkInfo} />
      </Drawer>
    </div>
  )
}

NetworkInfo.propTypes = {

}

export default NetworkInfo

