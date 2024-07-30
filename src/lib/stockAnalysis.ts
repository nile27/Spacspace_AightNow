//ai 애널리스트 분석

export async function stockAnalysis(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/agent/${id}`);
  const data = await res.json();
  return data.result;
}
