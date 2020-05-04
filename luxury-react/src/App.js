import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import luxury from './luxury';
import HeaderComponent from './Header';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,Carousel,Form,Spinner } from 'react-bootstrap';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            manager: "NOT SET",
            myitems:[],
            to: "",
            code: 0,
            storeflag:"",
            Itemflag:"",
            defaultAccount: "NOT SET",
            managerflag :false,
            accounts:[],
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
      //const accounts = await web3.eth.getAccounts().then(console.log);
      const manager = await luxury.methods.manager().call();
      console.log("componentDidMount called")
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
      this.setState({message3:"success!" });
      console.log("Create Item Completed ");      
    };


    async getMyItems(){
      var myitems = await luxury.methods.getMyItems().call({from: this.state.accounts[0]});
      this.setState({myitems:myitems});
    }
    
    
    verifyItems = async event =>{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await luxury.methods.verifyItems(this.state.code).send({from: accounts[0]});
      const adbs = await luxury.methods.verifyItems(this.state.code).call({from: this.state.accounts[0]});
      if (adbs == true){
        this.setState({Itemflag: "True"});
      }
      else {
        this.setState({Itemflag: "False"});
      }
      console.log("The item is " + this.state.Itemflag);
      this.setState({ message6: "The item is " + this.state.Itemflag});

    };


    getItemsOwner = async event =>{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await luxury.methods.getItemOwner(this.state.code).send({from: accounts[0]})
      var ads = await luxury.methods.getItemOwner(this.state.code).call({from: accounts[0]});
      console.log("The owner is -> " + this.state.accounts);
      this.setState({ message4: "Owner's address is " + ads});
    };
    transferOwnership = async event =>{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await luxury.methods.transferOwnership(this.state.to,this.state.code).send({from: accounts[0]})
      this.setState({message5:"success!" });
      console.log("Transfer Completed "); 
    };


    // This function will be called when any variable in this state...??
    // And the return of this function will be rendered in to HTML and ??

    render(){
        // you can see this line in the browser console
        console.log("manager is " + this.state.manager);
        console.log("render called");
        console.log(this.state.accounts);
        if (this.state.manager == "NOT SET"){
          return (
            <div className="App">Initiating</div>
          );
        }
        else{
          var managerflag = false;
        if (this.state.manager.toLowerCase() == this.state.accounts[0].toLowerCase()){
           managerflag = true;
         }
         console.log(managerflag);
         if (managerflag == true){
           return(
            <div className="App">
                <HeaderComponent />
                <h1>Luxury Contract</h1>
                <p>This contract is managed by {this.state.manager}</p>

                <Button variant="dark" onClick={this.amIStore}>Am I store?</Button>{' '}
                <p>{this.state.storeflag}</p>
                
                <Button variant="dark" onClick={this.getMyAddress}>Get my address</Button>{' '}
                <p>{this.state.message1}</p>
                
                <Button variant="dark" onClick={this.getMyItems}>Get my items</Button>{' '}
                <ul>
                  {this.state.myitems.map((value, index) => {
                    return <li key={index}> {value}</li>
                  })}
                </ul>
              <div className="b">
                <h2>Set Store Info:</h2>
                <Form className = 'a' onSubmit={this.setStoreInfo}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      We'll never share your adress with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
              <h2>Transfer Ownership</h2>
                <Form className = 'a' onSubmit={this.transferOwnership}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      We'll never share your adress with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control  type="text" placeholder="Enter Code" name="code"
                      onChange={this.handleChange}/>
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
                <h2>Create Item</h2>
                <Form className = 'a' onSubmit={this.createItem}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      We'll never share your adress with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control  type="text" placeholder="Enter Code" name="code"
                      onChange={this.handleChange}/>
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
                <h2>Get Item's Owner:</h2>
                <Form className = 'a' onSubmit={this.getItemsOwner}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control md = '3' type="text" placeholder="Enter Code" name = "code" onChange={this.handleChange} />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
                
            </div>
          );
        }
        else{
          return(
            <div className="App">
                <HeaderComponent />
                <h1>Luxury Contract</h1>
                <Button variant="dark" onClick={this.amIStore}>Am I store?</Button>{' '}
                <p>{this.state.storeflag}</p>
                
                <Button variant="dark" onClick={this.getMyAddress}>Get my address</Button>{' '}
                <p>{this.state.message1}</p>
                
                <Button variant="dark" onClick={this.getMyItems}>Get my items</Button>{' '}
                <ul>
                  {this.state.myitems.map((value, index) => {
                    return <li key={index}> {value}</li>
                  })}
                </ul>
              <div className="b">
                <h2>Transfer Ownership</h2>
                <Form className = 'a' onSubmit={this.transferOwnership}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      We'll never share your adress with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control  type="text" placeholder="Enter Code" name="code"
                      onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
                <h2>Verify Item:</h2>
                <Form className = 'a' onSubmit={this.verifyItems}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      We'll never share your adress with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
                <p>{this.state.Itemflag}</p>
            </div>);
        }
      }
    }
}

export default App;
