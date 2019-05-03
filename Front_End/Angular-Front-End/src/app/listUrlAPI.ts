import { UrlAPIEntity } from './UrlAPIEntity';

//change your localhost here
const localhost = 'http://localhost:8080';

export const listUrlAPI: UrlAPIEntity[] = [
  {name:'productResource', path: localhost + '/ServicePRJ-web/rest/product'},
  {name:'loginResource', path: localhost + '/ServicePRJ-web/rest/tokens'},
  {name:'uploadResource', path: localhost + '/ServicePRJ-web/rest/uploader'},
  {name: 'YourResource', path: localhost + 'YourURL like example above'}
];
