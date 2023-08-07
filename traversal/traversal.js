// 여러 자료구조를 만들어놨으니 필요한 기능을 import해온다. (재사용)
import { BinarySearchTree } from "../tree/BinarySearchTree.js";
import { Queue } from "../stackQueue/queue.js";
import { Stack } from "../stackQueue/stack.js";
/**
 * 이진탐색트리기 때문에 이론때의 결과와는 다른 결과가 나온다. (트리모양 4, 2,6, 1,3,5,7)
 * enqueue : 뒤에서 추가
 * dequeue : 앞에서 삭제
 * BFS : [ 4, 2, 6, 1, 3, 5, 7 ]
 * DFS : [ 4, 2, 1, 3, 6, 5, 7 ]
 * InOrder : [ 1, 2, 3, 4, 5, 6, 7 ]
 * PostOrder : [ 1, 3, 2, 5, 7, 6, 4 ]
 */

function bfs(tree) {
  const queue = new Queue();
  // 1. root를 인큐해준다.
  queue.enqueue(tree.root);
  // while은 반대로 (queue의 길이가 0일때 의 반대! 0이 될 때까지 )
  while (queue.length > 0) {
    // 2. queue에 디큐를 해준다. (요소를 밖으로 꺼낸다.)
    const node = queue.dequeue();
    console.log(node.value);
    if (node.left) {
      queue.enqueue(node.left);
    }
    if (node.right) {
      queue.enqueue(node.right);
    }
    // 1. root하나 넣고 2. queue가 비어있을 때까지 queue에서 맨앞 하나뺀다.(디큐) 3. console.log()출력 4. 그 node의 자식들을 큐에 넣어준다.
  }
}

// DFS : PreOrder 와 같은 값이 나온다.
function dfs(tree) {
  const stack = new Stack();
  stack.push(tree.root);
  while (stack.length > 0) {
    const node = stack.pop();
    console.log(node.value);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
}

/* node가 비어있을 경우를 대비한다. */
// PreOrder : 왼쪽으로 훑는 Node (맨위에 출력)
function preOrder(node) {
  // 재귀를 사용한다.
  if (!node) return;
  console.log(node.value);
  preOrder(node.left);
  preOrder(node.right);
}

// InOrder : 가운데아래를 훑는 Node (가운데에 출력)
function inOrder(node) {
  // 재귀를 사용한다.
  if (!node) return;
  inOrder(node.left);
  console.log(node.value);
  inOrder(node.right);
}
// PostOrder : 오른쪽으로 훑는 Node (맨뒤에 출력)
function postOrder(node) {
  // 재귀를 사용한다.
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.value);
}

const bst = new BinarySearchTree();

bst.insert(4);
bst.insert(2);
bst.insert(6);
bst.insert(1);
bst.insert(3);
bst.insert(5);
bst.insert(7);
// bfs(bst);
// dfs(bst);
// preOrder(bst.root);
// inOrder(bst.root);
postOrder(bst.root);
// bst;
