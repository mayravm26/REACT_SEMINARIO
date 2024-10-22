/*import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks();
      } catch (err) {
        setError("Error al cargar las tareas. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [getTasks]);

  return (
    <div className="tasks-page">
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <p>Cargando tareas...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center p-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay tareas, puedes agregar tu primera tarea
            </h1>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}*/

import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "../components/TaskCard";
import {ImFileEmpty} from "react";
export function TasksPage() {
  const { tasks, getTasks } = useTasks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks();
      } catch (err) {
        setError("Error al cargar las tareas. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [getTasks]);

  return (
    <div className="tasks-page">
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <p>Cargando tareas...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center p-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay tareas, puedes agregar tu primera tarea
            </h1>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}