import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  heathCheck() {
    return {
      message: 'GEROcuidadoAPITemplate health check Ok!',
      data: {},
    };
  }
}
