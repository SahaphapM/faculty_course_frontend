export type PageParams = {
  page: number
  limit: number
  sort: string
  order: 'ASC' | 'DESC'
  search: string
  column1: string
  column2: string
}
export type SortItem = { key: string; order?: boolean | 'asc' | 'desc' }
