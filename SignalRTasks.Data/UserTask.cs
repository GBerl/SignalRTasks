using System;
using System.Collections.Generic;
using System.Text;

namespace SignalRTasks.Data
{
    public class UserTask
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool Complete { get; set; }
        public string UserName { get; set; }

    }
}
