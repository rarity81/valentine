import React, {useState} from "react";
import {useNavigate} from "react-router";
import {LetItGo} from "let-it-go";
import Button from "react-bootstrap/Button";

class Snowflake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationDelay: '0s',
      fontSize: '10px'
    };
    this.generateSnowflake = this.generateSnowflake.bind(this);
  }

  generateSnowflake = () => {
    const newDelay = `${(Math.random() * 16).toFixed(2)}s`;
    const newFontSize = `${(Math.floor(Math.random() * 10) + 10)}px`;
    this.setState({animationDelay: newDelay, fontSize: newFontSize})
  }

  componentDidMount() {
    this.generateSnowflake();
  }

  render() {
    const {animationDelay, fontSize} = this.state;
    const style = {animationDelay, fontSize};
    return (
        <p className='Snowflake' id={`item${this.props.id}`} style={style}>
          *
        </p>
    )
  }
}


class Snow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numFlakes: 500
    }
  }

  render() {
    const arr = new Array(this.state.numFlakes).fill('');
    const snow = arr.map((el, i) => {
      return (<Snowflake key={i} id={i}/>)
    })
    return (
        <div className='Snow'>
          {snow}
        </div>
    )
  }
}


function Tour() {
  const [isClick, setClick] = useState(false);

  let navigate = useNavigate();
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const [isHovering, setHover] = useState(false);


  const onHeart = async () => {
    setClick(!isClick)
    await sleep(1000)
    navigate("/series");
  }

  const onLeave = async () => {
    await sleep(1000)
    setHover(!isHovering)
  }


  return (
      <div className="App">
        <header className="App-header">
          <Snow></Snow>
          <h1 style={{zIndex: 10,boxShadow:"black",color:"black"}}>Будешь моим компаньоном в путешествиях?</h1>
          <table style={{zIndex: 10}}>
            <tr>
              <th className={"yes-no"}>
                <Button onClick={onHeart}>
                  <img src={"https://i.imgflip.com/g5gal.jpg?a474264"}
                       style={{width: 200, height: 200,}}/>
                </Button>
                <p>Да</p>
              </th>
            </tr>
          </table>
        </header>
      </div>
  );
}

export default Tour
