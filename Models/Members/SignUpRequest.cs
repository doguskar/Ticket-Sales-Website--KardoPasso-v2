using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kardo20.Models.Members
{
    public class SignUpRequest
    {
        public string Username { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BornDate { get; set; }
    }
}
