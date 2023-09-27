//Define a "type" of "authentication request"
import { IsNumber, IsString } from 'class-validator';

export class CreateBotDTO {
    @IsString()
    token: string;
}

export class EavAttributeValueDTO {
    attribute_id: number;
    entity_id: number;
    @IsString()
    value: string;
}

export class GetBotStatusDTO {
    @IsString()
    bot_ids: string;
}