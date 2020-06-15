using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace SignalRTasks.Data
{
    public class TaskContext:DbContext
    {
        private string _connectionString;

        public TaskContext(string connectionString)
        {
            _connectionString = connectionString;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> Tasks { get; set; }
    }
}
