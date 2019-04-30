import { UrlAPIEntity } from './UrlAPIEntity';

//change your localhost here
const localhost = 'http://localhost:34828';

export const listUrlAPI: UrlAPIEntity[] = [
  {name:'productResource', path: localhost + '/1Hero-web/rest/product'},
  {name: 'YourResource', path: localhost + 'YourURL like example above'}
];
