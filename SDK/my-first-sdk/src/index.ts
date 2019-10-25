let isDone: boolean = false;
let num: number = 1234;
let und: undefined = undefined;
const str: string = 'string';
const inf:number = Infinity;
let something: any;
something = 'seven';
something = 7;

interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let Tom: Person = {
  id: 1,
  name: 'Tom',
  age: 1234
}

interface foo {
  (arg1: number, arg2: any): boolean
}

let compare: foo = function (a, b){
  return a === b
}
console.log(compare(0,false))
