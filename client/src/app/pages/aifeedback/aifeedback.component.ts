/* eslint-disable */

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

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

  public prompt: string | undefined;
  public info: string | undefined; 

  ngOnInit(): void {
    this.apiKey = 'shuttle-qptdtyscfedarezef2xh';
    this.apiUrl = 'https://api.shuttleai.app/v1/chat/completions';
    this.model = 'gpt-3.5-turbo';

    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }


  async getDataFromOpenAPI() {
    this.data = {
      model: this.model ?? '',
      messages: [
        { role: 'user', content: this.prompt ?? ''}
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
