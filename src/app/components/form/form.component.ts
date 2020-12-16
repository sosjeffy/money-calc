import { Component, OnInit } from '@angular/core';
import { LineGraphComponent } from '../line-graph/line-graph.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  constructor(private LineGraph: LineGraphComponent) { }
  name: any;
  startBalance: any;
  startAge: any;
  stopAge: any;
  withdrawAge: any;
  withdrawAmount: any;
  expectedGain: any;
  graphAlreadyDrawn = false;
  data: number[][] = [];
  submittedInfo: any[][] = []; // elements are [name, startBal, startAge...expectedGain]
  private resetValues(): void{
    if (this.graphAlreadyDrawn){
      this.name = undefined;
      this.startBalance = undefined;
      this.withdrawAge = undefined;
      this.withdrawAmount = undefined;
      this.expectedGain = undefined;
    } else {
      this.name = undefined;
      this.startBalance = undefined;
      this.startAge = undefined;
      this.stopAge = undefined;
      this.withdrawAge = undefined;
      this.withdrawAmount = undefined;
      this.expectedGain = undefined;
    }
  }
  ngOnInit(): void {
  }
  clear(): void{
    this.LineGraph.clear();
    this.graphAlreadyDrawn = false;
    this.submittedInfo = [];
    return;
  }
  calculate(): void {
    // P(1+(r/n))^(nt)
    // P = init principle amount
    // r = interest rate
    // n = # of times interest applied per time period
    // t = # of time periods elapsed
    let currentBalance = this.startBalance;
    const ages: number[] = [];
    const balances: number[] = [];
    const stepSize = Math.floor(this.stopAge / this.startAge);
    const rate = this.expectedGain / 100;
    for (let age: number = this.startAge; age < this.stopAge; age += stepSize) {
      ages.push(age);
      let newBalance = 0;
      if (age >= this.withdrawAge){
        let counter = 1;
        let intermBalance = currentBalance;
        while (counter <= stepSize){
          for (let month = 1; month <= 12; month++){
            intermBalance = (intermBalance - this.withdrawAmount) * (1 + rate / 12) ** (1); // divide 12 to split rate across 12 months
          }
          counter++;
        }
        newBalance = intermBalance;
      } else{
        newBalance = currentBalance * (1 + rate) ** (stepSize);
      }
      balances.push(Number(newBalance.toFixed(2)));
      currentBalance = newBalance;
    }
    this.LineGraph.labels.push(ages);
    this.LineGraph.data.push(balances);
    this.LineGraph.names.push(this.name);
    this.LineGraph.draw();
    this.graphAlreadyDrawn = true;
    this.saveValues();
    this.resetValues();
  }
  everythingFilledOut(): boolean{
    return (!this.name || !this.startBalance || !this.startAge || !this.stopAge || !this.withdrawAge ||
      !this.withdrawAmount || !this.expectedGain);
  }

  private saveValues(): void {
    const toSave = [];
    toSave.push(this.name);
    toSave.push(this.startBalance);
    toSave.push(this.startAge);
    toSave.push(this.stopAge);
    toSave.push(this.withdrawAge);
    toSave.push(this.withdrawAmount);
    toSave.push(this.expectedGain);
    this.submittedInfo.push(toSave);
  }
}
