import { Jovo } from './Jovo';
import { AnyObject } from '@jovotech/common';

export type MiddlewareFunction = (jovo: Jovo, payload?: AnyObject) => Promise<unknown> | unknown;

export class Middleware<NAME extends string = string> {
  readonly fns: MiddlewareFunction[];
  enabled = true;

  constructor(readonly name: NAME) {
    this.fns = [];
  }

  use(...fns: MiddlewareFunction[]): this {
    this.fns.push(...fns);
    return this;
  }

  async run(jovo: Jovo, payload?: AnyObject): Promise<void> {
    if (!this.enabled) {
      return;
    }
    for (let i = 0, len = this.fns.length; i < len; i++) {
      await this.fns[i](jovo, payload);
    }
  }

  remove(fn: MiddlewareFunction): this {
    const index = this.fns.indexOf(fn);
    if (index >= 0) {
      this.fns.splice(index, 1);
    }
    return this;
  }
}
