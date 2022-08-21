import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const currentFavs = await this.prisma.favorite.findUnique({
      where: { id: this.prisma.favoriteId },
      select: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
    const foundTracks = await Promise.all(
      currentFavs.tracks.map((el) =>
        this.prisma.track.findUnique({ where: { id: el } }),
      ),
    );
    const foundAlbums = await Promise.all(
      currentFavs.albums.map((el) =>
        this.prisma.album.findUnique({ where: { id: el } }),
      ),
    );
    const foundArtists = await Promise.all(
      currentFavs.artists.map((el) =>
        this.prisma.artist.findUnique({ where: { id: el } }),
      ),
    );

    return {
      tracks: foundTracks.filter((el) => el !== null || undefined),
      albums: foundAlbums.filter((el) => el !== null || undefined),
      artists: foundArtists.filter((el) => el !== null || undefined),
    };
  }

  async createFavTrack(id: string): Promise<boolean> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) return false;
    await this.prisma.favorite.update({
      where: { id: this.prisma.favoriteId },
      data: {
        tracks: track.id,
      },
    });
    return true;
  }

  async createFavAlbum(id: string): Promise<boolean> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) return false;
    await this.prisma.favorite.update({
      where: { id: this.prisma.favoriteId },
      data: {
        albums: album.id,
      },
    });
    return true;
  }

  async createFavArtist(id: string): Promise<boolean> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) return false;
    await this.prisma.favorite.update({
      where: { id: this.prisma.favoriteId },
      data: {
        artists: artist.id,
      },
    });
    return true;
  }

  async removeTrack(id: string): Promise<boolean> {
    const track = this.prisma.track.findUnique({ where: { id: id } });
    if (!track) return false;
    const favoriteTracks = await this.prisma.favorite.findUnique({
      where: { id: this.prisma.favoriteId },
      select: {
        tracks: true,
      },
    });
    await this.prisma.favorite.update({
      where: { id: this.prisma.favoriteId },
      data: {
        tracks: {
          set: favoriteTracks.tracks.filter((el) => el !== id),
        },
      },
    });
    return true;
  }

  async removeAlbum(id: string): Promise<boolean> {
    const album = this.prisma.album.findUnique({ where: { id: id } });
    if (!album) return false;
    const favoriteAlbums = await this.prisma.favorite.findUnique({
      where: { id: this.prisma.favoriteId },
      select: {
        albums: true,
      },
    });
    await this.prisma.favorite.update({
      where: { id: this.prisma.favoriteId },
      data: {
        albums: {
          set: favoriteAlbums.albums.filter((el) => el !== id),
        },
      },
    });
    return true;
  }

  async removeArtist(id: string): Promise<boolean> {
    const artist = this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) return false;
    const favoriteArtist = await this.prisma.favorite.findUnique({
      where: { id: this.prisma.favoriteId },
      select: {
        artists: true,
      },
    });
    await this.prisma.favorite.update({
      where: { id: this.prisma.favoriteId },
      data: {
        artists: {
          set: favoriteArtist.artists.filter((el) => el !== id),
        },
      },
    });
    return true;
  }
}
