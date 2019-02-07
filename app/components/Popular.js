
const React = require('react');
const PropTypes = require("prop-types");
const api = require('../utils/api');
const Loading = require('./Loading');

function RepoGrid({ repos }) {
  return (
      <ul className="popular-list">
         {repos.map(( { name, stargazers_count, owner, html_url }, index ) => (
           <li key={name} className="popular-item">
              <div className="popular-rank">#{index + 1}</div>
              <ul className="space-list-items">
                <li>
                  <img className="avatar" 
                       src={owner.avatar_url} 
                       alt={'Avatar for ' + owner.login} />
                </li>
                <li><a href={html_url}>{name}</a></li>
                <li>@{owner.login}</li>
                <li> {stargazers_count} stars</li>
              </ul>
           </li>
           )
         )}
      </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}


function SelectLanguage ({ selectedLanguage, onSelect }) {

  var languages = ["All", "Javascript", "Ruby", "CSS", "Python"];

  return (
    <ul className="languages">
      {languages.map(lang => <li
        style={lang === selectedLanguage ? { color: '#d0021b' } : null}
        key={lang}
        onClick={ () => onSelect(lang) }> 
        {lang}
      </li>)}
    </ul>)  
}

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
    // bind the updateLanguage method to the Popular component
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(language) {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));

    api.fetchPopularRepos(language).then(
     (repos) =>  this.setState(() => ({ repos }) ));
  }

  render() {

    const { selectedLanguage, repos } = this.state;

    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />

        { !repos
              ? <Loading text="Fetching Data from Github" speed={150} />
              : <RepoGrid repos={repos} />}
     
      </div>
    );
  }
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

module.exports = Popular;