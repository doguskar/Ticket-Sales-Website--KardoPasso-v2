using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Passwords
    {
        public int PasswordId { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public bool NonUsed { get; set; }

        public virtual Users User { get; set; }
    }
}
