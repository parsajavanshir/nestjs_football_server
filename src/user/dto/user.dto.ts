//Define a "type" of "authentication request"
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserIdByUidDTO {
  @IsNotEmpty()
  uid: string;
}

export class UserDTO {
  @ApiProperty()
  entity_id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  uid: string;

  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  photoURL: string;
}
