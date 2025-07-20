# System Patterns: Angular RSS 2025

## Architecture Overview

### Component-Based Architecture

The application follows Angular's component-based architecture with clear separation of concerns:

```
App Component (Root)
├── Header Component
├── Sidebar Component (Feed Navigation)
├── Main Content Area
│   ├── Feed List Component
│   ├── Article List Component
│   └── Article Detail Component
└── Footer Component
```

### State Management Pattern

Using RxJS for reactive state management with the following pattern:

- **Services:** Centralized state management
- **Observables:** Reactive data streams
- **Subjects:** State updates and communication
- **BehaviorSubject:** Current state with initial values

## Design Patterns

### Service Layer Pattern

```typescript
// Feed Service - Centralized feed management
@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private feeds$ = new BehaviorSubject<Feed[]>([]);

  getFeeds(): Observable<Feed[]> {
    return this.feeds$.asObservable();
  }

  addFeed(feed: Feed): void {
    const currentFeeds = this.feeds$.value;
    this.feeds$.next([...currentFeeds, feed]);
  }
}
```

### Repository Pattern

```typescript
// Data access layer for RSS feeds
@Injectable({
  providedIn: 'root',
})
export class FeedRepository {
  fetchFeed(url: string): Observable<FeedData> {
    return this.http.get(url).pipe(
      map(response => this.parseRSS(response)),
      catchError(error => this.handleError(error))
    );
  }
}
```

### Observer Pattern

```typescript
// Reactive updates for feed content
export class FeedObserver {
  private feedUpdates$ = new Subject<FeedUpdate>();

  subscribeToUpdates(): Observable<FeedUpdate> {
    return this.feedUpdates$.asObservable();
  }

  notifyUpdate(update: FeedUpdate): void {
    this.feedUpdates$.next(update);
  }
}
```

## Component Patterns

### Smart/Container Components

- **FeedManagerComponent:** Manages feed state and operations
- **ArticleListComponent:** Handles article display and filtering
- **AppComponent:** Root component with global state

### Presentational Components

- **FeedItemComponent:** Displays individual feed information
- **ArticleItemComponent:** Renders article preview
- **LoadingSpinnerComponent:** Reusable loading indicator

### Component Communication

```typescript
// Parent to Child: Input properties
@Input() feed: Feed;

// Child to Parent: Output events
@Output() feedSelected = new EventEmitter<Feed>();

// Service-based communication
constructor(private feedService: FeedService) {}
```

## Data Flow Patterns

### Unidirectional Data Flow

1. **User Action:** User interacts with component
2. **Event Emission:** Component emits event
3. **Service Update:** Service updates state
4. **State Propagation:** New state flows to components
5. **UI Update:** Components re-render with new data

### Reactive Data Flow

```typescript
// Component subscribes to service
this.feedService.getFeeds().subscribe(feeds => {
  this.feeds = feeds;
});

// Service updates trigger component updates automatically
```

## Error Handling Patterns

### Global Error Handler

```typescript
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.error('An error occurred:', error);
    // Log to service, show user notification, etc.
  }
}
```

### Service Error Handling

```typescript
// RxJS error handling in services
this.http.get(url).pipe(
  catchError(error => {
    console.error('Feed fetch failed:', error);
    return throwError(() => new Error('Failed to fetch feed'));
  })
);
```

### Component Error Boundaries

```typescript
// Error handling in components
this.feedService
  .getFeeds()
  .pipe(
    catchError(error => {
      this.showErrorMessage(error);
      return of([]); // Return empty array as fallback
    })
  )
  .subscribe(feeds => (this.feeds = feeds));
```

## Caching Patterns

### Memory Caching

```typescript
// In-memory cache for feed data
private feedCache = new Map<string, FeedData>();

getFeed(url: string): Observable<FeedData> {
  if (this.feedCache.has(url)) {
    return of(this.feedCache.get(url)!);
  }

  return this.fetchFeed(url).pipe(
    tap(data => this.feedCache.set(url, data))
  );
}
```

### Local Storage Caching

```typescript
// Persistent cache using localStorage
saveToCache(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

getFromCache(key: string): any {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
}
```

## Performance Patterns

### OnPush Change Detection

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedListComponent {
  // Component only updates when inputs change
}
```

### Lazy Loading

```typescript
// Route-based lazy loading
const routes: Routes = [
  {
    path: 'feeds',
    loadChildren: () => import('./feeds/feeds.module').then(m => m.FeedsModule),
  },
];
```

### Virtual Scrolling

```typescript
// For large lists of articles
<cdk-virtual-scroll-viewport itemSize="100">
  <div *cdkVirtualFor="let article of articles">
    <app-article-item [article]="article"></app-article-item>
  </div>
</cdk-virtual-scroll-viewport>
```

## Testing Patterns

### Unit Testing

```typescript
describe('FeedService', () => {
  let service: FeedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedService],
    });
    service = TestBed.inject(FeedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch feeds', () => {
    service.getFeeds().subscribe(feeds => {
      expect(feeds).toBeTruthy();
    });
  });
});
```

### Component Testing

```typescript
describe('FeedListComponent', () => {
  let component: FeedListComponent;
  let fixture: ComponentFixture<FeedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedListComponent],
      providers: [FeedService],
    }).compileComponents();
  });

  it('should display feeds', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.feed-item')).toBeTruthy();
  });
});
```

## Security Patterns

### Input Sanitization

```typescript
// Sanitize RSS content before display
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

sanitizeContent(content: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(content);
}
```

### URL Validation

```typescript
// Validate RSS feed URLs
validateFeedUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}
```

## Accessibility Patterns

### ARIA Attributes

```html
<!-- Proper ARIA labeling -->
<button [attr.aria-label]="'Add feed: ' + feed.title" (click)="addFeed(feed)">Add Feed</button>
```

### Keyboard Navigation

```typescript
// Keyboard event handling
@HostListener('keydown.enter')
@HostListener('keydown.space')
onActivate(): void {
  this.selectFeed();
}
```

### Focus Management

```typescript
// Manage focus for accessibility
@ViewChild('feedInput') feedInput!: ElementRef;

focusFeedInput(): void {
  this.feedInput.nativeElement.focus();
}
```
