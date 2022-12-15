import {useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import api from '../../api/api.js'
import './style.css'
import banner from '../../assets/banner2.svg'

function Admin(){
  const [data, setData] = useState([])
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState()
  useEffect(() => {
    api.get('/consultation/list').then(response => {
          setData(response.data);
      })
  },[])
  const handleSelectConsult = (e) => {
    let c = e.target.selectedOptions[0].innerText
    setSelected(e.target.selectedOptions[0].innerText)
    console.log(e.target.selectedOptions[0].innerText)
    api.post('/booking/search', {search: c, type: 'consultation'}).then(response => {
        console.log(response.data)
        setQuery(response.data);
    })
  }
  return (
    <div className="container">
      <div id="content-admin">
        <div id='text'>
          <h1>Administrador</h1>
          <p>Escolha a consulta para saber o paciente do dia.</p>
        </div>
        <div id='entrada'>
          <select id='select-admin' onLoad={handleSelectConsult} onChange={handleSelectConsult}>
            {data.map((e) => {
              return <option selected key={e._id} id={e._id}>{e.name}</option>
            })}
          </select>
        </div>
        <div id='admin-list'>
        	<ul>
            {query.map((e) => {
              return(
                <li>
                  <div>
                    <p><strong>Nome: </strong>Eder Pereira Pacheco Junior</p>
                    <p><strong>CPF: </strong>{e.cpf}</p>
                    <p><strong>SUS: </strong>{e.numSUS}</p>
                    <p><strong>Hora: </strong>{e.date}</p>
                  </div>
                </li>
              )
            })}
        		<li>
        			<div>
        				<p><strong>Nome: </strong>Eder Pereira Pacheco Junior</p>
        				<p><strong>CPF: </strong>000.000.000-00</p>
        				<p><strong>SUS: </strong>111222333444</p>
        				<p><strong>Hora: </strong>08:00</p>
        			</div>
        		</li>
        		<li>
        			<div>
        				<p><strong>Nome: </strong>Carlos Henrique Corte Pimentel Filho</p>
        				<p><strong>CPF: </strong>000.000.000-00</p>
        				<p><strong>SUS: </strong>111222333444</p>
        				<p><strong>Hora: </strong>10:00</p>
        			</div>
        		</li>
        		<li>
        			<div>
        				<p><strong>Nome: </strong>Antônio Victor Maciel Coutinho</p>
        				<p><strong>CPF: </strong>000.000.000-00</p>
        				<p><strong>SUS: </strong>111222333444</p>
        				<p><strong>Hora: </strong>11:00</p>
        			</div>
        		</li>
        	</ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;
