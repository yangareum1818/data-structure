/**
 * binaryTree(이진트리)는 트리와 코드가 별 차이가 없기에 건너뛴다. (추가부분 : left, right)
 */
class Tree {
  constructor(value) {
    this.root = new Node(value);
  }
}

class Node {
  // children = [];
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }

  push(value) {
    this.children.push(new Node(value));
  }
}

const tree = new Tree(50);
tree.root.push(25);
tree.root.push(75);
// 추가 부분
tree.root.left = new Node(13);
tree.root.right = new Node(49);
