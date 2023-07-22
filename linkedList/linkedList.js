// []를 선언하는 순간 Javascript의 LinkedList가 되어버린다.
// ㄴㄴ이것은 자료구조임.

// 배열은 length를 생각하면된다.
class LinkedList {
  // constructor(length) {
  //   this.length = length;
  // }
  // 단축해 사용한다.
  length = 0;
  // 처음에 있을 값을 만들어준다. (head)
  head = null;

  // 삽입
  add(value) {
    if (this.head) {
      // head에 값이 있다면?
      /**
       *
       * 새로운 값을 넣어준다.
       * // this.head.next = new Node(value);
       * 하지만, 여기서 변수가 생긴다.
       * 계속해서 next를 해줘야 하는데, 지금은 2까지 next를 해줬고, 또 그 다음은 계속 해줘야한다. 이럴때 어떻게야하는가 ?
       * 반복문을 사용한다. (왜 ? 다음 값이 null일 때, 추가해줘야하니까)
       */

      // 반복문이 다 돌고 나면, 현재 값: ?(마지막 숫자) 다음 위치 값 : null이 되어있다.
      let current = this.head; // 현재를 저장한다.
      while (current.next) {
        // 다음 값이 null일 때까지, 타고 들어간다. ( !!next가 없을 때 까지)
        current = current.next;
      }
      // 반복문이 끝난 후, 다음 값이 null일 때, 삽입된다.
      current.next = new Node(value);
    } else {
      // 처음 추가하는데 값이 비어있으면 ? 값을 그냥 집어넣는다.
      this.head = new Node(value);
    }
    /* 조건문안에 반복코드가 들어있다면, 공통적이니 밖으로 빼준다. */
    this.length++;
    // add를 해주면 쓸모있는 데이터를 반환해주는 것이 좋다.
    // 길이를 반환해준다. 그럼 사용자가 길이가 얼마나 되었는지 알 수 있다.
    return this.length;
  }

  // 조회
  /**
   * 몇번 데이터를 찍게 되면, 그 값을 가져오게 된다.
   * ex) arr=[1, 2, 3] => arr[3] // 하지만, 3은 undefind.
   * 3이 index인 것을 의미한다. ( 값이 없다면, undefind or null을 return 해준다. )
   */
  search(index) {
    // index : 몇 번 넘기는지를 의미한다.
    let count = 0;
    let prev; // 이전값을 만들어준다.
    let current = this.head;
    // this.head가 null, undefind일 경우 current는 undefind, null이 된다
    // current가 null인 경우를 대비해 옵셔널 체이닝해준다. (경우의 수 : 방어)
    while (count < index) {
      // index가 만약, 3이면 count는 0, 1, 2
      prev = current; // next가 되기 전에 현재값으로 이전값을 선언해준다.
      current = current?.next; // count가 증가하면, count만큼 계속해서 다음 index를 찾는다.
      count++;
    }
    return current?.value;
  }

  // 삭제
  /**
   * 1. 처음 데이터를 제거할 때에 예외처리를 해줘야한다. ( 처음 데이터를 추가 했을 때 처럼 )
   * 2. 존재하지 않는 index를 제거할 때에도 예외처리를 해줘야한다.
   *
   * remove를 구현할 때에는 search의 코드를 재활용한다.
   * 왜 ? 내가 찾아야할 대상인 index를 조회해야하는 부분이기 때문에.
   * 그리고 그 대상을 찾았을 시에 삭제를 해야하는 것.
   *
   * linkedList에서 예로들었던 것으로.
   * B1(값:1, 다음값위치:C1) => C1(값:2, 다음값위치:D1) => D1(값:3, 다음값위치:E1) 일때
   * 삭제 = C1을 삭제한다.
   * C1에 영향이 가는 것이 아니라, C1의 이전값인 B1의 다음값위치에 영향이간다.
   * 즉, C1을 삭제한다면? B1의 다음값위치를 D1으로 바꿔줘야한다.
   *
   * B1 = prev (prev.next는 === current로 연결되어있다.)
   * C1 = current
   * D1 = current.next
   * 즉, current가 제거되고, prev.next를 current.next와 이어줘야한다.
   */
  remove(index) {
    // 조회의 코드를 재활용한다.
    let count = 0;
    let prev;
    let current = this.head;
    while (count < index) {
      prev = current;
      current = current?.next;
      count++;
    }
    if (prev && current) {
      // prev.next를 current.next와 이어준다.
      prev.next = current.next;
      this.length--; // 길이 삭제;
      return this.length;
    } else if (current) {
      this.head = current.next;
      this.length--;
      return this.length;
    }
  }
}

// 인자에 들어갈 각 각의 아이템을 Node라고 이름을 지어준다.
// 노드는 하나의 메모리 객체(값, 다음위치값, 이전위치값), 그럼 연결리스트는 노드들을 연결하고 있는 리스트가 된다.
class Node {
  next = null;
  // 외부에서 전달받을 값은 constructor를 사용한다. add(1) => 1이들어가는 자리
  constructor(value) {
    this.value = value;
  }
}

const ll = new LinkedList();
// ll.length; 를 사용할 수 있다.
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
