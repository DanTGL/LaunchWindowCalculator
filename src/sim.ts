"use strict";

import { Renderer } from "electron";
import { Orbit } from "./orbit";

class Simulation {

    private orbits: Array<Orbit>;

    private focusX: number;
    private focusY: number;

    constructor() {
        this.orbits = new Array<Orbit>();
        this.focusX = 100;
        this.focusY = 100;
    }

    addOrbit(semiMajor: number, ecc: number, aop: number) {
        this.orbits.push(new Orbit(this.focusX, this.focusY, semiMajor, ecc, aop * (Math.PI / 180)));
    }

    render() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "red";

        
        this.orbits.forEach(orbit => {
            ctx.beginPath();
            orbit.render(ctx);
            ctx.closePath();
        });
    }

}

const sim = new Simulation();

sim.addOrbit(15, 0.5, 45);
sim.addOrbit(45, 0.75, 90);

sim.render();

$(function() {
    console.log("idk123");
});