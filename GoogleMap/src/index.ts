import { User } from './User';
import { Company } from './Company';
import { Map } from './Map';

const user = new User();
const company = new Company();
const customMap = new Map('map');

customMap.addMarker(user);
customMap.addMarker(company);
