import {ILink} from './link';

export interface IPerson {
  id: string;
  name: string;
  links: ILink[];
}

export class Person implements IPerson {
  id: string;
  name: string;
  links: ILink[];

  constructor(id: string, name: string, links: ILink[]) {
    this.id = id;
    this.name = name;
    this.links = links;
  }
}
