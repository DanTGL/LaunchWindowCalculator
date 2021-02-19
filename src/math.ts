"use strict";

export function calcEccentricAnomaly(meanAnomaly: number, ecc: number, n: number): number {
    let E = meanAnomaly;

    for (let i = 0; i < n; i++) {
        E = meanAnomaly + ecc * Math.sin(E);
    }

    return E;
}

/**
 * 
 * @param e The eccentricity of the orbit
 * @param E The eccentric anomaly of the orbit
 */
export function calcTrueAnomaly(e: number, E: number): number {
    return 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2))
}

/**
 * 
 * @param a The semimajor axis of the orbit
 * @param e The eccentricity of the orbit
 * @param E The eccentric anomaly of the orbit
 */
export function calcDistance(a: number, e: number, E: number): number {
    return a * (1 - e * Math.cos(E));
}