var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life=3;

var MysteryBook;
var zombieGroup;

var bullets = 70;

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/Astro4.jpeg")
  shooter_shooting = loadImage("assets/Astro8.jpeg")

  zombieImg = loadImage("assets/ASTEROID.jpeg")

  bgImg = loadImage("assets/BG 2.jpeg")
  BookImg=loadImage("assets/SUN.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
 
  

//creating the player sprite
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
   player.scale = 0.1
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   

   //create book 
   MysteryBook=createSprite(displayWidth-100,400,50,50);
   MysteryBook.addImage(BookImg);
   MysteryBook.scale = 0.1;
   MysteryBook.debug = true;
   MysteryBook.setCollider("rectangle",0,0,500,500)
   MysteryBook.depth = player.depth
   player.depth = player.depth-1


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    //bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(bgImg); 


if(gameState === "fight"){


  if(life === 1){
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  }

  if(life === 2){
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = false;
  }

  if(life === 3){
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = true;
  }
  
 if (life===0){
   gameState = "lost";
   heart1.visible = false;
   heart2.visible = false;
   heart3.visible = false;
 }
 
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(keyDown("RIGHT_ARROW")){
  player.x = player.x+30
}

if(keyDown("LEFT_ARROW")){
  player.x = player.x-30
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.depth = zombie.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets


//player touching 
if(player.isTouching(MysteryBook)){
  gameState = "won";

}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life  =life-1;
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}



//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  /*textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();*/
  swal({
    title: `Game Over`,
    text: "Oops you lost the game....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "200x200",
    confirmButtonText: "Thanks For Playing"
  });


}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",displayWidth-400,displayHeight-400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
drawSprites();
}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
