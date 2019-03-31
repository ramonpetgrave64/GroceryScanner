The Shopping Cart is a React element and can now be used/rendere/updatedc like so:
```
state = {
    cart_data:
        [
            {key: '1', name: 'orange', icon: '#', price: 2.40, quantity: 11},
            {key: '2', name: 'apple', icon: '#', price: 2.40, quantity: 3},
            {key: '3', name: 'grape', icon: '#', price: 1.90, quantity: 5},
        ],
}

cartUpdateHandler = (new_cart_data) => {
    this.setState({cart_data: new_cart_data});
}

render() {
    return(
        <ShoppingCart cart_data={this.state.cart_data} onUpdate={this.cartUpdateHandler}/>
    );
}
```

EDIT 3.31.19:
The cart items each have their own buttons to increment and decerement quantity.

Cart items can now be tapped. For now, upon tapping, the ShoppingCart element will hilight the item and remove it from a new_cart_data array, which it will then pass as an argument to its onUpdate callback. 

I will add the ability to edit quantity.
