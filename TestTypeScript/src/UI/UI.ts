/**
 * Created by Adrien on 20/11/2014.
 */
import c = require("../game/canvasCreator");
enum MenuState {
    START_MENU,
    IN_GAME
}

export class UI {
    public state : MenuState = MenuState.IN_GAME;
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
            this.context.font = 'italic 40pt Calibri';
            this.context.fillText(this.title, (this.cWidht / 2) - 100, 100);
            //drawClicktoplay
            this.context.globalAlpha = this.alpha;
            this.context.font = 'italic 20pt Cambria';
            this.context.fillText("Click to play", (this.cWidht / 2) - 80, 200);
            this.alpha = Math.abs(Math.cos(this.alphaTime));
            this.alphaTime += 0.02;
        }
        //in game draw
        if(this.state == MenuState.IN_GAME){
            this.context.font = 'italic 40pt Calibri';
            this.context.fillText("Score : " + this.score.toString(), (this.cWidht / 2) - 100, 100);
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