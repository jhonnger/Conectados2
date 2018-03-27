using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class UserLogins
    {
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
        public long UserId { get; set; }

        public Users User { get; set; }
    }
}
