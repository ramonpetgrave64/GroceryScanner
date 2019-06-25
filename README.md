# I-Checkout

I-Checkout is a React Native application where users can place retail products from the shelf in a software shopping cart. Features include being able to manage your item totals, view the amount you will owe at checkout, and pay for the products in a self checkout system.

![Scanning Products](https://i.imgur.com/6G5SXsD.gifv) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Payment Processing](https://i.imgur.com/F090oHA.gif)
## Motivation and Benefits

I-Checkout was developed to provide customers and store owners with the following benefits over a traditional checkout system.

**Customer**
- Avoid long lines and ultimately save time when shopping.
- Keep track of how much you will owe when you checkout.
- Save payment methods, allowing you to finish your payment faster.

**Store Owner**
- Improves customer experience, making the store more appealing to customers.
- Easier to maintain and cheaper than managing cashiers and a number of registers.

## Tech Overview

**Tools, Frameworks, and APIs**\
React Native, Node.js, AVFoundation, Mobile Vision API, Stripe, Heroku, Postman, PostgreSQL

**Languages Used**\
Javascript, Objective-C, Java, SQL

**Platforms Supported**\
iOS, Android

## Features

- Secure sign in system using JWT token-based authentication.
- Barcode scanning for adding products to shopping cart.
- Shopping cart management tools such as add/remove items.
- Support for associating payment methods with account.
- Secure payment processing using the Stripe API.

## Installation

To install I-Checkout, you will need Node.js, a node package manager, and the React Native framework.

To install Node.js and the "npm" node package manager, use the following installation link.

https://nodejs.org/en/

To install React Native, follow the steps on the React Native "Getting Started" page for "React Native CLI Quickstart" up until the step titled "Creating a new application".

https://facebook.github.io/react-native/docs/getting-started

With Node.js, npm, and React Native  installed, you can clone the I-Checkout repository to get started. After cloning, use a terminal instance and cd into the 'GroceryScanner' directory. Here, you can run "npm install" from the terminal window to install the necessary node modules. Once installed, cd into the directory 'GroceryScannerMobile' and run either 'react-native run-android' or 'react-native run-ios'. This will launch the application in either an android or ios simulator respectively. 

**NOTE**: *In order to launch the application properly you must have Xcode installed to run the iOS simulator or Android Studio to run the android simulator.*

To run the application on device, revisit the React Native getting started documentation where the steps are outlined for running a React Native application on device.

## API Reference

- React Native: https://facebook.github.io/react-native/docs/getting-started.html
- Stripe: https://stripe.com/docs
- AVFoundation: https://developer.apple.com/documentation/avfoundation
- Mobile Vision: https://developers.google.com/vision/introduction

## How to use?

1) When you launch I-Checkout for the first time, you'll need to sign up to enter the user database. On subsequent launches you may provide your username and password at the login page.
2) At the scanning page, you must provide I-Checkout with camera permissions to be able to scan your products and add them to your cart. After granting permissions, you simply point your camera at the barcode on the product you would like to add to add it to your cart.
3) When you are done shopping, you can either choose from a previously saved payment method or enter your credit card information manually.
4) Once you've selected your payment method you can submit your payment request to Stripe and receive a receipt for your purchase.
**NOTE**: *Payment processing is not currently live, meaning your card will not actually be charged. However, your card will be verified through the Stripe API.*

## Credits

**Project Leader**\
Jacob Mittelstaedt

**Mentor**\
Izidor Gertner

**Team**
- Ramon Petgrave
- Elie Elisee Paul
- Sebastian Henriquez
- Thierno A. Diallo

## License

Copyright 2019 Jacob Mittelstaedt

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
