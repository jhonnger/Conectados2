using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class UserClaims
    {
        public int Id { get; set; }
        public long UserId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }

        public Users User { get; set; }
    }
}
