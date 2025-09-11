// Middleware de logging
export const loggerMiddleware = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next();
};
//# sourceMappingURL=logger.middleware.js.map