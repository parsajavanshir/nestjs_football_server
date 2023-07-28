//Define a "type" of "authentication request"
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CheckRegisterUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  photoURL: string;
}

export class UserDTO {
  @ApiProperty()
  entity_id: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  photoURL: string;
}

export class UserStarMatchDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
