/**
 * Created by Adrien on 20/11/2014.
 */
import c = require("../game/canvasCreator");
enum MenuState {
    START_MENU,
    IN_GAME
}

export class UI {
    state : MenuState = MenuState.START_MENU;
    title : string;
    canvas : HTMLCanvasElement;
    context : CanvasRenderingContext2D;

    DrawUI (): void {
        this.context.fillText(this.title,100,100);

    }
    constructor (){
        //create canvas and context
        this.canvas = c.CreateCanvas('UI', 500, 500);
        this.context = this.canvas.getContext("2d");
        this.title = "Kawaii Usagi";
        this.context.font = 'italic 40pt Calibri';
    }
}