"use strict";

import * as $ from 'jquery';
import {Orbit} from './orbit';

class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    private orbit: Orbit;

    constructor() {
        const scale = 0.0000000001;
        const resolution = 360;
        
        this.orbit = new Orbit(100, 100, 25, 0.75, 90 * (Math.PI / 180));
    }

}



function render() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("test");
    //const eccentricity = 0.9;
    //const semiMajor = 75;
    //const aop = 90 * (Math.PI / 180);
    const eccentricity = $("#eccRange").val() as number;
    const semiMajor = 25;
    const aop = ($("#aopRange").val() as number) * (Math.PI / 180);
    console.log("idk: " + eccentricity);
    const semiMinor = semiMajor * Math.sqrt(1 - Math.pow(eccentricity, 2));

    //this.ctx.lineWidth = 2;

    
    
}

//new Renderer();

//$("input[type=range]").on("input", renderer.render());