export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
  updateArtistInfo(name: string, grammy: boolean): void;
}
