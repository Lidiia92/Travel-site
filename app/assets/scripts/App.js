/* var Person = require('./modules/Person');
THE ES6 way to write it:
import Person from './modules/Person';

class Adult extends Person {
    payTaxes() {
        console.log(this.name + 'now owes $0 in taxes.')
    }
}
    

alert('ABC 321');

var john = new Person('John Doe', 'blue');
john.greet();

var jane = new Adult('Jane Doe', 'orange');
jane.greet();
jane.payTaxes();

*/

//INFORMATION ABOVE WE DONT NEED


import MobileMenu from './modules/MobileMenu';

var mobileMenu = new MobileMenu();