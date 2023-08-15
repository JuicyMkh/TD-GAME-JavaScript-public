//SCREEN SETUP
const gameWidth = 1000
const gameHeight = 700
const gamePosX = 500
const gamePosY = 50

//CASTLE



const castle =
{
  type:"castle",
  hp:100,
  x: (0 + (gameWidth / 2) - 50),
  y: gameHeight - (100),
  width:100,
  height:100,
  img_path:"./img/castle.png",

}


//PLAYER
let player; 

//PARCOURS
let parc1;

// GENERE DU HASARD MON POTE!
function ourRandom(min,max)
{
  let maxToPut = (max - min) + 1
  let hasard = Math.floor(Math.random()  * maxToPut) + min

  return hasard;
}

//COLLISIONS LISTS // OU BIEN LA LISTES DES MOBS ET ELEMENTS!
let collisionLists = 
[
  {
    type:"area",
    x:0,
    y:0,
    width:gameWidth,
    height:gameHeight,
    imgPath:"./img/mur.png",
    box:function()
    {
      return{
        left:null,
        right:null,
        top:null,
        bottom:null,
      }
    },
  }
]

function pushElementIntoCollisionCheckList(x,y,width,height,imgPath = "./img/mur.png",type = "enemy",uneFonction = null)
{
  collisionLists.push({
    type:type,
    x:x,
    y:y,
    width:width,
    height:height,
    imgPath:loadImage(imgPath),
    fonctionList:uneFonction,
    box:function()
    {
      return{
        left:null,
        right:null,
        top:null,
        bottom:null,
      }
    },
  })
}

class Element
{
  constructor(posX,posY,imgPath)
  {
    this.x = posX
    this.y = posY
    this.img = loadImage(imgPath)
    this.width = 50
    this.height = 50

    pushElementIntoCollisionCheckList(posX,posY,width,height,imgPath)
  } 
}

class Player
{
  static speed =
  {
    defaultSpeed:10,
    left:10,
    right:10,
    up:10,
    down:10,
    resetSpeed:function()
    {
      return Player.speed.defaultSpeed;
    },
  }

  static showInfo = 0;

  constructor(posX,posY,imgPath)
  {
    this.x = posX
    this.y = posY
    this.img = loadImage(imgPath)
    this.width = 50
    this.height = 50

  } 

  // FONCTION - LOGIQUE , DOWN HERE ! 

  collisionCheck()
  {
    
    for(let i = 0;i < collisionLists.length;i++)
    {
      //All collisionTestCheck , DOWN HERE ! 

      if(collisionLists[i].type === "area")
      {
        //LEFT SIDE 
            if((this.x - collisionLists[i].x)>= 10)
          {
            Player.speed.left = Player.speed.resetSpeed()
          }
          else if(this.x - collisionLists[i].x < 10)
          {
            Player.speed.left = this.x - collisionLists[i].x 
          }


          //Right SIDE 
          if( ( (collisionLists[i].x + collisionLists[i].width ) - (this.x + this.width )) >= 10)
          {
            Player.speed.right = Player.speed.resetSpeed()
          }
          else if( ( (collisionLists[i].x + collisionLists[i].width ) - (this.x + this.width)) < 10)
          {
            Player.speed.right =  (collisionLists[i].x + collisionLists[i].width ) - (this.x + this.width )
          }


            //LEFT UP 
          if((this.y - collisionLists[i].y)>= 10)
          {
            Player.speed.up = Player.speed.resetSpeed()
          }
          else if(this.y - collisionLists[i].y < 10)
          {
            Player.speed.up = this.y - collisionLists[i].y 
          }


          //LEFT DOWN
          if( ( (collisionLists[i].y + collisionLists[i].height ) - (this.y + this.height )) >= 10)
          {
            Player.speed.down = Player.speed.resetSpeed()
          }
          else if( ( (collisionLists[i].y + collisionLists[i].height ) - (this.y + this.height)) < 10)
          {
            Player.speed.down =  (collisionLists[i].y + collisionLists[i].height ) - (this.y + this.height )
          }
    }
      // ----------------------------------- UP AREA COLLISSION , pour ne pas pouvoir sortir de la map! 



      
      // ----------------------------------- DOWN AREA COLLISSION , collision avec les enemy! 
      if(collisionLists[i].type === "enemy")
        // ------------   COLLISION ENEMY ----------
        {
          //LEFT SIDE CHECK
          if(      (this.y > collisionLists[i].y && this.y < collisionLists[i].y + collisionLists[i].height)
               ||  (this.y + this.height > collisionLists[i].y && this.y + this.height < collisionLists[i].y + collisionLists[i].height) )     
        {
            if((this.x - Player.speed.left) >= collisionLists[i].x && this.x - Player.speed.left  <= collisionLists[i].x + collisionLists[i].width)
            {
              if((this.x - (collisionLists[i].x + collisionLists[i].width)) >= 0)
              {
                Player.speed.left = this.x - (collisionLists[i].x + collisionLists[i].width )  
               
              }
            }
        }

        // RIGHT SIDE CHECK
          if(     (this.y > collisionLists[i].y && this.y < collisionLists[i].y + collisionLists[i].height)
              ||  (this.y + this.height > collisionLists[i].y && this.y + this.height < collisionLists[i].y + collisionLists[i].height) )     
                {
                    if((this.x + this.width + Player.speed.right) >= collisionLists[i].x && (this.x + this.width + Player.speed.right)  <= (collisionLists[i].x + collisionLists[i].width))
                    {
                 
                      if((collisionLists[i].x - (this.x + this.width)) >= 0)
                          {
                            Player.speed.right = collisionLists[i].x - (this.x + this.width) 
                                   
                            
                          }
                      
                    }
                }



                  // UP SIDE CHECK 

                if(    (this.x > collisionLists[i].x && this.x < collisionLists[i].x + collisionLists[i].width)
                    || (this.x + this.width > collisionLists[i].x && this.x + this.width < collisionLists[i].x + collisionLists[i].width) )     
         {
             if((this.y - Player.speed.up) >= collisionLists[i].y && this.y - Player.speed.up  <= collisionLists[i].y + collisionLists[i].height)
             {
               
               if((this.y - (collisionLists[i].y + collisionLists[i].height)) >= 0)
               {
                Player.speed.up = this.y - (collisionLists[i].y + collisionLists[i].height )  
                        
                 
               }
             }
         }
 
         // DOWN SIDE CHECK --------------------------- DOWN ---------------------------------
                  if(    (this.x > collisionLists[i].x && this.x < collisionLists[i].x + collisionLists[i].width)
                  || (this.x + this.width > collisionLists[i].x && this.x + this.width < collisionLists[i].x + collisionLists[i].width) )     
          {
            if((this.y + this.height + Player.speed.down) >= collisionLists[i].y && (this.y + this.height + Player.speed.down)  <= (collisionLists[i].y + collisionLists[i].height))
            {
              
              if((collisionLists[i].y  - (this.y + this.height)) >= 0)
              {
               Player.speed.down = collisionLists[i].y  - (this.y + this.height)  
                      
               }
          }
          }
        }



      //END OF LOOP
    }
    //END OF FUNCTION
  }

  moveLeft()
  {
    this.x -= Player.speed.left
    
  }
  moveRight()
  {
    this.x += Player.speed.right
  }
  moveUp()
  {
    this.y -= Player.speed.up
  }
  moveDown()
  {
    this.y += Player.speed.down
  }


  KeyPressed()
  {
    //MOVING
    if(key === "q")
    {
      this.moveLeft()
      key = ""
    }
    if(key === "d")
    {
      this.moveRight()
      key = ""
    }
    if(key === "z")
    {
      this.moveUp()
      key = ""
    }
    if(key === "s")
    {
      this.moveDown()
      key = ""
    }


    //CREATOR KEY , INFORMATIONS , DIRECTIVE ETC ...
    
    if(key === "c" && Player.showInfo <= 3 )
    {
      key = ""
      Player.showInfo++
      
    }
    else if(key === "c" && Player.showInfo > 3)
    {
      Player.showInfo = 0;
    }

    if(Player.showInfo > 0  && Player.showInfo < 3)
    {
      fill(255,69,0); // Couleur du texte (noir)
      textSize(15); // Taille de la police
      text("C : true / false informations", 500, 20);
      text("V : Spawn Random Enemy", 500, 50);
      text("A Z Q S : move", 700, 50);
    }
    
    if(key === "v")
    {
      key = ""
      let enemy = new Enemy(castle)
      pushElementIntoCollisionCheckList(enemy.x,enemy.y,enemy.width,enemy.height,enemy.img_path,enemy.type) //   
      

    }
    if(key === "+")
    {
      Player.speed.defaultSpeed++
    }
    else if(key === "-")
    {
      Player.speed.defaultSpeed--
    }
  }
  
}




function setup() {

  //GAME SCREEN ----------------------------------------------------
    let GameScreen = createCanvas(gameWidth, gameHeight);
    GameScreen.position(gamePosX,gamePosY)
    
  // ----------------------------------------------------
  // CASTLE --------------------------
    pushElementIntoCollisionCheckList(castle.x,castle.y,castle.width,castle.height,castle.img_path,castle.type)
  // ----------------------------------------------------

  // PLAYER --------------------------
    player = new Player(55,10,"./img/BOX HEAD.png")
    // ----------------------------------------------------

 //PARCOURS + CHEMINS -----------------------------------
  //  ''
    let listOfParcours = 
    [
      parc1 = new Parcours(100,0,75,75),
      parc2 = new Parcours(500,0,75,75)
    ]
  
  let listOfChemins = 
    [  
     parc1.addChemin(300,"y"),
     parc1.addChemin(500,"x")
    ]
 
//-------------------------------------------------------
  
  
   

  }
  
  function draw() {
    background(66);

   

    //DRAW ELEMENT && FUNCTIONS
    for(let i =1;i< collisionLists.length;i++)
    {
      image(collisionLists[i].imgPath,collisionLists[i].x,collisionLists[i].y,collisionLists[i].width,collisionLists[i].height)

      // if(collisionLists[i].type === "enemy")
      // {
      //   // collisionLists[i].fonctionList(castle)
      // }
    }

    //DRAW PARCOURS
    //  parc1.drawParcours(parc1.parcoursLists)
    





      //All of Player ! , Down here.
    image(player.img,player.x,player.y,player.width,player.height)
    player.KeyPressed()
    player.collisionCheck()
    
  }

  

