import { CalendarIcon } from "@heroicons/react/20/solid";
import { trpc } from "~/utils/trpc";

const TodoList = () => {
  const utils = trpc.useContext();

   const { data: todos = [] } = trpc.todo.getAllTodos.useQuery();
  const { mutate: deleteTodo } = trpc.todo.deleteTodo.useMutation({
    onMutate: ({ todoId }) => {
      utils.todo.getAllTodos.setData(undefined, (prev = []) => {
        return prev.filter((e) => e.id !== todoId);
      });
    },
    onError: async () => {
      await utils.todo.getAllTodos.refetch();
    },
  });
  return (
    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo({ todoId: todo.id })}>
            <div className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600 dark:text-indigo-300">{todo.title}</p>
                  {todo.creationLatency && (
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {todo.creationLatency} ms
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-2 sm:flex sm:justify-end">
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
                    <CalendarIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-300"
                      aria-hidden="true"
                    />
                    <p>
                      Created at{" "}
                      <time dateTime={todo.createdAt.toISOString()}>{todo.createdAt.toLocaleTimeString()}</time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;