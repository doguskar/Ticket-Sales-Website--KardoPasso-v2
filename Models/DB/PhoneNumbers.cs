using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class PhoneNumbers
    {
        public int PhoneNumberId { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string ActivationKey { get; set; }
        public DateTime? ActivationKeyDate { get; set; }
        public bool Activated { get; set; }
        public DateTime? ActivatedDate { get; set; }
        public int? UserId { get; set; }
        public bool? Valid { get; set; }

        public virtual Users User { get; set; }
    }
}
