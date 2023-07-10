// alert("링크 방식")

// 변수의 선언과 할당 
var number = 2;

// 선언
var number1;
// 할당
number = 5;

// var, let, const ?
// 1. var : 재선언, 재할당이 가능하다. 가능 이름의 변수를 재선언, 재할당 할 수 있다.
var text = "dkjslkd";
var text;

// 2. let : 재선언 불가능, 재할당은 가능
let string = "안녕하세요";
string = "가나다";

// 3. cosnt : 재선언도 불가능, 재할당도 불가능, 상수값, 한 번 선언되면 바뀔 수 없다. ex) java -> final
// const는 선언과 할당을 분리하지 않고 한 줄에 작성해야 한다.
const string2 = "dkjlsk";
// string2 = "dddd";
console.log(string2);

// 변수는 자기가 활동할 수 있는 영역이 있다. = scope , 아래 함수 안 string 값은 함수 밖에서는 없는 값으로 나타난다. 
function aaa() {
    let string = "rkskek";
}

// var 보다는 let을 권장한다. 
// var, let의 변수를 할당하지 않으면 Undefined(공간은 있는데 값이 없다.)가 선언된다.

console.log(text); // Undefined
var text = "훌륭";
console.log(text); // "훌륭" -> var는 전역 변수이기 때문에 값이 할당되지 않은 상태에서 Undefined가 출력되지만 let은 그렇지 않고 에러가 뜬다.

// 숫자
let lang = 1;
// 문자
let lang2 = "aaa";
let lang3 = "bbb";
console.log(lang, lang2);
console.log(lang + lang2); //띄어쓰기 없이 출력됨

console.log(`안녕하세요 ? ${lang2} 입니다.`); // 백틱 키 : option + ~ 누르기

let name = 'scy';
let hihi = `안녕하세요 ${name} 입니다.`; // 백틱과 ${variable}을 쓰면 된다. 
console.log(hihi);

// '', "", ``

// Boolean : 참, 거짓
let checked = true;

// Undefined = 값이 할당되지 않았다.


// null :  비어 있는 값, 의도적으로 특정 값을 비어 있음을 의미할 때 사용
let empty = null;
console.log(empty);

// array : 배열
let fruits = ["orange", "apple", "banana", "blueberry"];
console.log(fruits[0], fruits[1], fruits[2], fruits[3]);

let data = [1, "apple", false, null, undefined]; // js는 약한 타입의 언어이므로 배열에 각각 다른 타입의 데이터도 넣을 수도 있다.
console.log(data);

/**
 * 배열에서 사용 가능한 속성, 함수 */

console.log(data.length); // 배열 길이 출력

data.push("plus"); // 배열 마지막에 추가로 데이터 넣을 때 
console.log("push : ", data); 

data.pop(); // 마지막 값 삭제
console.log("pop : ", data);

data.unshift("신형만"); // 0번 째에 값 추가
console.log(data);
data.shift(); // 0번 째 값 삭제 
console.log(data);

// apple ㅇㅣ라는 값이 있는 지 확인 
data.indexOf("apple"); // 값이 없을 경우에는 -1이라는 값이 나온다.
let index = data.indexOf("apple");
console.log(index);

let includes = data.includes("짱아"); // 값이 포함되어 있는 지 ? boolean 타입으로 나옴 
console.log(includes);

let rainbow = ["red", "orange", "yellow", "green", "blue", "darkblue", "pink"];
console.log(rainbow[0], rainbow[1], rainbow[2], rainbow[3]);
console.log(rainbow[2]);
rainbow.push("gray");
console.log(rainbow);
let blckIndex = rainbow.indexOf("black");
console.log(blckIndex);
console.log(rainbow.reverse());

