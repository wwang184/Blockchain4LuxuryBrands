// https://www.jianshu.com/p/5da35f504aef
// https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html

import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import luxury from './luxury';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            manager: "NOT SET",
            myitems:[],
            to: ""
        };
        this.getMyAddress = this.getMyAddress.bind(this);
        this.getMyItems = this.getMyItems.bind(this);
    }


    // will be executed after page gets loaded
    async componentDidMount(){
      // solidity calls are async call, add await in front of call to make sync
      const manager = await luxury.methods.manager().call();
      const accounts = await web3.eth.getAccounts();

      //update this.state.manager so render will be executed
      this.setState({manager: manager,accounts: accounts});
    }

    async getMyAddress(){
      var ads = await luxury.methods.getMyAddress().call({from: this.state.accounts[0]});
      // set message for the return values to be show in the page..
      // this is the best way i can do it now, but i think there will be other solutions
      this.setState({ message1: "Your address is " + ads});
    }

    async getMyItems(){
      var myitems = await luxury.methods.getMyItems().call({from: this.state.accounts[0]});
      this.setState({myitems:myitems});
    }

    setStoreInfo = async event => {
      //console.log("the new post is -> " + this.state.value);
      const accounts = await web3.eth.getAccounts();
      //this.setState({status: "Updating..."});
      await luxury.methods.setStoreInfo(this.state.to).send({from: accounts[0]});
      this.setState({message2:"success!" });
      console.log("completed ");
  
      // update the posts
      //let posts = this.state.posts;
      //posts.push(this.state.value);
      //this.setState({posts: posts}); 
      
    };
    // This function will be called when any variable in this state...??
    // And the return of this function will be rendered in to HTML and ??

    render(){
        // you can see this line in the browser console
        console.log("manager is " + this.state.manager);

        return (
            <div className="App">
                <h1>Luxury Contract</h1>
                <p>This contract is managed by {this.state.manager}</p>
                
                <button onClick={this.getMyAddress}>Get my address</button>
                <p>{this.state.message1}</p>
                
                <button onClick={this.getMyItems}>Get my items</button>
                <ul>
                  {this.state.myitems.map((value, index) => {
                    return <li key={index}> {value}</li>
                  })}
                </ul>
                <h2>Set Store Info:</h2>
                <form onSubmit={this.setStoreInfo}>
                  <div>
                    <input
                      value = {this.state.to}
                      onChange={event => this.setState({to:event.target.value})}
                    />
                  </div>
                  <input type="submit" value="Submit"/>
                </form>
                <h2>Transfer Ownership</h2>

            </div>
        );
    }
}

export default App;

//React textbox: https://material-ui.com/zh/components/text-fields/
