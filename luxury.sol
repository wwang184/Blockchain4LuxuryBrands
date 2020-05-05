pragma solidity ^0.4.17;
//pragma experimental ABIEncoderV2;
// ----------------- References ----------------- //
// https://www.jianshu.com/p/21b301b1bfc8


contract Luxury {

    address public manager;
    uint[] items;
    string wrong = "Access denied.";

    struct Item {
        address curr_owner;
        //address[] transfer_record;
        // Other information or description;
        string created_date;
        string color;
        
    }
    struct Info{
        bool isCustomer;
        bool isRetailer;
        //bool isRecondhandPlatform;
        // In solidity, the default value is 'zero', for uint is 0 , bool is false .
        string myAddress;
        // other information?
    }

    mapping(uint => Item) itemArr;
    mapping(address => Info) infoArr;

    constructor() public {
        manager = msg.sender;
    }

// ----------------- Functions for manager to organize ----------------- //

    // ---------------- Transaction: Setting up stores, customers and issue new item ---------------- //
    function setStoreInfo(address to) public {
        require (msg.sender == manager);

        Info storage store = infoArr[to];
        store.isRetailer = true;
        infoArr[to] = store;
    }

    function setCustomerInfo(address to) public{
        require (msg.sender == manager);

        Info storage me = infoArr[to];
        me.isCustomer = true;
        infoArr[to] = me;
    }

    function createItem(address to, uint _code, string color, string date) public returns (uint){
        // Only manager(the company) can register a new item
        require (msg.sender == manager);

        //Should check if the code already exists, or use a reliable method to generate the code
        Item memory newItem;
        Info storage store = infoArr[to];

        // When the item is created, the receipient must be a store but not a customer.
        if (store.isRetailer == false){
            return 0;
        }
        newItem.curr_owner = to;
        newItem.color = color;
        newItem.created_date = date;
        //newItem.transfer_record = [];
        //newItem.transfer_record.push(to);
        itemArr[_code] = newItem;
        //add new item code to the code list
        items.push(_code);
        return 1;
    }

    // ---------------- View: Checking status ---------------- //

    function getItemOwner(uint _code) public view returns (address){
        // Only manager has the access
        require(msg.sender == manager);
        return itemArr[_code].curr_owner;
    }


// ----------------- Functions for stores and customers ----------------- //    

    // ---------------- Transaction: transfer ownership ---------------- //

    function transferOwnership(address to, uint _code) public returns (bool){
        // seller should be the one to call this function
        // check if seller owns this item
        // bool flag = false;

        // Info storage seller = infoArr[msg.sender];
        // Info storage buyer = infoArr[to];

        Item storage item = itemArr[_code];

        if (item.curr_owner == msg.sender){
            // the current owner of this item should change
            // the item id should be removed from seller
            // the item id should be added to buyer
            // this transaction details should be added to the item records
            item.curr_owner = to;
            //item.transfer_record.push(to);
            itemArr[_code]= item;
            return true;
        }
        return false;
    }
    

    // ---------------- View: Checking status ---------------- //

    function getMyAddress() public view returns(address){
        return msg.sender;
    }

    function getMyItems() public view returns(uint[]){
        uint counter = 0;
        uint max = items.length;
        uint[] memory myitems = new uint[](max);// this should be furthur modified to a more reasonable length
        for (uint i=0; i<max; i++){
            uint code = items[i];
            Item storage item = itemArr[code];
            if (item.curr_owner == msg.sender){
                myitems[counter] = code;
                counter++;
            }
        }
        return myitems;
    }

    function getItemInfo(uint _code) public view returns (string){
        Item storage item = itemArr[_code];
        if (item.curr_owner == msg.sender){
            return item.color;
        }
        return wrong;
    }

    function verifyItems(uint _code) public view returns (bool){
        Item storage item = itemArr[_code];
        if (item.curr_owner == msg.sender){
            return true;
        }
        return false;
    }

// ----------------- Functions for programmers to debug ----------------- //    

    function getcodes() public view returns(uint[]){
        return items;
    }

    function getcodeslen() public view returns(uint){
        return items.length;
    }
    
    function isStore(address c) public view returns (bool){
        Info storage me = infoArr[c];
        if (me.isRetailer == true){
            return true;
        }
        else return false;
    }
    //function getItemTransactionHistory(uint _code) public view returns(address[]){
     //   Item storage item = itemArr[_code];
     //   return item.transfer_record;
    //}

    // **functions should be constructed later:**
    //  getMyTransactionHistory
    //  transferOwnership, should include records to record transfer reason: buyfromstore, buyfromcustomer, return, stolen?, repurchasefromcustomer... 
    //  reportStolen
    //  **also incorporate repair shops and secondhand platforms**
    //  repairItem



}