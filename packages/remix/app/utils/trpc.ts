import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { Router } from "../../../api/src/index";
import superjson from "superjson";

export const trpc = createTRPCReact<Router>();

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
      headers: () => {
        console.log(localStorage.getItem("something"));
        return {};
      },
    }),
  ],
});
