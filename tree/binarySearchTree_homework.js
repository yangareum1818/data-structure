/**
 * 이진탐색트리 조건 : 자신보다 작은 수가 왼쪽, 자신보다 큰 수가 오른쪽.
 *
 * 숙제
 * 1. insert() : 이미 넣은값을 넣은 경우 에러처리 (alert, throw)
 * 2. length 구하기 (return length) : 트리에 몇개가 들어가 있는지 갯수 구하기.
 */
class BinarySearchTree {
  root = null;
  length = 0;

  #insert(node, value) {
    if (node.value > value) {
      if (node.left) {
        this.#insert(node.left, value);
      } else {
        node.left = new Node(value);
      }
    } else {
      if (node.right) {
        this.#insert(node.right, value);
      } else {
        node.right = new Node(value);
      }
    }
  }
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.#insert(this.root, value);
    }
    // 숙제 : 에러처리
  }

  #search(node, value) {
    if (node.value > value) {
      if (!node.left) return null;
      if (node.left.value === value) {
        return node.left;
      }
      return this.#search(node.left, value);
    } else {
      if (!node.right) return null;
      if (node.right.value === value) {
        return node.right;
      }
      return this.#search(node.right, value);
    }
  }
  search(value) {
    if (!this.root) {
      return null;
    }
    if (this.root.value === value) {
      return this.root;
    }
    return this.#search(this.root, value);
  }

  #remove(node, value) {
    if (!node) {
      return null;
    }
    if (node.value === value) {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        let exchange = node.left;
        while (exchange.right) {
          exchange = exchange.right;
        }
        const temp = node.value;
        node.value = exchange.value;
        exchange.value = temp;
        node.left = this.#remove(node.left, temp);
        return node;
      }
    } else {
      if (node.value > value) {
        node.left = this.#remove(node.left, value);
        return node;
      } else {
        node.right = this.#remove(node.right, value);
        return node;
      }
    }
  }
  remove(value) {
    this.root = this.#remove(this.root, value);
    // 숙제 length
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
bst.insert(8);
bst.insert(2);
bst.insert(16);
