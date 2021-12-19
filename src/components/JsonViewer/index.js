import React from 'react'
import PropTypes from 'prop-types'

import ReactJsonView from 'react-json-view';

function JsonViewer(props) {
  const { data } = props;

  return (
    <div>
      <ReactJsonView
        name={null}
        collapsed={1}
        src={data}
        displayDataTypes={false}
        displayObjectSize={false}
        quotesOnKeys={false}
      />
    </div>
  )
}

JsonViewer.propTypes = {
  data: PropTypes.object.isRequired,
}

export default JsonViewer

