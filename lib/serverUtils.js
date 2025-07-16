import path from "path";

const folderPath = path.join(process.cwd(), "public/json");

export const checkAPIJson = async ({ filePath }) => {
  try {
    const { promises: fs } = await import("fs");
    const fullFilePath = path.join(folderPath, filePath);

    if (!(await fs.stat(fullFilePath).catch(() => false))) {
      return null;
    }

    const response = await fs.readFile(fullFilePath, "utf-8");
    return JSON?.parse(response);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return null;
  }
};

export const saveJson = async ({ filePath, data }) => {
  try {
    const { promises: fs } = await import("fs");
    const fullFilePath = path.join(folderPath, filePath);
    await fs.mkdir(path.dirname(fullFilePath), { recursive: true });
    await fs.writeFile(fullFilePath, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.error("Error writing JSON file:", err);
    return null;
  }
};

export const deleteJson = async ({ filePath }) => {
  try {
    const { promises: fs } = await import("fs");
    const fullFilePath = path.join(folderPath, filePath);

    // Check if file exists before trying to delete
    if (await fs.stat(fullFilePath).catch(() => false)) {
      await fs.unlink(fullFilePath);
      return true;
    } else {
      return true; // Return true since the goal (file not existing) is achieved
    }
  } catch (err) {
    console.error("Error deleting JSON file:", err);
    return false;
  }
};
