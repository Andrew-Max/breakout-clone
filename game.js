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
var ballRadius = 10;

function setInitialPosition() {
  xPos = canvas.width / 2;
  yPos = canvas.height - 30;
  diffX = 1;
  diffY = -3;
  rect1 = true;
  rect2 = true;
  rect3 = true;
  rect4 = true;
}


function drawBall() {
  ctx.beginPath();
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

function drawRect(x, y, h, l) {
  ctx.beginPath();
  ctx.rect(x, y, h, l);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function toggleXDirection() {
  diffX = -diffX;
}

function toggleYDirection() {
  diffY = -diffY;
}

function toggleXandYDirection() {
  toggleYDirection();
  toggleXDirection()
}

function checkSideCollision(top, bottom, left, right) {
return ( (xPos + ballRadius) === left || (xPos  - ballRadius) === right) && ( (yPos + ballRadius >= top) && (yPos - ballRadius <= bottom) );
}

function checkTopBottomCollision(top, bottom, left, right) {
 return ( (xPos + ballRadius) >= left && (xPos  - ballRadius) <= right) && ( (yPos + ballRadius === top) || (yPos - ballRadius === bottom) );
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
      drawRect(20, 20 , 90, 20);
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
      drawRect(130, 20,  90, 20);
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
      drawRect(240, 20,  90, 20);
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
      drawRect(350, 20,  90, 20);
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

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height)
  drawBall();
  xPos += diffX;
  yPos += diffY;

  checkTargetCollisions();
  checkWallCollisions();
};

$(document).ready(function () {
  $('button.restart').click(function () {
    setInitialPosition();
  })
});

setInitialPosition();
setInterval(draw, 10);
