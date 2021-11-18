export const matcherId = {
  match: /^[0-9]+$/,
  cast: (id: string) => Number(id),
};
