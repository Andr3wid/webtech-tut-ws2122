/*
    1. Get all values from the input fields
    2. Create a new table row and append it
    3. Implement the delete action (showcase "this"!)
    4. Get stats / sum of our table (higher order functions!)
*/

let inpCurrency = document.querySelector('input[name="currency"]');
let inpAmount = document.querySelector('input[name="amount"]');
let inpType = document.querySelector('.right-form-col select');
let inpRate = document.querySelector('input[name="rate"]');

let btnAdd = document.querySelector('input[name="add-investment"]');
let btnCalc = document.querySelector('input[name="calculate-balance"]');

function createCell(value) {
    let newCell = document.createElement('td');
    newCell.innerText = value;

    return newCell;
}

function createDeleteButton() {
    let newBtn = document.createElement('input');
    newBtn.setAttribute('type', 'button');
    newBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn');
    newBtn.value = 'Delete';

    newBtn.addEventListener('click', function() {
        this.parentElement.parentElement.remove();
    });

    return newBtn;
}

function onAddButtonClick() {
    let currency = inpCurrency.value;
    let amount = Number(inpAmount.value);
    let type = inpType.value;
    let rate = Number(inpRate.value);

    let tableBody = document.querySelector('table > tbody');
    let newRow = document.createElement('tr');

    newRow.appendChild(createCell('#'));
    newRow.appendChild(createCell(currency));
    newRow.appendChild(createCell(type));
    newRow.appendChild(createCell(amount));
    newRow.appendChild(createCell(rate));

    let buttonCell = createCell('');
    buttonCell.appendChild(createDeleteButton());
    newRow.appendChild(buttonCell);

    tableBody.appendChild(newRow);

}

function calculateTotal(tableRows) {

    let total = 0;

    let currentCells, currentAmount, currentType;
    for(let i = 0; i < tableRows.length; i++) {
        currentCells = tableRows[i].cells;

        currentAmount = Number(currentCells[3].innerText);
        currentType = currentCells[2].innerText;

        if(currentType === 'Buy') {
            total -= currentAmount;
        } else if(currentType === 'Sell') {
            total += currentAmount;
        } else {
            alert('Unknown transaction type');
            return;
        }

    }

    console.log(total);

    return total;

}

btnAdd.addEventListener('click', onAddButtonClick);

btnCalc.addEventListener('click', function() {
    const total = calculateTotal(document.querySelectorAll('tbody > tr'));
    alert(`Current balance: ${total}`);
});

