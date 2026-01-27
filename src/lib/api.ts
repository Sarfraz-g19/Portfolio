const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchFromApi(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}`);
    }

    const result = await response.json();
    return result.data; // Our factory controller returns { data: [...] }
}
