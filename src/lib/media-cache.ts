type CacheEntry = {
    url: string;
    expiresAt: number;
};

class MediaCache {
    private cache = new Map<string, CacheEntry>();
    private static instance: MediaCache;

    private constructor() { }

    static getInstance(): MediaCache {
        if (!MediaCache.instance) {
            MediaCache.instance = new MediaCache();
        }
        return MediaCache.instance;
    }

    get(fileId: string): string | null {
        const entry = this.cache.get(fileId);
        if (!entry) return null;

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(fileId);
            return null;
        }

        return entry.url;
    }

    set(fileId: string, url: string, ttlMs: number = 50 * 60 * 1000): void {
        this.cache.set(fileId, {
            url,
            expiresAt: Date.now() + ttlMs,
        });
    }
}

export const mediaCache = MediaCache.getInstance();
