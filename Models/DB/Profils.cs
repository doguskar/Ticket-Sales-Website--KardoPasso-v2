using System;
using System.Collections.Generic;

namespace Kardo20.Models.DB
{
    public partial class Profils
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? BornDate { get; set; }
        public string ProfilPic { get; set; }
        public string LanguagePreference { get; set; }

        public virtual Users User { get; set; }
    }
}
