import { getColorFromURL } from "color-thief-node";
import Color from "colorjs.io";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
  return (
    "#" +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2])
  );
}

export async function getColors(url) {
  try {
    const dominantColor = await getColorFromURL(url);
    let toFind = new Color("sRGB", dominantColor, 1);
    let black = new Color("sRGB", [0, 0, 0], 1);
    let white = new Color("sRGB", [255, 255, 255], 1);
    let contrastWithBlack = toFind.contrast(black, "DeltaPhi");
    let contrastWithWhite = toFind.contrast(white, "DeltaPhi");

    const domHex = rgbToHex(dominantColor);
    const result = {
      backgroundColorRGB: dominantColor,
      backgroundColor: domHex,
      textColor: contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000",
    };

    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);

  }
}
