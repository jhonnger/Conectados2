using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Roles
    {
        public Roles()
        {
            UserRoles = new HashSet<UserRoles>();
        }

        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<UserRoles> UserRoles { get; set; }
    }
}
