class Food {
    constructor(){
    this.image=loadImage("images/Milk.png");
    this.foodStock=0;
    this.lastFed;
    }
    
    getFoodStock(){ 
        return this.foodStock;       
        }
    
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
        
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
      }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    bedroom(){
        background(bedroomImg, 350, 500);
    }

    garden(){
        background(gardenImg, 350, 500);
    }

    washroom(){
        background(washroomImg, 350, 500);

        
    }
    
    display(){
        var x=80 , y =50;
    
        if(this.foodStock != 0 ){
            for( var i=0; i<this.foodStock; i++){
            if( i % 10 ==0){
                x=20;
                y=y+50;
            }
         
            image(this.image,x,y,50,50);
            x=x+30;
        }
        }
       } 
      }