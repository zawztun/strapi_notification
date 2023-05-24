export interface Topic {
  id: number;
  attributes: {
    topic: string;
    person: Person;
    readStatus: boolean;
  };
}

interface Person {
  data: {
    id: number;
    attributes: {
      name: string;
      profile: Profile;
    };
  };
}
interface Image {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
}

interface Profile {
  data: Image[];
}

export interface Notifications {
  data: Topic[];
}
