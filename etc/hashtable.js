/**
 * 자바스크립트에서 해시테이블에 해당하는 객체가 용량제한이 없는 셈이나 다름이 없다.
 * 그런데도 해시테이블을 사용하는 이유는 ?
 * 자바스크립트 객체도 내부적으로는 C, C++언어로 작성이 된다.
 * 거기선 해시테이블 같은 구조로 작성이 되어있을 것이다.
 * 자바스크립트는 아니지만, 자바스크립트의 내부적으로 해시테이블 자료구조를 사용하고 있다.
 *
 * 컴퓨터 자원을 아껴쓰는 연습을 하기위해선,
 * 해시테이블구조나 해시함수를 배워두면, 칸수에 어떻게 데이터들을 저장해야 되는지를 생각하며 작성하게된다.
 *
 * capa의 공간복잡도는 O(n)이다.
 * data에 n개 만큼 데이터가 들어가 있기 때문이다.
 *
 * keypoint: Hash함수가 얼마나 잘 짜여졌는지(분배해 넣어주는 거)에 따라 각 메소드의 시간복잡도가 O(1), O(logn), O(n)이 될 수도 있다. (성능에 따라 변한다.)
 *
 * 제일 간단한 hash함수는 capa값을 나눠주는 방법이다. 그 방법을 구현하는 법을 코드로 구현했다.
 */
class Hashtable {
  data = []; // length가 capa로 제한되어있는 상황
  constructor(capa) {
    // 공간복잡도는 O(n)이다.
    this.capa = capa;
  }
  // insert의 시간복잡도는 O(1)이다. (hashF함수의 시간복잡도는 따로 잇을 것이다.)
  insert(key, value) {
    // key를 hash함수루 변경해준다. (key를 숫자로 만들어준다.)
    const hash = hashF(key, this.capa);
    // data가 이차원배열이 아니기 때문에 만약, hash(key)가 없을 경우 빈 배열로 넣어준다.
    if (!this.data[hash]) this.data[hash] = [];
    // 비둘기집의 원리로 연결리스트로 하나의 저장소에 모든 데이터가 들어갈 수 있으니 push를 해준다.
    // 여기서 중요한게 value만 추가하면, key가 없기 때문에 찾으려는 데이터를 찾지 못하는 상황이 발생한다. ( 객체로 key, value )
    this.data[hash].push({ key, value });
  }

  // search의 시간복잡도는 O(n/hash)라고 생각할 수 있다.
  search(key) {
    const hash = hashF(key, this.capa);
    // 저장되어 있는 key가 있을 경우.
    if (this.data[hash]) {
      // includes를 쓰면 너무 반칙같으니까 for문을 돌려서 찾아준다.
      // this.data[hash].includes();
      for (let i = 0; i < this.data[hash].length; i++) {
        // 내가 찾으려는 key와 저장되어있는 key가 같을 경우.
        if (this.data[hash][i].key === key) {
          // 저장되어 있는 value값을 반환한다.
          return this.data[hash][i].value;
        }
      }
    }
    return null;
  }
  // 시간복잡도 O(n/hash)
  // 수정은 search와 코드가 동일하지만, 다른점은 반환을 value를 대입( 덮어씌어준다. )해주는 것
  update(key, value) {
    const hash = hashF(key, this.capa);
    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) {
          // 대입한다. (덮어씌어준다.)
          return (this.data[hash][i].value = value);
        }
      }
    }
  }
  // 시간 복잡도 O(n/hash)
  delete(key, value) {
    const hash = hashF(key, this.capa);
    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) {
          // undefined를 줄 수 도 있지만, 그럼 KEY값은 남아있기 때문에 splice로 제거해준다.
          // return this.data[hash].value = undefined;
          return this.data[hash].splice(i, 1);
        }
      }
    }
  }
}

// 저장할 값을 고르게 분배해 return 해주는 함수이다. (key를 hash로 바꿔준다.)
// ex) 나머지를 구한다. key = 31 % mod = 30 (mod = capa)
function hashF(key, mod) {
  // key가 랜덤하게 저장되는 것은 상관없지만 만약, key의 조건이 key값의 나머지가 무조건 1, 2, 3으로만 이뤄져잇다면 이 계산법은 매우 비효율적이다. (1, 2, 3, 31, 32, 33, 61, 62, 63 이런식으로만 저장된다는 것.)
  // 왜 ? 1, 2, 3만 사용되고 나머지 27칸들은 텅텅비어있기 때문이다.
  // 그래서 해시함수를 짤 때는 해시함수만 생각하지않고, 데이터의 분포도 잘 파악해야한다. (데이터칸에 골고루 분포하도록.)

  // key가 들어가는 Type들을 보두 대비를 해줘야한다. (꼭 Type이 아니더라도.)
  // key의 type이 string일 경우.
  if (typeof key === "string") {
    // 1. split()메소드로 다 쪼갠다.
    // 2. reduce : 모든 요소의 값을 종합해서 하나의 값으로 만드는 계산을 할 때 사용
    // https://helloworldjavascript.net/pages/190-array.html#reduce
    // 3. 문자열은 문자열 만의 고유한 번호가 있다. (charCodeAt() 사용)
    // 4. 나온 값을 30으로 나눈다. ( % mod)
    // key값과 capa값을 나눠서 나머지 값을 구하는 법이 가장 간단한 hash함수 구현법이다.
    // 그 앞에 split, reduce, charCodeAt를 사용하는 것은 스스로 구현하는 방법을 길러야한다.
    return key.split("").reduce((a, c) => a + c.charCodeAt(), 0) % mod;
    // ['a', 'b', 'c'] => [97, 98, 99] => 294 => 294 % 30 => 24
  }
  // key의 type이 number일 경우.
  if (typeof key === "number") {
    return key % mod;
  }
}

// 30이 capa이다. this.data[hahs]새로운 hash가 된다.
const ht = new Hashtable(30);
// hash함수를 어떻게 만들었는지에 따라 key가 어떻게 저장되는지 값이 바뀔 수가 있다.
ht.insert("abc", "hello");
ht.insert(31, "hello"); // 나머지 : 1
ht.insert(61, "by"); // 나머지 : 1
ht.insert(83, true); // 나머지 : 23
ht.insert(115, 135); // 나머지 : 25
console.log(ht.search(61)); // 'bye'
console.log(ht.search(99)); // null
ht.update(83, false);
ht.delete(31);
ht;
