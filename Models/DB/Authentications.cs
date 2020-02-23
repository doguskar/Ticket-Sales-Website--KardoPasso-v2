using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Authentications
    {
        public long AuthenticationId { get; set; }
        public string IpAddress { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public string Hostname { get; set; }
        public DateTime AuthenticationDate { get; set; }
        public string AttemptedPassword { get; set; }
        public bool AttemptedResult { get; set; }
        public int UserId { get; set; }

        public virtual Users User { get; set; }
    }
}
