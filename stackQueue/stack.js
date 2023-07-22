/**
 * 배열에는 굉장히 많은 함수가 있다. (push, pop, unshift, slice, shift, splice ..)
 * 하지만, Stack을 이용할 땐, push와 pop만을 사용하도록 만들어놓으면 다른 함수를 사용하지 못하게 할 수 있다.
 *
 * top이라는 메소드 : 제일 마지막요소를 구한 메소드(배열의 마지막 값)이다. (at()함수를 사용)
 *
 * arr배열을 사용하지 않고, 연결리스트로도 구현해도된다.
 * pop, top을 빠르게 하고 싶다면? 배열의 맨 끝부분인 tail을 사용하자. (연결리스트 tail)
 */
class Stack {
  arr = [];

  push(value) {
    return this.arr.push(value);
  }

  pop(value) {
    return this.arr.pop();
  }

  top() {
    // return this.arr[this.arr.length - 1];  예전 방법
    return this.arr.at(-1);
  }

  //get을 쓰면 메소드가 아닌 getter라고 부른다. (배열의 length이다.)
  get length() {
    return this.arr.length;
  }
}

const stack = new Stack();
console.log("Stack START");
stack.push(1); // [1]
stack.push(3); // [1, 3]
stack.push(5); // [1, 3, 5]
stack.push(2); // [1, 3, 5, 2]
stack.push(4); // [1, 3, 5, 2, 4]
console.log(stack.length); // 5
stack.pop(); // [1, 3, 5, 2]
console.log(stack.top()); // 2

console.log("Stack END");
