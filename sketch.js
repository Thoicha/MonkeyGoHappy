  
var monkey , monkey_running;
var banana,bananaImage;
var obstacle,obstacleImage;
var ground;
var bananaGroup, obstacleGroup;
var survivalTime;

function preload(){
  
  
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png",      "monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(100,330,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400,390,800,10);
  ground.velocityX = -4;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
  survivalTime = 0;
  
}


function draw() {
  
  background(250);
  
  if (ground.x < 0){
    ground.x = 400;
  }
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
    
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.3;
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  text("Survival Time: "+survivalTime,100,50);

  drawSprites();  
}

function spawnBananas(){
  if (frameCount % 80 === 0){
   var banana = createSprite(400,165,10,40);
   banana.y = Math.round(random(120,200));
   banana.addImage("banana",bananaImage);
   banana.velocityX = -1;
   banana.scale = 0.1;
   banana.lifetime = 400;
   
   banana.depth = monkey.depth;
   monkey.depth = monkey.depth+1; 
    
   bananaGroup.add(banana);
 }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(400,350,10,40);
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.velocityX = -1;
   obstacle.scale = 0.2;
   obstacle.lifetime = 400;
    
    
   obstaclesGroup.add(obstacle);
 }
}

