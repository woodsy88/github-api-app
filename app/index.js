var React = require('react');
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
require('./css/index.css');
var App = require('./components/App');



ReactDOM.render(
  <App name="andrew" />,
  document.getElementById('app')
);



