// pages/api/static/[...path].js

import fs from "fs";
import path from "path";
import mime from "mime-types";

export default async function handler(req, res) {
  const { filename } = req.query;
  const domain = req.headers.host.replace(/^www\./, "");

  const filePath = `./public/static_images/${domain}`;

  if (!fs.existsSync(filePath)) {
    // If domain folder doesn't exist, create it
    fs.mkdirSync(filePath, { recursive: true });

    // Now copy all the files from the project directory to this domain folder by calling the project api https://api.sitebuilderz.com/api/public/project_images/6812467a4719355dec57d86b
    const projectApiUrl = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_images/${domain}`;

    const projectImages = await fetch(projectApiUrl);
    if (projectImages.ok) {
      const projectImagesData = await projectImages.json();

      // Now copy all the files from the project directory to this domain folder
      for (const item of projectImagesData.data) {
        const { name, type } = item;

        // Get the image from this url: https://api.sitebuilderz.com/images/project_images/6812467a4719355dec57d86b/name
        if (type === "file") {
          const imageUrl = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/project_images/${projectImagesData.project_id}/${name}`;
          const imageResponse = await fetch(imageUrl);
          if (imageResponse.ok) {
            const imageBuffer = await imageResponse.arrayBuffer();
            fs.writeFileSync(path.resolve(filePath, name), Buffer.from(imageBuffer));
          }
        }
      }

      // Now call backend api to restart the app 
      const restartAppUrl = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/restart_app/${projectImagesData.project_id}`;
      const restartAppResponse = await fetch(restartAppUrl);
      if (restartAppResponse.ok) {
        console.log("App restarted successfully");
      }
    }
  }

  // Resolve the file path from the static_images directory
  const fullPath = path.resolve(filePath, filename);

  try {
    console.log("🚀 ~ handler ~ fullPath:", fullPath)
    // Check if the file exists
    if (fs.existsSync(fullPath)) {
      const file = fs.readFileSync(fullPath);
      const mimeType = mime.lookup(fullPath) || "application/octet-stream";
      res.setHeader("Content-Type", mimeType);
      res.send(file);
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
