namespace SmartDriver.Application.Dtos
{
    public class UserLoginDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Perfil { get; set; }
        public string Setor { get; set; }
        public string Dpto { get; set; }
        public string Uf { get; set; }
    }
}