import { trpc } from "~/utils/trpc";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@conorroberts/beluga";
import { LoadingIcon } from "~/components/Icons";
import TodoList from "~/components/TodoList";

const Page = () => {
  const utils = trpc.useContext();
  const { data: todos = [] } = trpc.todo.getAllTodos.useQuery();

  const { mutate, isLoading: createLoading } = trpc.todo.createTodo.useMutation({
    onSuccess: async (newTodo) => {
      const creationLatency = Date.now() - newTodo.createdAt.getTime();

      utils.todo.getAllTodos.setData(undefined, (prev = []) => {
        prev.push(newTodo);
        return prev.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      });

      await utils.client.todo.reportLatency.mutate({
        todoId: newTodo.id,
        latency: creationLatency,
      });

      utils.todo.getAllTodos.setData(undefined, (prev = []) => {
        const todoIndex = prev.findIndex((e) => e.id === newTodo.id);

        // Couldn't find todo
        if (todoIndex === -1) return prev;

        prev[todoIndex].creationLatency = creationLatency;

        return prev;
      });
    },
  });

  return (
    <>
      <SignedIn>
        <div className="flex flex-col">
          <Button size="medium" color="green" onClick={() => mutate({ createdAt: new Date() })} className="ml-auto">
            <p>Create Todo</p>
            {createLoading && <LoadingIcon className="animate-spin" />}
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
