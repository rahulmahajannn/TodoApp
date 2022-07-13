import { useRouter } from "next/router";

function Task() {
  const router = useRouter();
  const { taskId } = router.query;
  console.log(taskId);
  return (
    <>
      <h1>this is task page {taskId}</h1>
    </>
  );
}

export default Task;
