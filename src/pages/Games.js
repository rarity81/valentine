import React, {useState} from "react";
import Heart from "react-animated-heart/dist/cjs";
import {useNavigate} from "react-router";
import {ImageGallery} from "react-image-grid-gallery";
import {Button} from "react-bootstrap";

function Games() {
  const [isClick, setClick] = useState(false);
  const photos = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/ru/f/fc/Tekken_8_key_art.jpg',
      width: 400,
      height: 300
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/ru/1/1c/It_Takes_Two_cover.png',
      width: 400,
      height: 300
    },
    {
      src: 'https://www.riotgames.com/darkroom/1440/08bcc251757a1f64e30e0d7e8c513d35:be16374e056f8268996ef96555c7a113/wr-cb1-announcementarticle-banner-1920x1080.png',
      width: 400,
      height: 300
    },
    {
      src: 'https://m.media-amazon.com/images/M/MV5BN2U5OTRjYTMtM2Y4YS00NTc4LWE4ZGQtNGFlNjUyY2U0OTE2XkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg',
      width: 400,
      height: 300
    },
    {
      src: 'https://variety.com/wp-content/uploads/2022/07/Screen-Shot-2022-07-07-at-3.36.40-PM.png',
      width: 400,
      height: 300
    },
    {
      src: 'https://cdn1.epicgames.com/salesEvent/salesEvent/egs-overcooked2-tall_1200x1600-fbae89fad70c05cd1979316f620e64a9',
      width: 400,
      height: 300
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/ru/8/81/Sea_of_Thieves_%28game%29.jpg"
    }
  ];
  let navigate = useNavigate();
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const [isHovering, setHover] = useState(false);


  const onHeart = async () => {
    setClick(!isClick)
    await sleep(1000)
    navigate("/3");
  }
  const onLeave = async () => {
    await sleep(1000)
    setHover(!isHovering)
  }


  return (
      <div className="App">
        <header className="App-header">
          <ImageGallery
              imagesInfoArray={photos}
              columnWidth={400}
              gapSize={24}
          />
          <p>Будешь моим игроком номер 2?</p>
          <table>
            <tr>
              <th className={"yes-no"}>
                <Button onClick={onHeart}>
                  <img src={"https://static-00.iconduck.com/assets.00/console-controller-icon-2048x2048-pmmusn7m.png"}
                       style={{width: 100, height: 100,}}/>
                </Button>
                <p>Да</p>
              </th>
              <th style={{display: isHovering ? "none" : null}}>
                <Button onMouseEnter={() => setHover(!isHovering)} onMouseLeave={onLeave} style={{top: 10,}}>
                  <img
                      src={"https://cdn3.vectorstock.com/i/1000x1000/53/02/vintage-monochrome-broken-wireless-joystick-vector-22375302.jpg"}
                      style={{width: 100, height: 100,}}/>
                </Button>
                <p>Нет</p>
              </th>
            </tr>
          </table>
        </header>
      </div>
  );
}

export default Games
