import { AnyObject } from '@jovotech/common';
import _get from 'lodash.get';
import _set from 'lodash.set';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function forEachDeep<T = any>(
  value: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (val: T[keyof T] | any, path: string) => void,
  path = '',
): void {
  if (path) {
    handler(value, path);
  }
  if (Array.isArray(value)) {
    value.forEach((val, index) => {
      forEachDeep(val, handler, `${path}[${index}]`);
    });
  } else if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      forEachDeep(value[key as keyof T], handler, path ? `${path}.${key}` : key);
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMethodKeys<PROTOTYPE = any>(prototype: PROTOTYPE): Array<keyof PROTOTYPE> {
  return Object.getOwnPropertyNames(prototype).filter((key) => {
    if (key === 'constructor') {
      return false;
    }
    const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
    return (
      typeof prototype[key as keyof PROTOTYPE] === 'function' &&
      typeof descriptor?.value === 'function'
    );
  }) as Array<keyof PROTOTYPE>;
}

/**
 * Allows to mask certain properties of an object to hide sensitive data.
 * Alters the original object.
 * @param obj - Object which contains properties to mask
 * @param objectsToMask - Array of strings representing the properties to mask. Nested properties are supported, e.g. "foo.bar".
 * @param mask - Mask value to apply. If a function is provided, it will be executed and the result will be taken as the mask value.
 */
export function mask(obj: AnyObject, objectsToMask: string[], mask: unknown): void {
  objectsToMask.forEach((maskPath: string) => {
    const value = _get(obj, maskPath);
    if (value) {
      const maskedValue: unknown = typeof mask === 'function' ? mask(value) : mask;
      _set(obj, maskPath, maskedValue);
    }
  });
}
