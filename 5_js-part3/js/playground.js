function selectiveCallback(num, evenNumberCallback, oddNumberCallback) {
    console.log('higher order function called');

    if(num%2 === 0) {
        evenNumberCallback();
    } else {
        oddNumberCallback();
    }
}

function add(a, b) {
    console.log();
    return a + b;
}

function evenNum() {
    console.log('your number was even');
}

function oddNum() {
    console.log('your number was odd');
}

function printNumber() {
    console.log('you entered a number!');
}

selectiveCallback(4, printNumber, printNumber);

console.log('beforeSetTimeout');

// triggered after 5000ms
setTimeout(function() {
    console.log('inside setTimeout triggered');
}, 0);

console.log('afterSetTimeout');

let ourVariable = true;
let interval = setInterval(() => {
    console.log('value of ourVariable: ' + ourVariable);
}, 2000);

clearInterval(interval);

let ourRequestObject = new XMLHttpRequest();
ourRequestObject.open('GET', 'https://catfact.ninja/fact');
ourRequestObject.onreadystatechange = function(e) {
    if(e.currentTarget.readyState === 4) {
        console.log('request done:');
        console.log(e.currentTarget.response);
    } else {
        console.log('readystate changed to: ' + e.currentTarget.readyState);
    }
}
ourRequestObject.send();

function intensiveCalculation(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                if(n%2 === 1) {
                    reject('cannot calculate with uneven numbers'); // handed over to catch
                } else {
                    console.log('calculation finished');
                    resolve(n); //this is passed through as a parameter for the next 'then'
                }
            }, 2000);
    });
}

function processResult(n) {
    return new Promise((resolve, reject) => {
        console.log('processing of calculation finished');
        resolve(++n);
    });
}

intensiveCalculation(1)
    .then((num) => { return processResult(num) })
    .then((finalResult) => {
        console.log(`Calculation success - the final result is: ${finalResult}`);
    })
    .catch(error => {
        console.log('calculation error appeared: ' + error);
    });

fetch('https://catfact.ninja/fact')
    .then(response => {
        console.log('received a response');
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('error while fetching: ');
        console.log(error);
    });
