import {useState} from 'react';
import { Header} from '../components/Header';
import background from '../assets/background.png'
import ItemList from '../components/ItemList'

import './style.css'


function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () =>{
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.lenght){
        setRepos(newRepos)
      }
    }
  };

  return (
    <div className="App">
      <Header/>
      <div className='conteudo'>
      <img className= "background"src= {background} alt="backgroun app"></img>
      <div className='info'>
        <input 
        name='usuario' 
        value={user}
        onChange={(event) => setUser(event.target.value)}
        placeholder='@username'  />
        <button onClick={handleGetData}>Buscar</button>
          {currentUser?.name ? (<>
            <div className='perfil'>
            <img src={currentUser.avatar_url} 
            className='profile' 
            alt='imagem de perfil'></img>
          <div>
            <h3>{currentUser.name}</h3>
            <span>@{currentUser.login}</span>
            <p>{currentUser.bio}</p>
          </div>
        <hr/>
        </div>
          </>
          ): null}
        {repos?.length ?(<>
          <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repos.map(repo =>(
          <ItemList title={repo.name} description={repo.description}/>
            ))}
          </div>
        </>): null}   
      </div>
      </div>
    </div>
  );
}

export default App;
