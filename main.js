import { createApi } from "unsplash-js";
import { config as envConfig } from "dotenv";
import { promises as fs } from "fs";
import fetch from "node-fetch";
import path from "path";
import { topics } from "./utils/topics.js";
import { getRandomName } from "./utils/getRandomName.js";
import { deleteImage } from "./utils/deleteImage.js";
import { getColors } from "./utils/getColors.js";
import { changeWallpaper } from "./utils/executeScript.js";
import { getTimeAndDate } from "./utils/getDate.js";

envConfig();
const accessKey = process.env.ACCESS_KEY;

const unsplash = createApi({
  accessKey: accessKey,
  fetch: fetch
});

async function downloadImage(url, destinationPath) {
  try {
    const colors = await getColors(url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to download image");
    }

    let buffer = await response.arrayBuffer();
    await fs.writeFile(destinationPath, Buffer.from(buffer));
    return colors;
  } catch (error) {
    console.error("Downloading Error:", error);
    process.exit(1);
  }
}

async function main(downloadLink, destinationPath, imageName) {
  try {
    const colors = await downloadImage(downloadLink, destinationPath);
    const image = imageName.trim();
    changeWallpaper(
      `"images/"${image}`,
      colors.backgroundColor,
      colors.textColor
    );
    await deleteImage(path.join("images"), imageName);
    const dateAndTime = getTimeAndDate();
    console.log("Wallpaper downloaded and changed successfully!", dateAndTime);
  } catch (error) {
    console.error("Error in main function", error);
    process.exit(1);
  }
}

function changer() {
  unsplash.photos
    .getRandom({
      topicIds: topics,
      featured: true,
      orientation: "landscape",
      quality: 50,
      count: 1
    })
    .then((result) => {
      if (result.errors) {
        console.log("error occurred: ", result.errors[0]);
      } else {
        const downloadLink = result.response[0].links.download;
        const filename = getRandomName(20) + ".jpg";
        if (!fs.existsSync("images")) {
          fs.mkdirSync("images");
        }
        const destinationPath = path.join("images", filename);
        main(downloadLink, destinationPath, filename);
        setTimeout(changer, 3600000);
      }
    })
    .catch((error) => {
      console.error("Error in changer function", error);
      process.exit(1);
    });
}

// // 3600000

setTimeout(changer, 30000);
