import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/repositories");
      setRepositories(data);
    })();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: `Desafio conceitos Reactjs ${Date.now()}`,
      url: "https://github.com/CesarDenis/gostack-conceitos-nodejs",
      techs: ["Reactjs", "Javascript"]
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const result = repositories.filter(repository => repository.id !== id);
      setRepositories(result);
    } catch ({ response }) {
      console.log(response.data.error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
