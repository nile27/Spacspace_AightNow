export async function stockAnalysis(id: string) {
  const res = await fetch(`http://localhost:3000/api/agent/${id}`);
  const data = await res.json();
  return data.result;
}
