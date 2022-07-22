// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { IArtist } from '../model/artist.model';
// import { UpdateArtistDto } from '../dto/update-artist.dto';
//
// @Entity()
// export class Artist {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
//
//   @Column()
//   name: string;
//
//   @Column()
//   grammy: boolean;
//
//   constructor(name: string, grammy: boolean) {
//     this.name = name;
//     this.grammy = grammy;
//   }
//
//   static updateArtistInfo(
//     artist: IArtist,
//     updateArtistDto: UpdateArtistDto,
//   ): IArtist {
//     artist.name = updateArtistDto.name;
//     if (artist.grammy) return artist;
//     artist.grammy = updateArtistDto.grammy;
//     return artist;
//   }
// }
