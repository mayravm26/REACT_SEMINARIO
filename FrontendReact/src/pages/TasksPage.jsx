import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "../components/task/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks();
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, [getTasks]); // Añadido 'getTasks' a las dependencias

  return (
    <>
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay tareas aún, por favor agrega una nueva tarea
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
    </>
  );
}