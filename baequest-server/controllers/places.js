const dotenv = require("dotenv");
dotenv.config();

module.exports.places = async (req, res) => {
  try {
    const { lat, lng, miles = 5, type = "cafe" } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const radius = miles * 1609.34; // miles → meters

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${process.env.GOOGLE_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res
        .status(500)
        .json({ error: data.status, message: data.error_message });
    }

    res.json(data.results);
  } catch (err) {
    console.error("Places API error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
