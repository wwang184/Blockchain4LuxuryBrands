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
            manager: "NOT SET"
        };
        this.getMyAddress = this.getMyAddress.bind(this);
        this.getMyAddress2 = this.getMyAddress2.bind(this);
    }


    // will be executed after page gets loaded
    async componentDidMount(){
        // solidity calls are async call, add await in front of call to make sync
        const manager = await luxury.methods.manager().call();

        //update this.state.manager so render will be executed
        this.setState({manager: manager});
    }
    //onclick = async event =>{
        //event.preventDefault();

    //}

    async getMyAddress(){
        const accounts = await web3.eth.getAccounts();

        //this.setState({ message: 'Waiting on transaction success...' });

        var ads = await luxury.methods.getMyAddress().call({from: accounts[0]});
    
        this.setState({ message1: "Your address is " + ads});

    }

    async getMyAddress2(){
        const accounts = await web3.eth.getAccounts();

        //this.setState({ message: 'Waiting on transaction success...' });

        var ads = await luxury.methods.getMyAddress().call({from: accounts[0]});
    
        this.setState({ message2: "Your address is " });

    }

    
    
    // This function will be called when any variable in this state...??
    // And the return of this function will be rendered in to HTML and ??

    render(){
        // you can see this line in the browser console
        console.log("manager is " + this.state.manager);

        return (
            <div className="App">
                <h1>Luxury Contract</h1>
                <p>This contract is managed by {this.state.manager}</p>
                <button onClick={this.getMyAddress}>Get my Address</button>
                <h1>{this.state.message1}</h1>
                <button onClick={this.getMyAddress2}>Get my Address2</button>
                <h1>{this.state.message2}</h1>
            </div>
        );
    }
}

export default App;

// 1. show variable, basicly call view
// 2. set variable, basicly call transact
// 3.