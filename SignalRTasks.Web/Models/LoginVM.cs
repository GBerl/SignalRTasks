using SignalRTasks.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTasks.Web.Models
{
    public class LoginVM:User
    {
        public string Password { get; set; }
    }
}
