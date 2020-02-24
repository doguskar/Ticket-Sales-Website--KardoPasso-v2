using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kardo20.Models
{
    public class LoginRequest
    {
        public string LoginKey { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public bool KeepMeSignIn { get; set; }
        public bool DoNotControlPassword { get; set; }
    }
}
