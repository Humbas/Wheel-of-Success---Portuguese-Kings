
/*
Techdegree| Project 7
=====================================================================================
by Humberto Ventura
=====================================================================================
*/

/*const*/


const startbtn = document.querySelector('.btn__reset');

// its the blue layer that starts the app
const bluelayer= document.querySelector('#overlay');

// div that will hold the king name
const kingphrase = document.querySelector('#phrase');

// unordered list that will hold the king characters 
const kingsUl = kingphrase.querySelector('ul');

// selects first main board from score then the li elements that hold the hearts
const resultsdiv = document.querySelector('#scoreboard');

// by checking the number of tries lenght we can stablish a limit of 5, 
const resultsdivdLi = resultsdiv.querySelectorAll('.tries');

// keyboard characters
const character= document.getElementsByClassName('letter');

// characters discovered, so show class activated
const show = document.getElementsByClassName('show');

// qwert div holds the butttons
const qwertydiv = document.querySelector('#qwerty');   
const characterButtons = qwertydiv.querySelectorAll('button');

const title = document.querySelector('.title');



// sentences array to be tested, the names represent portuguese kings 
const kings = [
    'John',
	'Duarte',
	'Peter',
	'Afonso V',
    'John II',
    'Manuel',
    'John III',
    'Sebastian',
];


// start
  startbtn.addEventListener('click', () => {  
  bluelayer.style.display = "none";// dont display bluelayer when start is cliked
});




// game play


let wrong = 0;   // number of wrong guesses


/* activate keyboard, we need a king per time to display in the board to activate our design */

// get random kings from array
function getanyking(array) {
    const anyking = array[Math.floor(Math.random() * array.length)];
    return anyking.toUpperCase().split('');
}

// adding the king to the board

function addking(array) {
  for (var i = 0; i < array.length; i++) {
    var li = document.createElement('li');
	// add characters to king
    var character = document.createTextNode(array[i]);
    li.appendChild(character);

 // check space
    if ( li.innerText.indexOf(' ') >= 0) {
      li.className = 'space';
      document.getElementsByTagName('ul')[0].appendChild(li);

    //----------------------------------------------------------
    } else {
		// else is letter
      li.className = 'letter';
      document.getElementsByTagName('ul')[0].appendChild(li);
    }
  }
}




/* ok, now lets apply game rules */

/// checking if the clicked buttons match with curretn king´s name

function checkCharacter(btnwasclicked) {
    const characterClicked = btnwasclicked.textContent.toUpperCase();
    let characterFound = false;

    for (let i = 0; i < character.length; i++){
		// if clicked character matches kings name
        if (characterClicked === character[i].textContent) {
            character[i].classList.add('show');
			// add show class if the kings character and cliked buttom match
            characterFound = true;
        } 
    }
    
    return characterFound ? characterClicked : null;
}





// start button, event listener

startbtn.addEventListener('click', (e) => {
    if (e.target.textContent === 'Reset') {
        wrong = 0; // start with no errors

        // hearts
        for (let i = 0; i < resultsdivdLi.length; i++) {
            const img = resultsdivdLi[i].getElementsByTagName('img')[0];
            img.src = 'images/liveHeart.png';
        }

        // remove characters, li are child of #phrase

        while (kings.children.length > 0) {
            kingsUl.removeChild(kingsUl.children[0]);
        }
		

        // if the user has clicked any button we should take it off to restart
        for (let i = 0; i < characterButtons.length; i++) {
            characterButtons[i].classList.remove('clicked');
			// disable is to disable buttons clicked before and could not be reused. Since we are starting over
			// makes no sense to make disable boolean true
            characterButtons[i].disabled = false;
        }

        // but to blue background, remove win and lose classes
        bluelayer.classList.remove('win', 'lose');

        // generate new king
        const newking = getanyking(king);

        // add new 
        addking(newking);
    }
});


//checking score

 
function Score() {
	// if the number of characters of the current kings name are all showned...
    if (character.length === show.length) {
        bluelayer.classList.add('win'); // add win class to blue layer
        bluelayer.style.display = ''; // dont display blue layer
        title.textContent = "You won!"
        startbtn.textContent = "Reset"
    }

// if wrong is equal or superior than 5 the game is off
    if (wrong>= 5) {
		// if you missed max 5 , you lose
        bluelayer.classList.add('lose');
        bluelayer.style.display = '';
        title.textContent = "You lose!"
        startbtn.textContent = "Reset"
    }
}



//disable letter when user clicks wrong key
window.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;

// call characterFound section to check target (key pressed)
        const characterFound = checkCharacter(e.target);

// if the key pressed has no match with the kings name, its a null, then we have to take a life
        if (characterFound === null) {
			// take one life off once get wrong letter
            wrong += 1;
        }

  // if wrong is between 1 and 5, take 1 character from board and add a lostheart
        if (wrong >= 1 && wrong <= 5){
	 const heart = resultsdivdLi[resultsdivdLi.length-wrong];
 // take 1 character from board lenght
            heart.getElementsByTagName('img')[0].src = 'images/lostHeart.png'; // add lost heart
        }
    }
    Score();
});


// execute add king

let currentking = getanyking(kings);
addking(currentking);

