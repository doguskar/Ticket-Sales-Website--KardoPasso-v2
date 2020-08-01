using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Users
    {
        public Users()
        {
            Authentications = new HashSet<Authentications>();
            Emails = new HashSet<Emails>();
            InverseDeletedBy = new HashSet<Users>();
            InverseLastModifiedBy = new HashSet<Users>();
            Passwords = new HashSet<Passwords>();
            PhoneNumbers = new HashSet<PhoneNumbers>();
        }

        public int UserId { get; set; }
        public Guid Uuid { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool EmailActivated { get; set; }
        public string PhoneNumber { get; set; }
        public bool? PhoneNumberActivated { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? BornDate { get; set; }
        public string ProfilPic { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Pin { get; set; }
        public bool? PinActive { get; set; }
        public DateTime? PinLastModifiedDate { get; set; }
        public string ForgottenKey { get; set; }
        public DateTime? ForgottenDate { get; set; }
        public int? LastModifiedById { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public bool DeletedFlag { get; set; }
        public DateTime? DeletedDate { get; set; }
        public int? DeletedById { get; set; }
        public byte RoleId { get; set; }

        public virtual Users DeletedBy { get; set; }
        public virtual Users LastModifiedBy { get; set; }
        public virtual Roles Role { get; set; }
        public virtual ICollection<Authentications> Authentications { get; set; }
        public virtual ICollection<Emails> Emails { get; set; }
        public virtual ICollection<Users> InverseDeletedBy { get; set; }
        public virtual ICollection<Users> InverseLastModifiedBy { get; set; }
        public virtual ICollection<Passwords> Passwords { get; set; }
        public virtual ICollection<PhoneNumbers> PhoneNumbers { get; set; }
    }
}
