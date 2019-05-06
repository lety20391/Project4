import { UrlAPIEntity } from './UrlAPIEntity';

//change your localhost here
const localhost = 'http://localhost:8080';

export const listUrlAPI: UrlAPIEntity[] = [
  {name:'productResource', path: localhost + '/ServicePRJ-web/rest/Product/list'},
  {name:'productDetailResource', path: localhost + '/ServicePRJ-web/rest/Product/getDetail/findID'},
  {name:'loginResource', path: localhost + '/ServicePRJ-web/rest/tokens'},
  {name: 'YourResource', path: localhost + 'YourURL like example above'},
  {name: 'serviceResource', path: localhost + '/ServicePRJ-web/rest/Service/'},
  {name: 'serviceDetailResource', path: localhost + '/ServicePRJ-web/rest/Service/:id'},
  {name: 'uploadResource', path: localhost + '/ServicePRJ-web/rest/uploader'},
  {name: 'orderDetailResource', path: localhost + '/ServicePRJ-web/rest/OrderDetail/Post'},
  {name: 'orderMasterResource', path: localhost + '/ServicePRJ-web/rest/OrderMaster/Post'}
];
