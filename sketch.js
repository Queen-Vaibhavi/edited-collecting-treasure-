  




var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var spike1,spike2;
var spike1Img,spike2Img;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  spike1 = loadImage("spikes for game2.jpg");
  spike2 = loadImage("spikes for game3.jpg");
}

//making gamestates
var PLAY = 1;
var END = 0;
var life = 5;
var gameState = 1;
var treasureCollection = 0;


function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
//path.velocityY = 4;

//creating spikes
  spike1 = createSprite(398,200,8,400);
  spike1.shapeColor = color("purple");
  //spike1.addImage(spike1Img);
  
  spike2 = createSprite(5,200,8,400);
   spike2.shapeColor = color("purple");
  //spike2.addImage(spike2Img);
  //same problem of fruit ninja that's why couldnt upload spikes' images.
  
//creating boy running(
boy = createSprite(300,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
   
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === PLAY){
     boy.x = World.mouseX;
     //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
    path.velocityY = 4;
  
    // code for reducing life 
    if(boy.isTouching(spike1)|| boy.isTouching(spike2)){
       life = 0;
       }
       
      //incrementing treasure collection.
if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 200;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
      //CODE FOR GAME OVER.
    }else if  (swordGroup.isTouching(boy) || life === 0) {
        swordGroup.destroyEach();
      gameState = END;
      }
 textSize(20);
  fill(255);
    
  //show score
  text("Treasure: "+ treasureCollection,100,30);
    
    //show lives
   text("lives: 5",180,30);
    

    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
  }
    
  
  if(gameState == END){
    cashG.destroyEach();
    cashG.setVelocityYEach(0);
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach(0);
    jwelleryG.destroyEach();
     jwelleryG.setVelocityYEach(0);
     swordGroup.destroyEach();
     swordGroup.setVelocityYEach(0);
     path.velocityY = 0;
    
      boy.addAnimation("SahilRunning",endImg)
    boy.x = 300;
    boy.y = 300;
    boy.scale = 1;
  

  }
    
  
  
  
 //displaying treasureCollection
 text("treasureCollection: "+ treasureCollection, 500,50);
  

  drawSprites();
 
}//function draw
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
//please tell why I can't see the treasure heading.
