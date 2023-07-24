export const streamQuestion = async (question: string, uuid: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stream?text=${question}&uuid=${uuid}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );

  if (!response.ok) throw new Error(response.statusText);

  return response.body;
};
