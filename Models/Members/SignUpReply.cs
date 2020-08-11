using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kardo20.Models.Members
{
    public class SignUpReply
    {
        public bool result { get; set; }
        public bool usedUsername { get; set; }
        public bool usedEMail { get; set; }
    }
}
