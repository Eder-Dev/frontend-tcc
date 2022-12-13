//import data from '../../data.json'
import api from '../../api/api.js'
import {useEffect, useState} from 'react'
//<link rel="stylesheet" href="./css/agendamento/style.css"/>
import './style.css'
import banner from '../../assets/banner2.svg'
import { Link, useParams, useNavigate } from 'react-router-dom'
function Agendamento(){
	const [data, setData] = useState({hours:[]})
	const [name, setName] = useState('')
	const [cpf, setCpf] = useState('')
	const [sus, setSUS] = useState('')
  	const [hours, setHours] = useState('')
  	const [modal, setModal] = useState(false)
  	const { id } = useParams()
  	const navigate = useNavigate()

	const consultation = data.name
	useEffect(() => {
		api.post('/consultation/search', {search: id, type: '_id'}).then(response => {
	      	setData(response.data);
	    })
	},[])
	const handleSelectConsult = (e) => {
		console.log(e)
		setHours(e.target.selectedOptions[0].id)
	}
	const sendConsult = (e) => {
		let query = {
			name,
			cpf,
			numSUS: sus,
			date: hours,
			consultation
		}
		api.post('/booking/create', query).then(response => {
			console.log(response)
			if(response.status === 200){
				setModal(true)
			}
	    })
	}
	const closeModal = (e) => {
		setModal(false)
		navigate('/')
	}
	return(
		<div className="container">
			{
				modal?
					<div id='modal-container'>
						<div id='modal'>
							<h1>Seu agendamento foi realizado</h1>
							<button className='consulta-button' onClick={closeModal}>Concluir</button>
						</div>
					</div>
				:<></>
			}
			<div id='content-agendamento'>
				<h1>Agende sua consulta para {data.name}</h1>
				<div className='quest'>
					<p className='label'>Nome Completo</p>
					<input type='text' onChange={e => setName(e.target.value)} className='nome' placeholder='Escreva aqui'/>
				</div>
				<div className='quest'>
					<p className='label'>CPF</p>
					<input type='number' onChange={e => setCpf(e.target.value)} className='cpf' placeholder='Apenas número'/>
				</div>
				<div className='quest'>
					<p className='label'>Número do SUS</p>
					<input type='number' onChange={e => setSUS(e.target.value)} className='cpf' placeholder='Apenas número'/>
				</div>
				<div className='quest'>
					<p className='label'>Horario</p>
					<select className='horario' onChange={handleSelectConsult}>
						{data.hours.map(e => {
							return(<option defaultValue={e} key={e} id={e}>{e}</option>)
						})}
					</select>
				</div>
				<button onClick={sendConsult} className='consulta-button'>Concluir</button> 
			</div>
			<img id='banner'alt='Banner' src={banner}/>
		</div>
	)
}

export default Agendamento;