using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SignalRTasks.Data
{
    public class TaskRepository
    {
        private string _connection;

        public TaskRepository(string connection)
        {
            _connection = connection;
        }
        public void AddTask(UserTask task)
        {
            using(var context=new TaskContext(_connection))
            {
                context.Tasks.Add(task);
                context.SaveChanges();
            }
        }
        public List<UserTask> GetAllTasks()
        {
            using (var context = new TaskContext(_connection))
            {
                return context.Tasks.Where(t => t.Complete == false).ToList();
                    
            }
        }
        public void DoTask(int id, string email)
        {
            using (var context = new TaskContext(_connection))
            {
                var userTask=context.Tasks.FirstOrDefault(t=>t.Id==id);
                userTask.UserName = context.Users.FirstOrDefault(u => u.Email == email).Name;
                context.SaveChanges();
            }
        }
        public void DoneTask(int id)
        {
            using (var context = new TaskContext(_connection))
            {
                var userTask = context.Tasks.FirstOrDefault(t => t.Id == id);
                userTask.Complete = true;
                context.SaveChanges();
            }
        }
    }
}
