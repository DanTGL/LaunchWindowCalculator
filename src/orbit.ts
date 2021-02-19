"use strict";

import { calcDistance, calcEccentricAnomaly, calcTrueAnomaly } from "./math";

import {G} from "./sim";

export class Orbit {

    private posX: number;
    private posY: number;
    private semiMajor: number;
    private semiMinor: number;
    private ecc: number;
    private aop: number;

    private SGP: number;    // Standard gravitational parameter
    private meanAnomaly: number;
    private initialEpoch: number;
    private focusMass: number;
    private meanMotion: number;

    constructor(focusMass: number, posX: number, posY: number, semiMajor: number, ecc: number, aop: number, initialEpoch: number) {
        this.focusMass = 0.00000005;
        this.posX = posX;
        this.posY = posY;
        this.semiMajor = semiMajor;
        this.semiMinor = semiMajor * Math.sqrt(1 - Math.pow(ecc, 2));
        this.ecc = ecc;
        this.aop = aop;


        this.meanAnomaly = 20 * (Math.PI / 180);
        this.initialEpoch = initialEpoch;

        this.SGP = G * focusMass;
        this.meanMotion = Math.sqrt(this.SGP / Math.pow(this.semiMajor, 3));
    }

    getCurrentMeanAnomaly(epoch: number): number {
        return this.meanAnomaly + this.meanMotion * (epoch - this.initialEpoch);
    }

    render(context: CanvasRenderingContext2D, epoch: number): void {
        const E = calcEccentricAnomaly(this.getCurrentMeanAnomaly(epoch), this.ecc, 3);
        const v = calcTrueAnomaly(this.ecc, E);
        const r = calcDistance(this.semiMajor, this.ecc, E);
        console.log(epoch);
        context.beginPath();
        //context.ellipse(this.posX, this.posY, this.semiMajor, this.semiMinor, 0, 0, 2 * Math.PI);
        for (let i = 0; i < 2 * Math.PI; i += Math.PI / 180) {
            const cos_i = Math.cos(i);
            
            const distance = (this.semiMajor * (1 - Math.pow(this.ecc, 2))) / (1 + this.ecc * cos_i);
            
            const rectX = this.posX + (distance * cos_i);
            const rectY = this.posY + (distance * Math.sin(i));
            context.rect(rectX, rectY, 1, 1);
            context.stroke();
        }
        context.stroke();
        context.closePath();



        context.beginPath();
        const rectX = this.posX + (r * Math.cos(v));
        const rectY = (this.posY - (r * Math.sin(v)));
        //const rectX = this.semiMajor * (Math.cos(E) - this.ecc);
        //const rectY = this.semiMinor * Math.sin(E);
        console.log(rectX + ", " + rectY);
        context.fillRect(rectX, rectY, 3, 3);
        context.closePath();
    }

}