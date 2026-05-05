import { ChangeDetectionStrategy, Component, inject, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav 
      class="navbar navbar-expand-lg fixed-top shadow-sm transition-all" 
      [class.navbar-dark]="themeService.isDarkMode()"
      [class.navbar-light]="!themeService.isDarkMode()"
      [class.bg-navbar-light]="!themeService.isDarkMode()"
      [class.bg-navbar-dark]="themeService.isDarkMode()">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <mat-icon class="me-2 text-primary">rocket_launch</mat-icon>
          <span [class.text-dark]="!themeService.isDarkMode()" [class.text-white]="themeService.isDarkMode()">NG-App</span>
        </a>
        
        <button 
          class="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasNavbar" 
          aria-controls="offcanvasNavbar" 
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div 
          class="offcanvas offcanvas-end border-0" 
          tabindex="-1" 
          id="offcanvasNavbar" 
          aria-labelledby="offcanvasNavbarLabel" 
          #offcanvas
          [attr.data-bs-theme]="themeService.isDarkMode() ? 'dark' : 'light'">
          <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title fw-bold" id="offcanvasNavbarLabel">Menu</h5>
            <button 
              type="button" 
              class="btn-close shadow-none" 
              data-bs-dismiss="offcanvas" 
              aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 mb-4 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link px-3 rounded-pill" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeOffcanvas()">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-3 rounded-pill" routerLink="/about" routerLinkActive="active" (click)="closeOffcanvas()">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-3 rounded-pill" routerLink="/services" routerLinkActive="active" (click)="closeOffcanvas()">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-3 rounded-pill" routerLink="/contact" routerLinkActive="active" (click)="closeOffcanvas()">Contact</a>
              </li>
            </ul>
            
            <div class="d-flex align-items-center border-top border-lg-0 pt-3 pt-lg-0">
              <button mat-icon-button (click)="themeService.toggleTheme()" aria-label="Toggle dark/light mode" 
                [color]="themeService.isDarkMode() ? 'accent' : 'primary'"
                class="ms-lg-2">
                <mat-icon>{{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
              </button>
              <span class="d-lg-none ms-2" [class.text-white]="themeService.isDarkMode()">
                {{ themeService.isDarkMode() ? 'Switch to Light' : 'Switch to Dark' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      color-scheme: inherit;
    }
    .transition-all {
      transition: all 0.3s ease-in-out;
    }
    .bg-navbar-light {
      background-color: rgba(255, 255, 255, 0.8) !important;
      backdrop-filter: blur(10px);
    }
    .bg-navbar-dark {
      background-color: rgba(30, 30, 30, 0.8) !important;
      backdrop-filter: blur(10px);
    }
    .navbar-brand {
      font-weight: 800;
      font-size: 1.25rem;
    }
    .nav-link {
      color: inherit;
      font-weight: 500;
      transition: all 0.2s ease;
      margin: 0 2px;
      &.active {
        background-color: var(--mat-sys-primary-container) !important;
        color: var(--mat-sys-on-primary-container) !important;
      }
      &:hover:not(.active) {
        background-color: var(--mat-sys-state-layers-surface-variant-opacity-0-08, rgba(0, 0, 0, 0.08));
      }
    }
    @media (max-width: 991.98px) {
      .nav-link {
        margin: 4px 0;
        padding: 0.75rem 1.25rem !important;
      }
    }
    .border-lg-0 {
      @media (min-width: 992px) {
        border: 0 !important;
      }
    }
  `]
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly themeService = inject(ThemeService);
  @ViewChild('offcanvas') offcanvasElement!: ElementRef<HTMLDivElement>;

  closeOffcanvas() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const bootstrap = (window as any).bootstrap;
    if (bootstrap?.Offcanvas) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(this.offcanvasElement.nativeElement);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    }
  }
}
