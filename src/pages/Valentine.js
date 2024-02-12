import {useState} from "react";
import Heart from "react-animated-heart/dist/cjs";

function Valentine() {
  const [isClick, setClick] = useState(false);
  const [isHovering, setHover] = useState(false);


  return (
      <div className="App">
        {!isClick && <header className="App-header">
          <img
              src="https://i.pinimg.com/474x/0c/7b/e6/0c7be631fc2d8d24dbdb561e8872e2d2.jpg"
              alt="logo"/>
          <p>Будешь моим валентином?</p>
          <table>
            <tr>
              <th className={"yes-no"}>
                <Heart isClick={isClick} onClick={() => setClick(!isClick)}/>
                <p>Да</p>
              </th>
              <th style={{display: isHovering ? "none" : null}}>
                <Heart isClick={false} onClick={() => setHover(!isHovering)}/>
                <p>Нет</p>
              </th>
            </tr>
          </table>
        </header>}
        {isClick &&
        <header className="App-header">
          <h1>Как будто ты могла отказаться</h1>
          <img
              src="https://i.pinimg.com/originals/a8/a2/2a/a8a22ab29df019dd50bec5d95e78cf0a.gif"
              alt="logo"/>
        </header>}
      </div>
  );
}

export default Valentine
