import { Component, OnInit } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  formErrors: any = {
    'rating': '',
    'comment': '',
    'name': ''
  }

  validationErrors: any = {
    'name': {
      'required': 'Name Is Required',
      'minlength': 'Minimum Length is 2'
    },
    'comment': {
      'required': 'Comment is Required'
    }
  }

  dish!:Dish
  dishIds!: string[];
  prev!: string;
  next!: string;
  feedbackForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private dishService: DishService,private activatedRoute: ActivatedRoute, private location: Location) { 
    this.feedbackForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(2)]],
      stars: 0,
      comment: ['', [Validators.required]]
    });

    this.feedbackForm.valueChanges.subscribe((data) => this.onValueChanges(data));
  }

  rating!: number;
  author!: string;
  date!: string;
  comment!: string;

  isValid: boolean = false;

  onValueChanges(data?: any){

    if(this.feedbackForm.valid){
      this.isValid = true;
    }else{
      this.isValid = false;
    }

    if(!this.feedbackForm){ return; }

    const form = this.feedbackForm;

    for(const feild in this.formErrors){
      if(this.formErrors.hasOwnProperty(feild)){
        this.formErrors[feild] = '';
        const control = form.get(feild);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationErrors[feild];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[feild] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmitFeedback(id: string){
    //console.log(id);

    for(const key in DISHES){
      if(key == id){
        this.isValid = false;
        const newComment = {
          rating: this.rating,
          comment: this.comment,
          author: this.author,
          date: new Date().toString()
        }
        DISHES[key].comments.push(newComment);
      }
    }
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return Math.round(value / 1) + 'Star';
    }

    return value;
  }

  ngOnInit(): void {
    // let id = this.activatedRoute.snapshot.params['id'];
    // this.dishService.getDish(id).subscribe(dish => this.dish = dish);
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);

    this.activatedRoute.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => { this.dish = dish; this.setPrevAndNext(this.dish.id) });
  }

  setPrevAndNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + (index - 1)) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + (index + 1)) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

}
