using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeamiLogin.Models
{
    public class User
    {
        public const string EmailKey = "_email";
        public const string FirstNameKey = "_firstName";
        public const string LastNameKey = "_lastName";

        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public User(string email, string password, string firstName, string lastName)
        {
            Email = email;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
        }
    }
}
