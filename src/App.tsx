import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [echoInput, setEchoInput] = useState("");
  const [echoResult, setEchoResult] = useState("");
  const [status, setStatus] = useState("Checking ECHO status...");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  async function computeEcho() {
    setEchoResult(await invoke("echo_compute", { input: echoInput }));
  }

  async function checkStatus() {
    setStatus(await invoke("get_echo_status"));
  }

  return (
    <main className="container">
      <h1>ECHO Desktop</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>

      <div className="row" style={{ marginTop: "20px" }}>
        <input
          onChange={(e) => setEchoInput(e.currentTarget.value)}
          placeholder="ECHO input..."
        />
        <button onClick={computeEcho}>Compute</button>
      </div>
      <p>{echoResult}</p>

      <div className="row" style={{ marginTop: "20px" }}>
        <button onClick={checkStatus}>Check Status</button>
      </div>
      <p>{status}</p>
    </main>
  );
}

export default App;
