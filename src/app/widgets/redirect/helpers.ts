export const buildLink = (info: string[]): string => {
  let str = '';
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
      str = 'tg:resolve?domain=' + domain + location.search.replace('?start=', '&start=');
      if (info[2]) {
        str += '&post=' + info[2];
      }
  }

  return str;
};
