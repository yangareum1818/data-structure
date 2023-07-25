/**
 * 이진탐색트리 조건 : 자신보다 작은 수가 왼쪽, 자신보다 큰 수가 오른쪽.
 * 만들어진 트리의 전체트리와 어느 한 구분트리가 똑같은 알고리즘을 적용하고 있을 때, 재귀함수를 사용한다.
 *
 * 숙제 : 값은 값을 넣은 경우 에러처리 (alert, throw)
 */
class BinarySearchTree {
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

  remove(value) {
    // 삭제(제거)
  }
}

class Node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(9);
bst.insert(4);
bst.insert(14);
bst.insert(19);
bst.insert(23);
bst.insert(7);
bst.insert(11);
bst.insert(2);
bst.insert(16);
