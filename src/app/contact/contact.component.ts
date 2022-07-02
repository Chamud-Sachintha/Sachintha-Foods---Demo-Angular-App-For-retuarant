import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { feedback, contactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback!: feedback;
  contacttype = contactType;
  
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telNum: [0, [Validators.required, Validators.maxLength(10)]],
      email: ['', Validators.required],
      agree: false,
      contactType: 'None',
      message: ''
    });
  }

  onSubmit(feedbackForma: any){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);

    this.feedbackForm.reset();
  }

  ngOnInit(): void {
  }

}
