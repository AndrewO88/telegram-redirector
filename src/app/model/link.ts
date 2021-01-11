export interface ILink {
  id: string;
  count: number;
  title: string;
  url: string;
  img?: string;
  personId?: string;
  logo?: string;
  subscribers?: number;

  getChannelFromLinkUrl: (url: string) => string;
}

export type TableColumns<M> = (keyof M | 'metrics' | 'actions')[];

export class Link implements ILink {
  id: string;
  url: string;
  title: string;
  img?: string;
  count: number;
  logo?: string;

  static buildLink = (info: string[]): string => {
    let str: string;
    switch (info[1]) {
      case 'socks':
        str = 'tg://socks' + location.search;
        break;
      case 'joinchat':
        str = 'tg://join?invite=' + info[2];
        break;
      case 'addstickers':
        str = 'tg://addstickers?set=' + info[2];
        break;
      case 'proxy':
        str = 'tg://' + info[1] + location.search;
        break;
      default:
        const domain = info[1];
        str = 'tg://resolve?domain=' + domain + location.search.replace('?start=', '&start=');
        if (info[2]) {
          str += '&post=' + info[2];
        }
    }

    return str;
  }

  static INIT = (link: string, collection: ILink[] = []): ILink => {
    const result: {
      [key: string]: Link
    } = collection.reduce((acc, cur) => ({
      ...acc,
      [cur.title]: cur
    }), {});

    return result[link] ?? new Link('', '', link, 0, '');

  }

  constructor(id: string, title: string, url: string, count: number, img?: string) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.count = count;
    this.img = img;
  }

  getChannelFromLinkUrl(url?: string): string {
    return (url ?? this.url).replace('https://t.me/', '')
      .replace('http://t.me/', '');
  }
}
