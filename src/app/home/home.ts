import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductComponent } from '../product/product';
import { ProductsService } from '../product/products.service';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ProductComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="products-shell" aria-labelledby="products-title">
      <div class="products-header">
        <div>
          <p class="eyebrow">DummyJSON catalog</p>
          <h1 id="products-title">Products</h1>
          <p class="summary">
            Showing {{ visibleProducts().length }} of {{ totalProducts() }} products from the live
            API.
          </p>
        </div>
        <div class="actions">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Search products</mat-label>
            <input matInput [value]="productsService.searchTerm()" (input)="onSearch($event)" placeholder="e.g. iPhone" />
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          <button mat-stroked-button type="button" (click)="loadProducts()" [disabled]="isLoading()">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
        </div>
      </div>

      @if (isLoading()) {
        <div class="status-panel" role="status" aria-live="polite">
          <mat-icon>hourglass_top</mat-icon>
          <span>Loading products...</span>
        </div>
      } @else if (errorMessage()) {
        <div class="status-panel error" role="alert">
          <mat-icon>error</mat-icon>
          <span>{{ errorMessage() }}</span>
        </div>
      } @else if (visibleProducts().length === 0) {
        <div class="status-panel" role="status">
          <mat-icon>search_off</mat-icon>
          <span>No products found matching your search.</span>
        </div>
      } @else {
        <div class="products-grid">
          @for (product of visibleProducts(); track product.id) {
            <app-product [product]="product" />
          }
        </div>
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: left;
      }

      .products-shell {
        padding: 2rem 0 4rem;
      }

      .products-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .products-header h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 800;
        line-height: 1;
      }

      .eyebrow {
        color: var(--mat-sys-primary);
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0;
        margin: 0 0 0.5rem;
        text-transform: uppercase;
      }

      .summary {
        color: var(--mat-sys-on-surface-variant);
        margin: 0.75rem 0 0;
        max-width: 44rem;
      }

      .actions {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .status-panel {
        align-items: center;
        background: var(--mat-sys-surface-container);
        border: 1px solid var(--mat-sys-outline-variant);
        border-radius: 8px;
        color: var(--mat-sys-on-surface);
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        min-height: 10rem;
        padding: 2rem;
      }

      .status-panel.error {
        color: var(--mat-sys-error);
      }

      .products-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }

      @media (max-width: 768px) {
        .products-header {
          flex-direction: column;
        }

        .actions {
          width: 100%;
          flex-direction: column;
          align-items: stretch;
        }
      }
    `,
  ],
})
export class HomeComponent {
  protected readonly productsService = inject(ProductsService);

  protected readonly productsResource = this.productsService.productsResource;

  protected readonly visibleProducts = computed(() => 
    this.productsResource.value()?.products.slice(0, 30) ?? []
  );
  protected readonly totalProducts = computed(() => 
    this.productsResource.value()?.total ?? 0
  );
  protected readonly isLoading = this.productsResource.isLoading;
  protected readonly errorMessage = computed(() => 
    this.productsResource.error() ? 'Products could not be loaded. Check your connection and try again.' : ''
  );

  protected onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.productsService.updateSearch(input.value);
  }

  protected loadProducts() {
    this.productsResource.reload();
  }
}
