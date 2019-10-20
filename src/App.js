import React from 'react';
import './App.css';
import axios from 'axios';



const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)};
</div>
);

class Card extends React.Component {
  render() {
    const profie = this.props
    return (
      <div className="github-profile">
        <img src={profie.avatar_url} alt='user'/>
        <div className="info">
          <div className="name">{profie.name}</div>
          <div className="company">{profie.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: '' }
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await
      axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.onSubmit(resp.data)
      this.setState({userName: ''})
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder='GtiHub username'
          required />
        <button>Add card</button>
      </form>
    );
  }

}

class App extends React.Component {
  state = {
      profiles: []
    };
    addNewProfile = (profileData) => {
this.setState(prevState => ({
profiles: [...prevState.profiles, profileData]
}))

    };
  


  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
