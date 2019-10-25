declare let isDone: boolean;
declare let num: number;
declare let und: undefined;
declare const str: string;
declare const inf: number;
declare let something: any;
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
declare let Tom: Person;
interface foo {
    (arg1: number, arg2: any): boolean;
}
declare let compare: foo;
