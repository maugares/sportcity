export type Club = {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  cms: {
    slug: string;
    title: string;
    description: string;
    highlightedAttributes: [{ name: string; title: string; icon: string }];
    phClubId: number;
    contentBlocks?: [
      {
        type: string;
        id: string;
        title: string;
        clubOffer: string[];
        sportsOffer: string[];
        servicesOffer: string[];
        groupLessonsOffer: string[];
        highlightedAttributes: [{ name: string; title: string; icon: string }];
      },
    ];
  };
};

export type Lesson = {
  name: string;
  description: string;
  image_url: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  instructor: string;
  club: string;
  room: string;
  info_url: string | null;
  spots_available: number;
};

export interface Lessons {
  date: [Lesson];
}
