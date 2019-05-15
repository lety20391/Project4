import { UrlAPIEntity } from './UrlAPIEntity';

//change your localhost here
const localhost = 'http://localhost:8080';

export const listUrlAPI: UrlAPIEntity[] = [
  {name:'productResource', path: localhost + '/ServicePRJ-web/rest/Product'},
  {name:'productDetailResource', path: localhost + '/ServicePRJ-web/rest/Product/getDetail/findID'},
  {name:'loginResource', path: localhost + '/ServicePRJ-web/rest/tokens'},
  {name: 'YourResource', path: localhost + 'YourURL like example above'},
  {name: 'serviceResource', path: localhost + '/ServicePRJ-web/rest/Service'},
  {name: 'serviceDetailResource', path: localhost + '/ServicePRJ-web/rest/Service/getDetail/findID'},
  {name: 'uploadResource', path: localhost + '/ServicePRJ-web/rest/uploader'},
  {name: 'orderDetailResource', path: localhost + '/ServicePRJ-web/rest/OrderDetail/Post'},
  {name: 'orderMasterResource', path: localhost + '/ServicePRJ-web/rest/OrderMaster/Post'},
  {name: 'getAllImageResource', path: localhost + '/ServicePRJ-web/rest/GetImage'},
  {name: 'petResource', path: localhost + '/ServicePRJ-web/rest/Pet'},
  {name: 'registerResource', path: localhost + '/ServicePRJ-web/rest/User/add'},
  {name: 'datingDetailResource', path: localhost + '/ServicePRJ-web/rest/DatingDetail'},
  {name: 'userDetailResource', path: localhost + '/ServicePRJ-web/rest/User/getDetail/findID'},
  {name: 'bookingMasterResource', path: localhost + '/ServicePRJ-web/rest/BookingMaster'},
  {name: 'bookingDetailResource', path: localhost + '/ServicePRJ-web/rest/BookingDetail'},
  {name: 'categoryResource', path: localhost + '/ServicePRJ-web/rest/Category'}
];
