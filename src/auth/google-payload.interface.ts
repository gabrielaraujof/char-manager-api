export interface IGoogleProfile {
  id: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: { value: string; verified: boolean }[];
  photos: { value: string }[];
}
