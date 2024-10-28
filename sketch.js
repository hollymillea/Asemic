let noiseOffset = 0.0;

function setup() {
  createCanvas(800, 600);
  background(255);
  noLoop(); // Ensures this runs only once
  strokeWeight(2);
}

function draw() {
  for (let i = 0; i < 20; i++) { // Adjust to create more or fewer lines
    asemicStroke(random(width), random(height));
  }
}

function asemicStroke(x, y) {
  let points = [];
  let numPoints = int(random(5, 15)); // Vary the "characters" in the stroke

  for (let i = 0; i < numPoints; i++) {
    // Random offsets for organic placement
    let offsetX = x + random(-30, 30);
    let offsetY = y + random(-30, 30);
    
    // Add Perlin noise to make the strokes fluid
    let noiseValue = noise(noiseOffset) * 50;
    points.push(createVector(offsetX + noiseValue, offsetY + noiseValue));
    noiseOffset += 0.1;
  }

  // Draw connected points with bezier curves
  noFill();
  beginShape();
  
  // Start with a vertex before bezierVertex()
  vertex(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 1; i++) {
    let p0 = points[i];
    let p1 = points[i + 1];
    let ctrl1 = createVector(p0.x + random(-10, 10), p0.y + random(-10, 10));
    let ctrl2 = createVector(p1.x + random(-10, 10), p1.y + random(-10, 10));
    bezierVertex(ctrl1.x, ctrl1.y, ctrl2.x, ctrl2.y, p1.x, p1.y);
  }
  
  endShape();
}

