import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  profileName: string;
};

type GithubProfile = {
  avatar_url: string;
  url: string;
  followers: string;
  location: string;
  name: string;
};

const GithubSearch = () => {
  const [githubProfile, setGithubProfile] = useState<GithubProfile>();

  const [formData, setFormData] = useState<FormData>({
    profileName: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
    .get(`https://api.github.com/users/${formData.profileName}`)
      .then((response) => {
        setGithubProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setGithubProfile(undefined);
        console.log(error);
      });
  };

  return (
    <div className="github-search-container">
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <h1>Encontre um perfil Github</h1>
            <input
              type="text"
              name="profileName"
              value={formData.profileName}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
      <div className="info-container">
        {githubProfile && (
          <div className="details-container">
            <div className="image-container">
              <img src={githubProfile?.avatar_url} alt=""></img>
            </div>
            <div className="text-container">
              <h2>Informações</h2>
              <ResultCard
                title="Perfil:"
                description={githubProfile?.url}
              />
              <ResultCard
                title="Seguidores:"
                description={githubProfile?.followers}
              />
              <ResultCard
                title="Localidade:"
                description={githubProfile?.location}
              />
              <ResultCard
                title="Nome:"
                description={githubProfile?.name}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubSearch;
