export const removeInternal = (url: string) => {
  return url.startsWith('internal:') ? url.replace('internal:', '') : url;
}
