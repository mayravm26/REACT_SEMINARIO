import { data } from 'autoprefixer'
import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext'

function TaskFormPage()
{
    const{register, handleSubmit} = useForm();
    const{tasks} = useTasks();
    console.log(tasks)

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })


    return(

        <div> Formulario de Tareas 
            <form onSubmit={onSubmit}>
                <input type='"text' placeholder="Titulo" 
                {...register ("titulo") }
                autoFocus
                />
                <textarea>
                    rows="3" 
                    placeholder="Descripcion"
                {...register ("Descripcio") }
                </textarea>
                <button>
                    SAVE
                </button>
            </form>
        </div>
    )
}

export default TaskFormPage