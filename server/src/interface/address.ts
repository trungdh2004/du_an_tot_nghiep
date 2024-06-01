export interface IAddress {
  username: string;
  phone: string;
  city: {
    name: string;
    idProvince: string;
  };
  district: {
    name: string;
    idProvince: string;
    idDistrict: String;
  };
  commune: {
    name: string;
    idCommune: string;
    idDistrict: String;
  };
  address: string;
}
