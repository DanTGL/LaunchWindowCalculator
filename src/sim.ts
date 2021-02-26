"use strict";

import * as $ from 'jquery';
import { Orbit } from "./orbit";

import { renderOrbit } from "./render_utils";

export const G: number = Math.pow(6.67408,-11);

class Simulation {

    private orbits: Array<Orbit>;

    private focusX: number;
    private focusY: number;

    constructor() {
        this.orbits = new Array<Orbit>();

        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        
        this.focusX = canvas.width / 2;
        this.focusY = canvas.height / 2;
    }

    addOrbit(orbitalPeriod: number, meanAnomaly: number, semiMajor: number, ecc: number, aop: number) {
        this.orbits.push(new Orbit(orbitalPeriod, this.focusX, this.focusY, semiMajor, ecc, aop * (Math.PI / 180), 0));
    }

    

    render() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "red";
        ctx.fillStyle = "green";

        ctx.beginPath();
        ctx.fillRect(this.focusX, this.focusY, 2, 2);
        ctx.closePath();
        
        ctx.fillStyle = "blue";
        
        this.orbits.forEach(orbit => {
            orbit.render(ctx, $("#epochRange").val() as number);
        });

        renderOrbit(ctx, this.focusX - 5, this.focusY + 15, 60, 0.56, 45 * Math.PI / 180);
    }

}

const sim = new Simulation();

sim.addOrbit(50, 20, 75, 0.5, 45);
sim.addOrbit(25, 20, 50, 0.75, 90);

sim.render();

$("input[type=range]").on("input", () => {
    sim.render();

    $("#epoch").text($("#epochRange").val() as number);
});
