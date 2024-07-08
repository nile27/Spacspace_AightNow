export async function stockAnalysis() {
  const res = await fetch("http://localhost:3000/api/agent");
  const data = await res.json();
  return data.result;
}
