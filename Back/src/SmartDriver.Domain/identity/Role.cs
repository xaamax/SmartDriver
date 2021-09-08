using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace SmartDriver.Domain.identity
{
    public class Role: IdentityRole<int>
    {
        public List<UserRole> UserRoles { get; set; }
    }
}