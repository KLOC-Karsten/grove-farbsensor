let Hue = 0
let X = 0
let Rot = 0
let Gruen = 0
let Blau = 0
let V = 0
let Min_Wert = 0
let C = 0
function berechne_rgb () {
    Hue = Hue / 60
    X = Hue * 256 % 512 - 256
    X = 255 - Math.abs(X)
    X = Math.floor(X)
    Rot = 0
    Gruen = 0
    Blau = 0
    if (Hue <= 1) {
        Rot = 255
        Gruen = X
    } else if (Hue <= 2) {
        Rot = X
        Gruen = 255
    } else if (Hue <= 3) {
        Gruen = 255
        Blau = X
    } else if (Hue <= 4) {
        Gruen = X
        Blau = 255
    } else if (Hue <= 5) {
        Rot = X
        Blau = 255
    } else {
        Rot = 255
        Blau = X
    }
}
// https://en.wikipedia.org/wiki/HSL_and_HSV
function berechne_hue () {
    V = Math.max(Rot, Math.max(Gruen, Blau))
    Min_Wert = Math.min(Rot, Math.min(Gruen, Blau))
    C = V - Min_Wert
    if (C == 0) {
        Hue = 0
    } else if (V == Rot) {
        Hue = (Gruen - Blau) * 60 / C
        if (Hue < 0) {
            Hue = Hue + 360
        }
    } else if (V == Gruen) {
        Hue = (Blau - Rot) * 60 / C + 120
    } else {
        Hue = (Rot - Gruen) * 60 / C + 240
    }
}
// Liest die RGB Werte des Sensors ein.
function lese_sensor () {
    Rot = TCS34725.readRed()
    Gruen = TCS34725.readGreen()
    Blau = TCS34725.readBlue()
}
/**
 * https://stackoverflow.com/questions/3018313/algorithm-to-convert-rgb-to-hsv-and-hsv-to-rgb-in-range-0-255-for-both
 */
basic.forever(function () {
    lese_sensor()
    berechne_hue()
    berechne_rgb()
    basic.setLedColor(basic.rgb(Rot, Gruen, Blau))
    basic.pause(100)
})
