namespace WorkTime.Services
{
    public interface IAuthorizationService
    {
        bool VerifyPassword(string password, byte[] storedSalt, long? storedHashIterations, byte[] storedPassword);
    }
}