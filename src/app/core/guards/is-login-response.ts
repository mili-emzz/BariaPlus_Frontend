export function isLoginResponse(body:unknown){
  if (typeof body !== "object" || body === null) {
    return
  }

  const b = body as {token?: unknown; doctor?: unknown};

  return(
    typeof b.token === 'string' &&
    typeof b.doctor === 'object' && b.doctor !== null)
}
