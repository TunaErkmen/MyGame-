const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false ;
let firstCard, secondCard;



function flipCard () {
   this.classList.toggle('flip');
   if(!hasFlippedCard){
    //first click
    hasFlippedCard = true;
    firstCard= this;
   } else {
    //second click
    hasFlippedCard=false;
    secondCard= this;

    //do cards match
    if(firstCard.dataset.framework === secondCard.dataset.framework){
    }
   
   }
}


cards.forEach (card => card.addEventListener('click',flipCard ))