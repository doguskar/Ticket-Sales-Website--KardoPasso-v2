using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kardo20.Models
{
    public class LoginReply
    {
        public bool result { get; set; }
        public bool showCaptcha { get; set; }
        public bool invalidLoginKey { get; set; }
        public bool invalidPassword { get; set; }
        public bool tooManyAttempts { get; set; }

        public LoginReply()
        {
            result = false;
            showCaptcha = false;
            invalidLoginKey = false;
            invalidPassword = false;
        }
    }
}
