"use strict";

import * as $ from 'jquery';

class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        const scale = 0.0000000001;
        const resolution = 360;
        //requestAnimationFrame(render);
        render();
        //this.ctx.moveTo(100,100);
        /*for (let i = 0; i < 360; i += 360 / resolution) {
            let degRad = i * (Math.PI / 180);
            let radius = semiMajor * (1 - Math.pow(eccentricity, 2)) / (1 + eccentricity * Math.cos(degRad))
            let x = originX + radius * Math.cos(degRad);
            let y = originY + radius * Math.sin(degRad);

            this.ctx.rect(x * Math.cos(aop) + y * Math.sin(aop), -x * Math.sin(aop) + y * Math.cos(aop), 1, 1);

            this.ctx.fill();

        }*/
        //this.ctx.stroke();

        //this.ctx.beginPath();

        //this.ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
        //this.ctx.stroke();
    }
}

$("input[type=range]").on("input", render);

function render() {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("test");
    //const eccentricity = 0.9;
    //const semiMajor = 75;
    //const aop = 90 * (Math.PI / 180);
    var eccentricity = $("#eccRange").val() as number;
    const semiMajor = 25;
    var aop = ($("#aopRange").val() as number) * (Math.PI / 180);
    console.log("idk: " + eccentricity);
    let semiMinor = semiMajor * Math.sqrt(1 - Math.pow(eccentricity, 2));

    ctx.strokeStyle = "red";
    //this.ctx.lineWidth = 2;

    ctx.beginPath();
    
    const originX = 50;
    const originY = 50;
    ctx.ellipse(originX, originY, semiMajor, semiMinor, aop, 0, 2 * Math.PI);
    ctx.stroke();
}

new Renderer();