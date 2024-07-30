// ai 점수 평가
export async function stockEvaluation(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/evaluate/${id}`);
  const data = await res.json();

  return data.result;
}
