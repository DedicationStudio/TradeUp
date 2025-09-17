import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TradingDataModule { }

export interface TradingData {
  symbol: string;
  start: string;
  end: string;
  result: string;
  answer: string;
}