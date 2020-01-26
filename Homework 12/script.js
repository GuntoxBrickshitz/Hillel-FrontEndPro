'use strict';

class Hamburger {
    // sizes
    static SIZE_SMALL = { price: 50, calories: 20 }
    static SIZE_MEDIUM = { price: 75, calories: 30 }
    static SIZE_LARGE = { price: 100, calories: 40 }
    // toppings
    static TOPPING_CHEESE = { price: 10, calories: 20 }
    static TOPPING_SALAD = { price: 20, calories: 5 }
    static TOPPING_POTATO = { price: 15, calories: 10 }
    static TOPPING_SAUCE = { price: 15, calories: 0 }
    static TOPPING_MAYO = { price: 20, calories: 5 }
    
    constructor () {
        this.price = arguments[0].price;
        this.calories = arguments[0].calories;

        for (let i = 1; i < arguments.length; i++) {
            this.price += arguments[i].price;
            this.calories += arguments[i].calories;
        }
    }

    add(option) {
        this.price += option.price;
        this.calories += option.calories;        
    }

    calculatePrice() {
        return this.price;
    }

    calculateCalories() {
        return this.calories;
    }
}

// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.TOPPING_CHEESE);
// добавка из майонеза
hamburger.add(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories: " + hamburger.calculateCalories());
// сколько стоит
console.log("Price: " + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.add(Hamburger.TOPPING_SAUCE);
// А сколько теперь стоит?
console.log("Price with sauce: " + hamburger.calculatePrice());