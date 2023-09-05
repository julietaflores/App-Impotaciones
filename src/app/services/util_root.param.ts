import { Injectable } from '@angular/core';
import { datos_param } from '../interfaces/datos_param';

@Injectable({
  providedIn: 'root',
})
export class UtilRootParam {
  public datos_paramm={} as datos_param;
  constructor() {}
}
