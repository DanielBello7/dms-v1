import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { build_base_query } from './paginate-by-date.helper';
import { safeNumber } from './paginate-by-page.helper';
import { IIndexPaginated } from '@repo/types';
import { SORT_TYPE } from '@/conversations/dto/conversation-query.dto';

const MAX_PAGE_SIZE = 20;
const MIN_PAGE_SIZE = 1;

export type IndexCursorQueryParams = Record<string, any> & {
  pick?: number;
  index?: number;
  sort?: SORT_TYPE;
};

/**
 * Cursor pagination by procedural index
 */
export async function paginateByIndex<
  T extends ObjectLiteral & { index: number },
>(
  query: Partial<IndexCursorQueryParams & T>,
  repo: Repository<T>,
  extend?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>,
): Promise<IIndexPaginated<T>> {
  const { pick, index, sort, ...filters } = query;
  const limit = Math.min(
    MAX_PAGE_SIZE,
    Math.max(MIN_PAGE_SIZE, safeNumber(pick, 10)),
  );
  const order: 'ASC' | 'DESC' = sort === 'ASC' ? 'ASC' : 'DESC';

  const qb = build_base_query(repo, filters, extend);

  if (index !== undefined) {
    if (order === 'ASC') qb.andWhere('entity.index > :after', { after: index });
    else qb.andWhere('entity.index < :after', { after: index });
  }

  qb.orderBy('entity.index', order).take(limit);

  const docs = await qb.getMany();
  const nextCursor = docs.length > 0 ? docs[docs.length - 1].index : null;

  return {
    docs,
    has_next_page: docs.length === limit,
    has_prev_page: index !== undefined,
    pick: limit,
    next_page: nextCursor,
  };
}
