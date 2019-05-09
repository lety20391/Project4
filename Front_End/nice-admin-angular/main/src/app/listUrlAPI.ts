import { UrlAPIEntity } from './UrlAPIEntity';

//change your localhost here
const localhost = 'http://localhost:8080';

export const listUrlAPI: UrlAPIEntity[] = [
  {name:'productResource', path: localhost + '/1Hero-web/rest/product'},
  {name:'loginResource', path: localhost + '/ServicePRJ-web/rest/tokens'},
  {name: 'serviceResource', path: localhost + '/ServicePRJ-web/rest/Service/'},
  {name: 'userResource', path: localhost + '/ServicePRJ-web/rest/User/'}

  // {name: 'serviceDetailResource', path: localhost + '/ServicePRJ-web/rest/Service/:id'}
];
