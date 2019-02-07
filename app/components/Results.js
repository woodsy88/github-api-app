const React = require("react");
const PropTypes = require('prop-types');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PlayerPreview = require("./PlayerPreview");
const Loading = require("./Loading");

function Profile ( {info} ) {

  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player ({ label, score, profile }) {
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
    )
  }
  
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Results extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  
  componentDidMount(){
    console.log('props:', this.props);

    const { search } = this.props.location;
    
    const { playerOneName, playerTwoName } = queryString.parse(search);
    
    console.log('players: ', players);

    api.battle([
      playerOneName,
      playerTwoName
    ]).then((results) => {
      console.log('results: ', results);
      
      // if ERROR
      if (results === null) {
        return this.setState(() => ({
            error: 'Looks like there was an error.',
            loading: false,
        }));
      }

      // IF NO ERROR
      this.setState(function(){
        return {
          error: null,
          // set winner to the first item in the results array
          winner: results[0],
          // set loser to the 2nd item in the results array
          loser: results[1],

          loading: false
        }
      });

    });
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;
    
    if ( loading === true ) {
      return <Loading text="comparing repos..." />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    
    return (
      <div>
        <div className="row">
          <Player winner="Winner" score={winner.score} profile={winner.profile} />

          <Player winner="Loser" score={loser.score} profile={loser.profile} />
        </div>
        <div className="row">
          {/* usefull test method when querying api's to see the data in the view */}
          {/* <div>{JSON.stringify(this.state, null, 2)}</div> */}
        </div>
      </div>

      )
  } 
}

module.exports = Results;