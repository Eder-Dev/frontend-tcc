import './style.css'
import api from '../../api/api.js'
import banner from '../../assets/banner.svg'
import { Link } from 'react-router-dom'
import {useEffect, useState} from 'react'

function Home() {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState('')
  useEffect(() => {
    api.get('/consultation/list').then(response => {
          setData(response.data);
      })
  },[])
  const handleSelectConsult = (e) => {
    setSelected(e.target.selectedOptions[0].id)
    console.log(selected)
  }
  return (
    <div className="container">
      <div id="content-home">
        <div id='text'>
          <h1>Agendamento de Consultas</h1>
          <p>Bem-vindo, aqui você consegue agendar sua consulta médica do Posto de Saúdo do bairro Paraíso de forma online.</p>
        </div>
        <div id='entrada'>
          <select id='consulta-text' onLoad={handleSelectConsult} onChange={handleSelectConsult}>
            {data.map((e) => {
              return <option selected key={e._id} id={e._id}>{e.name}</option>
            })}
          </select>
          <Link id='consulta-button' to={`/agendamento/${selected}`}>Próximo</Link> 
        </div>
      </div>
      <img id='banner'src={banner}/>
    </div>
  );
}
//<input type='select' placeholder='Escolha sua consulta'/>
export default Home;
