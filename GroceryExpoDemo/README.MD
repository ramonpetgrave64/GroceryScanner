The Shopping Cart is now a React element and can now be used/rendered like so:
```
cart_data = [
    {key: '1', name: 'orange', icon: '#', price: 2.40, quantity: 11},
    {key: '2', name: 'apple', icon: '#', price: 2.40, quantity: 3},
]

<ShoppingCart cart_data={this.cart_data} />
```

Also, it now has a proper heading and total sections.

I still need to add the ability to tap and edit the items in the cart.
