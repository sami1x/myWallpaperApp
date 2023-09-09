import { promises as fs } from "fs";
import path from "path";

export async function deleteImage(folderPath, imageNameToKeep) {
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      if (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png")
      ) {
        const filePath = path.join(folderPath, file);

        // Check if the file matches the image name to keep
        if (file !== imageNameToKeep) {
          await fs.unlink(filePath);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);

  }
}
