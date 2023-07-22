/**
 * 큐는 push를 enqueue(인큐), shift를 dequeue(디큐)라고 한다.
 * peek, first: 큐는 스택과 다르게 맨 위(마지막) top이 아닌, 가로로 표현되기 때문에 peek(엿보다), first로 표현된다. 그러므로 처음요소을 가져온다.
 *
 * 배열을 사용하지 않고, 연결리스트로 코드를 구현한다면?
 * : enqueue-push를 tail을 만들어야한다.
 * : dequeue-shift는 removeFirst을 만들어야한다.
 */
class Queue {
  arr = [];

  enqueue(value) {
    // 뒤에서 추가
    return this.arr.push(value);
  }

  dequeue(value) {
    // 앞에서 삭제
    return this.arr.shift();
  }

  peek() {
    // return this.arr[0] 으로도 사용가능
    return this.arr.at(0);
  }

  get length() {
    return this.arr.length;
  }
}

const queue = new Queue();
console.log("Queue START");
queue.enqueue(1); // [1]
queue.enqueue(3); // [1, 3]
queue.enqueue(5); // [1, 3, 5]
queue.enqueue(2); // [1, 3, 5, 2]
queue.enqueue(4); // [1, 3, 5, 2, 4]
console.log(queue.length); // 5
queue.dequeue(); // [3, 5, 2, 4]
console.log(queue.peek()); // 3

console.log("Queue END");
