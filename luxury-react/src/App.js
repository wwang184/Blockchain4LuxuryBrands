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
            to: "",
            code: 0,
            storeflag:"",
        };

        window.ethereum.on('accountsChanged', (account) => {
        console.log("MetaMask account just changed to " + account);
        this.setState({defaultAccount: account});    
        });
        this.amIStore = this.amIStore.bind(this);
        this.getMyAddress = this.getMyAddress.bind(this);
        this.getMyItems = this.getMyItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
  }

    // will be executed after page gets loaded
    async componentDidMount(){
      const accounts = await window.ethereum.enable();
      // solidity calls are async call, add await in front of call to make sync
      const manager = await luxury.methods.manager().call();
      //const accounts = await web3.eth.getAccounts().then(console.log);

      //update this.state.manager so render will be executed
      this.setState({manager: manager, accounts: accounts});
    }
    
    handleChange (evt) {
      // check it out: we get the evt.target.name (which will be either "email" or "password")
      // and use it to target the key on our `state` object with the same name, using bracket syntax
      this.setState({ [evt.target.name]: evt.target.value });
    }

    async amIStore(){
      const rst = await luxury.methods.amIStore().call({from:this.state.accounts[0]});
      console.log(rst);
      if (rst == true){
        this.setState({storeflag: "Yes"});
      }
      else {
        this.setState({storeflag: "No"});
      }
    }
    async getMyAddress(){
      //const accounts = await web3.eth.getAccounts();
      var ads = await luxury.methods.getMyAddress().call({from:this.state.accounts[0]});
      console.log("Your address is -> " + this.state.accounts);
      // set message for the return values to be show in the page..
      // this is the best way i can do it now, but i think there will be other solutions
      this.setState({ message1: "Your address is " + ads});
    }

    async getMyItems(){
      var myitems = await luxury.methods.getMyItems().call({from: this.state.accounts[0]});
      this.setState({myitems:myitems});
    }

    setStoreInfo = async event => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await luxury.methods.setStoreInfo(this.state.to).send({from: accounts[0]});
      this.setState({message2:"success!" });
      console.log("Set Store Completed ");      
    };

    createItem = async event => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await luxury.methods.createItem(this.state.to, this.state.code).send({from: accounts[0]});
      this.setState({message2:"success!" });
      console.log("Create Item Completed ");      
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

                <button onClick={this.amIStore}>Am I store?</button>
                <p>{this.state.storeflag}</p>
                
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
                      name= "to"
                      onChange={this.handleChange}
                    />
                  </div>
                  <input type="submit" value="Submit"/>
                </form>
                <h2>Transfer Ownership</h2>
                <h2>Create Item:</h2>
                <form onSubmit={this.createItem}>
                  <div>
                    <input
                      name="to"
                      onChange={this.handleChange}
                    />
                    <input
                      name="code"
                      onChange={this.handleChange}
                    />
                  </div>
                  <input type="submit" value="Submit"/>
                </form>

            </div>
        );
    }
}

export default App;

//React textbox: https://material-ui.com/zh/components/text-fields/
