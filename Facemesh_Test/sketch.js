let facemesh;
let video;
let results = [];
let myMask;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  myMask = createGraphics(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", (_results) => {
    //console.log("got prediction", _results[0]);
    results = _results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (results.length > 0) {
    console.log("drawing silo", results[0].annotations.silhouette);
    outline = results[0].annotations.silhouette;
    myMask.clear();
    myMask.noStroke();
    myMask.fill(0, 0, 0, 255); //some nice alphaa in fourth number
    myMask.beginShape();
    for (var i = 0; i < outline.length - 1; i++) {
      myMask.curveVertex(outline[i][0], outline[i][1]);
    }
    myMask.endShape(CLOSE);
  }
  image(myMask, 0, 0);
}

// A function to draw ellipses over the detected keypoints
