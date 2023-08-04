// 우선순위 큐
// 비교하는 조건은 priority로 바꿔준다. (옵셔널 체이닝으로 빌 경우를 대비해준다. 양쪽 Node들이 혹시 어느한쪽이 undefined일 경우.)

class PriorityQueue {
  arr = [];

  #reheapUp(index) {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.arr[index].priority > this.arr[parentIndex].priority) {
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        this.#reheapUp(parentIndex);
      }
    }
  }

  insert(priority, value) {
    const index = this.arr.length;
    // Node하나에 객체를 만들어 담아준다.
    this.arr[index] = {
      priority,
      value,
    };
    this.#reheapUp(index);
  }

  #reheapDown(index) {
    if (leftIndex < this.arr.length) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 1;
      // 왼쪽은 다 채워져있겠지만, 혹여나 오른쪽NODE가 없을 수 있으니 옵셔널로 대비한다.
      const bigger =
        this.arr[leftIndex].priority > this.arr[rightIndex]?.priority
          ? leftIndex
          : rightIndex;
      if (this.arr[index]?.priority < this.arr[bigger]?.priority) {
        const temp = this.arr[index];
        this.arr[index] = this.arr[bigger];
        this.arr[bigger] = temp;
        this.#reheapUp(bigger);
      }
    }
  }
  // root 삭제
  remove() {
    if (this.arr.length === 0) {
      return false;
    }
    if (this.arr.length === 1) {
      return this.arr.pop();
    }

    const root = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.#reheapDown(0);

    return root;
  }

  sort() {
    const sortedArray = [];
    while (this.arr.length > 0) {
      sortedArray.push(this.remove());
    }
    return sortedArray;
  }

  search(value) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].value === value) return i;
    }
    return null;
  }

  // 특정값을 수정
  updata(value, newValue) {
    const index = this.search(value);
    if (index === null) return false;
    this.arr[index].value = newValue;
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      this.#heapify(i);
    }
  }
  // 특정값을 삭제
  removeValue(value, newValue) {
    const index = this.search(value);
    if (index === null) return false;
    this.arr.splice(index, 1);
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      this.#heapify(i);
    }
  }

  #heapify() {
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    const bigger =
      (this.arr[leftIndex]?.priority || 0) >
      (this.arr[rightIndex]?.priority || 0)
        ? leftIndex
        : rightIndex;
    if (this.arr[index]?.priority < this.arr[bigger]?.priority) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[bigger];
      this.arr[bigger] = temp;
    }
  }
}

const pq = new PriorityQueue();

pq.insert(3, "one");
pq.insert(7, "two");
pq.insert(2, "three");
pq.insert(8, "four");
pq.insert(5, "five");
pq.insert(6, "six");
pq.insert(9, "king");
// breakPoint를 찍어본다면, 9, 7, 8, 3, 5, 2
console.log(pq.remove()); // king remove
// king이 제일먼저 빠져나간다.
pq;

// 중복값을 넣어버리면 정렬이 달라지기 때문에 최대한 중복은 피한다.
// 그리고 일반 노드들은 1,2,3,4...로 만들고 우선순위 큐는 100 (최소힙에선 -100)으로 값을 주는것을 추천한다.
// 우선순위는 값에 차이가 많이나도록 값을 준다.
