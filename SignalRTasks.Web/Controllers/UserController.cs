using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SignalRTasks.Data;
using SignalRTasks.Web.Models;

namespace SignalRTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string _connection;
        public UserController(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("Conn");
        }
        [HttpPost]
        [Route("adduser")]
        public void AddUser(LoginVM vm)
        {
            var repo = new AccountRepository(_connection);
            repo.AddUser(vm, vm.Password);
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginVM vm)
        {
            var repo = new AccountRepository(_connection);

            var claims = new List<Claim>
            {
                new Claim("user", vm.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return repo.Login(vm.Email, vm.Password);


        }

        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

        [HttpGet]
        [Route("getuser")]
        public User GetUser()
        {
            var repo = new AccountRepository(_connection);

            if (User.Identity.IsAuthenticated)
            {

                return repo.GetByEmail(User.Identity.Name);

            }

            return null;
        }



    }
}
