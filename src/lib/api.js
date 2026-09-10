/**
 * API client to interact with Express Backend API
 * Uses NEXT_PUBLIC_API_URL or defaults to http://localhost:5000/api
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchSliderImages() {
  try {
    const res = await fetch(`${API_BASE}/images?sliderOnly=true&limit=20`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.images || [];
  } catch (err) {
    console.warn('API fetchSliderImages failed:', err.message);
    return [];
  }
}

export async function fetchCategories(type = null) {
  try {
    const url = type ? `${API_BASE}/categories?type=${type}` : `${API_BASE}/categories`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch (err) {
    console.warn('API fetchCategories failed:', err.message);
    return [];
  }
}

export async function fetchCategoryById(id) {
  try {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.category || null;
  } catch (err) {
    console.warn(`API fetchCategoryById(${id}) failed:`, err.message);
    return null;
  }
}

export async function fetchCategoryImages(categoryId, page = 1, limit = 12) {
  try {
    const url = `${API_BASE}/images?categoryId=${categoryId}&page=${page}&limit=${limit}`;
    const res = await fetch(url, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return { images: [], total: 0, totalPages: 1, page };
    }
    const data = await res.json();
    return {
      images: data.images || [],
      total: data.total || 0,
      totalPages: data.totalPages || 1,
      page: data.page || page,
    };
  } catch (err) {
    console.warn(`API fetchCategoryImages(${categoryId}) failed:`, err.message);
    return { images: [], total: 0, totalPages: 1, page };
  }
}

export async function fetchBusinessSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.settings || null;
  } catch (err) {
    console.warn('API fetchBusinessSettings failed:', err.message);
    return null;
  }
}

