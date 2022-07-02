import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class ProvitionService {

  constructor() { }

  getProvisionDetails(): Leader[]{
    return LEADERS;
  }

  getFeaturedProvisiondetails(): Leader{
    return LEADERS.filter((prov) => prov.featured)[0];
  }
}
