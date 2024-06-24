import axios from "axios";
import { Club, RawClub } from "../lib/definitions";

export async function fetchData({ url }: { url: string }): Promise<any> {
  const response = await axios.get(url, {
    headers: {
      Origin: "http://yourdomain.com",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  // Parse the data
  return response.data;
}

export async function getClubsInfo(): Promise<Club[]> {
  const rawDataClubs = await fetchData({
    url: "https://www.sportcity.nl/api/clubs",
  });

  const clubs: Club[] = [];

  Object.values(rawDataClubs).forEach((rawClub) => {
    const {
      id,
      name,
      address,
      city,
      postalCode,
      latitude,
      longitude,
      cms: { slug },
    } = rawClub as RawClub;
    clubs.push({
      id,
      name,
      address,
      city,
      postalCode,
      latitude,
      longitude,
      slug,
    });
  });
  return clubs;
}

export async function getClubLessons({ id }: { id: string }) {
  return await fetchData({
    url: `https://www.sportcity.nl/api/group-lessons/${id}`,
  });
}

export async function getLessonsForClubs(clubs: Club[]) {
  const clubLessons: { [key: string]: any } = {};

  for (const club of clubs) {
    clubLessons[club.id] = await getClubLessons({ id: club.id });
  }

  return clubLessons;
}

export const groupClubByCity = (clubs: Club[]) => {
  const clubsByCity: { [key: string]: Club[] } = {};
  clubs.map((club) => {
    if (!clubsByCity[club.city]) {
      clubsByCity[club.city] = [];
    }
    clubsByCity[club.city].push(club);
  });
  return clubsByCity;
};
