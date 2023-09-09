import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Function to change the wallpaper
export function changeWallpaper(imageFilename , backgroundColor , textColor) {
  // Get the directory path of the current module
  const scriptPath = fileURLToPath(import.meta.url);
  const currentFolder = dirname(scriptPath);

  // Use process.cwd() to get the current working directory of the Node.js process
  const cwd = process.cwd();

  // Get the absolute path to the Bash script in the parent folder's bash_folder
  const bashScriptPath = join(currentFolder, '..', 'bash', 'changeWallpaper.sh');

  // Execute the Bash script with the image filename as an argument
  exec(`bash ${bashScriptPath} "${imageFilename}" "${backgroundColor}" "${textColor}"`, { cwd }, (error, stdout, stderr) => {
    if (error) {
      console.error('Error changing wallpaper:', error.message);
      return;
    }

    // If needed, you can print the script's output
    
    // if (stdout) {
    //   console.log('Script output:', stdout);
    // }

    if (stderr) {
      console.error('Script error:', stderr);
      process.exit(1);

    }
  });
}

// changeWallpaper("s7B7syuoltfe4q4LWkYT.jpg" , "#45f2fe" , "#54f21c")