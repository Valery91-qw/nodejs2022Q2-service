export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  updateAlbum(name: string, year: number, artistId?: string): void;
}
