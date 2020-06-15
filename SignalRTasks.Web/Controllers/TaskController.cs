using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SignalRTasks.Data;

namespace SignalRTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private string _connection;
        public TaskController(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("Conn");
        }

        [HttpPost]
        [Route("addtask")]
        public void AddTask(UserTask task)
        {
            var repo = new TaskRepository(_connection);
            repo.AddTask(task);
        }
        [HttpPost]
        [Route("dotask")]
        public void DoTask(UserTask task)
        {
            var repo = new TaskRepository(_connection);
            repo.DoTask(task.Id, User.Identity.Name);
        }
        [HttpPost]
        [Route("donetask")]
        public void DoneTask(UserTask task)
        {
            var repo = new TaskRepository(_connection);
            repo.DoneTask(task.Id);
        }
    }
}