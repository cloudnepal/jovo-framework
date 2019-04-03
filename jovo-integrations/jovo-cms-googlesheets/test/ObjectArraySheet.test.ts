import { ObjectArraySheet } from '../src';
import { HandleRequest, BaseApp } from 'jovo-core';
import { MockHandleRequest } from './mockObj/mockHR';

let handleRequest: HandleRequest;
beforeEach(() => {
    handleRequest = new MockHandleRequest();
});

describe('ObjectArraySheet.constructor()', () => {
    test('without config', () => {
        const objectArraySheet = new ObjectArraySheet();
        expect(objectArraySheet.config.range).toMatch('A:B');
    });

    test('with config', () => {
        const objectArraySheet = new ObjectArraySheet({
            range: 'A:Z'
        });
        expect(objectArraySheet.config.range).toMatch('A:Z');
    });
});

describe('ObjectArraySheet.parse()', () => {
    test('should throw error if entity is not set', () => {
        const objectArraySheet = new ObjectArraySheet();

        expect(() => objectArraySheet.parse(handleRequest, []))
            .toThrow('Entity has to be set.');
    });

    test('with empty array', () => {
        const objectArraySheet = new ObjectArraySheet({
            name: 'test'
        });

        expect(handleRequest.app.$cms.test).toBeUndefined();
        objectArraySheet.parse(handleRequest, []);
        expect(handleRequest.app.$cms.test).toStrictEqual([]);
    });

    test('with valid values', () => {
        const objectArraySheet = new ObjectArraySheet({
            name: 'test',
            range: 'A:Z'
        });

        expect(handleRequest.app.$cms.test).toBeUndefined();
        objectArraySheet.parse(handleRequest, [
            ['keys', 'values'], ['key1', 'value1']
        ]);
        expect(handleRequest.app.$cms.test).toStrictEqual([
            {
                keys: 'key1',
                values: 'value1'
            }
        ]);
    });
});