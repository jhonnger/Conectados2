using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class UserRoles
    {
        public long UserId { get; set; }
        public string RoleId { get; set; }

        public Roles Role { get; set; }
        public Users User { get; set; }
    }
}
