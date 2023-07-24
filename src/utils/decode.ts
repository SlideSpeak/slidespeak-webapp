// eslint-disable-next-line func-style
export async function* decodeStreamToJson(
  data: ReadableStream<Uint8Array> | null,
) {
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read();
    if (done) break;

    if (value) {
      try {
        yield decoder.decode(value);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
