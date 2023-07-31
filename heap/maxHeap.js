/**
 * heap도 재귀를 사용한다. O(logn)
 * 반복문에서 ++ 외, 공식을 사용할 때 *2를 하거나 /2를 했을 때, 시간복잡도가 logn이 되어야한다.
 *
 * 숙제
 * 1. 최소 힙 만들기 (힌트 : 조건문 부등호 반대?) => reheapUp, reheapDown, #heapify수정
 * 2. 최소힙 <=> 최대힙 서로 바꾸기. (최대힙을 최소힙으로 옮긴 후, #heapfiy해준다.)
 */
class MaxHeap {
  arr = [];

  // heap은 배열끝에 값을 넣고 그 값을 자신부모와 비교했을 때, 자신이 더 크다면 부모와 자리를 바꾼다. (언제까지 ? root까지)
  // 또, heap은 수를 추가한 순서에 따라 트리모양이 다를 수 있다.
  #reheapUp(index) {
    // !!! 부모의 index가 (-)가 되는 것을 방지 (index가 0이라는 것은 root라는 뜻이다. 배열의 첫번째 요소가 heap의 root요소이기 때문에)
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      // root가 아니라면, 부모랑 계속 비교한다. (부모가 나보다 작으면? 서로 바꿔준다.)
      if (this.arr[index] > this.arr[parentIndex]) {
        // 값 위치를 바꿔준다.
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        // 재귀 (내가 부모의 Index가 되었기 때문에 다시 비교하기 위해 반복적으로 함수를 돌려준다.)
        this.#reheapUp(parentIndex);
      }
    }
  }

  insert(value) {
    // 1. 가장 마지막에 값을 넣어준다.
    const index = this.arr.length;
    this.arr[index] = value;
    // 2. 알고리즘을 수행한다.(이름은 reheapUp()이라고 부른다.) 인자로 자식의 인덱스를 넣어준다.
    this.#reheapUp(index);
  }

  #reheapDown(index) {
    // 자식이 없을 때까지 이 동작을 반복한다. (자식의 INDEX가 전체의 길이보다 작다.) ( 한국말 반대로 )
    if (leftIndex < this.arr.length) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 1;
      const bigger =
        this.arr[leftIndex] > this.arr[rightIndex] ? leftIndex : rightIndex;
      // 내가 자식보다 작을 경우, 나와 자식의 위치를 바꿔준다.
      if (this.arr[index] < this.arr[bigger]) {
        const temp = this.arr[index];
        this.arr[index] = this.arr[bigger];
        this.arr[bigger] = temp;
        this.#reheapUp(bigger);
      }
    }
  }
  // root 삭제
  remove() {
    // 예외의 상황을 고려한다. (heap이 비어있을 경우)
    if (this.arr.length === 0) {
      return false;
    }
    // 마지막 요소가 하나 남았을 때는 바꿔주는게 아니라 바로 pop(제거)해준다.
    if (this.arr.length === 1) {
      return this.arr.pop();
    }
    // root만 remove (항상 root를 바깥에  빼준다.)
    const root = this.arr[0];
    // 배열의 마지막요소를 root에 넣는다.
    this.arr[0] = this.arr.pop();
    // 담긴 this.arr[0]과 자식들이 무한하게 재귀적으로 비교를 한다. (마지막요소가 root자리로 갔으므로, 비교해서 heap정렬을 만든다.)
    this.#reheapDown(0);

    return root;
  }
  // 힙 정렬 (가장 큰 수를 반복적으로 제거 : sort함수 안에서 새 배열에 자신의 갯수만큼 remove함수를 push하면 큰 수 대로 들어간다.)
  // remove가 잘 구현됐으면, sort가 작동된다. ( 왜 ? remove는 제일 큰 숫자 root만 삭제하기 때문에)
  sort() {
    const sortedArray = [];
    while (this.arr.length > 0) {
      sortedArray.push(this.remove());
    }
    return sortedArray;
  }

  // 배열을 사용하기 때문에, 반복문을 돌려 찾는다.
  search(value) {
    // 특정 값이 존재하면 반복문, 아니면 null
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i] === value) return i;
    }
    return null;
  }

  // 특정값을 수정
  updata(value, newValue) {
    // 찾는다.
    const index = this.search(value);
    // 없으면 false.
    if (index === null) return false;
    // 찾았다면, 새로운값을 대입한다.
    this.arr[index] = newValue;
    // 새 값이 들어가, Heap이 깨졌다면? #heapify()로 heap을 만든다.
    // leaf가 아닌 Node부터 root까지 간 뒤, 그 때 마다 #heapify를 실행
    // : 트리의 절반을 반복문을 돌리는 것은 2분의1 n이고, #heapify는 O(1)인데 이 둘을 곱하면 ? 동일하게 2분의 1n이기 때문에 O(n)으로 퉁친다.
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      this.#heapify(i);
    }
  }
  // 특정값을 삭제
  removeValue(value, newValue) {
    // 찾는다.
    const index = this.search(value);
    // 없으면 false.
    if (index === null) return false;
    // 있다면 ?
    // 그 index를 없애준다. (splice)
    this.arr.splice(index, 1);
    // heap을 만든다.
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      this.#heapify(i);
    }
  }

  // 특정값을 삭제하거나 수정했을 때, 내부적으로 쓰이는 함수. heapify는 자기자식이다.
  // : 특정값을 찾아 자리를 바꿔주는 것이기 때문에 작업량은 O(1)이다. (상수)
  #heapify() {
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    const bigger =
      (this.arr[leftIndex] || 0) > (this.arr[rightIndex] || 0)
        ? leftIndex
        : rightIndex;
    // 자기자식중 더 큰애(bigger)보다 내가(index) 작을 경우, 자리를 바꿔준다.
    if (this.arr[index] < this.arr[bigger]) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[bigger];
      this.arr[bigger] = temp;
    }
  }
}

const heap = new MaxHeap();

// 배열 마지막에 값을 추가했지만, #reheapUp함수를 거쳐서 자신과 부모와 비교해서 값이 크면 root로 올라간다. (디버깅 필수)
// 78, 32, 56, 8, 23, 19, 45 모양의 트리가 나온다.
heap.insert(8);
heap.insert(19);
heap.insert(23);
heap.insert(32);
heap.insert(45);
heap.insert(56);
heap.insert(78);
// sort를 해주면 [78, 56, 45, 32, 23, 19, 8]이 된다.
// console.log(heap.sort());

// heap.remove();
// heap.remove();
// heap.remove();
// heap.remove();
// heap.remove();
// heap.remove();
// heap.remove();

/**
 * heapify는 heap이 틀어졌을 때, 마지막부터 Leaf(자식이 0인 Node)가 아닌 첫 번째 노드부터 찾아서 두 자식중 더 큰애랑 바꿔준다. 전 Node로 가서 비교해서 바꿔주고, 부모 Node들의 순서로 가서 마지막으로 root와 비교해준다.
 * heapify의 시간복잡도는 O(n)이다.
 */
// 특정값을 수정 (23 => 90)
// : (마지막부터 leaf가 아닌 첫번째 Node인 56을 먼저 비교해주고, 그 전인 32이와 90이 비교해 90을 올려주고, 90과 78, 56을 비교해 90을 ROOT로 올려준다.)[90, 78, 56, 8, 32, 19, 45]
heap.updata(23, 90);
heap;

// 특정값을 삭제
// : (32삭제하면[78 56 8 23 19 45]Heap이 틀어진다. => [78, 56, 45, 23, 19, 8])
// 이슈 : 8의 자식은 45하나이다. 그래서 rightIndex가 undefined라 값이 바뀌지 않는다. (|| 0)을 이용해 undefined가 되는 것을 방지해준다.
heap.removeValue(32);
heap;
