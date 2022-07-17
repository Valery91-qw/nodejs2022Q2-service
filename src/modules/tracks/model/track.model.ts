export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  updateTrack(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ): void;
}
