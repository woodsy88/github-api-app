
// review https://learn.tylermcginnis.com/courses/50507/lectures/2466819 from 20:40 onward to get overview of full flow of this file
const React = require('react');
const PropTypes = require('prop-types');
const Link = require("react-router-dom").Link;
const PlayerPreview = require("./PlayerPreview");

class PlayerInput extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      username: ''
    }

    // this in handleChange is binded to PlayerInput component instance
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this. handleSubmit.bind(this);
  }

  handleChange(event){
    // grab text typed into input field
    const value = event.target.value;

    this.setState(() => ({
      username: value
    }))
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )

  }
  
  render(){

    const { username } = this.state;
    const { label } = this.props;

    return (
      <form className="column" onSubmit={this.handleSubmit} >
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input type="text"
                id="username"
                placeholder="github username"
                autoComplete="off"
                value={username}
                onChange={this.handleChange}
                />
        <button
            className="button"
            type="submit"
            // if there is nothing typed into input, button is disabled
            disabled={!username}
        >Submit</button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      playerOneName:'',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    // binds this in handleSubmit to Battle instance
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username){
    this.setState(() => ({
       [id +'Name']: username,
       [id + 'Image']: `https://github.com/${username}.png?size=200`
    }))
  }

  handleReset(id) {
    this.setState(() => ({
     [id + 'Name']: '',
     [id + 'Image']: null,
    }))
  }
  
  render(){
    // match is from react router, it gets the current url the page is on
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

    return (
        <div>
          <div className="row">
              {/* && is a shorthand if statetment - if playerOneName is false (empty?) then show component */}
              {!playerOneName && 
                <PlayerInput
                  id='playerOne'
                  label='Player One'
                  onSubmit={this.handleSubmit}
                  />}
  
              {/* && is a shorthand if statetment - if playerOneImage is not null (empty?) then show component */}
              {playerOneImage !== null && 
                <PlayerPreview
                    avatar={playerOneImage}
                    username={playerOneName} >
                      <button className="reset"
                        // passing onReset the id of the player being reset
                        onClick={ () => this.handleReset('playerOne') }>Reset 
                      </button>                     
                </PlayerPreview>}                              
  
              {!playerTwoName && 
                <PlayerInput
                    id='playerTwo'
                    label='Player Two'
                    onSubmit={this.handleSubmit}
                    />}
  
              {playerTwoImage !== null && 
                <PlayerPreview
                    avatar={playerTwoImage}
                    username={playerTwoName} >
                  <button className="reset"
                    // passing onReset the id of the player being reset
                    onClick={() => this.handleReset('playerTwo')}>Reset 
                  </button>                   
                </PlayerPreview>}                                  
          </div>
  
          {/* if playerOneImage has a valie and PlayerTwoImage has a value the render component */ }
          {playerOneImage && playerTwoImage &&
            <Link
              className='button'
              to={{
                pathname: match.url + '/results',
                search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
              }}>
              Battle
            </Link>
          }
        </div>
    )
  }
}

module.exports = Battle;