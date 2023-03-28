import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/interfaces/email';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

email: Email = {
  code: ""
}

  
}
