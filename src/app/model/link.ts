export interface ILink {
  id: string;
  count: number;
  url: string;
  img: string | null;
}

export type TableColumns<M> = (keyof M | 'metrics' | 'actions')[];

export class Link implements ILink {
  id: string;
  url: string;
  img: string | null;
  count: number;

  constructor(id: string, url: string, count: number, img: string | null) {
    this.id = id;
    this.url = url;
    this.count = count;
    this.img = img;
  }
}
