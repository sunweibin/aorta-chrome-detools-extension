export default function optimiezeRequest (data, id) {
  const { request, response } = data;

  return {
    id,
    request,
    response,
  }
}
