var mouseX;
var mouseY;

var car1;
var car2;

var trackGrid;

var track1;
window.onload = function() {
  //Canvas creation stuff
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvas.addEventListener('mousemove', updateMousePos);
  //Create the tracks
  trackGrid = new TrackGrid(20, 15);
  track1 = new Track();
  trackGrid.create(track1.numOne());
  //Create players
  car1 = new Car();
  car1.findBegin(trackGrid);
  //Define FPS for canvas
  var framesPerSecond = 60;
  setInterval(draw, 1000 / framesPerSecond);
};

function draw() {
  background('black');
  for (i = 0; i < trackGrid.layout.length; i++) {
    trackGrid.layout[i].show();
  }
  car1.show();
}

//CONSTRUCTOR FUNCTIONS
function Car() {
  this.x;
  this.y;
  this.width = 20;
  this.height = 20;

  this.show = function() {
    fill('white');
    rect(this.x, this.y, this.width, this.height);
  };

  this.findBegin = function(trackGrid) {
    for (i = 0; i < trackGrid.layout.length; i++) {
      if (trackGrid.layout[i].type == 2) {
        trackGrid.layout[i].type = 0;
        this.x = trackGrid.layout[i].x;
        this.y = trackGrid.layout[i].y;
        break;
      }
    }
  };
}
function Piece(i, j) {
  this.width = 40;
  this.height = 40;
  this.x = i * this.width;
  this.y = j * this.height;

  this.type;

  this.show = function() {
    var brickGap = 2;
    fill('blue');
    if (this.type == 1) {
      rect(this.x, this.y, this.width - brickGap, this.height - brickGap);
    }
    if (this.type == 4) {
      fill('green');
      rect(this.x, this.y, this.width - brickGap, this.height - brickGap);
    }
    //Debugging. Displaying the row and col # for each brick
    fill('white');
    //text('r# ' + this.x / this.width, this.x + this.width / 2 - 10, this.y + this.height / 2);
    //text('c#: ' + this.y / this.height, this.x + this.width / 2 - 10, this.y + this.height / 2 + 10);
    //text('i: ' + i, this.x + this.width / 2 - 10, this.y + this.height / 2);
  };
}

function Track() {
  this.track = [];

  this.numOne = function() {
    this.track = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
                  1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1,
                  1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1,
                  1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 4, 4, 1,
                  1, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                ];
    return this.track;
  };
}

function TrackGrid(cols, rows) {
  this.layout = [];
  this.layoutRows = rows;
  this.layoutCols = cols;

  this.create = function(track) {
    for (var j = 0; j < this.layoutRows; j++) {
      for (var i = 0; i < this.layoutCols; i++) {
        this.layout.push(new Piece(i, j));
      }
    }
    for (i = 0; i < this.layout.length; i++) {
      this.layout[i].type = track[i];
    }
  };
}

//HELPER FUNCTIONS
function text(string, x, y, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillText(string, x, y, color);
}

function rect(x, y, width, height) {
  canvasContext.fillRect(x, y, width, height);
}

function ellipse(x, y, radius) {
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function fill(color) {
  canvasContext.fillStyle = color;
}

function background(color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}
