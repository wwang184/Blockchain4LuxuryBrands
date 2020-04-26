import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import bolletinboard from './bolletinboard';

class App extends Component {
  state = {
    posts: [],
    value: ""
  };

  constructor(props) {
    super(props);
    window.ethereum.on('accountsChanged', (account) => {
      console.log("MetaMask account just changed to " + account);
      this.setState({defaultAccount: account});
    });

    this.clearAllPosts = this.clearAllPosts.bind(this);
  };

  async componentDidMount() {
    // to get the current account
    const accounts = await window.ethereum.enable();

    // solidity calls are async call, add await in front of call to make sync.
    const allposts = await bolletinboard.methods.retreiveAllPosts().call();
   
    // set all the data into this.state, render() will be executed after the update
    this.setState({
                  posts: allposts
                });
  }

  async clearAllPosts() {
    const accounts = await web3.eth.getAccounts();
    await bolletinboard.methods.clear().send({
      from: accounts[0],
    });

    console.log("completed ");

    // if we display this status value, then the page will be refreshed
    this.setState({posts: []});

  }


  onSubmit = async event => {
    event.preventDefault();
    console.log("the new post is -> " + this.state.value);

    const accounts = await web3.eth.getAccounts();
    this.setState({status: "Updating..."});
    await bolletinboard.methods.post(this.state.value).send({
      from: accounts[0]
    });

    console.log("completed ");

    // update the posts
    let posts = this.state.posts;
    posts.push(this.state.value);
    this.setState({posts: posts}); 
    
  };


  render() {
    return (
      <div>
        {/* just a header */}
        <div className="App">
          <h1>A Simple Bolletin Board</h1>
        </div>

        {/* showing all the existing posts */}
        <div align="left">
          <ul>
            {this.state.posts.map((value, index) => {
              return <li key={index}>post: {value}</li>
            })}
          </ul>
        </div>

        {/* to enter a new post */}
        <form onSubmit={this.onSubmit}>
          <div>
            <label class="lmargin">Enter a new post</label><br></br>
            <input class="myinput" value={this.state.value} onChange={event => this.setState({value: event.target.value})} />
          </div>
          <input class="lmargin" type="submit" value="Post" />
        </form>

        <button class="lmargin" onClick={this.clearAllPosts}>Clear All Posts</button>
      </div>
    );
  }

}

export default App;