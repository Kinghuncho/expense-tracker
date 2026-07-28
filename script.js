const form = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const balance = document.getElementById("balance");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const category = document.getElementById("category");

// Update the screen
function updateUI() {

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {

        total += expense.amount;

        const li = document.createElement("li");

        li.innerHTML = `
<div>

<h4>${expense.category}</h4>

<p>${expense.description}</p>

<small>${expense.date}</small>

</div>

<div>

<strong>$${expense.amount.toFixed(2)}</strong>

<button class="delete-btn"
onclick="deleteExpense(${index})">

🗑️

</button>

</div>
`;

        expenseList.appendChild(li);

    });

    balance.textContent = `$${total.toFixed(2)}`;

localStorage.setItem("expenses", JSON.stringify(expenses));

}

function deleteExpense(index){

    expenses.splice(index,1);

    updateUI();

}

// Add new expense
form.addEventListener("submit", function(e){

    e.preventDefault();

    const newExpense = {

    description: description.value,

    amount: Number(amount.value),

    category: category.value,

    date: new Date().toLocaleDateString()

};

    expenses.push(newExpense);

    updateUI();

    description.value = "";
    amount.value = "";

});