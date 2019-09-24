using NeamiLogin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeamiLogin.Stores
{
    public class UserStore
    {
        private List<User> users;

        public UserStore()
        {
            users = new List<User>();
            users.Add(new User("john@smith.com", "john123", "John", "Smith"));
            users.Add(new User("ace@ventura.com", "ace123", "Ace", "Ventura"));
            users.Add(new User("copen@hagen.com", "copen123", "Copen", "Hagen"));
        }

        public User Authenticate(LoginViewModel model)
        {
            return users.FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);
        }
    }
}
