import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { ProvitionService } from '../services/provition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: Leader;

  constructor(private dishService: DishService, private promotionservice: PromotionService, private leaderService: ProvitionService) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(featuredDish => this.dish = featuredDish);
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader = this.leaderService.getFeaturedProvisiondetails();
  }

}
