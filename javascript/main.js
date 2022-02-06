const form = document.querySelector('.form');
const itemList = document.querySelector('.itemlist');
const clearBtn = document.querySelector('.clear-form');
const bodyBg = document.querySelector('body');

const menuBtn = document.querySelector('.menu-btn');
const openBurgerNav = document.querySelector('.burger-nav')
let menuOpen = false;

/* makes the input load in local storage when the dom loads */
document.addEventListener('DOMContentLoaded', getInputs);

/* makes the form submit items with the event of clicking the submit button */
form.addEventListener('submit', addListItem);

/* makes the form clear the li with the event of click */
clearBtn.addEventListener('click', clearListItems);

/* makes the deletebutton delete items with the event of a click */
itemList.addEventListener('click', deleteListItem);

/* the function that gets the inputs when the event of the dom is loaded */
function getInputs() {
    let inputs;
    if(localStorage.getItem('inputs') === null){
        inputs = [];
    } else {
        inputs = JSON.parse(localStorage.getItem('inputs'))
    }

    inputs.forEach(function(input){
        const li = document.createElement('li');
        li.className = 'listitem-style';

        li.appendChild(document.createTextNode(input));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delbtn';
        const a = document.createElement('a');
        a.appendChild(document.createTextNode('X'));
        deleteBtn.appendChild(a);

        li.appendChild(deleteBtn);

        itemList.appendChild(li);
    });
}

/* the function that adds items to the list */

function addListItem(e) {
    e.preventDefault();

    let getInput = document.querySelector('.input-form').value;

    if(getInput === ''){
       /* make styling class for this section for less code */
        document.querySelector('.submit-form').setAttribute('value', 'Indsæt en opgave');
        document.querySelector('.submit-form').style.backgroundColor = "red";
        document.querySelector('.submit-form').style.fontSize = "15px";
        setTimeout(() => document.querySelector('.submit-form').style.backgroundColor = "#2A2B2DFF", 2000);
        setTimeout(() => document.querySelector('.submit-form').style.fontSize = "11px", 2000);
        setTimeout(() => document.querySelector('.submit-form').setAttribute('value', 'tilføj opgave'), 2000);

        return
    }

    const li = document.createElement('li');
    li.className = 'listitem-style';

    li.appendChild(document.createTextNode(getInput));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delbtn';
    const a = document.createElement('a');
    a.appendChild(document.createTextNode('X'));
    deleteBtn.appendChild(a);

    li.appendChild(deleteBtn);

    itemList.appendChild(li);

    storeInputInLocalStorage(document.querySelector('.input-form').value);

    form.reset();

};

/* the function will store input in local storage */

function storeInputInLocalStorage(input){
    let inputs;
    if(localStorage.getItem('inputs') === null){
        inputs = [];
    } else {
        inputs = JSON.parse(localStorage.getItem('inputs'))
    }

    inputs.push(input);

    localStorage.setItem('inputs', JSON.stringify(inputs));
};


/* the function that deletes items from the list with click on X and local storage*/

function deleteListItem(e) {
    if(e.target.parentElement.classList.contains('delbtn')) {
        e.target.parentElement.parentElement.remove();

        removeInputFromLocalStorage(e.target.parentElement.parentElement);
        console.log(1234)
    }
};

function removeInputFromLocalStorage(inputItem) {
  let inputs;
  if(localStorage.getItem('inputs') === null){
    inputs = [];
  } else {
    inputs = JSON.parse(localStorage.getItem('inputs'));
  }

  inputs.forEach(function(input, index){
    if(inputItem.textContent === `${input}X`){
      inputs.splice(index, 1);
    }
  });

  localStorage.setItem('inputs', JSON.stringify(inputs));
}



/* function that will clear the list */

function clearListItems(e) {
    e.preventDefault();
   document.querySelector('.itemlist').innerHTML = '';
   clearInputsFromLocalStorage();
};

function clearInputsFromLocalStorage() {
    localStorage.clear();
};


/* menu button script */

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
      menuBtn.classList.add('open');
      openBurgerNav.style.display = 'block';
      menuOpen = true;
      
    } else {
      menuBtn.classList.remove('open');
      openBurgerNav.style.display = 'none';
      menuOpen = false;
    };
  });


