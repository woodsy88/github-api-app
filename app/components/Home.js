var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render(){
    return (
        <div className="home-container">
          <h1>Github Battle</h1>
          <h2>Compare 2 Github accounts to see which is more popular</h2>
          <Link className="button" to="/battle">
            Compare Github Accounts
          </Link>
        </div>
    )
  }
}

module.exports = Home;