import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, ChartTypeRegistry, registerables } from 'chart.js';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

declare global {
  interface Window { responsiveVoice: any; }
}
Chart.register(...registerables);

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements AfterViewInit {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  //Cette partie concerne l'animation
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.createCharts();
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
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
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
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

    // Ajouter la voix pour chaque graphique
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(label, "UK English Female");
    } else {
      console.error('responsiveVoice is not loaded');
    }
  }
}
