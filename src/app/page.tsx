import Main from "@/features/Main/Main";
import { sleep } from "@/lib/utils";

export default async function Home() {
  await sleep(3000);

  return (
    <>
      <Main />
    </>
  );
}
