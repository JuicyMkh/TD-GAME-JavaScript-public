class Enemy
{
    constructor(castle)
    {
        //STATS
        this.hp = undefined;
        this.damage = undefined;
        this.speed = 1;

        //INFO
        this.type = "enemy"
        this.x = 130;
        this.y = 130;
        this.width = 50;
        this.height = 50;
        this.img_path = "./img/enemy1.png"
        
        this.goToCastle(castle)
        
    }

    goToCastle(castle)
    {
        while(this.x != castle.x && this.y != castle.y)
        {
            
        let interval = setInterval(function() {
                
                if(this.x < castle.x)
            {
                this.x += this.speed;
            }
            else if(this.x > castle.x)
            {
                this.x -= this.speed
            }

            //-------------------------------------
            // Y GOIN
            if(this.y < castle.y)
            {
                this.y += this.speed;
            }
            else if(this.y > castle.y)
            {
                this.y -= this.speed
            }
         }, 1000);
            
         clearInterval(interval)
            //-------------------------------------
           
        }
    }
}