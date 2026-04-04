// Vercel serverless entry point — wraps the Express app
// Catch startup errors and expose them so we can diagnose crashes
let app: any;
try {
  app = (await import('../server/index.js')).default;
} catch (err: any) {
  console.error('[api/index] Startup failure:', err?.stack || err);
  app = (_req: any, res: any) => {
    res.status(500).json({ error: 'Server initialization failed', message: String(err?.message || err) });
  };
}
export default app;
