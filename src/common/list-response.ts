export interface ListResponse<T> {
  data: T[];
  total: number;
}

export function toListResponse<T>(data: T[]): ListResponse<T> {
  return { data, total: data.length };
}
