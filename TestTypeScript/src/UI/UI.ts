/**
 * Created by Adrien on 20/11/2014.
 */
import c = require("../game/canvasCreator");
import  i = require("../inputs/inputs");
import  g = require("../game/game");
export enum MenuState {
    START_MENU,
    IN_GAME,
    SCORE
}
//very important, to correct settimeout scope problem
export  var that : any;

export class UI {
    public state : MenuState = MenuState.START_MENU;
    title : string;
    canvas : HTMLCanvasElement;
    context : CanvasRenderingContext2D;
    alpha : number  = 0;
    cWidht : number;
    cHeight : number;
    alphaTime : number = 0;
    tween : boolean = false;
    from : number = 0;
    public score : number = 0;
    //bool yo say if we are in a tween
    change : boolean = false;
    blockInput : boolean = false;
    basicColor : string = "#A999A9";
    //UpdateMethod of the UI
    DrawUI (): void {
        //main menu draw
        this.context.clearRect(0, 0, this.cWidht, this.cHeight);
        //gestion du tween, par dessus tout le reste
        if(this.tween)
        {
            if(this.from == 0)
                this.alpha += 0.01;
            else
                this.alpha -= 0.01;
            this.context.globalAlpha = this.alpha;
        }
        else
        {
            this.alpha = Math.abs(Math.cos(this.alphaTime));
            this.alphaTime += 0.02;
        }
        if(this.state == MenuState.START_MENU ) {
            //you can click only on the main menu
            if(i.inputs["Space"] && this.blockInput == false)
            {
                var validateSound = new Audio("sounds/validate_sound1.mp3"); // buffers automatically when create
                validateSound.play();
                (<HTMLAudioElement>document.getElementById("mainMenuSound")).pause();
                /*document.getElementById("validateSound").load();
                document.getElementById("validateSound").play();*/
                (<HTMLAudioElement>document.getElementById("ingameTheme")).load();
                (<HTMLAudioElement>document.getElementById("ingameTheme")).play();
                this.UIClick();
                this.score = 0;
                this.blockInput = true;
                g.Start();
            }
            this.MainMenu();
        }
        //in game draw
        if(this.state == MenuState.IN_GAME){
            this.InGameMenu();
        }
        if(this.state == MenuState.SCORE)
        {
            if(i.inputs["Space"] && this.blockInput == false)
            {
                var validateSound2 = new Audio("sounds/validate_sound2.mp3"); // buffers automatically when create
                validateSound2.play();
                this.GameOverClick();
                this.blockInput = true;
            }
            this.ScoreMenu();
        }
    }
    //draw method of the main menu
    MainMenu() : void{
        // drawTitle
        if(this.tween == false)
            this.context.globalAlpha = 1;
        this.context.font = ' 144px "sensation"';
        this.context.fillText(this.title, (this.cWidht / 2) - 420, 200);
        //drawClicktoplay
        if(this.tween == false)
            this.context.globalAlpha = this.alpha;
        this.context.font = ' 40pt "sensation"';
        this.context.fillText("Space to play", (this.cWidht / 2) - 150, 420);
        //DrawCredits
        if(this.tween == false)
            this.context.globalAlpha = 1;
        this.context.font = ' 30pt "sensation"';
        this.context.fillText("By Adrien Carta, Gabin Ferellec & Christophe Galati", 60, 730);


    }
    //draw the ending menu
    ScoreMenu() : void{
        // drawGameOver
        if(this.tween == false)
            this.context.globalAlpha = 1;
        this.context.font = ' 132pt "sensation"';
        this.context.fillText("Game Over", (this.cWidht / 2) - 450, 200);
        //drawScore
        this.context.font = ' 72pt "sensation"';
        this.context.fillText("Score : "+ this.score.toString(), (this.cWidht / 2) - 200, 400);

        //drawReplay
        if(this.tween == false)
            this.context.globalAlpha = this.alpha;
        this.context.font = ' 72pt "sensation"';
        this.context.fillText("Space to Retry", (this.cWidht / 2) - 300, 600);
    }
    //draw the in game HUD
    InGameMenu() : void{
        this.context.fillStyle = "#FFF000";
        this.context.fillRect(0,0,this.cWidht,50);
        this.context.shadowColor = this.basicColor;
        this.context.fillStyle = this.basicColor;
        this.context.font = ' 40pt "sensation"';
        this.context.fillText("Score : " + this.score.toString(), (this.cWidht / 2) - 120, 68);
        this.context.globalAlpha = 0.7;
        this.context.shadowColor = "#0033CC";
        this.context.fillStyle = "#0033CC";
        this.context.fillRect(0,0,50,this.cHeight);
        this.context.shadowColor = "#E60000";
        this.context.fillStyle = "#E60000";
        this.context.fillRect(this.cWidht - 50,0,50,this.cHeight);
        this.context.shadowColor = this.basicColor;
        this.context.fillStyle = this.basicColor;
        this.context.globalAlpha = 1;
        this.context.font = ' 60pt "sensation"';
        this.context.fillText("A", 20, 410);
        this.context.fillText("Z",this.cWidht - 75, 410);

    }
    //initiate the tween
    public  TweenAlpha(way : boolean) : void
    {
        this.tween = true;
        if(way == false)
            this.from = 1;
        else
            this.from = 0;
        this.alpha = this.from;
        setTimeout(that.EndTween,1500);
    }
    //end the tween
    EndTween() : void {
        that.tween = false;
        if(that.context)
            that.context.globalAlpha = 1;
    }
    //end of the tween to go to ingame state
    public ToInGame() : void {
        that.state = MenuState.IN_GAME;
        that.blockInput = false;
        that.TweenAlpha(true);
    }
    //method called when we click on the main menu
    UIClick () : void{
        if(this.state == MenuState.START_MENU){
            this.change = true;
            this.TweenAlpha(false);
            setTimeout(that.ToInGame,1501);
        }
    }
    //method called on game over click
    GameOverClick () : void{
        if(this.state == MenuState.SCORE){
            this.change = true;
            this.TweenAlpha(false);
            setTimeout(that.ToMain,1501);
        }
    }
    //public method called on the player death
    public GameOver() : void{
        this.change = true;
        this.TweenAlpha(false);
        setTimeout(that.ToGameOver,1501);
    }
    //end of the gameover tween
    ToGameOver() : void
    {
        that.state = MenuState.SCORE;
        that.blockInput = false;
        that.TweenAlpha(true);
    }
    //end of the gameover tween
    ToMain() : void
    {
        that.state = MenuState.START_MENU;
        that.blockInput = false;
        that.TweenAlpha(true);
    }
    constructor (w : number, h : number){

        //create canvas and context
        this.canvas = c.CreateCanvas('UI', w, h);
        this.context = this.canvas.getContext("2d");
        this.title = "Kawaii Usagi";
        this.cWidht = w;
        this.cHeight = h;
        this.context.shadowBlur = 15;
        this.context.shadowColor = "#A999A9";
        this.context.fillStyle = "#A999A9";
        //with that, we will not have the this scope problem when we will call methods with settimeout
        that = this;
    }
}