import { getBranchs } from '@/repositories/branchs/getBranchs';

export const getBranchByGeolocationAction = async (body: any) => {
  try {
    const { latitude, longitude } = body;

    // Haversine formula
    function haversine(lat1: any, lon1: any, lat2: any, lon2: any) {
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

    // revisi penulisan diganti dengan isi dalam discord
    function cariCabangTerdekat(userLat: any, userLon: any, daftarCabang: any) {
      let cabangTerdekat = null;
      let jarakTerdekat = Infinity;

      for (const cabang of daftarCabang) {
        const cabangLat = Number(cabang.latitude);
        const cabangLon = Number(cabang.longitude);

        const jarak = haversine(userLat, userLon, cabangLat, cabangLon);

        if (jarak < jarakTerdekat) {
          jarakTerdekat = jarak;
          cabangTerdekat = cabang;
        }
      }

      const distance = jarakTerdekat.toFixed(2);
      return { cabangTerdekat, distance };
    }

    const userLatitude = Number(latitude);
    const userLongitude = Number(longitude);

    const daftarCabang = await getBranchs();

    const cabangTerdekat = cariCabangTerdekat(
      userLatitude,
      userLongitude,
      daftarCabang,
    );

    return {
      message: 'get branchs by Geolocation success',
      status: 200,
      data: cabangTerdekat,
    };
  } catch (error) {
    throw error;
  }
};
