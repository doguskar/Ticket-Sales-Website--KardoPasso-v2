using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Sessions
    {
        public Guid Suid { get; set; }
        public Guid Uuid { get; set; }
        public bool? Valid { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Users Uu { get; set; }
    }
}
