const NodeCache = require('node-cache');
const redis = require('redis');

// NodeCache instance (in-memory cache) - fallback nếu Redis không có
const memoryCache = new NodeCache({
  stdTTL: 300, // 5 minutes default
  checkperiod: 60, // check for expired keys every 60s
  useClones: false, // performance optimization
});

// Redis client (optional - for production)
let redisClient = null;
let isRedisConnected = false;

/**
 * Initialize Redis connection (optional)
 * Nếu không có Redis, sẽ dùng NodeCache (in-memory)
 */
const initRedis = async () => {
  if (process.env.REDIS_URL) {
    try {
      redisClient = redis.createClient({
        url: process.env.REDIS_URL,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 10) {
              console.log('❌ Redis: Too many reconnection attempts');
              return new Error('Redis reconnection failed');
            }
            return retries * 100; // retry delay
          }
        }
      });

      redisClient.on('error', (err) => {
        console.error('❌ Redis Client Error:', err);
        isRedisConnected = false;
      });

      redisClient.on('connect', () => {
        console.log('🔄 Redis: Connecting...');
      });

      redisClient.on('ready', () => {
        console.log('✅ Redis: Connected and ready');
        isRedisConnected = true;
      });

      await redisClient.connect();
    } catch (error) {
      console.warn('⚠️ Redis not available, using in-memory cache instead');
      isRedisConnected = false;
    }
  } else {
    console.log('ℹ️ REDIS_URL not configured, using in-memory cache');
  }
};

/**
 * Get data from cache
 * @param {string} key - Cache key
 * @returns {Promise<any>} - Cached data or null
 */
const getCache = async (key) => {
  try {
    // Try Redis first if connected
    if (isRedisConnected && redisClient) {
      const data = await redisClient.get(key);
      if (data) {
        return JSON.parse(data);
      }
    }
    
    // Fallback to memory cache
    return memoryCache.get(key);
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

/**
 * Set data to cache
 * @param {string} key - Cache key
 * @param {any} value - Data to cache
 * @param {number} ttl - Time to live in seconds (default: 300s = 5min)
 * @returns {Promise<boolean>}
 */
const setCache = async (key, value, ttl = 300) => {
  try {
    // Try Redis first if connected
    if (isRedisConnected && redisClient) {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    }
    
    // Always set in memory cache as fallback
    memoryCache.set(key, value, ttl);
    return true;
  } catch (error) {
    console.error('Cache set error:', error);
    return false;
  }
};

/**
 * Delete from cache
 * @param {string} key - Cache key
 * @returns {Promise<boolean>}
 */
const deleteCache = async (key) => {
  try {
    if (isRedisConnected && redisClient) {
      await redisClient.del(key);
    }
    memoryCache.del(key);
    return true;
  } catch (error) {
    console.error('Cache delete error:', error);
    return false;
  }
};

/**
 * Delete multiple keys by pattern
 * @param {string} pattern - Key pattern (e.g., "user:*")
 * @returns {Promise<number>} - Number of keys deleted
 */
const deleteCacheByPattern = async (pattern) => {
  try {
    let deletedCount = 0;
    
    // Redis pattern delete
    if (isRedisConnected && redisClient) {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        deletedCount += await redisClient.del(keys);
      }
    }
    
    // Memory cache pattern delete
    const memKeys = memoryCache.keys();
    const matchingKeys = memKeys.filter(key => {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(key);
    });
    matchingKeys.forEach(key => memoryCache.del(key));
    deletedCount += matchingKeys.length;
    
    return deletedCount;
  } catch (error) {
    console.error('Cache pattern delete error:', error);
    return 0;
  }
};

/**
 * Clear all cache
 * @returns {Promise<boolean>}
 */
const clearCache = async () => {
  try {
    if (isRedisConnected && redisClient) {
      await redisClient.flushDb();
    }
    memoryCache.flushAll();
    console.log('✅ All cache cleared');
    return true;
  } catch (error) {
    console.error('Cache clear error:', error);
    return false;
  }
};

/**
 * Cache middleware for Express routes
 * @param {number} ttl - Time to live in seconds
 * @returns {Function} Express middleware
 */
const cacheMiddleware = (ttl = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Generate cache key from URL and query params
    const cacheKey = `route:${req.originalUrl || req.url}`;
    
    try {
      const cachedData = await getCache(cacheKey);
      
      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        return res.json(cachedData);
      }
      
      console.log(`❌ Cache MISS: ${cacheKey}`);
      
      // Override res.json to cache the response
      const originalJson = res.json.bind(res);
      res.json = (data) => {
        setCache(cacheKey, data, ttl).catch(err => 
          console.error('Failed to cache response:', err)
        );
        return originalJson(data);
      };
      
      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

/**
 * Get cache stats
 * @returns {Object} - Cache statistics
 */
const getCacheStats = () => {
  const memStats = memoryCache.getStats();
  return {
    redis: {
      connected: isRedisConnected,
      url: process.env.REDIS_URL ? 'configured' : 'not configured'
    },
    memory: {
      keys: memStats.keys,
      hits: memStats.hits,
      misses: memStats.misses,
      hitRate: memStats.hits / (memStats.hits + memStats.misses) || 0
    }
  };
};

// Close Redis connection gracefully
const closeCache = async () => {
  if (redisClient) {
    await redisClient.quit();
    console.log('✅ Redis connection closed');
  }
};

module.exports = {
  initRedis,
  getCache,
  setCache,
  deleteCache,
  deleteCacheByPattern,
  clearCache,
  cacheMiddleware,
  getCacheStats,
  closeCache
};
