using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kardo20.Models
{
    public class LoginCookie
    {
        public string UserUID { get; set; }
        public string SessionUID { get; set; }
        public bool Active { get; set; }

    }
}
