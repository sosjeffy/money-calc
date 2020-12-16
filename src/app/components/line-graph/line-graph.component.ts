import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {
  chart: any = undefined;
  data: number[][] = [];
  labels: number[][] = []; // X axis labels
  names: string[] = []; // Name given to DATA
  constructor() { }

  ngOnInit(): void {
  }

  add(): void{
    return;
  }
  private randomColor(): any{
    // from https://css-tricks.com/snippets/javascript/random-hex-color/
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
  }

  clear(): void{
    this.data = [];
    this.labels = [];
    this.names = [];
    this.draw();
    this.chart = undefined;
    return;
  }
  draw(): Chart{
    if (!this.chart) {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.labels[0],
          datasets: [
            // {
            //   data: this.data[0],
            //   borderColor: '#8db596',
            //   fill: false,
            // },
          ]
        },
        options: {
          animation: {
            easing: 'easeInOutQuad'
          },
          legend: {
            display: true
          },
          tooltips: {
            backgroundColor: '#bedbbb',
            titleFontColor: '#000000',
            bodyFontColor: '#000000',
            bodyFontSize: 15,
            titleFontSize: 15,
            custom(tooltip): void {
              if (!tooltip) { return; }
              // disable displaying the color box;
              tooltip.displayColors = true; },
            callbacks: {
              label(tooltipItems, data): string{
                return  '$' + tooltipItems.yLabel;
              }
            }
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time',
                fontSize: 15
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Monetary Value ($)',
                fontSize: 15
              }
            }],
          },
          responsive: true,
        }
      });
    }

    for (let index = 0; index < this.data.length; index++) {
      const color = this.randomColor();
      this.chart.data.datasets.push({
        label: this.names[index],
        borderColor: color,
        fill: true,
        backgroundColor: color,
        data: this.data[index]
      });
    }
    this.chart.update();
    return this.chart;
  }
}
