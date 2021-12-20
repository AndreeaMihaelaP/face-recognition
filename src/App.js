import React, { useState } from "react";
import Particles from "react-tsparticles";
import Clarifai from "clarifai";

import { Navigation } from "./components/Navigation/Navigation";
import { Logo } from "./components/Logo/Logo";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { Rank } from "./components/Rank/Rank";
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

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    console.log("click");
    app.models
      .predict(
        // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        Clarifai.FACE_DETECT_MODEL,
        "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG"
      )
      .then(
        (response) => {
          console.log(
            "Model",
            response.rawData.outputs[0].data.regions[0].region_info.bounding_box
          );
        },
        (err) => {
          console.log("err", err);
        }
      );
  };

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        className="particles"
        options={paramsOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onButtonSubmit} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
