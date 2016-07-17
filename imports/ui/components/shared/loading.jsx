import React from 'react';

import 'spinkit/css/spinkit.css';

const loaderStyle = {
  margin: '20% auto',
  width: '50px',
  height: '40px',
  textAlign: 'center',
  fontSize: '10px',
};

const Loading = (props) => (
  <div className="loading-container">
    <div className="sk-wave" style={loaderStyle}>
      <div className="sk-rect sk-rect1"></div>
      <div className="sk-rect sk-rect2"></div>
      <div className="sk-rect sk-rect3"></div>
      <div className="sk-rect sk-rect4"></div>
      <div className="sk-rect sk-rect5"></div>
    </div>
  </div>
);

export default Loading;
