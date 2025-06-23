export interface IAddress {
  id: number;
  documentId: string;
  buildingNo: number;
  street: string;
  city: string;
  government: government;
  moreInfo?: string;
  phone: string;
  email: string;
}

export enum government {
  Alexandria = 'Alexandria',
  Aswan = 'Aswan',
  Assiut = 'Assiut',
  Beheira = 'Beheira',
  BeniSuef = 'Beni Suef',
  Cairo = 'Cairo',
  Dakahlia = 'Dakahlia',
  Damietta = 'Damietta',
  Fayoum = 'Fayoum',
  Gharbia = 'Gharbia',
  Giza = 'Giza',
  Ismailia = 'Ismailia',
  KafrAlSheikh = 'Kafr Al Sheikh',
  Matrouh = 'Matrouh',
  Minya = 'Minya',
  Menofia = 'Menofia',
  NewValley = 'New Valley',
  NorthSinai = 'North Sinai',
  PortSaid = 'Port Said',
  Qualyubia = 'Qualyubia',
  Qena = 'Qena',
  RedSea = 'Red Sea',
  Sharqia = 'Sharqia',
  Sohag = 'Sohag',
  SouthSinai = 'South Sinai',
  Suez = 'Suez',
  Luxor = 'Luxor'
}
