import fastify from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import type { Router } from "./trpc/router";
import { mainRouter as router } from "./trpc/router";
import { createContext } from "./trpc/context";
import cors from "@fastify/cors";

const server = fastify({
  maxParamLength: 5000,
  logger: true,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router, createContext },
});

server.register(cors, {
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  methods: ["*"],
});

export { Router, server };
