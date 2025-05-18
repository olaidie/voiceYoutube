import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Cho phép extension fetch từ domain khác

// Trả file .srt gốc
app.get("/sub/:filename", (req, res) => {
  const filePath = path.join("sub", req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Not found");
  res.sendFile(path.resolve(filePath));
});

// Trả nội dung .srt dưới dạng JSON
app.get("/subjson/:filename", (req, res) => {
  const filePath = path.join("sub", req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Not found");

  const content = fs.readFileSync(filePath, "utf-8");
  const blocks = content.trim().split(/\n\s*\n/);
  const result = blocks.map(block => {
    const lines = block.split("\n");
    const [start, end] = lines[1].split(" --> ");
    return {
      start,
      end,
      text: lines.slice(2).join(" ").trim()
    };
  });

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
