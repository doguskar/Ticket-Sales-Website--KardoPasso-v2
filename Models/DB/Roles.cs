using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Roles
    {
        public Roles()
        {
            Users = new HashSet<Users>();
        }

        public byte RoleId { get; set; }
        public string RoleName { get; set; }

        public virtual Permisions Permisions { get; set; }
        public virtual ICollection<Users> Users { get; set; }
    }
}
