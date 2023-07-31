# data-structure

* 자료구조를 왜 공부하는지 ?
  * 알고리즘과 연관되어 있다고 느끼기에 코딩테스트를 좀 더 이해하면서 풀기위해 공부한다.

## 시간복잡도

![시간복잡도](/images/Time_complexity.png)

## 연결리스트

![연결리스트](/images/linkedlist.png)

## 스택과 큐

![스택과 큐](/images/stack_queue.png)

## 트리와 이진트리 종류

![트리와 이진틀리 종류](/images/treeandbinarytree.png)

## __⭐️이진탐색트리⭐️ : 재귀함수, 주석, 트리, 코드를 보면서 흐름을 파악해야한다.__

![이진탐색트리](/images/binarysearchtree.png)

---
![이진탐색트리 삽입](/images/binarysearchtree_img.png)
>5, 9, 4, 14, 19, 23, 7, 11, 8, 2, 16

<br/>

### 1. 삽입에 대한 정리. `insert()`

1. 어떤 값을 넣으려고할 때, 일단 어디에 넣을지 모르겠다.
2. 그래서 왼쪽, 오른쪽에게 위임한다. ( 맡긴다, 처리하라고 한다. )
3. 근데 만약, 왼쪽 또는 오른쪽이 없다면 그 자리에 삽입한다.

>5입장에서 11을 넣으려고 할 때, 9와 14에게 위임한 뒤, 11을 추가할 수 있다.<br/>
14에게 위임할 때, 왼쪽을 찾으려고 했더니 왼쪽이 없는 상황이다.<br/>
11을 넣고자 하는 상황에 왼쪽이 비어있다는 것을 인지한다.

1. 상위 값보다 넣으려는 값이 큰지, 작은지를 인지(조건문)하고 값을 넣는다.<br/>
__깔끔하고 명확하게 넣어줘야하기 때문에__ 추가적으로, 그 자리에 값이 있는지 없는지를 판단하는 조건을 추가한다.
2. 있다면 다시 재귀함수를 호출한다.
3. 없다면( 비어있다면 ), 그 자리에 값을 삽입한다.<br/>
(이것이 __재귀함수를 사용하는 것__ 이다.)

```javascript
#insert(node, value) {
  if (node.value > value) {
    // 상위 값보다 넣으려고 하는 값이 작으면, 왼쪽
    if (node.left) {
      // 왼쪽에 값이 있으면, 왼쪽에 있는 값에게 처리를 넘김
      this.#insert(node.left, value);
    } else {
      // 만약 왼쪽이 비어있다면? 왼쪽에 추가
      node.left = new Node(value);
    }
  } else {
    // 상위 값보다 넣으려고 하는 값이 크면, 오른쪽
    if (node.right) {
      // 오른쪽에 값이 있으면, 오른쪽에 있는 값에게 처리를 넘김
      this.#insert(node.right, value);
    } else {
      // 만약 오른쪽이 비어있다면? 오른쪽에 추가
      node.right = new Node(value);
    }
  }
}
```

<br/>

### 2. 검색(조회)에 대한 정리 `search()`

* 해당 값을 검사하고 찾아 처리해줘야하기 때문에, 모든 값을 `return` 해줘야한다.
* 수정은 검색(조회)를 활용한다.
* `#insert()`재귀함수와 동일한 조건의 틀을 가진다.
  * 찾는 값과 해당 node가 같은지(조건)와 결과를 `return`을 해줘야하는 부분만  다르다.

1. 11을 찾는다고 가정하고 코드의 흐름을 따라간다.
2. 또, 없는 값을 생각하고 어떻게 코드가 흐르는지도 파악한다. ( 어떻게 해서 `null`을 `return` 하는지 )

<br/>

### 3. 삭제(제거)에 대한 정리 `remove()`

>__조건 : 제거하려는 값(`value`)과 트리 내부의 존재하는 값(`node.value or root`)이 동일한 경우__

1. `leaf`일 경우<br/>
  결과 : `null`을 `return`한다.
2. 자식 `Node`가 1개일 경우<br/>
  2-1. 왼쪽 `Node`만 있을 경우<br/>
    결과 : (오른쪽 `Node`가 없을 경우) 왼쪽 `Node`를 `return`한다. <br/>
  2-2. 오른쪽 `Node`만 있을 경우<br/>
    결과 : (왼쪽 `Node`가 없을 경우) 오른쪽 `Node`를 `return`한다. <br/>

3. 자식 `Node`가 2개일 경우

* 만약, 어떠한 값을 제거한다면? ( `root`를 제거한다면 )<br/>
  3-1. 자신의 왼쪽 `Node`로부터 오른쪽 `Node` 중 가장 큰 수가 `root`자리로 오게된다.<br/>
  3-2. 그 후, `root`자리로 온 숫자의 자리로 원래 `root`였던 수가 들어간다.<br/>
  3-3. 그리고 제거된다.

* 풀이.
  1. 왼쪽 `Node`를 변수에 담아준다.
  2. 그 후, 최대한 오른쪽에 있는 `Node`를 찾아야한다. (`node.left.right.right.right`)<br/>
    2-1. 그렇기 위해선 `while()`문을 사용한다.<br/>
    2-2. 조건 : 오른쪽이 없을 때까지 계속 오른쪽으로 가야한다. ( 한글과 반대로 조건을 걸어준다. : 오른쪽에  `Node`가 있을 때까지 )
    2-3. 찾은 `Node`를 만든 왼쪽 `Node`변수에 담는다.
  3. 상위 `Node`와 찾은 오른쪽 가장 큰 수 `Node`를 바꿔준다.<br/>
    3-1. 중간역할을 위해 바뀔 값(`node.value`)을 변수(`temp`)에 담는다.<br/>
    3-2. 바뀔 값과 바꿀 값과 바꾼다. (`node.value = 왼쪽 Node를 담은 변수의 value`)
    3-3. 왼쪽 `Node`를 담은 변수의 `value`값에 변수`temp`을 담는다.
  4. 바꿔줬다면, `node.left`에 담아 재귀함수를 호출한다.
  5. 마지막으로, 부모의 값을 유지해줘야하므로, `node`를 `return`한다.
  
<br/>

>__조건 : 제거하려는 값(`value`)과 트리 내부의 존재하는 값(`node.value or root`)이 동일하지 않은 경우__

* 지울 값을 찾지 못했을 경우, 좌우 `Node`에게 물어본다.
* 만약, 부모값이 삭제하려는 값보다 작을 때
  * 왼쪽 `Node`에 재귀함수를 호출한다.
* 만약, 부모값이 삭제하려는 값보다 클 때
  * 오른쪽 `Node`에 재귀함수를 호출한다.
* __마지막으로, 부모의 값을 유지하고 있어야해서 `node`를 `return`한다.__

<br/>

>__예외처리 : `null`을 `return`한다.__

1. 찾으려는 숫자가 존재하지 않은 경우
2. `leaf`일 경우 ( 자식 `Node`가 0개일 경우 or 트리에 `Node`가 하나일 때 삭제하는 경우 )

<br/>

>__`return node`가 왜 필요한가 ? 꼭 ! 정리한 이미지, 코드, 트리보고 흐름파악__

<br/>

## 힙

![힙트리](/images/heap.png)
