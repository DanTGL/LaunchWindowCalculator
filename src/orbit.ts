"use strict";

import { calcDistance, calcEccentricAnomaly, calcTrueAnomaly } from "./math";

export class Orbit {

    private posX: number;
    private posY: number;
    private semiMajor: number;
    private ecc: number;
    private aop: number;

    private meanAnomaly: number;
    private initialEpoch: number;
    private orbitalPeriod: number;
    private meanMotion: number;

    constructor(orbitalPeriod: number, posX: number, posY: number, semiMajor: number, ecc: number, aop: number, initialEpoch: number) {
        this.orbitalPeriod = orbitalPeriod;
        this.posX = posX;
        this.posY = posY;
        this.semiMajor = semiMajor;
        this.ecc = ecc;
        this.aop = aop;


        this.meanAnomaly = 20 * (Math.PI / 180);
        this.initialEpoch = initialEpoch;

        this.meanMotion = 2 * Math.PI / orbitalPeriod;
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
        console.log(rectX + ", " + rectY);
        context.fillRect(rectX, rectY, 3, 3);
        context.closePath();
    }

}