import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Nome ${Date.now()}`,
      url: `https://www.github.com.br/${Date.now()}`,
      techs: ['Tech 1', 'Tech 2', 'Tech 3']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}            
            <span>&nbsp;({repository.url}) | {repository.likes} Likes <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></span>
            <ol>
              {repository.techs.map(tech => <li>{tech}</li>)}
            </ol>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
