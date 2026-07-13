import { z } from 'zod';

const configSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),

    ORDER_SERVICE_PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(3001),

    LOG_LEVEL: z
        .enum(['debug', 'info', 'warn', 'error'])
        .default('info'),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
    console.error('Invalid order-service configuration');
    console.error(parsedConfig.error.flatten().fieldErrors);
    process.exit(1);
}

export const orderServiceConfig = {
    nodeEnv: parsedConfig.data.NODE_ENV,
    port: parsedConfig.data.ORDER_SERVICE_PORT,
    logLevel: parsedConfig.data.LOG_LEVEL,
};

export type OrderServiceConfig = typeof orderServiceConfig;
