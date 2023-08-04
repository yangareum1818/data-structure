/**
 * Deque는 push, pop, shift, unshift를 모두 사용한 자료구조이다.
 * stack과 queue를 합친 것.
 */
class Deque {
  arr = [];

  // 뒤에서 추가하기
  push(value) {
    return this.arr.push(value);
  }

  // 뒤에서 삭제하기
  pop() {
    return this.arr.pop();
  }

  // 앞 부분에서 삭제하기
  shift() {
    return this.arr.shift();
  }

  // 앞 부분에서 추가하기
  unshift() {
    return this.arr.unshift();
  }

  // 배열의 첫 번째 요소찾기
  peek() {
    return this.arr.at(0);
  }

  // 배열의 길이
  get length() {
    return this.arr.length;
  }
}

const deque = new Deque();
deque.push(1);
deque.push(3);
deque.push(5); // [1, 3, 5], length: 3
deque.unshift(2);
deque.unshift(4); // [4, 2, 1, 3, 5], length: 5
deque.pop(); //  [4, 2, 1, 3], length: 4
deque.shift(); // [2, 1, 3], length: 3
console.log(deque.peek()); // 2;
