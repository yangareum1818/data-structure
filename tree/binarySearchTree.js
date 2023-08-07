/**
 * 이진탐색트리 조건 : 자신보다 작은 수가 왼쪽, 자신보다 큰 수가 오른쪽.
 * 만들어진 트리의 전체트리와 어느 한 구분트리가 똑같은 알고리즘을 적용하고 있을 때, 재귀함수를 사용한다.
 *
 * 숙제
 * 1. insert() : 이미 넣은값을 넣은 경우 에러처리 (alert, throw)
 * 2. length 구하기 (return length) : 트리에 몇개가 들어가 있는지 갯수 구하기.
 */
export class BinarySearchTree {
  root = null;

  /**
   * 만약 root에서 어떠한 값을 조건을 지키며 삽입할 때, 바로 추가하는것이 아닌 하나하나 탐색해서 조건에 맞는 위치에 삽입한다.
   * 조건을 지켜가면서 처리를 넘기면서(left, right에게 위임한다는 말), 추가할 자리를 찾아간다.
   *
   * 재귀함수는 항상 끝을 잘 처리해줘야한다.
   * 넣으려고하는 값이 상위root값 보다 큰지 작은지를 판단하고, 만약 값이 있다면 재귀로 처리를 넘기고, 값이 없으면 값을 추가한다.
   * 5, 9, 4, 14, 19, 23, 7, 11, 2, 16 ( readme.md 트리이미지 확인. )
   */
  // insert 재귀용 함수
  #insert(node, value) {
    if (node.value > value) {
      // 상위 값보다 넣으려고 하는 값이 작으면
      if (node.left) {
        // 왼쪽에 값이 있으면, 왼쪽에 있는 값에게 처리를 넘김
        this.#insert(node.left, value);
      } else {
        // 만약 왼쪽이 비어있다면? 왼쪽에 추가
        node.left = new Node(value);
      }
    } else {
      // 상위 값보다 넣으려고 하는 값이 크면
      if (node.right) {
        // 오른쪽에 값이 있으면, 오른쪽에 있는 값에게 처리를 넘김
        this.#insert(node.right, value);
      } else {
        // 만약 오른쪽이 비어있다면? 오른쪽에 추가
        node.right = new Node(value);
      }
    }
  }

  /**
   * 조건문에 insert를 호출 할 때, insert()가 다시 호출된다.
   * insert()함수는 매개변수가 1개이고, 조건문안에 재귀함수 호출의 매개변수는 2개이다.
   * 이 경우, insert()함수를 바꿔 줄 수도 있지만? 재귀용 #insert()함수를 따로 만들어주는 것이 좋다.
   *
   * this.root.left, this.root.right는 상위 root인 subTree이다. (어디에 넣을지 기준점을 잡아주는)
   */
  insert(value) {
    // 삽입(추가)
    if (!this.root) {
      // 첫 데이터인 경우 (root가 비어있는 경우)
      this.root = new Node(value);
    } else {
      // 첫 데이터가 아닌 경우 (root에 값이 있을 경우)
      this.#insert(this.root, value);
    }

    /**
     * // 이 조건문을 else문으로 단축시킨다. (재귀함수로 넘겨주면, 동일하게 결과가 나온다.)
     * if (this.root.valu > value) {
     *   // root값(node) 보다 현재 넣을 값이 작을 경우, 왼쪽에 추가.
     *   // this.root.left.insert(value);
     *   // 재귀로 만들때 좋은 방법으로 적어준다.
     *   this.#insert(this.root.left, value);
     * } else {
     *   // 반대로 root값(node) 보다 현재 넣을 값이 클 경우, 오른쪽에 추가.
     *   // this.root.right.insert(value);
     *   // 재귀로 만들때 좋은 방법으로 적어준다.
     *   this.#insert(this.root.right, value);
     * }
     */
  }

  // search 재귀용 함수
  #search(node, value) {
    // 찾으려는 값과 Node의 값보다 작을 때
    if (node.value > value) {
      // 왼쪽에 값이 없을 경우, null을 return한다.
      if (!node.left) return null;
      // 찾으려는 값과 왼쪽에 있는 값이 같을 때, 그 값을 return한다.
      if (node.left.value === value) {
        return node.left;
      }

      // 값을 찾지 못했다면, 재귀함수(왼쪽 값, 찾는 값)로 반복 처리한다.
      return this.#search(node.left, value);
    } else {
      // 오른쪽에 값이 없을  경우, null을 return한다.
      if (!node.right) return null;
      // 찾으려는 값과 왼쪽에 있느 값이 같을 때, 그 값을 return한다.
      if (node.right.value === value) {
        return node.right;
      }

      // 값을 찾지 못했다면, 재귀함수(오른쪽 값, 찾는 값)로 반복 처리한다.
      return this.#search(node.right, value);
    }
  }

  /**
   * search는 return을 무조건 다 해줘야한다.
   * 조회 => 수정은 조회를 활용한다.
   */
  search(value) {
    // root에 값이 없다면? null을 return한다.
    if (!this.root) {
      return null;
    }
    // 찾으려는 값을 찾았을 때, 그 값을 return한다.
    if (this.root.value === value) {
      return this.root;
    }

    // 찾으려는 값을 찾지 못했을 때, 재귀함수(root, 찾는 값) 호출한다.
    return this.#search(this.root, value);
  }

  /**
   * 1. leaf일 경우(자식이 없는경우), 부모 node에게 자신을 제거해달라한다.
   * 2. 자식이 1개일 경우, 자신의 부모에게 자신을 제거하고 자식이 그 자리로 오도록 끌어올린다. (대체)
   * 3. 자식이 2개일 경우, 만약 root를 제거한다면?
   *   3-1. 자신의 왼쪽 Node중에 제일 큰 숫자가 root자리에 오게된다. ( 왼쪽 Node 중 가장 오른쪽 )
   *   3-2. 그 후, root자리로 온 숫자의 자리로 원래 root였던 수가 들어간다.
   *   3-3. 그리고 그 숫자가 제거된다.
   *
   * 지우려는 값을 찾았을 경우는 결국, 부모가 값을 찾지 못해 자식에게 넘겨준 것이다.
   * 그래서 값을 찾았을 경우는 자식입장이 되는 것, 찾지 못한 경우는 부모입장이다.
   * 부모입장에서 값을 찾지 못한 상황이기 때문에 그 값을 찾아보라고 자식에게 물어본다. (재귀사용)
   * 그러므로, if 와 else문에서 코드는 아예 다른함수이다. (부모 <=> 자식)
   */
  // 삭제 재귀함수 (return한 값이 호출한 함수로 돌아가는 것을 파악해라.)
  #remove(node, value) {
    // 찾으려는 숫자가 존재하지 않는 경우.
    if (!node) {
      return null;
    }
    // [ 자식입장 ]
    // 지울 값을 찾았을 경우, 삭제한다.
    if (node.value === value) {
      // leaf일 경우 ( 자식이 없을 경우 )
      if (!node.left && !node.right) {
        // null을 return (제거한다.)
        return null;
      } else if (!node.left) {
        // 왼쪽 Node가 없을 경우, (오른쪽 Node가 있을 경우)는 위에서 처리되서 넘어온거라 생략 가능.
        // 오른쪽 Node를 return한다. (어디로? 부모입장에 재귀함수로 다시 들어간다. 언제까지? 삭제하려는 값을 찾을 때 까지)
        return node.right;
      } else if (!node.right) {
        // 오른쪽 Node가 없을 경우, (왼쪽 Node가 있을 경우)는 위에서 처리되어 넘어와서 생략 가능.
        // 왼쪽 Node를 return한다. (어디로? 부모입장에 재귀함수로 다시 들어간다. 언제까지? 삭제하려는 값을 찾을 때 까지)
        return node.left;
      } else {
        /**
         * Node가 2개 모두 있을 경우, 왼쪽 Node에서 오른쪽 Node 중 가장 큰 수를 찾고 서로 자리를 바꾼다. 그 뒤 leaf는 삭제한다.
         * 1. 왼쪽에서 가장 큰 수를 찾기 위해 변수를 만든다.
         * 2. 최대한 오른쪽에 있는 Node를 찾아가야한다. (node.left.right.right.right.right) : 이럴때, 어디까지 가야하는지 모르니까 while문을 사용한다.
         */
        // 왼쪽 Node
        let exchange = node.left;
        // while문을 돌기 시작하면 exchange는 가장 오른쪽에서 큰 수를 찾는다.
        while (exchange.right) {
          // 오른쪽이 없을 때까지 계속 오른쪽으로 가야한다. (한글과 반대로 조건을 걸어주면 된다. 오른쪽이 있을 때 까지.)
          exchange = exchange.right;
        }
        // 상위 node와 가장 큰 수를 바꿔준다. (node.value와 exchange.value)
        const temp = node.value; // 바뀔 값을 넣어준 뒤,
        node.value = exchange.value; // 바꿀 값(가장 큰 수)와 바꾼다.
        exchange.value = temp;

        // 바꿨으면, 제거한다. (3-3.) (재귀를 돌면서 제거된다.)
        node.left = this.#remove(node.left, temp);
        // 재귀 때문에 node를 return해준다.
        return node;
      }
    } else {
      // [ 부모입장 ]
      // 지울 값을 찾지 못했을 경우, 다시 좌우 Node에게 물어본다.
      if (node.value > value) {
        // 부모값이 삭제하려는 값보다 작을 때, 다시 왼쪽 자식에게 물어본다.
        // 왼쪽 Node의 값을 대입해주고 왼쪽 Node에 재귀함수 호출 (그럼 값을 찾았을 경우 return 값이 node.left에 대입된다.)
        node.left = this.#remove(node.left, value);
        // 재귀 때문에 node를 return해준다.
        return node;
      } else {
        // 부모값이 삭제하려는 값보다 클 때, 다시 오른쪽 자식에게 물어본다.
        // 오른쪽 Node의 값을 대입해주고 오른쪽 Node에 재귀함수 호출 ( 그럼 값을 찾았을 경우 return 값이 node.right에 대입된다. )
        node.right = this.#remove(node.right, value);
        // 재귀 때문에 node를 return해준다.
        return node;
      }
    }
  }
  remove(value) {
    // 삭제(제거)
    this.root = this.#remove(this.root, value);
    /**
     * 이 재귀함수는 node를 return받을 수 있기 때문에 node를 return받을 경우(node가 있을 경우)를 조건걸어주려 했지만, node를 return 받지 않는 경우 (leaf일 경우와 지울 값이 존재하지 않을 경우)에서 node는 null이 되서 삭제하는 경우에는 삭제가 되지 않아 재귀함수는 현재 root로 대입해준다.
     * // const node = this.#remove(this.root, value);
     * // if (node) {
     * //   this.root = node;
     * // }
     */
  }
}

class Node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

// const bst = new BinarySearchTree();
// bst.insert(5);
// bst.insert(9);
// bst.insert(4);
// bst.insert(14);
// bst.insert(19);
// bst.insert(23);
// bst.insert(7);
// bst.insert(11);
// bst.insert(8);
// bst.insert(2);
// bst.insert(16);
// console.log(bst.search(16));
// console.log(bst.search(18)); // null
// bst.remove(8);
// console.log(bst.remove(17)); // null
// bst.remove(4);
// bst;

// const bst2 = new BinarySearchTree();
// bst2.insert(100);
// bst2.remove(100);
// bst.root; // null?
