const answer = "APPLE";
// 정답 지정해두기
let index = 0;
let attempt = 0;
// 시도횟수 선언(최대 6회)
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:35vh; left:37vw; background-color:white; width:200px; height:50px; border:1px, solid, black;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempt === 6) {
      // 시도횟수는 최대 6번 가능
      return gameover();
      // 게임오버 시키고 함수탈출 시키기
    }
    attempt += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    // 종료할땐 이벤트리스너를 리무브 해주면 됨
    // 이렇게 하면 키다운 이벤트가 더 이상 적용되지 않음
    displayGameover();
    clearInterval(timer);
    // timer에 저장된 setInterval의 id를 clear해주면 종료시 타이머도 클리어 됨
  };

  const handleBackspace = () => {
    // 백스페이스 눌러서 글자 하는 기능
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempt}${index - 1}']`
      );
      preBlock.innerText = "";
      index -= 1;
    }
  };

  const handleEnterKey = () => {
    let count = 0;
    // 맞은개수
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempt}${i}']`
      );
      const letter = block.innerText;
      //블럭에 입력된 글자
      const correctAnswer = answer[i];
      //정답글자
      if (letter === correctAnswer) {
        //둘이 같다면 위치도 같다는 거니까
        block.style.background = "#6AAA64";
        // 초록 컬러 주기
        count += 1;
      } else if (answer.includes(letter)) {
        // answer(정답)안에 letter(블럭에 입력된 글자)가 포함 되어있으면 위치는 달라도 알파벳이 존재하니까
        block.style.background = "#C9B458";
        // 노랑 컬러 주기
      } else block.style.background = "#787C7E";
      //위치도 같지 않고 존재하지도 않는다면 회색 컬러 주기

      block.style.color = "white";
      //글씨색은 엔터 누름과 동시에 흰색으로 변경
    }
    if (count === 5) {
      gameover();
    } else {
      nextLine();
    }
  };

  const handleKeydown = (event) => {
    // console.log(event);
    // 이렇게해서 출력하면 evnet와 관련된 여러 속성들이 콘솔에 쭉 뜨고 그것을 확인해서 우리한테 필요한 속성을 출력해내면 된다.
    const key = event.key;
    // 우리는 우리가 누른 키의 값이 필요하니까 event.key를 이용하면 된다.
    const keyCode = event.keyCode;
    // 워들게임에서는 알파벳만 입력이 가능하기에 이를 추후에 구분하기 위해서 키코드도 변수로 정의해두기
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );
    // thisBlock이라는 변수에 html의 블럭을 연결시키기
    // 변수명을 작성하고 싶으면 백틱 사용하기

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      return;
    } else if (65 <= keyCode && keyCode <= 90) {
      // 눌린 키가 알파벳일때만 입력
      thisBlock.innerText = key.toUpperCase();
      // 블럭안의 텍스트를 키값으로 입력해주기
      // 추가적으로 텍스트는 대문자로만 들어가게 하기
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currrentTime = new Date();
      const flowTime = new Date(currrentTime - startTime);

      const minutes = flowTime.getMinutes().toString().padStart(2, "0");
      const seconds = flowTime.getSeconds().toString().padStart(2, "0");
      const timer = document.querySelector(".nav-timer");
      timer.innerText = `${minutes}:${seconds}`;
    }

    timer = setInterval(setTime, 1000);
    // setInterval은 id(인터벌횟수)를 리턴하는 함수임
    // timer에 setInterval의 id가 저장됨
  };

  startTimer();

  window.addEventListener("keydown", handleKeydown);
  // 윈도우 자체에 이벤트리스터를 줘야 함
  // 누르자마자 반응하게 하려면 키다운(키업은 손을 뗐을 때 반응)
}

appStart();
