import type { RequestHandler } from 'express';

/**
 * Security middleware that adds various security-related HTTP headers
 */
export const securityHeaders: RequestHandler = (req, res, next) => {
  // 1. Content Security Policy (CSP)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sentry.io",
    "style-src 'self' 'unsafe-inline' https:;",
    "img-src 'self' data: https:;",
    "font-src 'self' data:;",
    `connect-src 'self' https://*.sentry.io ${process.env.VITE_API_BASE_URL || ''}`,
    "frame-ancestors 'none';",
    "form-action 'self';",
    "base-uri 'self';",
  ].join('; ');

  // 2. Security Headers
  const securityHeaders = {
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    // Enable XSS protection
    'X-XSS-Protection': '1; mode=block',
    // DNS prefetch control
    'X-DNS-Prefetch-Control': 'on',
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'fullscreen=()',
    ].join(', '),
    // Content Security Policy
    'Content-Security-Policy': csp,
  };

  // 3. Set all security headers
  Object.entries(securityHeaders).forEach(([header, value]) => {
    res.setHeader(header, value);
  });

  // 4. Remove X-Powered-By header
  res.removeHeader('X-Powered-By');

  next();
};

/**
 * Rate limiting middleware to prevent abuse
 */
export const rateLimit = (windowMs = 15 * 60 * 1000, max = 100): RequestHandler => {
  const ipHits = new Map<string, { count: number; resetTime: number }>();

  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Clean up old entries
    ipHits.forEach((value, key) => {
      if (value.resetTime < now) {
        ipHits.delete(key);
      }
    });

    // Get or create hit counter for this IP
    const hit = ipHits.get(ip) || { count: 0, resetTime: now + windowMs };
    
    // Check if rate limit exceeded
    if (hit.count >= max) {
      const retryAfter = Math.ceil((hit.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
        retryAfter,
      });
    }

    // Increment hit counter
    hit.count++;
    ipHits.set(ip, hit);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', max.toString());
    res.setHeader('X-RateLimit-Remaining', (max - hit.count).toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(hit.resetTime / 1000).toString());

    next();
  };
};

/**
 * Error handling middleware for security-related errors
 */
export const securityErrorHandler: RequestHandler = (err: any, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  const errorResponses = {
    UnauthorizedError: {
      status: 401,
      body: { error: 'Invalid or missing token' }
    },
    RateLimitExceeded: {
      status: 429,
      body: {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.'
      }
    },
    default: {
      status: 500,
      body: {
        error: 'Internal Server Error',
        ...(isDevelopment && { message: err.message })
      }
    }
  };

  const response = errorResponses[err.name as keyof typeof errorResponses] || errorResponses.default;
  
  if (isDevelopment) {
    console.error('Security Error:', err);
  }
  
  res.status(response.status).json(response.body);
};
