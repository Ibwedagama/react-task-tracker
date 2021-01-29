import { useState, useEffect } from 'react'

// Components
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import './App.css'

function App() {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const fetchDataFromServer = await fetchTasks()
			setTasks(fetchDataFromServer)
		}
		getTasks()
	}, [])

	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json()
		return data
	}

	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`)
		const data = await res.json()
		return data
	}

	const [showAddTask, setShowAddTask] = useState(false)

	const addTask = async (task) => {
		const res = await fetch(`http://localhost:5000/tasks`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(task),
		})

		const data = await res.json()
		setTasks([...tasks, data])
	}

	const deleteTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		})
		setTasks(tasks.filter((task) => task.id !== id))
	}

	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'Application/json',
			},
			body: JSON.stringify(updatedTask),
		})
		const data = await res.json()

		setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)))
	}

	const toggleAddTask = () => {
		setShowAddTask(!showAddTask)
	}

	return (
		<div className='container'>
			<Header title='Task Tracker' onAdd={toggleAddTask} showAddTask={showAddTask} />
			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				'No Task to show'
			)}
		</div>
	)
}

export default App
