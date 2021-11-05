function add(a, b) {
    return a + b;
}

function mult(a, b) {
    return a * b;
}

function getAreaOfRectangle(a, b) {
    return a * b;
}

function calcAndLog(a, b, f) {
    const result = f(a, b);
    console.log(`The executed method was: ${f.name}`);
    console.log(`The result was: ${result}`);

    return result;
}

function curriedAdd(a, b) {
    if(b === undefined) {
        return function(c) {
            return a + c;
        };
    }

    return a + b;
}

let c = curriedAdd(10);

let button = document.querySelector('#test-button');


class Person {
    constructor(name, age, hairColor) {
        this.name = name;
        this.age = age;
        this.hairColor = hairColor;
    }

    introduceByArrowFunction = () => {
        console.log(this);
        console.log(`Hello my name is ${this.name} and I am ${this.age} years old`);
    }

    introduceRegular() {
        console.log(this);
        console.log(`Hello my name is ${this.name} and I am ${this.age} years old`);
    }

}

let testPerson = new Person('hugo', 22, 'pink');

button.addEventListener('click', testPerson.introduceRegular);
