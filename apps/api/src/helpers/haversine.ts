export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371.0;

  const [radLat1, radLon1, radLat2, radLon2] = [lat1, lon1, lat2, lon2].map(
    (coord) => (coord * Math.PI) / 180,
  );

  const dlat = radLat2 - radLat1;
  const dlon = radLon2 - radLon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}
