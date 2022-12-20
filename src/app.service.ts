import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'INICIO DE UMA GRANDE E PRÓSPERA JORNADA!';
  }
  getMyDev(): object {
    const myDev = {
      functioDev: 'Enrolar os cabos',
      monthlySalary: 'O que der pra pagar',
    };
    return myDev;
  }
}
