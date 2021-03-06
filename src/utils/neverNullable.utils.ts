import { throwError, of } from 'rxjs';

const isNullable = (data: any) => data === null || data === undefined;

export const neverNullable = <T>(data: T) => isNullable(data) ? throwError(new Error()) : of(data as NonNullable<T>)