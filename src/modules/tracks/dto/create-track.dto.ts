import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string;
  @IsOptional()
  @IsString()
  albumId: string;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
