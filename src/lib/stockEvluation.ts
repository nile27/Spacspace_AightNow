export async function stockEvaluation() {
  const res = await fetch("http://localhost:3000/api/evaluate");
  const data = await res.json();

  return data.result;
}
