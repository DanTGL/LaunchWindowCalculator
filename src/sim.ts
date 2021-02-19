"use strict";

import * as $ from 'jquery';
import { Renderer } from "electron";
import { Orbit } from "./orbit";
import { renderOrbit } from "./render_utils";

export const G: number = Math.pow(6.67408,-11);

class Simulation {

    private orbits: Array<Orbit>;

    private focusX: number;
    private focusY: number;


    constructor() {
        this.orbits = new Array<Orbit>();
        this.focusX = 100;
        this.focusY = 100;
    }

    addOrbit(meanAnomaly: number, semiMajor: number, ecc: number, aop: number) {
        this.orbits.push(new Orbit(50000000, this.focusX, this.focusY, semiMajor, ecc, aop * (Math.PI / 180), 0));
    }

    

    render() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "red";
        ctx.fillStyle = "green";

        ctx.beginPath();
        ctx.fillRect(this.focusX, this.focusY, 4, 4);
        ctx.closePath();
        
        ctx.fillStyle = "blue";
        
        this.orbits.forEach(orbit => {
            orbit.render(ctx, $("#epochRange").val() as number);
        });
    }

}

const sim = new Simulation();

sim.addOrbit(20, 50, 0.5, 45);
sim.addOrbit(20, 25, 0.75, 90);

sim.render();

$("input[type=range]").on("input", () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    sim.render();

    const eccentricity = $("#eccRange").val() as number;
    const semiMajor = 25;
    const aop = ($("#aopRange").val() as number);
    //ctx.beginPath();
    //renderOrbit(ctx, semiMajor, eccentricity, aop);
    //ctx.closePath();
});

$(function() {
    console.log("idk123");
});