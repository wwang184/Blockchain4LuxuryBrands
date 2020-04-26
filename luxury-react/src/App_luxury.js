import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import luxury from '../luxury';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            manager: "NOT SET"
        };
    }


    // will be executed after page gets loaded
    async componentDidMount(){
        // solidity calls are async call, add await in front of call to ???
        const manager = await luxury.methods.manager().call();

        //update this.state.manager so render will be executed
        this.setState({manager: manager});
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
            </div>
        );
    }
}

export default App;
