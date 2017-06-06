// TODO LIST // TODO LIST // TODO LIST // TODO LIST // TODO LIST
//
// My programming/logic is sloppy but I dont wan to go back and fix any of it. 
// I am more excited to move on to the next challenge
// 
// TODO LIST // TODO LIST // TODO LIST // TODO LIST // TODO LIST

var tControler = function() {
  //set up
  this.board = ["", "", "", "", "", "", "", "", ""];
  this.pLetter = "x";
  this.cLetter = "o";
  this.numLeft = 9;
  var playerLoc = [];
  var compLoc = [];

  //set up: select letter, clear&restart board
  this.setLetter = function(y) {
    this.pLetter = y;
    if (this.pLetter == "x") {
      this.cLetter = "o";
    } else {
      this.cLetter = "x";
      this.pLetter = "o";
    }
  };
  
  this.restart = function(){
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.numLeft = 9;
    WinAnim("restart",0,0,0);
    $('#myModal').modal();
    playerLoc = [];
    compLoc = [];
  };

  //If after each move test for all 8 possible winning scenarios / return "x", "o" OR "false"
  function Check4Win(player) {
    if (ttt.board[0] == player && ttt.board[0] == ttt.board[1] && ttt.board[1] == ttt.board[2]) {
      console.log(player + " winss!");
      ttt.numLeft = 0;
      return WinAnim(player,0,1,2);
    } else if (ttt.board[3] == player && ttt.board[3] == ttt.board[4] && ttt.board[4] == ttt.board[5]) {
      console.log(player + " wins!");
      ttt.numLeft = 0;
      return WinAnim(player,3,4,5);
    } else if (ttt.board[6] == player && ttt.board[6] == ttt.board[7] && ttt.board[7] == ttt.board[8]) {
      console.log(player + " wins!");
      ttt.numLeft = 0;
      return WinAnim(player,6,7,8);
    } else if (ttt.board[0] == player && ttt.board[0] == ttt.board[3] && ttt.board[3] == ttt.board[6]) {
      console.log(player + " wins!");
      ttt.numLeft = 0;
      return WinAnim(player,0,3,6);
    } else if (ttt.board[1] == player && ttt.board[1] == ttt.board[4] && ttt.board[4] == ttt.board[7]) {
      console.log(player + " wins!");
      ttt.numLeft = 0;
      return WinAnim(player,1,4,7);
    } else if (ttt.board[2] == player && ttt.board[2] == ttt.board[5] && ttt.board[5] == ttt.board[8]) {
      console.log(player + " wins!");
      ttt.numLeft = 0;
      return WinAnim(player,2,5,8);
    } else if (ttt.board[0] == player && ttt.board[0] == ttt.board[4] && ttt.board[4] == ttt.board[8]) {
      console.log(player + " wins!");
      ttt.numLeft = 0;
      return WinAnim(player,0,4,8);
    } else if (ttt.board[2] == player && ttt.board[2] == ttt.board[4] && ttt.board[4] == ttt.board[6]) {
      console.log(player + " wins!");
      ttt.numLeft = 0;
      return WinAnim(player,2,4,6);
    } else {
      console.log("No one wins yet...");
      return false;
    }
  }

  // Next two functions draw for the player and draw for the computer.
  this.draw = function(x) {
    if ($("." + x).html() == "" && this.numLeft > 0) {
      $("." + x).html(this.pLetter);
      this.numLeft -= 1;
      this.board[x] = this.pLetter;
      playerLoc.push(x);
      console.log(this.board);
      if (!Check4Win(this.pLetter)) {
        this.drawAI();
      }
    }
  };

  //AI
  this.drawAI = function() {
    console.log(playerLoc);
    // move accordingly
    if (this.numLeft == 8){
      if (this.board[4] != ""){
        $(".0").html(this.cLetter); 
        this.board[0] = this.cLetter;
        compLoc.push(0);
        this.numLeft -= 1;
        console.log(this.board);
        Check4Win(this.cLetter);
      } else {
        $(".4").html(this.cLetter); 
        this.board[4] = this.cLetter;
        compLoc.push(0);
        this.numLeft -= 1;
        console.log(this.board);
        Check4Win(this.cLetter);
      }
    } else if (this.numLeft == 6){
      // SECOND ROUND : if computer played center
      if (this.board[4] == this.cLetter){
        // if player has played in direct lines , defend either
        if (playerLoc[0] < 3 && playerLoc[1] < 3){
          console.log("play up top");
          this.randAIMove(0,1,2);
        } else if (playerLoc[0] > 5 && playerLoc[1] > 5){
          console.log("play down low");
          this.randAIMove(6,7,8);
        } else if (playerLoc[0] * playerLoc[1] == 10 || playerLoc[0] * playerLoc[1] == 16 || playerLoc[0] * playerLoc[1] == 40){
          console.log("play RIGHT");
          this.randAIMove(2,5,8);
        } else if ((playerLoc[0] == 3 && playerLoc[1] == 0 || playerLoc[0] == 0 && playerLoc[1] == 3) || 
                   (playerLoc[0] == 6 && playerLoc[1] == 0 || playerLoc[0] == 0 && playerLoc[1] == 6) || 
                   (playerLoc[0] == 6 && playerLoc[1] == 3 || playerLoc[0] == 3 && playerLoc[1] == 6)){
          console.log("play LEFT");
          this.randAIMove(0,3,6);
        } 
        // the player played a corner and anything not adjacent THEN computer plays adjacent to that corner
          else if ((playerLoc[0] == 0 && playerLoc[1] > 5) || (playerLoc[0] > 5 && playerLoc[1] == 0)){
          this.randAIMove(3,3,3);
        } else if ((playerLoc[0] == 0 && playerLoc[1] == 5) ||  (playerLoc[1] == 0 && playerLoc[0] == 5)){
          this.randAIMove(1,1,1);
        } else if ((playerLoc[0] == 2 && playerLoc[1] > 5) || (playerLoc[0] > 5 && playerLoc[1] == 2)){
          this.randAIMove(5,5,5);
        } else if ((playerLoc[0] == 2 && playerLoc[1] == 3) || (playerLoc[1] == 2 && playerLoc[0] == 3)){
          this.randAIMove(1,1,1);
        } else if ((playerLoc[0] == 8 && playerLoc[1] < 3) || (playerLoc[1] == 8 && playerLoc[0] < 3)){
          this.randAIMove(5,5,5);
        } else if ((playerLoc[0] == 8 && playerLoc[1] == 3) || (playerLoc[1] == 8 && playerLoc[0] == 3)){
          this.randAIMove(7,7,7);
        } else if ((playerLoc[0] == 6 && playerLoc[1] < 3) || (playerLoc[1] == 6 && playerLoc[0] < 3)){
          this.randAIMove(3,3,3);
        } else if ((playerLoc[0] == 6 && playerLoc[1] == 5) || (playerLoc[1] == 6 && playerLoc[0] == 5)){
          this.randAIMove(7,7,7);
        }
        // the player played two opposite edges
          else if ( (playerLoc[0] == 1 && playerLoc[1] == 7) || (playerLoc[1] == 1 && playerLoc[0] == 7) ){
          this.randAIMove(0,2,8);
        } else if ( (playerLoc[0] == 3 && playerLoc[1] == 5) || (playerLoc[1] == 3 && playerLoc[0] == 5) ){
          this.randAIMove(2,6,8);
        } 
        // the player played two adjacent edges / computer plays in that corner
          else if ( (playerLoc[0] == 1 && playerLoc[1] == 3) || (playerLoc[1] == 1 && playerLoc[0] == 3) ){
          this.randAIMove(0,2,6);
        } else if ( (playerLoc[0] == 3 && playerLoc[1] == 7) || (playerLoc[1] == 3 && playerLoc[0] == 7) ){
          this.randAIMove(0,6,8);
        } else if ( (playerLoc[0] == 1 && playerLoc[1] == 5) || (playerLoc[1] == 1 && playerLoc[0] == 5) ){
          this.randAIMove(0,2,8);
        } else if ( (playerLoc[0] == 5 && playerLoc[1] == 7) || (playerLoc[1] == 5 && playerLoc[0] == 7) ){
          this.randAIMove(2,6,8);
        } 
      } else { // computer played 0 because player played CENTER
        //if player played anywhere else, defend!!!!
        if (playerLoc[1] == 1){this.randAIMove(7,7,7);}
        if (playerLoc[1] == 2){this.randAIMove(6,6,6);}
        if (playerLoc[1] == 3){this.randAIMove(5,5,5);}
        if (playerLoc[1] == 5){this.randAIMove(3,3,3);}
        if (playerLoc[1] == 6){this.randAIMove(2,2,2);}
        if (playerLoc[1] == 7){this.randAIMove(1,1,1);}
        if (playerLoc[1] == 8){this.randAIMove(2,6,2);}//if player played in opposite corner..... go anywhere
      }
    } else if (this.numLeft == 4){
      //if player has center and moved anywhere BUT 8 > play opposite again to DEFEND
      if (this.board[4] == this.pLetter && this.board[8] == ""){
        if (playerLoc[2] == 1){this.try2win();this.randAIMove(7,7,7);}
        if (playerLoc[2] == 2){this.try2win();this.randAIMove(6,6,6);}
        if (playerLoc[2] == 3){this.try2win();this.randAIMove(5,5,5);}
        if (playerLoc[2] == 5){this.try2win();this.randAIMove(3,3,3);}
        if (playerLoc[2] == 6){this.try2win();this.randAIMove(2,2,2);}
        if (playerLoc[2] == 7){console.log(playerLoc[2]+"!!!!!");this.try2win();this.randAIMove(1,1,1);}
      }
      // if not, //if player played in opposite corner..... go anywhere
        else if (this.board[4] == this.pLetter && this.board[8] == this.pLetter){ 
          this.try2win();
          this.try2defend();
          this.try2random();
      }
      // if player started NON-CENTER, Try to win..... ooooorrrrrrr..........DEFEND STUFF
      if (this.board[4] == this.cLetter){
        this.try2win();
        this.try2defend();
        this.try2random();
      }
    } else if (this.numLeft == 2){
      this.try2win();
      this.try2defend();
      this.try2random();
    }
  };
  
  this.try2win = function(){
    if(this.testWin(0,1,2)){
      console.log("WIN TOP");
      this.randAIMove(0,1,2);
    } else if (this.testWin(6,7,8)){
      console.log("WIN BOTTOM");
      this.randAIMove(6,7,8);
    } else if (this.testWin(8,5,2)){
      console.log("WIN RIGHT");
      this.randAIMove(2,5,8);
    } else if (this.testWin(0,3,6)){
          console.log("WIN LEFT");
          this.randAIMove(0,3,6);
    } else if (this.testWin(0,4,8)){
      console.log("WIN Cross ZERO");
      this.randAIMove(0,4,8);
    } else if (this.testWin(2,4,6)){
      console.log("WIN Cross TWO");
      this.randAIMove(2,4,6);
    } else if (this.testWin(1,4,7)){
      console.log("WIN Center VERT");
      this.randAIMove(1,4,7);
    } else if (this.testWin(3,4,5)){
      console.log("WIN Center HORIZ");
      this.randAIMove(3,4,5);
    }
  };
  this.try2defend = function(){
    if(this.testDefend(0,1,2)){
      console.log("DEFEND TOP");
      this.randAIMove(0,1,2);
    } else if (this.testDefend(6,7,8)){
      console.log("DEFEND BOTTOM");
      this.randAIMove(6,7,8);
    } else if (this.testDefend(8,5,2)){
      console.log("DEFEND RIGHT");
      this.randAIMove(2,5,8);
    } else if (this.testDefend(0,3,6)){
          console.log("DEFEND LEFT");
          this.randAIMove(0,3,6);
    } else if (this.testDefend(0,4,8)){
      console.log("DEFEND Cross ZERO");
      this.randAIMove(0,4,8);
    } else if (this.testDefend(2,4,6)){
      console.log("DEFEND Cross TWO");
      this.randAIMove(2,4,6);
    } else if (this.testDefend(1,4,7)){
      console.log("DEFEND Center VERT");
      this.randAIMove(1,4,7);
    } else if (this.testDefend(3,4,5)){
      console.log("DEFEND Center HORIZ");
      this.randAIMove(3,4,5);
    }
  };
  this.try2random = function(){
    //find any remaining spots and randomly select one to move in.
    function empty(element, index, array){
      if (element == ""){
        return index;
      }
    }
    var c1 = this.board.findIndex(empty);
    if (this.numLeft % 2 == 0){
      this.randAIMove(c1,c1,c1);
      console.log("RANDOM OMG!");
    }
    
  };
  this.randAIMove = function(a, b, c){
    // randomly selects between up to 3 board locations/Tries to play computer there
    var written = false;
    var x;
    var y = [a,b,c];
    while (written == false && this.numLeft > 0) {
      x = FindR(0, 2);
      if ($("." + y[x]).html() == "") {
        $("." + y[x]).html(this.cLetter);
        written = true;
        this.numLeft -= 1;
        this.board[y[x]] = this.cLetter;
        compLoc.push(y[x]);
        console.log(this.board);
        Check4Win(this.cLetter);
      }
    }
  };
  
  this.testWin = function(v1,v2,v3){
    var result = 0;
    if (this.board[v1] == this.cLetter){
      result++;
    }
    if (this.board[v2] == this.cLetter){
      result++;
    }
    if (this.board[v3] == this.cLetter){
      result++;
    }
    if (this.board[v1] == "" || this.board[v2] == "" || this.board[v3] == ""){
      if (result == 2){
        return true;
      }
    }
    return false;
  };
  
  this.testDefend = function(v1,v2,v3){
    var result = 0;
    if (this.board[v1] == this.pLetter){
      result++;
    }
    if (this.board[v2] == this.pLetter){
      result++;
    }
    if (this.board[v3] == this.pLetter){
      result++;
    }
    if (this.board[v1] == "" || this.board[v2] == "" || this.board[v3] == ""){
      if (result == 2){
        return true;
      }
    }
    return false;
  };
  
  function WinAnim(player,x,y,z){
    var bgcolor, txtcolor;
    if (player == "restart"){
      bgcolor = '#333';
      txtcolor = '#fff';
      for (i = 0; i<9; i++){
        $("."+i).animate({
          backgroundColor: bgcolor,
          color: txtcolor
        });
        $("."+i).html("");
      }
      $(".winner").html("");
    } else {
      bgcolor = '#FF9912';
      txtcolor = '#333';
      $("."+x).animate({
        backgroundColor: bgcolor,
        color: txtcolor
      });
      $("."+y).animate({
        backgroundColor: bgcolor,
        color: txtcolor
      });
      $("."+z).animate({
        backgroundColor: bgcolor,
        color: txtcolor
      });
      //display winner and the restart button
      $(".winner").html(player + " wins!");
    }
  }

  function FindR(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

//updating gameboard with jQuery stuff
var ttt = new tControler();

$(document).ready(function() {
  //On Load: show Letter set up window and update settings after button click
  $('#myModal').modal();
  $('#x').click(function() {
    ttt.setLetter("x");
  });
  $('#o').click(function() {
    ttt.setLetter("o");
  });
  $('.restart').click(function() {
    ttt.restart();
  });

  //Clickable Boxes
  $('.0').click(function() {
    ttt.draw(0);
  });
  $('.1').click(function() {
    ttt.draw(1);
  });
  $('.2').click(function() {
    ttt.draw(2);
  });
  $('.3').click(function() {
    ttt.draw(3);
  });
  $('.4').click(function() {
    ttt.draw(4);
  });
  $('.5').click(function() {
    ttt.draw(5);
  });
  $('.6').click(function() {
    ttt.draw(6);
  });
  $('.7').click(function() {
    ttt.draw(7);
  });
  $('.8').click(function() {
    ttt.draw(8);
  });

});