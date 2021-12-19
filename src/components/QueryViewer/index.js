import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Descriptions,
} from 'antd';

function QueryViewer(props) {
  const { data  } = props;

  return (
    <Descriptions title="Query String" size="small" column={1}>
      {
        _.map(data, item => {
          const { name, value } = item;

          return (
            <Descriptions.Item
              key={name}
              label={name}
            >
              {value}
            </Descriptions.Item>
          );
        })
      }
    </Descriptions>
  )
}

QueryViewer.propTypes = {
  data: PropTypes.array.isRequired,
};

export default QueryViewer

