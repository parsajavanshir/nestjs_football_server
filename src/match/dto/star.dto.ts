//Define a "type" of "authentication request"
import { IsNotEmpty, IsString, IsEmail, IsObject, IsArray } from 'class-validator';

export class SaveStarMatchForUserDTO {
    @IsString()
    @IsNotEmpty()
    user_id: number;

    @IsArray()
    @IsNotEmpty()
    match_id: string;
}

export class GetStarMatchForUserDTO {
    @IsNotEmpty()
    user_id: number;
}

export class GetUserIdByEmailDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}