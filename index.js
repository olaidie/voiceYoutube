const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/sub", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing YouTube URL");

  try {
    const downsubUrl = `https://downsub.com/?url=${encodeURIComponent(url)}`;
    const response = await axios.get(downsubUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    // Downsub trả về trang HTML, bạn cần parse lấy phụ đề hoặc trả nguyên trang cho extension xử lý
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching subtitles");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
