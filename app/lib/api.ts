// Client & Server API utility for TeaMax Cafe website

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

async function fetchFromApi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const res = await fetch(url, {
      cache: 'no-store', // Always fetch latest data from DB to reflect admin changes immediately
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      console.warn(`[API] Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err: any) {
    console.warn(`[API Network Error] ${endpoint}:`, err.message);
    return null;
  }
}

// 1. Featured products logic:
// Returns up to 6 eligible featured items (exactly 6 if 6+ available, or available count if < 6)
export async function getFeaturedProducts(limit = 6) {
  const data = await fetchFromApi<any[]>(`/menu-items/featured?limit=${limit}`);
  if (Array.isArray(data) && data.length > 0) {
    return data.slice(0, 6);
  }
  return null;
}

// 2. Common Menu logic:
// Common menu items & categories shared across all franchises
export async function getCommonMenu(categoryId?: string) {
  const query = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : '';
  const data = await fetchFromApi<any[]>(`/menu-items${query}`);
  return Array.isArray(data) ? data : [];
}

export async function getCommonCategories() {
  const data = await fetchFromApi<any[]>('/categories?status=active');
  return Array.isArray(data) ? data : [];
}

// 3. Common Offer logic:
// Returns the single active central offer displayed on all franchise pages
export async function getPrimaryOffer() {
  return fetchFromApi<any>('/offers/primary');
}

// 4. All active offers for /offers page
export async function getAllOffers() {
  const data = await fetchFromApi<any[]>('/offers?activeOnly=true');
  return Array.isArray(data) ? data : [];
}

// 5. Centres / Franchises
export async function getCentres(status = 'active') {
  const data = await fetchFromApi<any[]>(`/centres?status=${status}`);
  return Array.isArray(data) ? data : [];
}

export async function getCentreBySlugOrId(idOrSlug: string) {
  return fetchFromApi<any>(`/centres/${encodeURIComponent(idOrSlug)}`);
}

// 6. Lead Generation
export async function submitFranchiseEnquiry(payload: {
  fullName: string;
  mobile?: string;
  phone?: string;
  email: string;
  city: string;
  state: string;
  budget: string;
  space?: string;
  notes?: string;
  consent?: boolean;
}) {
  const res = await fetch(`${API_BASE_URL}/enquiries/franchise`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || 'Failed to submit franchise application');
  }
  return json;
}

// 7. Blogs
export async function getBlogs(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const data = await fetchFromApi<any[]>(`/blogs${query}`);
  return Array.isArray(data) ? data : [];
}

export async function getBlogBySlug(idOrSlug: string) {
  return fetchFromApi<any>(`/blogs/${encodeURIComponent(idOrSlug)}`);
}

// 8. Reviews & Testimonials
export async function getReviews(params: {
  displayOn?: string;
  reviewType?: string;
  relatedCentreId?: string;
  isFeatured?: boolean;
  status?: string;
} = {}) {
  const query = new URLSearchParams(
    Object.entries(params).reduce((acc, [k, v]) => {
      if (v !== undefined && v !== null && v !== '') acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  const data = await fetchFromApi<any[]>(`/reviews${query ? `?${query}` : ''}`);
  return Array.isArray(data) ? data : [];
}
