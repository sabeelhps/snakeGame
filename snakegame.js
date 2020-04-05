
function init(){

    canvas=document.getElementById("mycanvas");
    pen=canvas.getContext("2d");
    W=canvas.width;
    H=canvas.height;

    food=getRandomFood();

    snake={
        init_length:5,
        color:"yellow",
        cells:[],
        direction:"right",

        createSnake:function(){

            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
           
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.strokeStyle="black";

                pen.lineWidth=2.5;

                pen.strokeRect(this.cells[i].x*5,this.cells[i].y*5,5,5);
                pen.fillRect(this.cells[i].x*5,this.cells[i].y*5,5,5);
            }

           
        },
        updateSnake:function(){

            var headX=this.cells[0].x;
            var headY=this.cells[0].y;

            // nextHeadX=headX+1;

           

            // this.cells.unshift({x:nextHeadX,y:headY});

            if(headX==food.x&&headY==food.y){
                food=getRandomFood(); 
            }else{
                this.cells.pop();
            }



            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }else{
                nextX=headX;
                nextY=headY-1;
            }



            this.cells.unshift({x:nextX,y:nextY});

            var last_x=Math.round(W/5);
            var last_y=Math.round(H/5);

            if(this.cells[0].x>=last_x){
                this.cells[0].x=0;
            }
            else if(this.cells[0].x<0){
                this.cells[0].x=last_x;
            }
            else if(this.cells[0].y>=last_y){
                this.cells[0].y=0;
            }else if(this.cells[0].y<0){
                this.cells[0].y=last_y;
            }




        }
        

    };
    snake.createSnake();


    function KeyPressed(e){

        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }

    }



    document.addEventListener('keydown',KeyPressed);

}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle="red";
    pen.fillRect(food.x*5,food.y*5,5,5); 
   
}

function update(){

    snake.updateSnake();
 
}

function gameLoop(){
    draw();
    update();
}

function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-5)/5);
    var foodY=Math.round(Math.random()*(H-5)/5);

    foodColors=["red","green","aqua","magenta","coral","orchid"];

    var i=Math.round(Math.round()*foodColors.lenght);

    var food={
        x:foodX,
        y:foodY,
        color:foodColors[i]
    };

    return food; 
}

init();

setInterval(gameLoop,100);