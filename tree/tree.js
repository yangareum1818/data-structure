/**
 * 지금 이 Tree의 구조는 만들기 나름이다.
 * 널널하게 만들어서 children안에 무한하게 넣을 수 있게 만들었기 때문에, 활용하기엔 적합하지 않다.
 * 각각의 Node마다 children의 갯수들이 다 달라 알고리즘으로 통일되게 적용하기가 힘들다.
 *
 * 이 코드는 children배열에 제한없이 무한하게 Node를 추가하는 트리이다.
 */
class Tree {
  // root는 값을 받아오기위해 constructor를 사용한다.
  constructor(value) {
    this.root = new Node(value);
  }
}

// 가지들 하나하나를 만들어준다. ( Node라고 한다. )
class Node {
  children = [];

  constructor(value) {
    this.value = value;
  }

  // 추가. (배열을 사용하는 것을 감추기위해 Node안에 추가를 만들어준다.)
  push(value) {
    // 그냥 value를 push하지 않고, 항상 new Node()를 만들어 value를 push해준다. 그래야 자식도 다시 children을 가질 수 있다. (가지치기)
    this.children.push(new Node(value));
  }
}

const tree = new Tree(50);

// tree안에 root가 있고, root안에 children들이 있을 것이다. (root도 Node이기 때문에 children이 있을 수 있다.)
tree.root.push(25);
tree.root.push(75);
tree.root.children[0].push(12);
tree.root.children[0].push(37);
tree.root.children[1].push(62);
tree.root.children[1].push(87);
