import { CurrencyPipe, TitleCasePipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { ProductsService } from './products.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.color-scheme]': "themeService.isDarkMode() ? 'dark' : 'light'"
  },
  template: `
    <div class="detail-container">
      <div class="nav-header">
        <button mat-button routerLink="/">
          <mat-icon>arrow_back</mat-icon>
          Back to Products
        </button>
      </div>

      @if (productResource.isLoading()) {
        <div class="status-panel">
          <mat-icon class="spinner">hourglass_top</mat-icon>
          <span>Loading product details...</span>
        </div>
      } @else if (productResource.error()) {
        <div class="status-panel error">
          <mat-icon>error</mat-icon>
          <span>Product not found.</span>
        </div>
      } @else if (productResource.value(); as product) {
        <div class="product-layout">
          <div class="media-section">
            <div class="main-image">
              <img [src]="product.thumbnail" [alt]="product.title" />
            </div>
            <div class="image-gallery">
              @for (image of product.images; track image) {
                <img [src]="image" [alt]="product.title" class="gallery-thumb" />
              }
            </div>
          </div>

          <div class="info-section">
            <p class="category-eyebrow">{{ product.category | titlecase }}</p>
            <h1>{{ product.title }}</h1>

            <div class="price-row">
              <span class="current-price">{{ product.price | currency }}</span>
              <span class="discount">{{ product.discountPercentage }}% OFF</span>
            </div>

            <p class="description">{{ product.description }}</p>

            <div class="stats-grid">
              <div class="stat">
                <mat-icon>star</mat-icon>
                <span>{{ product.rating }} Rating</span>
              </div>
              <div class="stat">
                <mat-icon>inventory_2</mat-icon>
                <span>{{ product.stock }} In Stock</span>
              </div>
              <div class="stat">
                <mat-icon>local_shipping</mat-icon>
                <span>{{ product.shippingInformation }}</span>
              </div>
            </div>

            <mat-divider class="my-4"></mat-divider>

            <div class="detail-list">
              <div class="detail-item"><strong>Brand:</strong> {{ product.brand || 'N/A' }}</div>
              <div class="detail-item"><strong>SKU:</strong> {{ product.sku }}</div>
              <div class="detail-item">
                <strong>Warranty:</strong> {{ product.warrantyInformation }}
              </div>
            </div>

            <div class="tag-row mt-4">
              <mat-chip-set>
                @for (tag of product.tags; track tag) {
                  <mat-chip>{{ tag }}</mat-chip>
                }
              </mat-chip-set>
            </div>
          </div>
        </div>

        <section class="reviews-section mt-5">
          <h2>Customer Reviews</h2>
          <div class="reviews-grid">
            @for (review of product.reviews; track review.reviewerEmail) {
              <div class="review-card">
                <div class="review-header">
                  <div class="stars">
                    @for (i of [1, 2, 3, 4, 5]; track i) {
                      <mat-icon [class.active]="i <= review.rating">star</mat-icon>
                    }
                  </div>
                  <span class="date">{{ review.date | date }}</span>
                </div>
                <p class="comment">"{{ review.comment }}"</p>
                <p class="reviewer">- {{ review.reviewerName }}</p>
              </div>
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .detail-container {
        padding: 2rem 0;
      }

      .nav-header {
        margin-bottom: 2rem;
      }

      .product-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
      }

      .media-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .main-image {
        background: var(--mat-sys-surface-container-high);
        border-radius: 12px;
        padding: 2rem;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }

      .image-gallery {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
      }

      .gallery-thumb {
        width: 80px;
        height: 80px;
        object-fit: contain;
        background: var(--mat-sys-surface-container);
        border-radius: 8px;
        cursor: pointer;
        border: 2px solid transparent;
        &:hover {
          border-color: var(--mat-sys-primary);
        }
      }

      .category-eyebrow {
        color: var(--mat-sys-primary);
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.85rem;
        margin-bottom: 0.5rem;
      }

      h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        line-height: 1.1;
      }

      .price-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .current-price {
        font-size: 2rem;
        font-weight: 800;
        color: var(--mat-sys-primary);
      }

      .discount {
        background: var(--mat-sys-error-container);
        color: var(--mat-sys-on-error-container);
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-weight: 700;
        font-size: 0.85rem;
      }

      .description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--mat-sys-on-surface-variant);
        margin-bottom: 2rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
      }

      .stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--mat-sys-on-surface-variant);
        mat-icon {
          color: var(--mat-sys-primary);
        }
      }

      .detail-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .status-panel {
        min-height: 20rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background: var(--mat-sys-surface-container);
        border-radius: 12px;
      }

      .spinner {
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .reviews-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .review-card {
        background: var(--mat-sys-surface-container-low);
        border: 1px solid var(--mat-sys-outline-variant);
        padding: 1.5rem;
        border-radius: 12px;
      }

      .review-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .stars {
        display: flex;
        color: var(--mat-sys-outline);
        mat-icon {
          font-size: 1.2rem;
          width: 1.2rem;
          height: 1.2rem;
          &.active {
            color: #ffb400;
          }
        }
      }

      .date {
        font-size: 0.85rem;
        color: var(--mat-sys-on-surface-variant);
      }

      .comment {
        font-style: italic;
        margin-bottom: 1rem;
      }

      .reviewer {
        font-weight: 700;
        text-align: right;
        margin: 0;
      }

      @media (max-width: 992px) {
        .product-layout {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ProductDetailComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly productsService = inject(ProductsService);

  // Accept id from route params
  readonly id = input<string>();

  protected readonly productId = computed(() => {
    const idValue = this.id();
    return idValue ? parseInt(idValue, 10) : 1; // Default to 1 as per user request
  });

  protected readonly productResource = this.productsService.productResource(this.productId);
}
