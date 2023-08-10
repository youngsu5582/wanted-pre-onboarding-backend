export interface PostPaginationDto {
  /**
   * @minimum 0
   */
  page?: number;
  /**
   * @minimum 0
   */
  limit?: number;
  order?: 'desc' | 'asc';
}
