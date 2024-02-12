// const xyz = react.createClas({}) this is depracated 
import React, {useState} from 'react';
import './Series.css';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

//////// /////////////
///   Components ///


// User Profile
class UserProfile extends React.Component {
  render() {
    return (
        <div className="UserProfile">
          <div className="User">
            <div className="name">Анастасия Ульева</div>
            <div className="image"><img
                src="https://sun9-78.userapi.com/impg/xLddOOWS3pFeJhlwHwqDOdiE9r6Rri0RXc5seg/wC-bCNLMy98.jpg?size=679x668&quality=95&sign=6271e7af1708ea6d08c0aadb9cc66bdc&type=album"
                alt="profile"/></div>
          </div>
        </div>
    );
  }
}

//////// HERO //////////
class Hero extends React.Component {
  render() {
    return (
        <div id="hero" className="Hero"
             style={{backgroundImage: 'url(https://npr.brightspotcdn.com/dims4/default/a268f64/2147483647/strip/true/crop/1116x586+39+0/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fuploads%2F2018%2F7%2F16%2Fhamilton_FB.jpg)'}}>
          <div className="content">
            <h2>Когда-нибудь мы его посмотрим</h2>
            <p>Но для этого нужно согласиться стать моим партнером по просмотру фильмов.</p>
            <div className="button-wrapper">
              <HeroButton primary={true} text="Смотреть сейчас"/>
              <HeroButton primary={false} text="В Мой список"/>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
    );
  }
}

class Navigation extends React.Component {
  render() {
    return (
        <div id="navigation" className="Navigation">
          <nav>
            <ul>
              <li>Просто</li>
              <li>Нажми</li>
              <li>Кнопку</li>
              <li>Внизу</li>
            </ul>
          </nav>
        </div>
    );
  }
}


// Hero Button 
class HeroButton extends React.Component {
  render() {
    return (
        <a href="/2" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
    );
  }
}

/////////// Title List ///////////
class TitleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '87dfa1c669eea853da609d4968d294be',
      data: [],
      mounted: false
    };
  }

  loadContent() {
    let requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.state.apiKey;
    fetch(requestUrl).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({data: data});
    }).catch((err) => {
      console.log("there has been an error");
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url && nextProps.url !== '') {
      this.setState({mounted: true, url: nextProps.url}, () => {
        this.loadContent();
      });
    }
  }

  componentDidMount() {
    if (this.props.url !== '') {
      this.loadContent();
      this.setState({mounted: true});
    }
  }

  render() {
    let titles = '';
    if (this.state.data.results) {
      titles = this.state.data.results.map((title, i) => {
        if (i < 5) {
          let name = "";
          let backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
              <Item key={title.id} title={name} score={title.vote_average} overview={title.overview}
                    backdrop={backDrop}/>
          );

        } else {
          return (<div key={title.id}></div>);
        }
      });
    }

    return (
        <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
          <div className="Title">
            <h1>{this.props.title}</h1>
            <div className="titles-wrapper">
              {titles}
            </div>
          </div>
        </div>
    );
  }
}

// Title List Item 
class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
        <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}}>
          <div className="overlay">
            <div className="title">{this.props.title}</div>
            <div className="rating">{this.props.score} / 10</div>
            <div className="plot">{this.props.overview}</div>
            <ListToggle/>
          </div>
        </div>
    );
  }
}

// List Toggle 
class ListToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    }
  }

  // property initializer syntax to correctly bind callbacks.
  handleClick = () => {
    (this.state.toggled) ? this.setState({toggled: false}) : this.setState({toggled: true});
  }

  render() {
    return (
        <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
          <div>
            <i className="fa fa-fw fa-plus"></i>
            <i className="fa fa-fw fa-check"></i>
          </div>
        </div>
    );
  }
}

function Series() {
  const [isClick, setClick] = useState(false);

  let navigate = useNavigate();
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const [isHovering, setHover] = useState(false);


  const onHeart = async () => {
    setClick(!isClick)
    await sleep(1000)
    navigate("/2");
  }
  const onLeave = async () => {
    await sleep(1000)
    setHover(!isHovering)
  }

  return (
      <div>
        <header className="Header">
          <Navigation/>
          <div id="search" className="Search">
            <input type="search" placeholder="Найти фильм на вечер (потребуется 2 часа)"/>
          </div>
          <UserProfile/>
        </header>
        <Hero/>
        <TitleList title="Посмотреть пацанов сидя в телефоне"/>
        <TitleList title="Лучшие сериалы для Анастасии (все серии доктора кто)"
                   url='discover/tv?sort_by=popularity.desc&page=1'/>
        <TitleList title="Отложеные (фантастические твари)" url='discover/movie?sort_by=popularity.desc&page=1'/>
        <TitleList title="Лучший хоррор (с закрытыми глазами)" url='genre/27/movies?sort_by=popularity.desc&page=1'/>
        <TitleList title="10 частей елок для отличного сна" url='genre/878/movies?sort_by=popularity.desc&page=1'/>
        <TitleList title="(пожалуйста только не) Мьюзиклы" url='genre/35/movies?sort_by=popularity.desc&page=1'/>
        <HeroButton primary={true} text="Будешь смотреть вместе со мной кино?" onClick={onHeart}/>

      </div>
  );
}

export default Series;
