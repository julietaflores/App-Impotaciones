import { Injectable } from '@angular/core';
import { datos_inicio } from '../interfaces/datos_inicio';

@Injectable({
  providedIn: 'root',
})
export class UtilRootService {
  public datos_inicioo={} as datos_inicio;
  constructor() {}
}
