# Blockchain for Fashion & Luxury Brands

Xiaoyu Deng, Yuhui Hu, Wanqi Wang, Hanchi Zhang

# Project Report

## Summary

Secondhand buyers are always worrying if they are buying an authentic product, especially when purchasing some luxury products. In China, there is a shoe trading and information platform called Du. It also offers the service to check if one pair of shoes is authentic or not. However, it also was accused of selling some forfeit products. In the meantime, luxury brands are fighting with counterfeiters by investing high-tech solutions, and they are paying a lot for lawyers for those lawsuits.

- [How luxury brands can beat couterfeiters](https://hbr.org/2019/05/how-luxury-brands-can-beat-counterfeiters)

Our solution for this is to combine blockchain technology with the life cycle of the physical item. Our smart contract **keeps a record of every authentic product, including information about the product and the historical record of this product**. For each product, it will be registered in the blockchain by the managers of the company, which provided proof of authenticity of this product; its ownership stored in the blockchain assures the buyer that he or she is buying an authentic product from the person who indeed owns it. To realize this, we also need some physical support. For example, *The information for an item stored in blockchain should be linked to the item through serial number, chip or QR code, accessible through an app.*

## Introduction

### Background

With the rapid growth of resale sites could take up a larger share of the market in the future, counterfeit merchandise is becoming a more serious problem in luxury industry. Consumers are always looking for deals, but resale market is filled out with fake goods. It remains to be seen whether the technology will sufficiently fend off counterfeit merchandise, but tapping into Ethereum technology could be a pathway toward other brands protecting their products and perhaps attracting consumers through transparency and customer perks, too. 

#Todo: check grammar (Hanchi)

### Known business issues and problems

- Luxury brands are bothered by suing factories that produce replica items.
- Customers are worrying the authenticity of products when trading in secondhand marketplace.
- Secondhand luxury platforms pay a lot in quality check and authentication experts to provide a safe and reliable platform for alluent consumers to buy and sell luxury items. 

### System objectives

- Reducing the risk of counterfeit and grey markets to protect brand and customers

- Provide a transparent market for the resale with higher efficiency and lower cost

	This blockchain system would record all the items sold on the market that fake items can be easily identified by records on the blockchain. With the decrease of fake items on the market, the cost on the suing would decrease as well, that the blockchain would save the law sue cost for the company. Besides, with the decentralized feature of blockchain, customers do not need to verify the item in the store, that saves the time and money cost on the verification process. 

- Tracking the life of products

### Scope of project

According to this trend, our blockchain system is for fashion and luxury brands to reduce the risk of counterfeit and grey-market by using a unique code attached with each item to track the products for life-long. Managers, stores, and customers can also check information about items and other data in terms of different identities. In the future, we could also add repair history, stolen report, and transport information to our design.

## Requirement gathering procedure and result

We talked to a lawyer working for Hermes and she told us that all her work is suing replica factories in China. Almost all Luxury and fashion brands are suffering from the replica and fake items by hurting the brand value and hurting the customer experience. Also, the world's largest Luxury company, Louis Vuitton, is planning to build a blockchain system to protect the brand from fake items and controlling the supply chain. Our result came that the system should have the following functions: 

- Managers can add an item to the blockchain
- System check the item series number to verify an item
- The owner of an item can sell items on the system and publish the resale information online 
- Authorize stores and maintenance stores can add information adhered to the item on the blockchain

## Use case diagram and description

1. Item created/produced

| Use  Case Name                                               | Item  produced by factory                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Actor                                                        | Factory                                                      |
| Secondary  Actor                                             | Manager  and store                                           |
| Use  Case Overview                                           | This  use case describes when an item is produced by factory and transported to  store for selling. |
| Preconditions:                                               | -     The store needs to be a  verified store.               |
| Basic  Flow:  -    The factory sign for items to be registered into network.  -    The manager receives applications by factory.  -    The manager checks the production and logs in to the system,  put in the store’s address and code number of items, clicks the create  button.  -    A message will be sent to store notifying this transportation.  -    The store could check his current owned item by clicking check  my item button.   -    The store report physical item deliver information to  manager  -    The use case ends. |                                                              |

 

\2.   Item Sold from Store

| Use  Case Name                                               | Item  Sold from Store                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Actor                                                        | Customer                                                     |
| Secondary  Actor                                             | Retailer  Store                                              |
| Use  Case Overview                                           | This  use case describes when a customer buys a product from a retailer store. |
| Preconditions:                                               | -     The store needs to be a  verified store.  -     The customer needs to  have an account and know his address of this account. |
| Basic  Flow: <br /> -    The customer visits the retailer store and purchase an item.  <br />-    The customer pays for this item.<br />  -    The store gets code number of this item.  <br />-    The store logs in to the system, put in the customer’s  address and code number of item, clicks transfer item button  <br />-    A message will be sent to customer notifying this  transaction.  -    The customer could check his current owned item by clicking  check my item button.   <br />-    The use case ends. |                                                              |

## Non-functional requirements

1. Managers must make sure the code for item is unique.

2. Stores are never allowed to transfer an item without receiving the payment.

3. Privacy of user information should be audited.

## Blockchain App Models

For our business purpose, our blockchain should be a private network, managed by a management team of the company. The team acts as the manager of the deployed contract.

Our blockchain should also be permissioned, which means each participant has a unique identity to enable the use of policies to constrain network participation and access to transaction details.

### Participants

Considering our solution should be merged into the current business cycle, managers, retailers, and customers will all join our blockchain network.

- Regulator/Manager: this particular company (Herme for example)
- Retailers/Stores
- Consumers: including
	- Buying from stores buyers
	- Secondhand buyers
	- Secondhand sellers
	- Secondhand shops
- Maintenance (Repairment providers)

### Assets

The asset on our blockchain system is a **digital representation** of the physical product. It is like a unique **serial number** that can be verified and store essential data. Every digital code is linked to a physical item, which also needs physical control.

*"It will provide consumers transparency and a single source of truth: the authenticity of the product, details on product origin and components, instructions for product care, and the after-sales and warranty services available."*

The regulator creates the **registration** for a new item on the blockchain and transfers the item ownership to the retailers.

Following are some of the properties it should have:

- The struct contains one **unique id**. 
- The struct should save the **owner**. When transfer happens, it could be verified one indeed owns this item.
- The struct should contain the **historicalrecords** the linked item, including transfer history and repair history.
- The struct could also store some **information** about this item. For example, release date, produce date, material,     color...depends on the product itself.

### Transactions

Since the business cycle is all most all about the product, any transfer of a product that happened in the real world will cause a transaction to occur on our blockchain network. Below is a chart introducing a simplified life cycle of a product. Our transactions can be categorized into these types:

- **Item creation**: It means there is an item produced in real life. The manager should register this item into our blockchain network. By doing this, the manager has to provide a unique code for the item, and the address of the store which this item is transported to. 

- **Item transfer**: It means the ownership of an item is transferred, and this transaction represents many situations in real life. For example, when an item is purchased by a customer, when an item is sold to a buyer in secondhand marketplace, when a customer returns this item to a store, etc.

- **Item remove**: It means an item cannot serve its function anymore. Then it should be registered as a disabled item in this blockchain system to prevent any illegal trading. 

### Events

1. **Notification for secondhand items posting**: Our system could help the brand to build a healthy secondhand market by allowing the users to post their verified product to the secondhand marketplace. For a better experience for the users, we could develop events related to his posting. For example, when other users "like" this item, and when an item you liked is sold.

2. **Notification for stolen items**: Our system is also aiming to reduce illegal trading in markets. When a user reports a verified stolen item to the manager, all the users could get notifications about this item. If anyone finds out this item being traded in the market, he could report this behavior to the system. Also, all the customers could pay special attention when they are buying items from others.

## List of User Interfaces

Our user interfaces are designed based on the web browser. Based on different account types (manager/retailer/customer), the webpage will automatically direct to corresponded user interfaces. Also, different accounts will have different access to information and functions.

We have some scratches for our UI design. The window includes two parts -- account info part and transaction-related part. 

- In the account info part, the user can check their item(s)'s code, their identity, and their item's information. 
- In transaction-related part, the user could transfer their ownership of one item to another, which is used when a transaction in reality happens; the user could also post their item to the secondhand marketplace regulated by managers, and this process would be verified through the backend blockchain system.

Our UI design includes several elements for better demonstration:

- Navbars: navigate users between homepage, user's dashboard, and secondhand marketplace.
- Textfields: The textfields allow users to enter text, such as receipt address and item code. Some are required, and some are optional, such as a note for the recipient.
- Icons: The icons serve as an intuitive symbol to help our users navigate the system.
- Message boxes: Message box is used after a user submit a request to transfer their item or post their item to secondhand market. It will tell users if their request is successful or not.
- Buttons: Buttons allow users to request information or submit a request.

The final UI is like below:

## Plan for Next Step

### Unfinished Work for Design and Development

#### Back-end

- **Check if code is unique**
- Store transaction/ maintenance history to the digital code
- Incorporate more participants: maintenance, ...
- More functions for tracking the item: stolen report, bag destroyed

#### Front-end

- Seperate retailer view and customer view
- Add alert for invalid input in textfields

#### Business Side

- Come up a solution for online sale and trading

### Plan for migration and conversion

- CRM and product life cycle

### Training and Support

- Human resource
- Physical support

*"The digital identity is like a passport that assures the authenticity of both new and vintage goods and records information such as transfers of ownership or when the item is serviced. Depending on the brand, **the passport can be linked to the item through serial number, chip or QR code, accessible through an app**."*

## Postmortem and Next Steps

The whole project lasted for nearly four months, from zero at the very beginning to now. We started from proposing our blockchain design on current business issues, to identifying and designing our system function (write solidity code), then doing solution research while designing an developing front-end user interface (write html and css), and then setting up local blockchain network, and finally linking all the stuffs together to end up with a demo application. During this process, we received a lot instructions and help from two professors. Many thanks to Professor Chiang and Professor Chu.

We finished up with a good-looking website with front end UI design and back end solidity code as our demo application. Users could use the whole project to mock a retail business cycle with the support of blockchain technology. To achieve this goal, everyone in this team put a lot of effort on learning new stuffs. Not only did we participate the class and group discussion, but also tried our best to use online resources to equip us with new knowledge.

Under the requirement by professors, we kept a good pace on this project through whole semster. Also, the presentations of other groups gave us a lot of insights for our own project, from their content to format. Many thanks to all other classmates.

In the future, we could still furthur develop our smart contract to add more functions. Also, we should consider the relationship between blockchain network and other management techniques, such as database.



--------------------------------------

# Appendix

## Guide book

### Admin

The admin has to deploy a contract with the help of Metamask, Ganache and Ethreum Remix. 

First, activate a local blockchain by clicking QUICKSTART or NEW WORKSPACE in Ganache. 

Second, setup your RPC network in Metamask by clicking add network button.

Third, deploy a contract on local blockchain on Remix.

Fourth, update your contract address in js file.

Fifth, run  `npm start` in your file directory.

### User



**Here's an example of testing and using it:**

First, we need three addresses: a manager, a retailer and a customer.

1. Manager View(1st address)

-  First, create a store, use 2nd address
-  Second, create a item, use 2nd address
-  Third, check identity and check product owner

2. Store View(2nd address)
	- Check my item --> the item manager just created
	- Check item info --> the description manager just put in 
	- Transfer this item  to 3rd account (in real life this mean a customer bought this product)
	- (Ignore resale)
3. Customer View(3nd address)
	- Check item --> just bought
	- Resale verification, could what if I use real code or fake code ->verification passed or failed
	- Second hand selling: if I'm trying to sell a item that is not belonged to me -->transfer failed

