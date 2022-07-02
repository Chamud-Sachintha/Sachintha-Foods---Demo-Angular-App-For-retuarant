import { Component, OnInit } from '@angular/core';
import { ProvitionService } from '../services/provition.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];

  constructor(private provisionService: ProvitionService) { }

  ngOnInit(): void {
    this.leaders = this.provisionService.getProvisionDetails();
  }

}
