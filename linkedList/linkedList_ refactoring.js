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

  // 조회
  // 리팩토링 하기 전, 후의 search는 기능적으로는 동일하다.
  search(index) {
    /**
     * 1. return this.#search(index)를 호출을 하면, #search의 return값인 [prev, current]값이 나온다.
     * 2. [1]이 current가 된다.
     * 3. [1]이 존재하면, 그 값의 value를 return 해준다.
     */
    return this.#search(index)[1]?.value;
  }

  // 프라이빗(메서드) 함수 생성 (js의 class에서 프라이빗함수가 있다.)
  /**
   * 공통적인 코드가 반복되어서 리팩토링을 위해 프라이빗 함수를 만들어준다.
   * : prev, current 둘다 return을 해주는 search함수를 만든다.
   *
   * search에서는 current만 쓰지만, remove에서는 prev도 사용하기 때문에,
   * prev, current 둘 다 활용하는 search를 만들어보자.
   */
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

  // 삭제
  /**
   * prev가 undefined일 수도 있다. (기본 적으로 선언만 해줬기 때문에 index가 0일 경우는 while문이 false이기 때문에 돌지 않고, prev는 undefined가 된다.)
   * : 결론, prev.next에서 Error가 발생한다.
   *
   * 해결
   * : 조건문을 이용해 prev와 current가 있을 때에 코드들을 넣어준다.
   * : else if를 이용해 prev가 없을 때, 즉 current만 존재할 때 (index가 0일 경우)
   */
  remove(index) {
    // #search의 return 값을 구조분해할당.
    const [prev, current] = this.#search(index);
    if (prev && current) {
      prev.next = current.next;
      this.length--;
      return this.length;
    } else if (current) {
      // index가 0일 때
      this.head = current.next; // 현재 타겟에 다음타겟을 연결을 해준다.
      this.length--;
      return this.length;
    }
    /**
     * 마지막 밑에 조건 일 때에는 else를 적어 return undefined를 해줘도 되고, 아무것도 적지 않아도 된다.
     *
     * 1. 둘다 아닐 때. ( 연결리스트에 아무것도 없을 때 )
     * #search에 current가 undefined인 상태이다. ( this.head가 undefined인 경우 )
     * 2. 삭제하고자하는 대상이 없을 때 ( 찾고자하는 대상이 없을 때 )
     * current = current?.next가 undefined일 경우.
     */
  }
}

class Node {
  next = null;
  constructor(value) {
    this.value = value;
  }
}

const ll = new LinkedList();
console.log("linkedList START");
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
console.log("linkedList END");
