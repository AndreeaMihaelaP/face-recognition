import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import Clarifai from "clarifai";

import { Navigation } from "./components/Navigation/Navigation";
import { Logo } from "./components/Logo/Logo";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { Rank } from "./components/Rank/Rank";
import { SignIn } from "./components/SignIn/SignIn";
import { Register } from "./components/Register/Register";

import "./App.css";

const paramsOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.2,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const app = new Clarifai.App({
  apiKey: "41cdd0078df84e479968da3daf3f4ca6",
});

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then(console.log());
  }, []);

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0]?.data.regions[0]?.region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    console.log("Box", box);
    setBox(box);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    console.log("click");
    app.models
      .predict(
        // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        Clarifai.FACE_DETECT_MODEL,
        input
      )
      .then((response) => {
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log("err", err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        className="particles"
        options={paramsOptions}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "register" ? (
        <Register onRouteChange={onRouteChange} />
      ) : (
        <SignIn onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
