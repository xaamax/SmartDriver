using Microsoft.AspNetCore.Identity;

namespace SmartDriver.Domain.identity
{
    public class UserRole : IdentityUserRole<int> 
    {
        public User User { get; set; }

        public Role Role { get; set; }
    }
}