import { SignedIn, SignedOut } from "@clerk/remix";
import { Button } from "@conorroberts/beluga";
import { LoadingIcon } from "~/components/Icons";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ActionArgs, LoaderArgs, json } from "@remix-run/cloudflare";
import { z } from "zod";
import { getAuth } from "@clerk/remix/ssr.server";
import getAllTodos from "~/utils/getAllTodos";
import TodoList from "~/components/TodoList";

const ActionParams = z.object({
  createdAt: z.string(),
  createdBy: z.string(),
});

export const loader = async (args: LoaderArgs) => {
  const auth = await getAuth(args);

  const validUserId = z.string().safeParse(auth.userId);

  if (validUserId.success) {
    return getAllTodos({ userId: validUserId.data, prisma:args.context.prisma });
  }

  return [];
};

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formData = await request.formData();
  const auth = await getAuth(args);

  const intent = formData.get("intent");

  if (intent === "create") {
    const { createdAt, createdBy } = ActionParams.parse({
      createdAt: formData.get("createdAt"),
      createdBy: auth.userId,
    });

    const newTodo = await args.context.prisma.todo.create({
      data: {
        createdAt,
        createdBy,
        title: `${Math.random()} New Todo`,
        completed: false,
      },
    });

    return json({ intent: "create", data: { id: newTodo.id } });
  } else if (intent === "delete") {
    const { todoId } = z.object({ todoId: z.coerce.number() }).parse({ todoId: formData.get("todoId") });

    await args.context.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return json({ intent: "delete", data: { id: todoId } });
  }

  return null;
};

const Page = () => {
  const createTodo = useFetcher<typeof action>();
  const todos = useLoaderData<typeof loader>();

  return (
    <>
      <SignedIn>
        <div className="flex flex-col">
          <Button
            size="medium"
            color="green"
            onClick={() =>
              createTodo.submit({ intent: "create", createdAt: new Date().toISOString() }, { method: "post" })
            }
            className="ml-auto"
          >
            <p>Create Todo</p>
            {createTodo.state === "loading" && <LoadingIcon className="animate-spin" />}
          </Button>
          <div className="mx-auto max-w-3xl w-full">
            <TodoList todos={todos} />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <p className="my-8 text-center">You must be signed in to view this page.</p>
      </SignedOut>
    </>
  );
};

export default Page;
