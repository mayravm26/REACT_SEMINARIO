import { useAuth } from "../context/AutenticacioContex";
function TasksPage()
{
    const {user}= useAuth()
    console.log(user)
    
    return(

        <div> Tascas</div>
    )
}
export default TasksPage;