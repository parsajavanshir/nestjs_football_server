import { Injectable } from '@nestjs/common';
import { MassResource } from './model/mass.resource';

@Injectable()
export class MassService {
    constructor(
        private massResource: MassResource
    ) {}

    async updateBotListStatus() {
        const result = await this.massResource.updateBotListStatus();
        return result;
    }
}
