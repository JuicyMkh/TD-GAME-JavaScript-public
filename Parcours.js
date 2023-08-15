
const IMG_SOL = "./img/sol.png"
class Parcours
{
    
    constructor(x,y,width,height,texturePath = "./img/sol.png")
    {
        this.x = x
        this.y = y 
        this.width = width;
        this.height = height;
        this.texture = loadImage(texturePath)
        this.parcoursLists = []

        this.posBeforeDraw_x = x;
        this.posBeforeDraw_y = y;

        this.default = 
        {
            x:x,
            y:y,
        }
    }

    addChemin(final_pos,type_pos)
    {
        let chemin = 
        {
            type:"",
            direction_type:type_pos,
            final:final_pos,
            img_width:this.width,
            img_height:this.height,
        }

       this.parcoursLists.push(chemin) 
    }



    // DESSIN ----------------------------------------

    drawParcours(list)
    {
    //    console.log(list)
        for(let i = 0; i < list.length ; i++)
        {
            // DESSIN DE LA POSITION DE BASE juste en dessous se petit code!
            image(this.texture,this.x,this.y,this.width,this.height)

            while((this.x != list[i].final && list[i].direction_type === "x")|| (this.y != list[i].final && list[i].direction_type === "y"))
            {
                
                if(list[i].direction_type === "x")
                {
                    
                    // --------------- X
                    if(list[i].final > this.x)
                    {
                        if(this.x == (this.posBeforeDraw_x + list[i].img_width) )
                        {   
                            image(this.texture,this.x,this.y,this.width,this.height)
                            this.posBeforeDraw_x = this.x  
                        }             
                        this.x++ 
                    }
                   else if(list[i].final < this.x)
                    {
                        if(this.x == (this.posBeforeDraw_x - list[i].img_width) )
                        {   
                            image(this.texture,this.x,this.y,this.width,this.height)
                            this.posBeforeDraw_x = this.x  
                        }             
                        this.x--
                    }
                }
                else if(list[i].direction_type === "y")
                {
                    
                    // --------------- X
                    if(list[i].final > this.y)
                    {
                        if(this.y == (this.posBeforeDraw_y + list[i].img_height) )
                        {   
                            image(this.texture,this.x,this.y,this.width,this.height)
                            this.posBeforeDraw_y = this.y  
                        }             
                        this.y++ 
                    }
                   else if(list[i].final < this.y)
                    {
                        if(this.y == (this.posBeforeDraw_y - list[i].img_height) )
                        {   
                            image(this.texture,this.x,this.y,this.width,this.height)
                            this.posBeforeDraw_y = this.y 
                        }             
                        this.y--
                    }
                }
                
                
                else{console.log("Il faut definire une direction_type pour le chemin!")} 

               
            }

        }

         
            
                this.x = this.default.x
                this.y = this.default.y
                this.posBeforeDraw_x = this.default.x
                this.posBeforeDraw_y = this.default.y   
        
    }




     
}


// let p = new Parcours(10,10,50,50,"./img/sol.png")
// console.log(loadImage())  JE PENSE NE MARCHE PAS AVEC NODE JS  , POUR IMPORTER LA FONCTION LOADIMG 
