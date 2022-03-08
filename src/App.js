import React, { useState } from "react";
import Particles from "react-tsparticles";

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

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

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
    setBox(box);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              console.log("count", count);
              setUser(Object.assign(user, { entries: count.entries }));
            })
            .catch(console.log("error"));
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log("err", err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
      setInput("");
      setImageUrl("");
      setBox({});
      setRoute("signin");
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const loadUser = (user) => {
    setUser(user);
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
          <Rank userName={user.name} userEntries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "register" ? (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
