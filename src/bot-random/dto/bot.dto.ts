//Define a "type" of "authentication request"
import { IsString } from 'class-validator';

export class CreateBotDTO {
    @IsString()
    token: string;
}
