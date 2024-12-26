export interface PatchedRequest<T> {
    id: string,
    body: T
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }