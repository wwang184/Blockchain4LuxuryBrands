# Blockchain for Fashion & Luxury Brands

Xiaoyu Deng, Yuhui Hu, Wanqi Wang, Hanchi Zhang

## Brief Introduction

Second hand buyers are always worrying if they are buying an authentic product, especially when purchasing some luxury products. In China, there is a shoes trading and information platform called Du. It also offers service to check if one pair of shoes is authentic or not. However, it also was accused of selling some forfeit products. In the meantime, luxury brands are fighting with counterfeiters by investing high-tech solutions, and thery are paying a lot for lawyers for those lawsuits.

- [How luxury brands can beat couterfeiters](https://hbr.org/2019/05/how-luxury-brands-can-beat-counterfeiters)

Our solution for this, is to combine blockchain technology with the life cycle of the real item. Our smart contract **keeps a record of every authentic product, including the information of the product and the history record of this product**. For each product, it will be registered in the blockchain by the managers of the company, which provided proof of authenticity of this product; its ownership stores in the blockchain assures the buyer that he or she is buying a authentic product from the person who really owns it. To realize this, we aslo need some physical support. For example, *The information for an item stored in blockchain should be linked to the item through serial number, chip or QR code, accessible through an app.*



## Market Research

### Current situation

*"Secondhand luxury platforms are now increasingly investing in quality check and authentication experts to provide a safe and reliable platform for alluent consumers to buy and sell luxury items. "*

### Similar Product

- Aura

	

## Objectives

	- Reducing the risk of counterfiet and grey markets
	- Tracking the transfer history and repairment history

## Key elements

### Participants

- Regulator/Manager: this particular company (Herme for example)
- Retailers/Stores
- Consumers: including
	- Buying from stores buyers
	- Second-hand buyers
	- Second-hand sellers
- Second-hand shops
- Maintenance (Repairment providers)

### Assets

**-- Properties of tangible and intangible assets**

"A **digital claim**, like a unique **serial number**, that can be verified and store essential data. Every digital claim is linked to a physical item. This needs physical control."

Our blockchain should be perminssioned, which means each participant has a unique identity to enable the use of policies to constrain network participantion and access to transaction details.

The regulator creates the **registration** for a new item on the blockchain, and transfer the item ownership to the retailers.

Properties:

- The struct should contain one **unique id**. Participants should be able to check if this id is authorized, which means the linked item is not a forfeitpiece.
- Or, the struct should save the **owner**. When transfer happens, participant could verify one really owns this item.
- The struct should contain the **history records** the linked item, including transfer history and repair history.
- History records could be a seperate struct.
- The struct could also store some **information** about this item. For example, release date, produce date, material, color...depends on the product itself.
- **Anything else?**

Quoted:

*"It will provides consumers transparency and sigle source of truth: the authenticity of the product, details on product origin and components, instructions for product care and the after-sales and warranty services avalaible."*

*"The digital identity is like a passport that assures the authenticity of both new and vintage goods and records information such as transfers of ownership or when the item is serviced. Depending on the brand, **the passport can be linked to the item through serial number, chip or QR code, accessible through an app**."*

### Event/ Use cases

-- External, temporal, and state

Quote from Consensys:

*How does the digitization of assets impact retail fashion and luxury? Counterfeits worth $590bn a year made up 3.3% of global trade in 2016. Tagging physical objects with **IoT, RFID tags, photography, or QR codes** enables the creation of “digital twins” on the blockchain. These allow brands to mitigate counterfeit risks by digitally tracking products along the supply chain and after the point of sale. This digital representation of the product on the blockchain— also known as tokenization, allows stakeholders to access the tracking data and to transact in real-time without compromising sensitive information.*

#### For general participants:

Manager creates a new contract -> call constructor

**Production:** 

Manufactor produced new bags, manager/manufator creates a new item in blockchain

**Transfer:** 

~~Manufactory delivers items to retailer stores (Transfer between manufactory and stores): **should we also incorporate transportation in?**~~

Stores sell item to consumers and consumers return item to stores(Transfer between stores and consumers) : **There is a problem. People dont want to receive items that are returne by previous buyers. At least they dont want to know.**

Secondhand seller sell second hand item to buyers (Transfer in second hand market, p2p)

Owners sell item to second hand platform, and buyers buy item from second hand platform (Transfer in second hand market, p2c)

**Repairment:**

**Verification:** 

~~When transfer/repairment happens, participants should have the abiliti to verify if the description of the item correspond with the item itself.~~ 


#### For company side:

**Get anything they want for supply management and business analysis**



### Transaction

Tbc

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





# Project Report

## Summary

//todo

## Introduction

### Background

With the rapid growth of resale sites could take up a larger share of the market in the future, counterfeit merchandise is becoming a more serious problem in luxury industry. Consumers are always looking for deals, but resale market is filled out with fake goods. It remains to be seen whether the technology will sufficiently fend off counterfeit merchandise, but tapping into Ethereum technology could be a pathway toward other brands protecting their products and perhaps attracting consumers through transparency and customer perks, too.

The known business issues include AURA developed by LVMH with Microsoft and blockchain software company ConsenSys. Consumers can trace the lifecycle of its products, and find specific product care instructions, after-sales and warranty services. The platform could also be used to safeguard creative intellectual property and curb advertising fraud.

According to this trend, our blockchain system is for fashion & luxury brands to reduce the risk of counterfeit and grey market by using a unique code attached with each item to track the products for life-long. Managers, stores and customers can also check the participants address and item infromation. What is left out in design is repairment history, stolen report and transport information.



## List of User Interfaces

Our user interfaces are designed based on 网页浏览器. Based on different accounts type(manager/retailer/customer), the webpage will automaticlly direct to different user interfaces. Also, different accounts will have different access to information and functions.

We have some scraches for our UI design. The window is divided into two parts -- account info and transaction related. 

- In account info part, the user can check their item(s)'s code, check their identity, and check their item's information. 
- In transaction related part, the user could transfer their ownership of one bag to another, which is used when a transaction in reality happens; the user could also post their bag to the second-hand market regulated by managers, which process would be verified through the backend blockchain system.

Our UI design includes several elements for better demonstration:

- Textfields: The textfields allow users enter text, such as receipt address and item code. Some are required, and some are optional, such as a note for receipt.
- Icons: The icons serve as a intuitive symbol to help our users navigate the system.
- Message boxes: Message box is used after an user submit a request to transfer their item or post their item to second-hand market. It will tell users if their request is successul or not.
- Buttons: Buttons allow users to request information or submit a request.

// 关于颜色和图片的选择



## Architecture Design Consideration



## Guide book

### Admin

### User



