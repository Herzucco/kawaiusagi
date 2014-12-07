/**
 * Created by Adrien on 20/11/2014.
 */
import c = require("../game/canvasCreator");
enum MenuState {
    START_MENU,
    IN_GAME,
    SCORE
}

export class UI {
    public state : MenuState = MenuState.SCORE;
    title : string;
    canvas : HTMLCanvasElement;
    context : CanvasRenderingContext2D;
    alpha : number  = 0;
    cWidht : number;
    cHeight : number;
    alphaTime : number = 0;
    public score : number = 0;
    DrawUI (): void {
        //main menu draw
        this.context.clearRect(0, 0, this.cWidht, this.cHeight);
        if(this.state == MenuState.START_MENU) {

            // drawTitle
            this.context.globalAlpha = 1;
            this.context.font = ' 72px "sensation"';
            this.context.fillText(this.title, (this.cWidht / 2) - 200, 100);
            //drawClicktoplay
            this.context.globalAlpha = this.alpha;
            this.context.font = ' 20pt "sensation"';
            this.context.fillText("Click to play", (this.cWidht / 2) - 80, 200);
            this.alpha = Math.abs(Math.cos(this.alphaTime));
            this.alphaTime += 0.02;
        }
        //in game draw
        if(this.state == MenuState.IN_GAME){
            this.context.font = ' 40pt "sensation"';
            this.context.fillText("Score : " + this.score.toString(), (this.cWidht / 2) - 100, 100);
        }
        if(this.state == MenuState.SCORE)
        {
            // drawGameOver
            this.context.globalAlpha = 1;
            this.context.font = ' 60pt "sensation"';
            this.context.fillText("Game Over", (this.cWidht / 2) - 200, 150);
            //drawScore
            this.context.font = ' 20pt "sensation"';
            this.context.fillText("Score : "+ this.score.toString(), (this.cWidht / 2) - 80, 250);

            //drawReplay
            this.context.globalAlpha = this.alpha;
            this.context.font = ' 20pt "sensation"';
            this.context.fillText("Click to Retry", (this.cWidht / 2) - 80, 350);
            this.alpha = Math.abs(Math.cos(this.alphaTime));
            this.alphaTime += 0.02;
        }

    }

    UIClick () : void{
        if(this.state == MenuState.START_MENU){
            
        }
    }
    constructor (w : number, h : number){

        //create canvas and context
        this.canvas = c.CreateCanvas('UI', 500, 500);
        this.context = this.canvas.getContext("2d");
        this.title = "Kawaii Usagi";
        this.cWidht = w;
        this.cHeight = h;
    }
}