import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TracksModule, AlbumsModule, ArtistsModule],
})
export class FavoritesModule {}
