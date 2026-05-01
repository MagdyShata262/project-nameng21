import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <mat-icon class="hero-icon text-primary mb-3">auto_awesome</mat-icon>
          <h1 class="fw-bold display-4">Experience Material 3</h1>
          <p class="lead mb-4">A modern, responsive application built with Angular 21, Bootstrap 5, and the latest Material Design principles.</p>
          <div class="d-flex justify-content-center gap-3">
            <button mat-flat-button color="primary">Get Started</button>
            <button mat-stroked-button color="primary">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    <div class="album py-5 bg-light rounded shadow-sm">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h4 mb-0">Featured Components</h2>
          <mat-chip-set>
            <mat-chip>Angular 21</mat-chip>
            <mat-chip>Material 3</mat-chip>
          </mat-chip-set>
        </div>
        
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          @for (item of features; track item.title) {
            <div class="col">
              <div class="card h-100 border-0 shadow-sm hover-up">
                <div class="card-header bg-primary bg-opacity-10 py-4 text-center border-0">
                  <mat-icon class="feature-icon text-primary">{{ item.icon }}</mat-icon>
                </div>
                <div class="card-body">
                  <h5 class="card-title fw-bold">{{ item.title }}</h5>
                  <p class="card-text text-muted">{{ item.description }}</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3">
                  <button mat-button color="primary">View Details</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
    }
    .feature-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    .hover-up {
      transition: all 0.3s ease;
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
      }
    }
    .display-4 {
      background: linear-gradient(45deg, var(--mat-sys-primary), var(--mat-sys-tertiary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `]
})
export class HomeComponent {
  protected readonly themeService = inject(ThemeService);
  
  features = [
    { title: 'Signals', icon: 'bolt', description: 'Fine-grained reactivity with the latest Angular Signals API.' },
    { title: 'Material 3', icon: 'palette', description: 'Personalized color schemes based on the new design system.' },
    { title: 'Responsive', icon: 'devices', description: 'Seamlessly works across mobile, tablet, and desktop.' },
    { title: 'Accessibility', icon: 'accessibility', description: 'Built with ARIA and keyboard navigation in mind.' },
    { title: 'SSR Support', icon: 'dns', description: 'Server-side rendering for improved performance and SEO.' },
    { title: 'Performance', icon: 'speed', description: 'Optimized build with the new Angular build system.' }
  ];
}
