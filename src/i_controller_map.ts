import { Controller } from './controller';

/**
 * Repository of controllers
 */
export interface IControllerMap {
  [name: string]: Controller;
}
