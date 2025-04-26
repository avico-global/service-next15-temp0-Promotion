export default function handler(req, res) {
  console.log("Test sitemap API endpoint called");
  res.status(200).json({ message: "API endpoint working" });
} 