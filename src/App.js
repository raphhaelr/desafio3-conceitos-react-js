import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [data, setData] = useState([])
  const [form, setForm] = useState({
    title: '',
    url: '',
    techs: []
  })

  useEffect(() => {
    api.get('/repositories').then(response => {
      setData(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      title: form.title,
      url: form.url,
      techs: form.techs
    }).then(response => {
      setData([...data, response.data])
    })
    setForm({
      title: '',
      url: '',
      techs: []
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      const newData = data.filter(repository => repository.id !== id)
      setData(newData)
    })
  }

  function handleInputTitle(field, evt) {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  return (
    <div>
      <form>
        <label htmlFor='title'>Título</label>
        <input type='text' id='title' value={form.title} onChange={(evt) => handleInputTitle('title', evt)} />
        <label htmlFor='url'>URL</label>
        <input type='text' id='url' value={form.url} onChange={(evt) => handleInputTitle('url', evt)} />
        <label htmlFor='techs'>Techs</label>
        <input type='text' id='techs' value={form.techs} onChange={(evt) => handleInputTitle('techs', evt)} />
      </form>
      <ul data-testid="repository-list">
        {data.map(repository => {
          return (
            <li key={repository.title}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>
          )
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
