/* eslint-disable */

import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '@app/services/shared-service.service';
import axios from 'axios';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aifeedback',
  templateUrl: './aifeedback.component.html',
  styleUrls: ['./aifeedback.component.scss']
})
export class AifeedbackComponent implements OnInit {
  apiKey: string | undefined;
  apiUrl: string | undefined;
  model: string | undefined;
  data: { model: string; messages: { role: string; content: string; }[]; } | undefined;
  headers: { 'Content-Type': string; Authorization: string; } | undefined;

  public info: string | undefined; 

  subscription: Subscription; 

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    this.apiKey = 'shuttle-qptdtyscfedarezef2xh';
    this.apiUrl = 'https://api.shuttleai.app/v1/chat/completions';
    this.model = 'gpt-3.5-turbo';

    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };

      this.subscription = this.sharedService.currentData.subscribe(data => {
        const prompt = "Given this: " + JSON.stringify(data) + "Describe to me in words what you think about what is around me in a 15 minutes walk radius and how it could be improved (Only in a bullet point)";
        this.generateAnswer(prompt);
      }      
    );
  }

  async generateAnswer(prompt: string) {
    this.data = {
      model: this.model ?? '',
      messages: [
        { role: 'user', content: prompt ?? ''}
      ]
    };

    axios.post(`${this.apiUrl}/chat/completions`, this.data, { headers: this.headers })
    .then(response => {
      const responseDataString = JSON.stringify(response.data, null, 2);
      console.log(JSON.parse(responseDataString));
      this.info = JSON.parse(responseDataString).choices[0].message.content;
    })
    .catch(error => {
      console.error(`Error: ${error.response.status}, ${error.response.data}`);
    });
  }
}
