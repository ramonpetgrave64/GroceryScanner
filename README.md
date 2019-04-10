# GroceryScanner

## Front End to Backend Communication

### Flow:
#### Maintaining the Shopping Cart
The backend should always contain a copy of the user's cart. Each time teh frontend wants to add to, or update, the cart:
1. the backend should pass the new `cart_data` to the backend.
2. The backend validates
    * checks to see if items are in stock
3. backend passes the validated `cart_data` back to the frontend
4. frontend updates its copy of `cart_data` and renders the `ShoppingCart` view

#### Pushing the Shopping Cart to the backend
To authenticate, each request will contain the `token` in the request header

The front-end will wass a JSON object containing cart_data, which is an array of `item` objects.

```
{
  cart_data:
    [
      {key: '1', name: 'orange', icon: '#', price: 2.40, quantity: 11},
      {key: '2', name: 'apple', icon: '#', price: 2.40, quantity: 3},
      {key: '3', name: 'grape', icon: '#', price: 1.90, quantity: 5},
    ]
}
```
Ideally, the `key` of each `item` would be the item's `ID` within the database.
