import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from  '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appCRUDservice } from '../../shared/service/appCRUD.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit, OnDestroy {

  contactForm: FormGroup;
  subjectList = ['', 'Portrait', 'Landscape', 'Food', 'Graduation', 'Recital Poster', 'PhotoID', 'Others'];
  namePattern = /^[a-zA-Z-'. ]+$/;
  submit = false;
  countMessageLetter = 500;
  isMessageChecked;

  unSubscribeAll = new Subject();
  constructor(
    private fb: FormBuilder,
    private appRequestService: appCRUDservice
    ) { }

  ngOnInit(): void {
    this.createContactForm();
    // count the message letters, to display "remaining char #"
    this.contactForm.controls['message'].valueChanges.pipe(takeUntil(this.unSubscribeAll)).subscribe(res=>{
      this.isMessageChecked = res;
      this.countMessageLetter = 500 - res.length;
    });

  }

  ngOnDestroy() {
    this.unSubscribeAll.next();
    this.unSubscribeAll.complete();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submit = true;
    if(!this.contactForm.valid && this.submit) {
      return
    }
    console.log(this.contactForm.valid);
    /*** send a post to service， 后端需要链接一个邮箱，直接发到邮箱里 
     */
    const sendForm = {
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      requstType: this.contactForm.value.subject,
      note: this.contactForm.value.message
    };
    this.appRequestService.postContactReq(sendForm)
    .pipe(takeUntil(this.unSubscribeAll))
    .subscribe()

    
  }



}
