import { trpc } from "~/utils/trpc";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@conorroberts/beluga";
import { CloseIcon } from "~/components/Icons";

const Page = () => {
  const utils = trpc.useContext();
  const { user } = useUser();
  const { data: todos = [] } = trpc.todo.getAllTodos.useQuery(undefined, { enabled: Boolean(user) });

  const { mutate } = trpc.todo.createTodo.useMutation({
    onSuccess: () => {
      utils.todo.getAllTodos.refetch();
    },
  });
  const { mutate: deleteTodo } = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => {
      utils.todo.getAllTodos.refetch();
    },
  });

  return (
    <>
      <SignedIn>
        <div className="flex flex-col">
          <Button size="medium" color="green" onClick={() => mutate()} className="ml-auto">
            Create Todo
          </Button>
          <div className="flex flex-col gap-1 mx-auto w-full max-w-3xl">
            {todos.map((e) => (
              <div key={e.id} className="relative shadow-sm bg-white rounded-lg p-2 group dark:bg-gray-800">
                <span
                  className="absolute text-gray-400 right-1 top-1 p-0.5 hover:text-gray-500 transition cursor-pointer"
                  onClick={() => deleteTodo({ todoId: e.id })}
                >
                  <CloseIcon size={20} />
                </span>
                <p className="font-semibold text-sm">{e.title}</p>
                <p className="text-xs text-gray-400">Created {e.createdAt.toLocaleString()}</p>
              </div>
            ))}
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
