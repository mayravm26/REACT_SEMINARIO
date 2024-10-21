import Task from "../models/task.model.js";



export const getTasks= async (req,res)=>{ //petiocinones bbdd async 
   const task = await Task.find({
    user:req.user.id
   }).populate('user')
   res.json(task);
   
    /* try {
        const tasks = await Task.find({ user : req.user.id }).populate("user");
        res.json(tasks);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }*/

};
export const crearTask= async (req,res)=>{
    const{titulo,descripcion,date} = req.body;
    const newTask = new Task({
        titulo,
        descripcion,
        date,
        user:req.user.id
    });
    const savedTask = await newTask.save();
    res.json(savedTask);

   /* try {
        const { titulo, descripcion, date } = req.body;
        const newTask = new Task({  //no gurada solo crea
          titulo,
          descripcion,
          date,
          user: req.user.id,
        });
        await newTask.save();
        res.json(newTask);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }*/

};
export const obtenerTasks= async (req,res)=>{

    const task= await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message: "tarea no encontrada"});
    res.json(task);
   /* try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json(task);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }*/

};
export const updatetasks= async (req,res)=>{
    const task= await Task.findByIdAndUpdate(req.params.id,req.body,{ new: true,});
    if(!task) return res.status(404).json({message: 'Tasca no encontrada'});
    res.json(task);

    /*

    try {
        const { titulo, descripcion, date } = req.body;
        const actualizarTasks = await Task.findOneAndUpdate(
          { _id: req.params.id },
          { titulo, descripcion, date },
          { new: true }
        );
        return res.json(taskUpdated);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }*/

};
export const eliminarTasks= async (req,res)=>{

    const task= await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({message: 'Tasca no encontrada'});
    res.json(task);
    /*

    try {
        const eliminarTasks = await Task.findByIdAndDelete(req.params.id);
        if (!eliminarTasks)
          return res.status(404).json({ message: "Task no encontrada" });
    
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }*/
    
};

