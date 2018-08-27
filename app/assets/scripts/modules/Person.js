//Constructor function

class Person {
    constructor(fullName, favColor) {
        this.name = fullName;
        this.favouriteColor = favColor;
    }
    greet(){
        console.log('Hio my name is ' + this.name + 'my favourite color is ' + this.favouriteColor);
    }
}

// module.exports = Person; //what this file will export when you require it
export default Person;