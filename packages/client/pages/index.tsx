import { trpc } from "~/utils/trpc";

const Page = () => {
  const { data = "NO DATA" } = trpc.example.hello.useQuery(undefined, { enabled: false });
  return <div>{"s"}</div>;
};

export default Page;

