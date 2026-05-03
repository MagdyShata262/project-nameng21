import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Product } from './products.service';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, TitleCasePipe, MatChipsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="product-card">
      <div class="product-media">
        <img
          [src]="product().thumbnail"
          [alt]="product().title"
          width="260"
          height="260"
          loading="lazy"
        />
        <span class="stock-badge">{{ product().availabilityStatus }}</span>
      </div>

      <div class="product-body">
        <div class="product-title-row">
          <h2>{{ product().title }}</h2>
          <span class="price">{{ product().price | currency }}</span>
        </div>

        <p class="category">{{ product().category | titlecase }}</p>
        <p class="description">{{ product().description }}</p>

        <div class="meta-row" aria-label="Product details">
          <span>
            <mat-icon aria-hidden="true">star</mat-icon>
            {{ product().rating }}
          </span>
          <span>
            <mat-icon aria-hidden="true">inventory_2</mat-icon>
            {{ product().stock }} in stock
          </span>
        </div>

        <mat-chip-set aria-label="Product tags">
          @for (tag of displayTags(); track tag) {
            <mat-chip>{{ tag }}</mat-chip>
          }
        </mat-chip-set>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .product-card {
        background: var(--mat-sys-surface-container-low);
        border: 1px solid var(--mat-sys-outline-variant);
        border-radius: 8px;
        color: var(--mat-sys-on-surface);
        display: flex;
        flex-direction: column;
        height: 100%;
        min-width: 0;
        overflow: hidden;
      }

      .product-media {
        align-items: center;
        aspect-ratio: 1;
        background: var(--mat-sys-surface-container-high);
        display: flex;
        justify-content: center;
        position: relative;
      }

      .product-media img {
        height: 78%;
        object-fit: contain;
        width: 78%;
      }

      .stock-badge {
        background: var(--mat-sys-primary-container);
        border-radius: 999px;
        color: var(--mat-sys-on-primary-container);
        font-size: 0.75rem;
        font-weight: 700;
        inset-inline-end: 0.75rem;
        padding: 0.35rem 0.65rem;
        position: absolute;
        top: 0.75rem;
      }

      .product-body {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
      }

      .product-title-row {
        align-items: flex-start;
        display: flex;
        gap: 0.75rem;
        justify-content: space-between;
      }

      .product-title-row h2 {
        font-size: 1rem;
        font-weight: 800;
        line-height: 1.25;
        margin: 0;
      }

      .price {
        color: var(--mat-sys-primary);
        font-weight: 800;
        white-space: nowrap;
      }

      .category,
      .description {
        margin: 0;
      }

      .category {
        color: var(--mat-sys-tertiary);
        font-size: 0.85rem;
        font-weight: 700;
      }

      .description {
        color: var(--mat-sys-on-surface-variant);
        display: -webkit-box;
        font-size: 0.9rem;
        line-height: 1.45;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }

      .meta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: auto;
      }

      .meta-row span {
        align-items: center;
        color: var(--mat-sys-on-surface-variant);
        display: inline-flex;
        font-size: 0.85rem;
        gap: 0.25rem;
      }

      .meta-row mat-icon {
        font-size: 1rem;
        height: 1rem;
        width: 1rem;
      }
    `,
  ],
})
export class ProductComponent {
  readonly product = input.required<Product>();
  protected readonly displayTags = computed(() => this.product().tags.slice(0, 3));
}
