import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, ChartTypeRegistry, registerables } from 'chart.js';
import { NavBarComponent } from '../../template/nav-bar/nav-bar.component';
import { TypewriterTextComponent } from '../Utils/typewriter-text/typewriter-text.component';


Chart.register(...registerables);

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [NavBarComponent, TypewriterTextComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements AfterViewInit {
  isBrowser: boolean;
  title: string = "Statistiques de l'entreprise";

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  //Cette partie concerne l'animation
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.createCharts();
    }
  }

  createCharts() {
    // Revenus
    this.createChart('revenusChart', 'bar', ['Jan', 'Feb', 'Mar'], [5000, 7000, 8000], 'Revenus Totaux');

    // Vols réservés
    this.createChart('volsChart', 'line', ['Jan', 'Feb', 'Mar'], [60, 75, 90], 'Pourcentage des vols réservés');

    // Compagnie
    this.createChart('compagnieChart', 'pie', ['2021', '2022', '2023'], [10, 20, 30], "L'augmentation du nombre de compagnies");

    // Personnels
    this.createChart('personnelsChart', 'doughnut', ['2021', '2022', '2023'], [50, 75, 100], "L'augmentation du nombre de personnels");
  }

  createChart(canvasId: string, chartType: string, labels: string[], data: number[], label: string) {
    if (!this.isBrowser) return;

    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!ctx) {
      console.error(`Canvas with id ${canvasId} not found`);
      return;
    }

    const config: ChartConfiguration = {
      type: chartType as keyof ChartTypeRegistry, // casting to ChartType
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: '#04BBC7',
          borderColor: '#000000',
          borderWidth: 0.8
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    new Chart(ctx as ChartItem, config);

  }
}
