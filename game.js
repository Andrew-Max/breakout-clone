var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var xPos;
var yPos;
var diffX;
var diffY;
var rect1;
var rect2;
var rect3;
var rect4;
var rect5;
var rect6;
var rect7;
var rect8;
// todo: set constants
var ballRadius = 10;
var paddleHeight = 12;
var paddleWidth = 100;
var paddleX;
var paddleY = canvas.height - 40;
var rightPressed = false;
var leftPressed = false;

function setInitialPosition() {
  paddleX = (canvas.width-paddleWidth)/2;
  xPos = canvas.width / 2;
  yPos = canvas.height - 60;
  diffX = 1;
  diffY = -3;
  rect1 = true;
  rect2 = true;
  rect3 = true;
  rect4 = true;
  rect5 = true;
  rect6 = true;
  rect7 = true;
  rect8 = true;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

function drawRect(x, y, h, l, color) {
  ctx.beginPath();
  ctx.rect(x, y, h, l);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

function toggleXDirection() {
  diffX = -diffX;
};

function toggleYDirection() {
  diffY = -diffY;
};

function toggleXandYDirection() {
  toggleYDirection();
  toggleXDirection()
};

// todo: dry up repetition of adding ballRadius
function pointIsBetweenEdges(axisPosition, a, b) {
  return ( axisPosition + ballRadius >= a ) && ( axisPosition  - ballRadius <= b );
};

function pointIsAtEitherEdge(axisPosition, a, b) {
  return ( (axisPosition + ballRadius >= a) && (axisPosition + ballRadius <= a + 5) ) || ( (axisPosition - ballRadius <= b) && (axisPosition - ballRadius >= b - 5) );
};

function checkSideCollision(top, bottom, left, right) {
  return pointIsBetweenEdges(yPos,top, bottom) && pointIsAtEitherEdge(xPos, left, right)
};

function checkTopBottomCollision(top, bottom, left, right) {
 return  pointIsBetweenEdges(xPos, left, right) && pointIsAtEitherEdge(yPos, top, bottom);
}


function checkCornerCollision(top, bottom, left,right) {
  return ( (xPos + ballRadius) == left && (yPos + ballRadius) === top ) || ( (xPos + ballRadius) == left && (yPos - ballRadius) === bottom ) || ( (xPos - ballRadius) == right && (yPos - ballRadius) === bottom ) || ( (xPos - ballRadius) == right && (yPos + ballRadius) === top );
}

function checkTargetCollisions() {
  // todo: use underscore to go through an array of the targets for the current level
  // tood: deal with multiple colllisions canceling out direction change
  if (rect1) {
    if ( checkTopBottomCollision(20, 40, 20, 110) ) {
      rect1 = false;
      toggleYDirection();
    } else if ( checkSideCollision(20, 40, 20, 110) ) {
      rect1 = false;
      toggleXDirection();
    } else {
      drawRect(20, 20 , 90, 20, "green");
    }
  }

  if (rect2) {
    if ( checkTopBottomCollision(20, 40, 130, 220) ) {
      rect2 = false;
      toggleYDirection();
    } else if ( checkSideCollision(20, 40, 130, 220) ) {
      rect2 = false;
      toggleXDirection();
    } else {
      drawRect(130, 20,  90, 20, "orange");
    }
  }

  if (rect3) {
    if ( checkTopBottomCollision(20, 40, 240, 330) ) {
      rect3 = false;
      toggleYDirection();
    } else if ( checkSideCollision(20, 40, 240, 330) ) {
      rect3 = false;
      toggleXDirection();
    } else {
      drawRect(240, 20,  90, 20, "teal");
    }
  }

  if (rect4) {
    if ( checkTopBottomCollision(20, 40, 350, 440) ) {
      rect4 = false;
      toggleYDirection();
    } else if ( checkSideCollision(20, 40, 350, 440) ) {
      rect4 = false;
      toggleXDirection();
    } else {
      drawRect(350, 20,  90, 20, "purple");
    }
  }

  if (rect5) {
    if ( checkTopBottomCollision(40, 60, 20, 110) ) {
      rect5 = false;
      toggleYDirection();
    } else if ( checkSideCollision(40, 60, 20, 110) ) {
      rect5 = false;
      toggleXDirection();
    } else {
      drawRect(20, 40 , 90, 20, "orange");
    }
  }

  if (rect6) {
    if ( checkTopBottomCollision(40, 60, 130, 220) ) {
      rect6 = false;
      toggleYDirection();
    } else if ( checkSideCollision(40, 60, 130, 220) ) {
      rect6 = false;
      toggleXDirection();
    } else {
      drawRect(130, 40,  90, 20, "green");
    }
  }

  if (rect7) {
    if ( checkTopBottomCollision(40, 60, 240, 330) ) {
      rect7 = false;
      toggleYDirection();
    } else if ( checkSideCollision(40, 60, 240, 330) ) {
      rect7 = false;
      toggleXDirection();
    } else {
      drawRect(240, 40,  90, 20, "purple");
    }
  }

  if (rect8) {
    if ( checkTopBottomCollision(40, 60, 350, 440) ) {
      rect8 = false;
      toggleYDirection();
    } else if ( checkSideCollision(40, 60, 350, 440) ) {
      rect8 = false;
      toggleXDirection();
    } else {
      drawRect(350, 40,  90, 20, "teal");
    }
  }
};

function checkWallCollisions() {
  if (xPos  + ballRadius >= canvas.width || xPos - ballRadius <= 0) {
    toggleXDirection();
  }

  if (yPos + ballRadius >= canvas.height || yPos - ballRadius <= 0) {
    toggleYDirection();
  }
};

function checkPaddleCollisions() {
  var paddleTop = paddleY;
  var paddleBotom = paddleY + paddleHeight;
  var paddleLeft = paddleX
  var paddleRight = paddleX + paddleWidth;

  if (checkTopBottomCollision(paddleTop, paddleBotom, paddleLeft, paddleRight)) {
    toggleYDirection();
  }
 //todo: deal with ball going inside paddle;
};

function drawPaddle() {
  drawRect(paddleX, paddleY,  paddleWidth, paddleHeight, "yellow");
};

function movePaddle() {
  if (rightPressed) {
    if (paddleX + paddleWidth  < canvas.width) {
      paddleX += 4;
    }
  } else if (leftPressed) {
    if (paddleX > 0) {
      paddleX -= 4;
    }
  }
};

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  if (gameLost()) {
    drawRect(0,0, canvas.width, canvas.height, "red");
  } else {
    updateBall();
    updatePaddle();
    checkCollisions();
  }
};

function gameLost() {
  return yPos + ballRadius >= canvas.height;
};

function checkCollisions() {
  checkTargetCollisions();
  checkWallCollisions();
  checkPaddleCollisions();
};

function updatePaddle() {
  movePaddle();
  drawPaddle();
};

function updateBall() {
  drawBall();
  xPos += diffX;
  yPos += diffY;
};

function keyDownHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
}

$(document).ready(function () {
  $('button.restart').click(function () {
    setInitialPosition();
  })

  $(document).keydown(keyDownHandler);
  $(document).keyup(keyUpHandler);
});

setInitialPosition();
setInterval(draw, 10);
