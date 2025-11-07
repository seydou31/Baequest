import { useState } from "react";

export default function Meet() {
  const [places, setPlaces] = useState([]);
  const [radiusMiles, setRadiusMiles] = useState(5); // default 5 miles
  const [error, setError] = useState(null);

  const getPlaces = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // ✅ Convert miles to meters

        try {
          const response = await fetch(
            `http://localhost:3001/places?lat=${lat}&lng=${lng}&miles=${radiusMiles}&type=cafe`
          );

          const data = await response.json();
          setPlaces(data);
        } catch (err) {
          setError("Failed to fetch places");
        }
      },
      (err) => setError(err.message)
    );
  };

  return (
    <div>
      <h2>Find Coffee Shops Near You ☕</h2>

      <label>
        Search radius (miles):{" "}
        <input
          type="number"
          value={radiusMiles}
          onChange={(e) => setRadiusMiles(e.target.value)}
          min="1"
          max="50"
        />
      </label>

      <button onClick={getPlaces}>Find Places</button>

      {error && <p>❌ {error}</p>}

      <ul>
        {places.map((p) => (
          <li key={p.place_id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
