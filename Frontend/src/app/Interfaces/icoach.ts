export interface ICoach {
  id: number;
  documentId: string;
  name: string;
  salary: number;
  experiance: number;
  details: string;
  image: IImage;
  discountPrecent?: number;
  coach_times: ICoachTime[];
}

export interface IImage {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail: IImageFormat;
  };
}

export interface IImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  url: string;
}

export interface ICoachTime {
  id: number;
  day: string;
  time: string;
}
