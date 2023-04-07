var PLAY=1;
var END=0;
var gameState=PLAY;
var bree,sel,groundImg,gameOver,gameOverImg,score;
var demonsGroup1,demonsGroup2,goruchel,isel,demon;
var ground,invisibleGround;
function preload(){
   breeImage=loadImage("bree.png") ;
   selImg=loadImage("sel.png");
isel=loadImage("isel.png");
goruchel=loadImage("goruchel.png");
groundImg=loadImage("background0.png");
gameOverImg=loadImage("gameover.png");
}


function setup(){
    canvas = createCanvas(400,400);


ground=createSprite(200,200,800,10);
ground.addImage("groundImg",groundImg);
ground.scale=1;


bree=createSprite(30,350,20,20);
  bree.addImage("breeImage",breeImage);
  bree.scale=0.04;
  bree.setCollider("circle",0,0,600);
  bree.debug=true;
  
  sel=createSprite(100,370,20,20);
  sel.addImage("selImg",selImg);
  sel.scale=0.2;
  sel.setCollider("circle",0,0,100);
  sel.debug=true;
invisibleGround=createSprite(400,375,800,10);
invisibleGround.visible=false;
  demonsGroup1=new Group();
demonsGroup2=new Group();
 score=0; 
  
}

function draw() {
    background('black');
    if(gameState===PLAY){
spawnObstacles();
if(keyDown("space")&&sel.y>=200){
    sel.velocityY=-2;
}
if(keyDown("left")){
    sel.x=sel.x-2;
}
if(keyDown("right"))
{
  sel.x=sel.x+2
}

sel.velocityY=sel.velocityY+0.5;

if(demonsGroup1.isTouching(sel)){
    demonsGroup1.destroyEach();
    score=score+1;
}

if(demonsGroup2.isTouching(sel)){
  demonsGroup2.destroyEach();
  score=score+1;
}

if(demonsGroup1.isTouching(bree)||demonsGroup2.isTouching(bree)){
    gameState=END;
}
    }

else if(gameState===END){
  gameOver=createSprite(200,200,20,20);
  gameOver.addImage("gameOverImg",gameOverImg);
demonsGroup1.destroyEach();
demonsGroup2.destroyEach();
demonsGroup1.setVelocityXEach(0);
demonsGroup2.setVelocityXEach(0);
sel.destroy();
bree.destroy();

}

    sel.collide(invisibleGround);
    drawSprites();
fill("purple");
textSize(25);
    text("Score:"+score,150,30);
}

function spawnObstacles(){
   if(frameCount%90===0){
    demon=createSprite(700,Math.round(random(200,350)),20,20);
    demon.velocityX =-3;
    demon.scale=0.08;
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: demon.addImage(isel);
      demonsGroup1.add(demon);
              break;
      case 2: demon.addImage(goruchel);
      demonsGroup2.add(demon);
      default: break;
    }
   
   
   } 
}