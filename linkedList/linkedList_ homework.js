/**
 * 숙제
 * 1. 이전으로 돌아가고 싶을 때. (Node에 prev추가 : 이전추가)
 * 2. 삽입 add()을 O(1)으로 개선해보기. (마지막 데이터 : 꼬리 tail을 추가)
 * add할 때 마다, 꼬리로 추가해보기 (add할 때마다 tail에 next한다.)
 * remove는 영향이 간다.
 * 혹시난 꼬리(tail)을 제거했을 경우가 있을 수 있기 때문에 else if이 추가가 된다.
 *
 * (수정, 삭제, 삽입, 조회 === O(n))
 */
class LinkedList {
  length = 0;
  head = null;

  // 삽입
  add(value) {
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new Node(value);
    } else {
      this.head = new Node(value);
    }
    this.length++;
    return this.length;
  }

  search(index) {
    return this.#search(index)[1]?.value;
  }

  #search(index) {
    let count = 0;
    let prev;
    let current = this.head;
    while (count < index) {
      prev = current;
      current = current.next;
      count++;
    }
    return [prev, current];
  }

  remove(index) {
    const [prev, current] = this.#search(index);
    if (prev && current) {
      prev.next = current.next;
      this.length--;
      return this.length;
    } else if (current) {
      // index가 0일 때
      this.head = current.next;
      this.length--;
      return this.length;
    }
  }
}

class Node {
  next = null;
  constructor(value) {
    this.value = value;
  }
}

const ll = new LinkedList();
ll.length;
ll.add(1); // 1
ll.add(2); // 2
ll.add(3); // 3
ll.add(4); // 4
ll.add(5); // 5
ll.add(6); // 6
// console.log(ll.search(3)); // 4 (0=1, 1=2, 2=3, 3=4)
// console.log(ll.search(5)); // 6 (0=1, 1=2, 2=3, 3=4, 4=5, 5=6)
// console.log(ll.search(7)); // undefined
console.log(ll.search(6)); // undefined
ll.remove(4); // 5 remove
console.log(ll.search(4)); // 6
ll.remove(4); // undefined
console.log(ll.search(4)); // undefined
console.log(ll.remove(4)); // undefined
