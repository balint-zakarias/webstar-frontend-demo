export interface Character {
    id: string;
    name: string;
    side: 'DARK' | 'LIGHT';
    image: string;
    power: {
      power: string;
      midichlorian: number;
    };
    createdTimestamp: number;
    description: string;
  }