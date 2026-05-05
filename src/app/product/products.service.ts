import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';

  /**
   * Search term signal. Updating this will automatically trigger a new data fetch via productsResource.
   */
  readonly searchTerm = signal<string>('');

  /**
   * Resource for products. Handles loading state, errors, and reactive updates based on searchTerm.
   * Uses httpResource for modern, signal-based data fetching.
   */
  readonly productsResource = httpResource<ProductsResponse>(() => {
    const term = this.searchTerm();
    if (term) {
      return {
        url: `${this.apiUrl}/search`,
        params: { q: term },
      };
    }
    return { url: this.apiUrl };
  });

  /**
   * Fetch products as an Observable.
   * @param query Optional search query.
   */
  getProducts(query?: string): Observable<ProductsResponse> {
    if (query) {
      return this.http.get<ProductsResponse>(`${this.apiUrl}/search`, {
        params: { q: query },
      });
    }
    return this.http.get<ProductsResponse>(this.apiUrl);
  }

  /**
   * Fetch a single product by its ID.
   * @param id The product ID.
   */
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * Fetch a single product as a resource.
   * @param id The product ID signal or value.
   */
  productResource(id: () => number | undefined) {
    return httpResource<Product>(() => {
      const productId = id();
      return productId ? { url: `${this.apiUrl}/${productId}` } : undefined;
    });
  }

  /**
   * Update the search term.
   * @param term The new search query.
   */
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }
}
