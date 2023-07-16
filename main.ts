let Bereich = 0
let Hue = 0
let X = 0
let Rot = 0
let Gruen = 0
let Blau = 0
let Max_Wert = 0
let Min_Wert = 0
let Chroma = 0
function berechne_rgb () {
    Bereich = Hue / 60
    X = 1 - Math.abs(Bereich % 2 - 1)
    X = Math.floor(X * 255)
    Rot = 0
    Gruen = 0
    Blau = 0
    if (Bereich <= 1) {
        Rot = 255
        Gruen = X
    } else if (Bereich <= 2) {
        Rot = X
        Gruen = 255
    } else if (Bereich <= 3) {
        Gruen = 255
        Blau = X
    } else if (Bereich <= 4) {
        Gruen = X
        Blau = 255
    } else if (Bereich <= 5) {
        Rot = X
        Blau = 255
    } else {
        Rot = 255
        Blau = X
    }
}
// https://en.wikipedia.org/wiki/HSL_and_HSV
function berechne_hue () {
    Max_Wert = Math.max(Rot, Math.max(Gruen, Blau))
    Min_Wert = Math.min(Rot, Math.min(Gruen, Blau))
    Chroma = Max_Wert - Min_Wert
    if (Chroma == 0) {
        Hue = 0
    } else if (Max_Wert == Rot) {
        Hue = (Gruen - Blau) * 60 / Chroma
        if (Hue < 0) {
            Hue = Hue + 360
        }
    } else if (Max_Wert == Gruen) {
        Hue = (Blau - Rot) * 60 / Chroma + 120
    } else {
        Hue = (Rot - Gruen) * 60 / Chroma + 240
    }
}
// Liest die RGB Werte des Sensors ein.
function lese_sensor () {
    Rot = TCS34725.readRed()
    Gruen = TCS34725.readGreen()
    Blau = TCS34725.readBlue()
}
/**
 * Reference: https://en.wikipedia.org/wiki/HSL_and_HSV
 */
basic.forever(function () {
    lese_sensor()
    berechne_hue()
    berechne_rgb()
    basic.setLedColor(basic.rgb(Rot, Gruen, Blau))
    basic.pause(100)
})
