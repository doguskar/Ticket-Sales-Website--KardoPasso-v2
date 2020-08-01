using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Emails
    {
        public int EmailId { get; set; }
        public string Email { get; set; }
        public string ActivationKey { get; set; }
        public DateTime? ActivationKeyDate { get; set; }
        public bool Activated { get; set; }
        public DateTime? ActivatedDate { get; set; }
        public int UserId { get; set; }
        public bool Valid { get; set; }

        public virtual Users User { get; set; }
    }
}
