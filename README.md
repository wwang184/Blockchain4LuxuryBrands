# Blockchain for Fashion & Luxury Brands

Xiaoyu Deng, Yuhui Hu, Wanqi Wang, Hanchi Zhang

# Project Report

## Summary

Second hand buyers are always worrying if they are buying an authentic product, especially when purchasing some luxury products. In China, there is a shoes trading and information platform called Du. It also offers service to check if one pair of shoes is authentic or not. However, it also was accused of selling some forfeit products. In the meantime, luxury brands are fighting with counterfeiters by investing high-tech solutions, and thery are paying a lot for lawyers for those lawsuits.

- [How luxury brands can beat couterfeiters](https://hbr.org/2019/05/how-luxury-brands-can-beat-counterfeiters)

Our solution for this, is to combine blockchain technology with the life cycle of the real item. Our smart contract **keeps a record of every authentic product, including the information of the product and the history record of this product**. For each product, it will be registered in the blockchain by the managers of the company, which provided proof of authenticity of this product; its ownership stores in the blockchain assures the buyer that he or she is buying a authentic product from the person who really owns it. To realize this, we aslo need some physical support. For example, *The information for an item stored in blockchain should be linked to the item through serial number, chip or QR code, accessible through an app.*

## Introduction

### Background

With the rapid growth of resale sites could take up a larger share of the market in the future, counterfeit merchandise is becoming a more serious problem in luxury industry. Consumers are always looking for deals, but resale market is filled out with fake goods. It remains to be seen whether the technology will sufficiently fend off counterfeit merchandise, but tapping into Ethereum technology could be a pathway toward other brands protecting their products and perhaps attracting consumers through transparency and customer perks, too. 

TODO: check grammar (Hanchi)

### Known business issues and problems

~~The known business issues include AURA developed by LVMH with Microsoft and blockchain software company ConsenSys. Consumers can trace the lifecycle of its products, and find specific product care instructions, after-sales and warranty services. The platform could also be used to safeguard creative intellectual property and curb advertising fraud.~~

TODO: this is not business issue, need to revise by Hanchi or Yuhui

*"Secondhand luxury platforms are now increasingly investing in quality check and authentication experts to provide a safe and reliable platform for alluent consumers to buy and sell luxury items. "*

### System objectives (need to do what to derive benefits)

- Reducing the risk of counterfiet and grey markets to protect brand and customers
- Provide transparent market for resale market with higher efficiency and lower cost (how?)(TODO Yuhui)
- Tracking the life of products

### Scope of project

According to this trend, our blockchain system is for fashion and luxury brands to reduce the risk of counterfeit and grey market by using a unique code attached with each item to track the products for life-long. Managers, stores and customers can also check the participants address and item infromation. What is left out in design is repairment history, stolen report and transport information.

## Requirement gathering schedule, procedure and result?

TODO: do we need to do this? is it from the first deliverable? (Yuhui)

## Blockchain App Models

For this business purpose, our blockchain should be a private network, managed by a management team of the company. Basiclly, the team acts as the manager of the deployed contract. 

Our blockchain should also be perminssioned, which means each participant has a unique identity to enable the use of policies to constrain network participantion and access to transaction details.

### Participants

Considering our solution should be merged to the existing business cycle, manager, retailers, and customers will all join our blockchain network. 

- Regulator/Manager: this particular company (Herme for example)
- Retailers/Stores
- Consumers: including
	- Buying from stores buyers
	- Second-hand buyers
	- Second-hand sellers
	- Second-hand shops
- Maintenance (Repairment providers)

### Assets

The asset on our blockchain system is a **digital representation** of the physical product. It is like a unique **serial number** that can be verified and store essential data. Every digital code is linked to a physical item, which also needs physical control.

*"It will provides consumers transparency and sigle source of truth: the authenticity of the product, details on product origin and components, instructions for product care and the after-sales and warranty services avalaible."*

The regulator creates the **registration** for a new item on the blockchain, and transfer the item ownership to the retailers.

**Properties:**

- The struct contains one **unique id**. ~~Participants should be able to check if this id is authorized, which means the linked item is not a forfeitpiece.~~
- The struct should save the **owner**. When transfer happens, it coud be verified one really owns this item.
- The struct should contain the **history records** the linked item, including transfer history and repair history.
- The struct could also store some **information** about this item. For example, release date, produce date, material, color...depends on the product itself.

### Transactions

Since the business cycle is all most all about the product, any transfer of a product happened in the real world will cause a transaction happen on our blockchain network. Below is a chart introducing a simplified life cycle of a product.

### Events

TODO: check again what is event.. what;s the difference btw ebents and use cases (Wanqi)

## List of User Interfaces

Our user interfaces are designed based on web browser. Based on different accounts type(manager/retailer/customer), the webpage will automaticlly direct to different user interfaces. Also, different accounts will have different access to information and functions.

We have some scraches for our UI design. The window is divided into two parts -- account info and transaction related. 

- In account info part, the user can check their item(s)'s code, check their identity, and check their item's information. 
- In transaction related part, the user could transfer their ownership of one bag to another, which is used when a transaction in reality happens; the user could also post their bag to the second-hand market regulated by managers, which process would be verified through the backend blockchain system.

Our UI design includes several elements for better demonstration:

- Navibars: navigate users between homepage, user's dashboard and second hand marketplace.
- Textfields: The textfields allow users enter text, such as receipt address and item code. Some are required, and some are optional, such as a note for receipient.
- Icons: The icons serve as a intuitive symbol to help our users navigate the system.
- Message boxes: Message box is used after an user submit a request to transfer their item or post their item to second-hand market. It will tell users if their request is successul or not.
- Buttons: Buttons allow users to request information or submit a request.

The final UI is like below:

TODO: insrt pic



## Architecture Design Consideration ?



## Guide book

### Admin

### User

### API



## Plan for Next Step

### Unfinished Work for Design and Development

#### Back-end

- **Check if code is unique**
- Store transaction/ maintenance history to the digital code
- Incorporate more participants: maintenance, ...
- More functions for tracking the item: stolen report, bag destroyed

#### Front-end

- Seperate retailer view and customer view
- Add alert for invalid put in ?

#### Business Side

- Come up a solution for online sale and trading

### Plan for migration and conversion(merging?)

- CRM and product life cycle

### Training and Support

- Human resource
- Physical support

*"The digital identity is like a passport that assures the authenticity of both new and vintage goods and records information such as transfers of ownership or when the item is serviced. Depending on the brand, **the passport can be linked to the item through serial number, chip or QR code, accessible through an app**."*



--------------------------------------



## Use case

- During a transaction, verification will be done automaticlly.
- If any owner want to post information on the website, the related item should be verified first.

| First Participant              | Second Participant            | Event                                                        | Real life situation                                      |
| ------------------------------ | ----------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| Manager                        | Store                         | Set up store information                                     | A new store opens                                        |
| Manager                        | Store                         | Register new item for store                                  | An item is produced, and transported to a store for sale |
| Store                          | Customer                      | Store sells an item to a customer. Several things could be automaticlly verified: 1.This store is a authorized store of this brand. 2. This item is authentic. | Customer goes to a store and buys an item.               |
| Customer                       | -                             | Customer check his/her account to make sure item received    | Customer goes to a store and buys an item.               |
| Customer as second hand seller | Customer as second hand buyer | Seller transfer ownership to buyer. Buyer check account to make sure item received. | Face to face second hand item transaction                |
| Customer as second hand seller | Second hand shop              | Sell transfer ownership to a second hand shop (vintage shop). vintage shop check account to make sure item received. | Face to face second hand item transaction                |
|                                |                               |                                                              |                                                          |
|                                |                               |                                                              |                                                          |
|                                |                               |                                                              |                                                          |





# 