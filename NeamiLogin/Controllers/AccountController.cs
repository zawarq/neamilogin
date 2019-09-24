using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeamiLogin.Models;
using NeamiLogin.Stores;
using System;

namespace NeamiLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger _logger;

        public AccountController(
            ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                UserStore store = new UserStore();
                User u = store.Authenticate(model);
                if (u == default(User))
                {
                    return StatusCode(401);
                }
                else
                {
                    HttpContext.Session.SetString(Models.User.FirstNameKey, u.FirstName);
                    HttpContext.Session.SetString(Models.User.LastNameKey, u.LastName);
                    HttpContext.Session.SetString(Models.User.EmailKey, u.Email);
                    return Ok();
                }
            }

            // If we got this far, something failed, redisplay form
            return StatusCode(401);
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok();
        }

        [HttpGet("[action]")]
        public User GetUser()
        {
            try
            {
                User model = new User(
                    HttpContext.Session.GetString(Models.User.EmailKey),
                    string.Empty,
                    HttpContext.Session.GetString(Models.User.FirstNameKey),
                    HttpContext.Session.GetString(Models.User.LastNameKey));
            
                return model;
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }
    }
}