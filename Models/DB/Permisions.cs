using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Permisions
    {
        public byte RoleId { get; set; }
        public bool CanEnterPagePanel { get; set; }
        public bool CanModifyUsers { get; set; }
        public bool CanEditPermissions { get; set; }

        public virtual Roles Role { get; set; }
    }
}
