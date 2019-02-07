var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (<div>
    <div className="column">
      <img src={props.avatar} className="avatar" alt={'Avatar for ' + props.username} />
      <a href={'https://github.com/' + props.username}><h2 className="username">@{props.username}</h2></a>
    </div>
    {props.children}
  </div>);
}


PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;