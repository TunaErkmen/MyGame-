class MemoryGame {
  constructor() {
    this.cards = document.querySelectorAll('.memory-card');
    this.cardBoard= document.getElementById('memory-game');
    this.controlBoard = document.getElementById('total-container');
    this.startButton = document.getElementById("start");
    this.resumeButton = document.getElementById("resume");
    this.pauseButton = document.getElementById("pause");
    this.timeGeneratorElm =  document.getElementById("time");
    this.screen = document.getElementById("message-board");
    this.sound = new Audio("./sounds/click.mp3");
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
    this.seconds = 0 ;
    this.minutes = 0 ;
    this.movesCount = 0 ;
    this.scoreCount = 0 ;
    this.timer= null;

    this.shuffleCards();
    this.addEventListeners();
    this.timeGenerator();
    

    this.pauseButton.addEventListener('click',() => {
      this.pause();
      this.playAudio();
      
     
    } )
    this.resumeButton.addEventListener('click', () => {
      this.resume();
      this.playAudio();
   
  } )
    
    this.startButton.addEventListener('click', () => {
        this.start();
        this.playAudio();
     
    } )
  }

  shuffleCards() {
    this.cards.forEach(card => {
      let randomPosition = Math.floor(Math.random() * 12);
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
      this.countMoves(); //increment moves when user selected second card
      this.checkForMatch();
      
    }
  
  }

  checkForMatch() {
    let isMatched = this.firstCard.dataset.framework === this.secondCard.dataset.framework;

    if (isMatched) {
      this.disableCards();
      this.getScore();

      
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

  countMoves() {
    this.movesCount ++;
    let moves = document.getElementById("moves-count");
    moves.innerHTML = `Moves :${this.movesCount}`;
  }

  timeGenerator() {
    
    this.timer = setInterval(() => {
    this.timeGeneratorElm.innerHTML = `Time : 00:0${this.seconds}`;
    this.seconds ++ ; 
    if (this.seconds >= 10) {
      this.timeGeneratorElm.innerHTML = `Time : 00:${this.seconds}`;
    }
    if(this.seconds >= 60) {
      this.minutes++;
      this.timeGeneratorElm.innerHTML = `Time : 0${this.minutes}:${this.seconds}`;
      this.seconds = 0;
      this.seconds++;
    }
    }, 1000 ) // each second
    }
    

start() {
   this.hideScreen();
}

resume () {
  this.timeGenerator();
  this.lockBoard=false;
}

pause() {
  clearInterval(this.timer);
this.lockBoard = true ;

  
  }
 
getScore () {
  this.scoreCount += 10 ;
  let score = document.getElementById("total-score");
  score.innerHTML = `Score :${this.scoreCount}`;
  if(this.scoreCount == 60){
    localStorage.setItem("maxScore", this.scoreCount);
    window.location.href = "gameover.html";
    
  }
  
}

playAudio () {
  this.sound.play();
}

hideScreen() {
  this.screen.style.display = "none";
  this.cardBoard.style.display = "flex";
  this.controlBoard.style.display = "flex";
}




}
new MemoryGame();

