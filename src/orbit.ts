"use strict";

export class Orbit {

    private posX: number;
    private posY: number;
    private semiMajor: number;
    private semiMinor: number;
    private ecc: number;
    private aop: number;

    constructor(posX: number, posY: number, semiMajor: number, ecc: number, aop: number) {
        this.posX = posX;
        this.posY = posY;
        this.semiMajor = semiMajor;
        this.semiMinor = semiMajor * Math.sqrt(1 - Math.pow(ecc, 2));
        this.ecc = ecc;
        this.aop = aop;
    }

    render(context: CanvasRenderingContext2D): void {
        context.ellipse(this.posX, this.posY, this.semiMajor, this.semiMinor, this.aop, 0, 2 * Math.PI);
        context.stroke();
    }

}