import React, { Component } from 'react';
import './App.css';
import './index.css';
import web3 from './web3';
import luxury from './luxury';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { Button,Form, Card, Jumbotron,Container,Row,Col} from 'react-bootstrap';
import { BsFillBriefcaseFill, BsPeopleCircle } from "react-icons/bs";
import { AiFillHome, AiFillProfile } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

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
            color:"NOT SET"
           
        };

        window.ethereum.on('accountsChanged', (account) => {
        console.log("MetaMask account just changed to " + account);
        this.setState({defaultAccount: account});    
        });
        this.getMyAddress = this.getMyAddress.bind(this);
        this.getMyItems = this.getMyItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
  }

    // will be executed after page gets loaded
    async componentDidMount(){
      const accounts = await window.ethereum.enable();
      const manager = await luxury.methods.manager().call();
      this.setState({manager: manager, accounts: accounts});
    }
    
    handleChange (evt) {
      // check it out: we get the evt.target.name (which will be either "email" or "password")
      // and use it to target the key on our `state` object with the same name, using bracket syntax
      this.setState({ [evt.target.name]: evt.target.value });
    }
    isStore = async event => {
      event.preventDefault();
      var rst = await luxury.methods.isStore(this.state.to).call({from:this.state.accounts[0]});
      console.log(rst);
      if (rst == true){
        this.setState({storeflag: "Yes", message7: "This address is a store address."});
      }
      else {
        this.setState({storeflag: "No", message7: "This address is not a store address."});
      }
    }
    async getMyAddress(){
      var ads = await luxury.methods.getMyAddress().call({from:this.state.accounts[0]});
      console.log("Your address is -> " + this.state.accounts);
      this.setState({ message1: "Your address is " + ads});
    }

    getItemInfo = async event => {
      event.preventDefault();
      var rst = await luxury.methods.getItemInfo(this.state.code).call({from:this.state.accounts[0]});
      console.log("Get item info completed");
      this.setState({ message8: rst});
    }

    setStoreInfo = async event => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await luxury.methods.setStoreInfo(this.state.to).send({from: accounts[0]});
      this.setState({message2:"Store setup success!" });
      console.log("Set Store Completed ");      
    };

    createItem = async event => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();

      var tempDate = new Date();
      var todaydate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();

      var rst = await luxury.methods.createItem(this.state.to, this.state.code, this.state.color, todaydate).send({from: accounts[0]});
      console.log(rst);
      if (rst){
        this.setState({message3: "Item registered successfully! "});
      }
      else{
        this.setState({message3: "Failed to register this item. Please check address and code. "});
      };
      console.log("Create Item Completed");      
    };

    async getMyItems(){
      var myitems = await luxury.methods.getMyItems().call({from: this.state.accounts[0]});
      this.setState({myitems:myitems});//todo
    }
    
    verifyItems = async event =>{
      event.preventDefault();
      var adbs = await luxury.methods.verifyItems(this.state.to).call({from: this.state.accounts[0]});
      console.log(adbs)
      if (adbs == true){
        this.setState({message6: "Verification passed!"});
      }
      else {
        this.setState({message6: "Verification failed!"});
      }
      console.log("Verify completed");

    };

    getItemsOwner = async event =>{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await luxury.methods.getItemOwner(this.state.code).send({from: accounts[0]})
      var ads = await luxury.methods.getItemOwner(this.state.code).call({from: accounts[0]});
      this.setState({ message4: "Owner's address is " + ads});
      console.log("Getting owner completed. " , "The owner is -> " , this.state.accounts);
    };

    transferOwnership = async event =>{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      console.log(this.state.myitems)
      var flag = false;
      {this.state.myitems.map((value, index) => {
        if (this.state.code == value){
          flag = true;
        }
      })}
      var rst = await luxury.methods.transferOwnership(this.state.to,this.state.code).send({from: accounts[0]})
      if (flag == true){
        this.setState({message5: "Transfer succeeded!"});
      }
      else {
        this.setState({message5: "Transfer failed!"});
      }
      console.log("Transfer Completed "); 
    };

    visitgithub(){
      window.location.href="https://github.com/wwang184/Blockchain4LuxuryBrands";
  }

    render(){
        console.log("Manager is " + this.state.manager);
        console.log(this.state.accounts);

        var bgstyle ={
          "backgroundSize":"cover",
          "backgroundImage":"url(https://i.pinimg.com/originals/02/7d/c5/027dc5eaf34770befe5d3e7fc5e62662.jpg)",
          "backgroundPosition": "center",
          "backgroundRepeat":"no-repeat",
        }

        var iconstyle = {
          verticalAlign: 'text-top'
        }


        if (this.state.manager === "NOT SET"){
          return (
            <div className="App">Initiating</div>
          );
        }
        else{
          var managerflag = false;
          if (this.state.manager.toLowerCase() === this.state.accounts[0].toLowerCase()){
            managerflag = true;
          }
          // console.log(managerflag);
          if (managerflag === true){
            return(
              <div className="App">
                <HeaderComponent />
                <Jumbotron style={bgstyle}>
                  <h1>Hello, you are logged in as manager.</h1>
                  <p>
                  This contract is managed by {this.state.manager}
                  </p>
                  <div id="learn-more">
                   <Button variant="flat" onClick={this.visitgithub}>Learn more&ensp;<GoMarkGithub style={{verticalAlign: 'text-top'}}/></Button>
                  </div>
                  </Jumbotron>

                  <h2>Operation</h2>
                <hr size="6px" align="center" width="80%" color="grey" height="5px" ></hr> 
                <Container>
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>Store Setup</Card.Title>
                          <Form onSubmit={this.setStoreInfo}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Store's Address</Form.Label>
                              <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                              Submit
                            </Button>
                            <p>{this.state.message2}</p>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>Store Shutdown</Card.Title>
                          <Form onSubmit={this.setStoreInfo}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Store's Address</Form.Label>
                              <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                              {/* <Form.Text className="text-muted">
                                We'll never share your adress with anyone else.
                              </Form.Text> */}
                            </Form.Group>
                            <Button variant="dark" type="submit">
                              Submit
                            </Button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>Item Setup</Card.Title>
                          <Form onSubmit={this.createItem}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Store's Address</Form.Label>
                              <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Item's description</Form.Label>
                              <Form.Control md = '3' type="text" placeholder="Enter description" name = "color" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Item's Code</Form.Label>
                              <Form.Control  type="text" placeholder="Enter Code" name="code"
                                  onChange={this.handleChange}/>
                              <Form.Text className="text-muted">
                                Please make sure you type in the correct unique code.
                              </Form.Text>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                              Submit
                            </Button>
                            {/* {need fix: transaction will return the info of the transaction,
                            therefore it is not able to check the return value in the way} */}
                            <p>{this.state.message3}</p>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  </Container>
                  <h2>Information & Data</h2>
                  <hr size="6px" align="center" width="80%" color="grey" height="5px" ></hr>
                <Container>
                  <Row>
                    <Col>
                      <Button variant="dark" onClick={this.getMyAddress}><AiFillHome style={iconstyle}/>&ensp;Get my address</Button>
                    </Col>
                    <Col>
                      <p>{this.state.message1}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form onSubmit={this.isStore}>
                        <Row>
                          <Col>
                            <Form.Group controlId="formBasicEmail">
                              {/* <Form.Label>Check Item's Ownerhsip</Form.Label> */}
                              <Form.Control type="text" placeholder="Enter address" name = "to" onChange={this.handleChange} />
                            </Form.Group>
                          </Col>
                          <Col className="align-items-center">
                            {/* <Form.Label>&emsp;</Form.Label> */}
                            <Button variant="dark" type="submit" block><BsPeopleCircle style={iconstyle}/>&ensp;Identity Check</Button>
                          </Col>
                      </Row>
                    </Form>
                    </Col>
                    <Col>
                      <p>{this.state.message7}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                    <Form onSubmit={this.getItemsOwner}>
                      <Row>
                        <Col>
                          <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label>Check Item's Ownerhsip</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter Code" name = "code" onChange={this.handleChange} />
                          </Form.Group>
                        </Col>
                        <Col className="align-items-center">
                          {/* <Form.Label>&emsp;</Form.Label> */}
                          <Button variant="dark" type="submit" block><BsFillBriefcaseFill style={iconstyle}/>&ensp;Ownership Check</Button>
                        </Col>
                    </Row>
                    </Form>
                    </Col>
                    <Col>
                    <p>{this.state.message4}</p>
                    </Col>
                  </Row>
                </Container>
                
                <hr size="6px" align="center" width="0%" color="grey" height="5px" ></hr> 
                <hr size="6px" align="center" width="0%" color="grey" height="5px" ></hr> 
                  
                <FooterComponent />  
              </div>
              
            );
          }
          else{
            return(
              <div className="App">
                <HeaderComponent />
                <Jumbotron style={bgstyle}>
                  <h1>Hi, you are logged in as {this.state.accounts[0]}</h1>
                  <p>This contract is managed by {this.state.manager}</p>
                  <p>Your asset is protected by Blockchain Technology! Want to learn more about how we do it?</p>
                  <div id="learn-more">
                   <Button variant="flat" onClick={this.visitgithub}>Learn more&ensp;<GoMarkGithub style={iconstyle}/></Button>
                  </div>
                </Jumbotron>
                <h2>My Account</h2>
                <hr size="6px" align="center" width="80%" color="grey" height="5px" ></hr>
                <Container>
                  <Row>
                    <Col>
                      <Button variant="dark" onClick={this.getMyAddress}><AiFillHome style={iconstyle}/>&ensp;Get my address</Button>
                    </Col>
                    <Col>
                      <p>{this.state.message1}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>                
                      <Button variant="dark" onClick={this.getMyItems}><BsFillBriefcaseFill style={iconstyle}/>&ensp;Check my items</Button>
                    </Col>
                    <Col>
                      <ul>
                        {this.state.myitems.map((value, index) => {
                          if (value!=0){
                        return <li key={index}> {value}</li>}
                        })}
                      </ul> 
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                    {/* //todo: add a function to check info, basiclly description now. */}
                    <Form onSubmit={this.getItemInfo}>
                      <Row>
                        <Col>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Code" name = "code" onChange={this.handleChange} />
                          </Form.Group>
                        </Col>
                        <Col className="align-items-center">
                          <Button variant="dark" type="submit" block><AiFillProfile style={iconstyle}/>&ensp;Check item info</Button>
                        </Col>
                    </Row>
                    </Form>
                    </Col>
                    <Col >
                    <p>{this.state.message8}</p>
                    </Col>
                  </Row>
                </Container>

                <h2>Transaction</h2>
                <hr size="6px" align="center" width="80%" color="grey" height="5px" ></hr> 
                <Container>
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>Transfer My Item</Card.Title>
                          <Form onSubmit={this.transferOwnership}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Receipient's Address</Form.Label>
                              <Form.Control md = '3' type="text" placeholder="Enter Address" name = "to" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Item's Code</Form.Label>
                              <Form.Control  type="text" placeholder="Enter Code" name="code" onChange={this.handleChange}/>
                              <Form.Text className="text-muted">Transaction cannot be cancelled! Please double check. </Form.Text>                    
                            </Form.Group>
                            <Button className="submit-no-margin" variant="dark" type="submit">Submit</Button>
                            <p>{this.state.message5}</p>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>Post Item for Sale</Card.Title>
                          <Form onSubmit={this.verifyItems}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Item's Code</Form.Label>
                              <Form.Control  type="text" placeholder="Enter Code" name = "to" onChange={this.handleChange} />
                              <Form.Text className="text-muted">Your request will be verified. </Form.Text>                    
                            </Form.Group>
                            <Button className="submit-no-margin" variant="dark" type="submit">Submit</Button>
                          </Form>
                          <p>{this.state.message6}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  </Container>
                  
                  <hr size="6px" align="center" width="0%" color="grey" height="5px" ></hr> 
                  <hr size="6px" align="center" width="0%" color="grey" height="5px" ></hr> 
                  
                  <FooterComponent />
              </div>
            );
          }
        }
    }
}

export default App;
