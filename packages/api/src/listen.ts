import { server } from ".";

// Start server
(async () => {
  try {
    await server.listen({
      host: process.env.HOST ?? "localhost",
      port: Number(process.env.PORT ?? 4000),
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
