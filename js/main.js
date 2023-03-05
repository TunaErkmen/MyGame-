class MemoryGame {
   constructor() {
     this.cards = document.querySelectorAll('.memory-card');
     this.hasFlippedCard = false;
     this.lockBoard = false;
     this.firstCard = null;
     this.secondCard = null;
 
     this.shuffleCards();
     this.addEventListeners();
   }
 
   shuffleCards() {
     this.cards.forEach(card => {
       let randomPosition = Math.floor(Math.random() * 12 );
       card.style.order = randomPosition;
     });
   }
 
   addEventListeners() {
     this.cards.forEach(card => card.addEventListener('click', () => {
       this.flipCard(card);
     }));
   }
 
   flipCard(card) {
     if (this.lockBoard) return;
     if (card === this.firstCard) return;
     card.classList.add('flip');
 
     if (!this.hasFlippedCard) {
       // first click
       this.hasFlippedCard = true;
       this.firstCard = card;
     } else {
       // second click
       this.hasFlippedCard = false;
       this.secondCard = card;
       this.checkForMatch();
     }
   }
 
   checkForMatch() {
     let isMatched = this.firstCard.dataset.framework === this.secondCard.dataset.framework;
 
     if (isMatched) {
       this.disableCards();
     } else {
       this.unflipCards(); 
     }
   }
 
   disableCards() {
     this.firstCard.removeEventListener('click', () => this.flipCard(this.firstCard));
     this.secondCard.removeEventListener('click', () => this.flipCard(this.secondCard));
     this.resetBoard();
   }
 
   unflipCards() {
     this.lockBoard = true;
     setTimeout(() => {
       this.firstCard.classList.remove('flip');
       this.secondCard.classList.remove('flip');
       this.resetBoard();
     }, 1500);
   }
 
   resetBoard() {
     [this.hasFlippedCard, this.lockBoard] = [false, false];
     [this.firstCard, this.secondCard] = [null, null];
   }
 }
 
 new MemoryGame();




/*const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false ;
let lockBoard = false;
let firstCard, secondCard;



function flipCard () {
   if(lockBoard) return ;
   if (this === firstCard) return ;

   this.classList.toggle('flip');

   if(!hasFlippedCard){
    //first click
    hasFlippedCard = true;
    firstCard= this;
   } else {
    //second click
    hasFlippedCard=false;
    secondCard= this;
    checkForMatch();
   }
}

   function checkForMatch() {
      let isMatched = firstCard.dataset.framework === secondCard.dataset.framework;
    if(isMatched){
      disableCards();
    } else {
      unflipCards(); 
   }
}

function disableCards(){
   firstCard.removeEventListener('click' , flipCard);
   secondCard.removeEventListener('click' , flipCard);
   resetBoard();
}

function unflipCards() {
   lockBoard = true;
   setTimeout(()=>{
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
   },1500 );
}

function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard,secondCard] = [null, null];
}

//IIFE example :
(function shuffle() {
   cards.forEach(card => {
let randomPosition = Math.floor(Math.random() * 12 );
card.style.order = randomPosition;
   });
}) ();

cards.forEach (card => card.addEventListener('click',flipCard )) */