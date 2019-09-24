﻿using System;
using System.Collections.Generic;

namespace NeamiLogin.Models
{
    public partial class AspNetUserClaims
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }

        public virtual AspNetUsers User { get; set; }
    }
}
