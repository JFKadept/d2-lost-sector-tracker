export const mergeHeaders = (...h: Headers[]): Headers => {
  const headers = new Headers();
  h.forEach((_headers) =>
    _headers.forEach((value, name) => headers.append(name, value))
  );
  return headers;
};
