var dog ,happyDog;
var database;
var foodS, foodStock;
var allFood;
var feed, addFood;
var lastFed , fedTime; 
var foodObj;

var gameState;

var bedroomImg, gardenImg, washroomImg;

function preload()
{
  dog_image=loadImage("images/dogImg.png");
  dog_Image2=loadImage("images/dogImg1.png");
  bedroomImg=loadImage("images/Bed Room.png");
  gardenImg=loadImage("images/Garden.png");
  washroomImg=loadImage("images/Wash Room.png");

}

function setup() 
{  
  createCanvas(350, 500);
  database=firebase.database();

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  foodObj= new Food();
  
  dog=createSprite(150,350);
  dog.addImage(dog_image);
  dog.scale=0.3;

  feed=createButton("Feed the Dog");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  console.log(lastFed);
  
}


function draw() 
{  
  background(46,139,87);
  foodObj.display();

   fedTime=database.ref('FeedTime');
   fedTime.on("value", function(data)
	{
     lastFed=data.val();
   	})
   fill(255,255,254);
   textSize(15);

   if(lastFed>=12){
     text("Last Feed: "+ lastFed%12 + " PM", 50,30);
    }else if(lastFed==0){
      text("Last Feed: 12 AM",50,30);
    }else{
      text("Last Feed: "+ lastFed + " AM", 50,30);
    }

  if (gameState === "Hungry") {
    dog.visible=true;
    feed.show();
    addFood.show();
    dog.addImage(dog_image);
  } else {
 
    feed.hide();
    addFood.hide();
    dog.visible=false;

  }
  
 currentTime = hour();
  if (currentTime == (lastFed + 1)) {
      update("Playing");
      foodObj.garden();
  } else if (currentTime == (lastFed + 2)) {
      update("Sleeping");
      foodObj.bedroom();
  } else if (currentTime >  (lastFed + 2) && currentTime <= (lastFed + 4)) {
      update("Bathing");
      foodObj.washroom();
  } else {
      update("Hungry");
      foodObj.display();
  }
   
  drawSprites();
}


function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function update (state) {
  database.ref("/").update({
    gameState : state
  });
}


function addFoods()
{
foodS++;

database.ref('/').update({
  Food:foodS
})

dog.addImage(dog_image);
}

function feedDog(){
dog.addImage(dog_Image2);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})

}

