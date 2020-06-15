using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using SignalRTasks.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTasks.Web
{
    public class TaskHub : Hub
    {
        private string _connection;

        public TaskHub(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("Conn");
        }
        public void AllTasks()
        {
            var repo = new TaskRepository(_connection);
            var allTasks=repo.GetAllTasks();
            Clients.All.SendAsync("allTasks",allTasks );
        }

    }
}
