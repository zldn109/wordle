let index = 0;
let attempt = 0;
// 시도횟수 선언(최대 6회)

function appStart() {
  const handleEnterKey = () => {};

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

    if (event.key === "Enter") {
      handleEnterKey();
    } else if (index === 5) {
      return;
    } else if (65 <= keyCode && keyCode <= 90) {
      // 눌린 키가 알파벳일때만 입력
      thisBlock.innerText = key.toUpperCase();
      // 블럭안의 텍스트를 키값으로 입력해주기
      // 추가적으로 텍스트는 대문자로만 들어가게 하기
      index += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown);
  // 윈도우 자체에 이벤트리스터를 줘야 함
  // 누르자마자 반응하게 하려면 키다운(키업은 손을 뗐을 때 반응)
}

appStart();
