export async function stockEvaluation(id: string) {
  const res = await fetch(`http://localhost:3000/api/evaluate/${id}`);
  const data = await res.json();

  return data.result;
}
