import { z } from 'zod';

// Define the shape of our environment variables
const envSchema = z.object({
  // Required environment variables
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL must be a valid URL'),
  
  // Optional environment variables with defaults
  NODE_ENV: z
    .enum(['development', 'test', 'production'] as const)
    .default('development'),
  VITE_APP_NAME: z.string().default('Kingdom Project'),
  VITE_APP_ENV: z
    .enum(['development', 'staging', 'production'] as const)
    .default('development'),
    
  // Feature flags
  VITE_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
    
  // Security
  VITE_CSP_REPORT_URI: z.string().url().optional(),
  
  // Sentry
  VITE_SENTRY_DSN: z.string().url().optional(),
  VITE_SENTRY_ENVIRONMENT: z.string().default('development'),
  VITE_SENTRY_RELEASE: z.string().optional(),
});

// Parse environment variables
type Env = z.infer<typeof envSchema>;

// Get environment variables with validation
const getEnv = (): Env => {
  try {
    // In Vite, import.meta.env contains the environment variables
    const envVars = import.meta.env;
    
    // Parse and validate environment variables
    return envSchema.parse({
      ...envVars,
      // Add any transformations here if needed
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format and log validation errors
      const errorMessages = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      
      console.error('❌ Invalid environment variables:', errorMessages);
      throw new Error('Invalid environment variables');
    }
    
    throw error;
  }
};

// Export validated environment variables
export const env = getEnv();

// Type-safe environment variables
export const isProduction = env.VITE_APP_ENV === 'production';
export const isDevelopment = env.VITE_APP_ENV === 'development';

// Feature flags
export const features = {
  analytics: env.VITE_ENABLE_ANALYTICS,
};

// Security configuration
export const security = {
  csp: {
    reportUri: env.VITE_CSP_REPORT_URI,
  },
};

// Sentry configuration
export const sentryConfig = env.VITE_SENTRY_DSN ? {
  dsn: env.VITE_SENTRY_DSN,
  environment: env.VITE_SENTRY_ENVIRONMENT,
  release: env.VITE_SENTRY_RELEASE,
  // Disable in development or when explicitly disabled
  enabled: isProduction && !!env.VITE_SENTRY_DSN,
  // Performance monitoring
  tracesSampleRate: 1.0,
  // Session replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
} : null;

// API configuration
export const apiConfig = {
  baseUrl: env.VITE_API_BASE_URL,
  timeout: 30000, // 30 seconds
  // Add other API configurations here
};

// App configuration
export const appConfig = {
  name: env.VITE_APP_NAME,
  environment: env.VITE_APP_ENV,
  isProduction,
  isDevelopment,
  version: import.meta.env.VITE_APP_VERSION || '0.1.0',
};
