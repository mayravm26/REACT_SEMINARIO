/*import { data } from 'autoprefixer'
import {useForm} from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom;'

function TaskFormPage()
{
    const{register, setValue, formState:{errors},handleSubmit} = useForm();
    const{tasks} = useTasks();
    const navigate = useNavigate();
    const params = useParams();
    console.log(tasks)

  //*  const onSubmit = handleSubmit((data) => {
        createTaskRequest(data);
        navigate('/tasks')
        console.log(data)
    })*//// 
    /*
        const onSubmit = async (data) => {
            try {
              if (params.id) {
                updateTask(params.id, {
                  ...data,
                  date: dayjs.utc(data.date).format(),
                });
              } else {
                createTask({
                  ...data,
                  date: dayjs.utc(data.date).format(),
                });
              }
        
              // navigate("/tasks");
            } catch (error) {
              console.log(error);
              // window.location.href = "/";
            }
          };
          useEffect(() => {
            const loadTask = async () => {
              if (params.id) {
                const task = await getTask(params.id);
                setValue("title", task.title);
                setValue("description", task.description);
                setValue(
                  "date",
                  task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
                );
                setValue("completed", task.completed);
              }
            };
            loadTask();
          }, []);


    return(

        <div className="bg-zinc-500 max-w-md w-full p-10 rouded-md"> Formulario de Tareas 
            <form onSubmit={onSubmit}>
                <input type='"text' placeholder="Titulo" 
                {...register ("titulo") }
                className="w-full bg-zinc-300 text-white px-4 py-2 rounded-md my-3"
                autoFocus
                />
                <textarea>
                    rows="3" 
                    placeholder="Descripcion"
                {...register ("Descripcio") }
                className="w-full bg-zinc-300 text-white px-4 py-2 rounded-md my-3"
                </textarea>
                <button>
                    SAVE
                </button>
            </form>
        </div>
    )
}

export default TaskFormPage*/

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
/*import { Button, Card, Input, Label } from "../components/TaskCard";*/
import { useTasks } from "../context/TaskContext.jsx";
import { useForm } from "react-hook-form";

dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const taskData = {
        ...data,
        date: dayjs.utc(data.date).format(),
      };

      if (params.id) {
        await updateTask(params.id, taskData);
      } else {
        await createTask(taskData);
      }

      navigate("/tasks"); // Redirigir después de guardar la tarea
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, [params.id, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title", { required: "Title es necesario" })}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description", { required: "Description es necesaria" })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">{errors.description.message}</p>
        )}

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />

        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
}

export default TaskFormPage;