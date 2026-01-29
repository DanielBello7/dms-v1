import { SORT_TYPE } from '@/conversations/dto/conversation-query.dto';
import { safeNumber } from './paginate-by-page.helper';
import { IDatePaginated } from '@repo/types';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

const MAX_PAGE_SIZE = 20;
const MIN_PAGE_SIZE = 1;

export type DateCursorQueryParams = Record<string, any> & {
  pick?: number;
  date?: Date;
  sort?: SORT_TYPE;
};

export function build_base_query<T extends ObjectLiteral>(
  repo: Repository<T>,
  filters: Record<string, any>,
  extend?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>,
) {
  const qb = repo.createQueryBuilder('entity');
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined)
      qb.andWhere(`entity.${key} = :${key}`, { [key]: value });
  });
  extend?.(qb);
  return qb;
}

export async function paginate_by_date<
  T extends ObjectLiteral & { created_at: Date },
>(
  query: Partial<DateCursorQueryParams & T>,
  repo: Repository<T>,
  extend?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>,
): Promise<IDatePaginated<T>> {
  const { pick, date, sort, ...filters } = query;
  const limit = Math.min(
    MAX_PAGE_SIZE,
    Math.max(MIN_PAGE_SIZE, safeNumber(pick, 10)),
  );
  const order: 'ASC' | 'DESC' = sort === 'ASC' ? 'ASC' : 'DESC';

  const qb = build_base_query(repo, filters, extend);

  if (date) {
    if (order === 'ASC') {
      qb.andWhere('entity.created_at > :after', {
        after: date,
      });
    } else
      qb.andWhere('entity.created_at < :after', {
        after: date,
      });
  }

  qb.orderBy('entity.created_at', order).take(limit);

  const docs = await qb.getMany();
  const next_cursor = docs.length > 0 ? docs[docs.length - 1].created_at : null;

  return {
    docs,
    has_next_page: docs.length === limit,
    has_prev_page: !!date,
    pick: limit,
    next_page: next_cursor,
    prev_page: null,
  };
}
